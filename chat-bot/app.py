import streamlit as st # Import python packages
from snowflake.snowpark.context import get_active_session
session = get_active_session() # Get the current credentials

import pandas as pd

pd.set_option("max_colwidth",None)
num_chunks = 3 # Num-chunks provided as context. Play with this to check how it affects your accuracy

def create_prompt (myquestion, rag):

    if rag == 1:    

        cmd = """
         with results as
         (SELECT RELATIVE_PATH,
           VECTOR_COSINE_SIMILARITY(docs_chunks_table.chunk_vec,
                    SNOWFLAKE.CORTEX.EMBED_TEXT_768('e5-base-v2', ?)) as similarity,
           chunk
         from docs_chunks_table
         order by similarity desc
         limit ?)
         select chunk, relative_path from results 
         """
    
        df_context = session.sql(cmd, params=[myquestion, num_chunks]).to_pandas()      
        
        context_lenght = len(df_context) -1

        prompt_context = ""
        for i in range (0, context_lenght):
            prompt_context += df_context._get_value(i, 'CHUNK')

        prompt_context = prompt_context.replace("'", "")
        relative_path =  df_context._get_value(0,'RELATIVE_PATH')
    
        prompt = f"""
          'You are a chatbot named TenantGuard that is aimed to help people who are at risk of homelessness in OHIO find resources that will help prevent them from being evicted at a later date.
           For every response, start with TenantGuard is under construction and still in training! Please be aware that these responses may not be correct during this time. Then tell the user they can reach out to help@tenantguard.com anytime for a personal response.
          Context: {prompt_context}
          Question:  
           {myquestion} 
           Answer: '
           """
        cmd2 = f"select GET_PRESIGNED_URL(@docs, '{relative_path}', 360) as URL_LINK from directory(@docs)"
        df_url_link = session.sql(cmd2).to_pandas()
        url_link = df_url_link._get_value(0,'URL_LINK')

    else:
        prompt = f"""
         'Question:  
           {myquestion} 
           Answer: '
           """
        url_link = "None"
        relative_path = "None"
        
    return prompt, url_link, relative_path

def complete(myquestion, model_name, rag = 1):

    prompt, url_link, relative_path =create_prompt (myquestion, rag)
    cmd = f"""
             select SNOWFLAKE.CORTEX.COMPLETE(?,?) as response
           """
    
    df_response = session.sql(cmd, params=[model_name, prompt]).collect()
    return df_response, url_link, relative_path

def display_response (question, model, rag=0):
    response, url_link, relative_path = complete(question, model, rag)
    res_text = response[0].RESPONSE
    st.markdown(res_text)
    if rag == 1:
       display_url = f"Also I found this document for you, [{relative_path}]({url_link}) it may be helpful!"
       st.markdown(display_url)
   
#Main code

st.title("TenantGuard Chatbot:")
##st.write("""You can ask questions and decide if you want to use your documents for context or allow the model to create their own response.""")
st.write("This is the list of documents I have been trained on and have access to recomend:")
docs_available = session.sql("ls @docs").collect()
list_docs = []
for doc in docs_available:
    list_docs.append(doc["name"])
st.dataframe(list_docs)

#Here you can choose what LLM to use. Please note that they will have different cost & performance
model = st.sidebar.selectbox('Select your model:',(
                                    'mixtral-8x7b',
                                    'snowflake-arctic',
                                    'mistral-large',
                                    'llama3-8b',
                                    'llama3-70b',
                                    'reka-flash',
                                     'mistral-7b',
                                     'llama2-70b-chat',
                                     'gemma-7b'))

# food = st.text_input("Enter food status", placeholder="Low - essentials", label_visibility="collapsed")
# rent = st.text_input("Enter rent status ", placeholder="Paid - on time", label_visibility="collapsed")
# name = st.text_input("Enter name: ", placeholder="John Doe", label_visibility="collapsed")
st.write("Ask TenantGuard for help findimg resources below:")
question = st.text_input("Enter question", placeholder="Are there any resources in cincinnati that can help me out? I think I may miss rent next month...", label_visibility="collapsed")

rag = st.sidebar.checkbox('Use your own documents as context?', value=True)

print (rag)

if rag:
    use_rag = 1
else:
    use_rag = 0

if question:
    display_response (question, model, use_rag)
/*
  <div class="faq-question-list__container">
    <div class="faq-question__container">
      <div class="faq-question-question__container">
        <h2 class="faq-question-question__header">What is TenantGuard?</h2>
        <i class="faq-question-question__button fa-solid fa-chevron-down"></i>
      </div>
      <div class="faq-answer__container hidden">
        <p>Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.</p>
      </div>
    </div>
    <div class="faq-question__container">
      <div class="faq-question-question__container">
        <h2 class="faq-question-question__header">What is TenantGuard?</h2>
        <i class="faq-question-question__button fa-solid fa-chevron-down"></i>
      </div>
      <div class="faq-answer__container hidden">
        <p>Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.</p>
      </div>
    </div>
  </div>
*/

class faqQuestion {
  static questionList = faqQuestion.getQuestionListContainer();

  constructor(questionText, answerText) {
    this.enabled = false;
    this.questionText = questionText;
    this.answerText = answerText;
    
    this.root_question_div = this.createRootQuestionDiv();
    this.answerDiv = this.setupAnswerDiv();
    this.root_question_div.append(this.setupQuestionDiv(), this.answerDiv);
    
    this.root_question_div.addEventListener('click', () => {
      this.enabled = !this.enabled;

      if(this.enabled) {
        this.answerDiv.classList.remove('hidden');
      } else {
        this.answerDiv.classList.add('hidden');
      }
    });
    
    faqQuestion.questionList.appendChild(this.root_question_div);
  }

  static getQuestionListContainer() {
    return document.querySelector('.faq-question-list__container');
  }

  createRootQuestionDiv() {
    const retDiv = document.createElement("div");
    retDiv.classList.add("faq-question__container");
    return retDiv
  }

  setupQuestionDiv() {
    const faqQuestionQuestionContainer = document.createElement('div');
    faqQuestionQuestionContainer.classList.add('faq-question-question__container');

    const faqQuestionHeader = document.createElement('h2');
    faqQuestionHeader.classList.add('faq-question-question__header'); 
    faqQuestionHeader.innerText = this.questionText;
    const faqQuestionButton = document.createElement('i');
    faqQuestionButton.classList.add('faq-question-question__button', 'fa-solid', 'fa-chevron-down');
    faqQuestionQuestionContainer.append(faqQuestionHeader, faqQuestionButton);

    return faqQuestionQuestionContainer
  }

  setupAnswerDiv() {
    const faqQuestionAnswerContainer = document.createElement('div');
    faqQuestionAnswerContainer.classList.add('faq-answer__container', 'hidden');
    const faqAnswerText = document.createElement('p')
    faqAnswerText.classList.add('faq-answer__text');
    faqAnswerText.innerText = this.answerText;
    faqQuestionAnswerContainer.appendChild(faqAnswerText);
    return faqQuestionAnswerContainer;
  }
}

new faqQuestion("What is this chatbot and how can it help me?", "Our chatbot is designed to provide support and resources to individuals who are homeless or at risk of homelessness. It offers information on shelters, food banks, healthcare services, job training programs, and other vital resources.");
new faqQuestion("How do I start a conversation with the chatbot?", "To start a conversation with the chatbot please click on 'Chat' in the navbar or on the hompage");

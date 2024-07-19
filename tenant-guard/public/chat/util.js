function sanitizeInput(string) {
  const entityMap = {
    '&': '',
    '<': '',
    '>': '',
    '"': '',
    "'": '',
    '/': '',
    '`': '',
    '=': ''
  };
  return String(string).replace(/[&<>"'`=\/]/g, function (s) {
    return entityMap[s];
  });
}

function sendUserMessage(message) {
  if (!message) return;
  const bubbleContainer = document.querySelector('.chatbot-bubble-container');
  
  // Create div for new chat message
  const newMessageDiv = bubbleContainer.appendChild(document.createElement('div'));
  newMessageDiv.classList.add("chat-bubble");
  newMessageDiv.classList.add("chatbubble-from-user");

  // Create p element for message text
  const newMessageText = newMessageDiv.appendChild(document.createElement('p'));
  newMessageText.textContent = sanitizeInput(message);
};

function sendChatbotMessage(message) {
  if (!message) return;
  const bubbleContainer = document.querySelector('.chatbot-bubble-container');
  
  // Create div for new chat message
  const newMessageDiv = bubbleContainer.appendChild(document.createElement('div'));
  newMessageDiv.classList.add("chat-bubble");
  newMessageDiv.classList.add("chatbubble-from-chatbot");

  // Create p element for message text
  const newMessageText = newMessageDiv.appendChild(document.createElement('p'));
  newMessageText.textContent = message;
};

function validateEmail(email) {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};


export {
  sendUserMessage,
  sendChatbotMessage,
  sanitizeInput,
  validateEmail,
};
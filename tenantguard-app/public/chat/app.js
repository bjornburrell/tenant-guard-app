import { handleSurveySubmit } from "./survey/survey.js";
import { sendUserMessage } from "./util.js";

const surveyState = {};

// Get DOM Elements
const messageForm = document.querySelector(".chatbot-input-container");
const surveyForm = document.querySelector("form.tenantguard-survey");

// Setup Event Listeners
messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = document.querySelector(".chatbot-input").value;
  document.querySelector(".chatbot-input").value = "";
  sendUserMessage(message);
});

surveyForm.addEventListener("submit", (e) => {
  e.preventDefault();
  handleSurveySubmit(e, surveyState);
});

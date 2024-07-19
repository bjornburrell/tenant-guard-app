import { sanitizeInput, validateEmail } from "../util.js";

function validateSurveyState(surveyState) {
  console.log(surveyState)
  for(let [key, value] of Object.entries(surveyState)) {
    if(!surveyState[key]) {
      return false
    }
  }
  if(!validateEmail(surveyState.email)) {
    return false;
  }
  
  return true;
};

function handleSurveySubmit(e, surveyState) {
  const formData = new FormData(e.target);
  for (let [key, value] of formData.entries()) {
    surveyState[key] = sanitizeInput(value);
  }
  const validSurveyState = validateSurveyState(surveyState);
  console.log("Is valid Survey State: " + validSurveyState)
  /*
    valid state:
    {
      success: true,
      payload: {
        fname: "John",
        lname: "Doe",
        email: "email@email.com",
        phone: "123-456-7890",
      }
  */
  if (validSurveyState) {
    fetch("/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        success: true,
        payload: surveyState,
      }),
    });
  } else {
    fetch("/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        success: false,
        payload: {},
      }),
    });
  }
};


export {
  validateSurveyState,
  handleSurveySubmit,
}

function getFormattedDate() {
  datenow = new Date();
  return generate
};

function generateDatabaseDateTime(date) {
  return date.toISOString().replace("T"," ").substring(0, 19);
};

function getFormattedDate() {
  datenow = new Date();
  return generateDatabaseDateTime(datenow);
};

function getTimeStampList() {
  return document.querySelectorAll('.chat-bubble__timestamp');
};


function updateTimeStamps() {
  const timeStampList = getTimeStampList();

  if (timeStampList.length > 0) {
    for(const timeStamp of timeStampList) {
      timeStamp.innerText = getFormattedDate();
    }
  }
}

function getChatSubmissionButton() {
  return document.querySelector('.chat-entry__button');
}

// Update timestamps on msgs
updateTimeStamps();

chatSubmissionButton = getChatSubmissionButton();

chatSubmissionButton.addEventListener('click', () => {
  
})


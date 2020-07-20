// Replace with your google form id
const FORM_ID = "";
// replace with your 8x8 api key from developer.8x8.com
const API_KEY = "";
// Replace with the room name:
const ROOM_NAME = "CHAPI Sandbox";

function setupTrigger() {
  ScriptApp.newTrigger('sendChatMessage')
    .forForm(FORM_ID)
    .onFormSubmit();
}

function sendChatMessage(e) {
  let form = FormApp.getActiveForm();
  let items = e.response.getItemResponses();
  let responseString = "";
  for (i in items) {
    responseString += `*${items[i].getItem().getTitle()}*: ${items[i].getResponse()}\r\n`;
  }
  let message = "New Form Submission from: " + e.response.getRespondentEmail() + "\r\n" + responseString;
  let payload = {
    "messageRaw": message,
    "room": ROOM_NAME
  };
  
  postToChapi(payload);
}

function postToChapi(payload) {
  let options = {
    'method' : 'post',
    'payload' : JSON.stringify(payload),
    'contentType': 'application/json',
    'headers': {
      'x-api-key': API_KEY
    }
  };
  
  UrlFetchApp.fetch('https://api.8x8.com/chat/api/chat', options);
}

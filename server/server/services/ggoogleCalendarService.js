const { google } = require('googleapis');
require('dotenv').config();

// Crea un client OAuth2 con le credenziali fornite
const oauth2Client = new google.auth.OAuth2(
  process.env.GCAL_CLIENT_ID,
  process.env.GCAL_CLIENT_SECRET,
  process.env.GCAL_REDIRECT_URI
);

// Crea un'istanza del servizio Google Calendar
const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

// Genera l'URL per il login Google
function getAuthUrl() {
  const scopes = ['https://www.googleapis.com/auth/calendar'];
  return oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
  });
}

// Riceve il token dopo l'autenticazione
async function setCredentialsFromCode(code) {
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);
  return tokens;
}

// Crea un evento sul calendario di Google
async function createEvent(eventData) {
  return await calendar.events.insert({
    calendarId: 'primary',
    requestBody: eventData,
  });
}

module.exports = {
  getAuthUrl,
  setCredentialsFromCode,
  createEvent,
};

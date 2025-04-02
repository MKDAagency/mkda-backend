const { google } = require('googleapis');

// Scopes richiesti per Google Calendar
const SCOPES = ['https://www.googleapis.com/auth/calendar'];

function authorize() {
  const client_id = process.env.GCAL_CLIENT_ID;
  const client_secret = process.env.GCAL_CLIENT_SECRET;
  const redirect_uri = process.env.GCAL_REDIRECT_URI;

  // Il token JSON deve essere salvato in una variabile d'ambiente, es. process.env.GCAL_TOKEN
  const token = process.env.GCAL_TOKEN;

  if (!client_id || !client_secret || !redirect_uri || !token) {
    console.error('❌ Variabili d’ambiente mancanti o incomplete.');
    return null;
  }

  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uri
  );

  try {
    oAuth2Client.setCredentials(JSON.parse(token));
  } catch (err) {
    console.error('❌ Errore nel parsing del token:', err.message);
    return null;
  }

  return oAuth2Client;
}

module.exports = {
  authorize
};

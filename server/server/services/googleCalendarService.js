const fs = require('fs');
const path = require('path');
const { google } = require('googleapis');

// Percorso al file JSON delle credenziali
const CREDENTIALS_PATH = path.join(__dirname, '../../../client_secret_598314274371-j6krdicov4q4v76bd4rhtmp1326iahfi.apps.googleusercontent.com.json');
const TOKEN_PATH = path.join(__dirname, '../../../token.json');

// Scopes richiesti per Google Calendar
const SCOPES = ['https://www.googleapis.com/auth/calendar'];

function authorize() {
  const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH));
  const { client_secret, client_id, redirect_uris } = credentials.installed;

  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );

  // Verifica se il token esiste già
  if (fs.existsSync(TOKEN_PATH)) {
    const token = fs.readFileSync(TOKEN_PATH);
    oAuth2Client.setCredentials(JSON.parse(token));
    return oAuth2Client;
  } else {
    console.error('⚠️ Token mancante. Autentica l’utente prima di proseguire.');
    return null;
  }
}

module.exports = {
  authorize
};

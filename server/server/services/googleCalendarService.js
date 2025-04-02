const { google } = require('googleapis');

const oauth2Client = new google.auth.OAuth2(
  process.env.GCAL_CLIENT_ID,
  process.env.GCAL_CLIENT_SECRET,
  process.env.GCAL_REDIRECT_URI
);

const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

async function getGoogleAuthUrl() {
  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: 'https://www.googleapis.com/auth/calendar',
  });
  return url;
}

async function getTokensFromCode(code) {
  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    return tokens;
  } catch (error) {
    console.error('Errore durante l\'ottenimento del token:', error);
    throw error;
  }
}

module.exports = { getGoogleAuthUrl, getTokensFromCode };

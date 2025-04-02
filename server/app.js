const express = require('express');
const app = express();
const cors = require('cors');

// Middleware base
app.use(express.json());
app.use(cors());

// Test API (puoi rimuoverlo dopo)
app.get('/', (req, res) => {
  res.send('🎉 Backend MKDA attivo!');
});

// Importa e monta le route di Google Calendar (se esistono)
const googleRoutes = require('./services/googleCalendarService');
app.use('/api/google', googleRoutes);

module.exports = app;

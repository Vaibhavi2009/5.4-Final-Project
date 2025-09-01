/* server.js - Express app bootstrap */
const path = require('path');
const express = require('express');
const morgan = require('morgan');

// Initialize DB (creates table on first run)
require('./db');

const censusRouter = require('./routes/census');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));

app.get('/', (req, res) => res.redirect('/census'));

// Routes
app.use('/', censusRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).render('layout', { 
    title: 'Not Found',
    body: `<div class="container py-5"><h1>404</h1><p>Page not found.</p></div>`
  });
});

app.listen(PORT, () => {
  console.log(`✅ Server listening on http://localhost:${PORT}`);
});
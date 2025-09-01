/* routes/census.js - CRUD routes for Census records */
const express = require('express');
const { body, validationResult } = require('express-validator');
const db = require('../db');

const router = express.Router();

const selectAll = db.prepare('SELECT * FROM census ORDER BY year DESC, id DESC');
const selectById = db.prepare('SELECT * FROM census WHERE id = ?');
const insertStmt = db.prepare(`
  INSERT INTO census (street, city, state, zip, num_people, year, taker)
  VALUES (@street, @city, @state, @zip, @num_people, @year, @taker)
`);
const updateStmt = db.prepare(`
  UPDATE census
  SET street=@street, city=@city, state=@state, zip=@zip,
      num_people=@num_people, year=@year, taker=@taker
  WHERE id=@id
`);
const deleteStmt = db.prepare('DELETE FROM census WHERE id = ?');

// Validators shared by create + update
const validators = [
  body('street').trim().notEmpty().withMessage('Street is required.'),
  body('city').trim().notEmpty().withMessage('City is required.'),
  body('state').trim().toUpperCase().matches(/^[A-Z]{2}$/).withMessage('State must be 2 letters (e.g., CO).'),
  body('zip').trim().matches(/^\d{5}(-\d{4})?$/).withMessage('Zip must be 5 digits (optionally +4).'),
  body('num_people').trim().isInt({ min: 1 }).withMessage('Number of people must be 1 or more.')
    .toInt(),
  body('year').trim().isInt({ min: 1000, max: 2100 }).withMessage('Enter a valid year.').toInt(),
  body('taker').trim().notEmpty().withMessage('Census Taker\'s Name is required.')
];

// List page (ONLY: Year, Census Taker, Number of People, State, City)
router.get('/census', (req, res) => {
  const rows = selectAll.all();
  res.render('census/index', { title: 'Census Records', rows });
});

// Alias to match assignment screenshot path
router.get('/census-create', (req, res) => res.redirect('/census/new'));

// Create form
router.get('/census/new', (req, res) => {
  res.render('census/new', { title: 'Add New Census', values: {}, errors: {} });
});

// Create handler
router.post('/census', validators, (req, res) => {
  const errors = validationResult(req);
  const values = req.body;
  if (!errors.isEmpty()) {
    const mapped = Object.fromEntries(errors.array().map(e => [e.path, e.msg]));
    return res.status(422).render('census/new', { title: 'Add New Census', values, errors: mapped });
  }
  const payload = {
    street: req.body.street,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip,
    num_people: req.body.num_people,
    year: req.body.year,
    taker: req.body.taker
  };
  insertStmt.run(payload);
  res.redirect('/census');
});

// Edit form
router.get('/census/:id/edit', (req, res) => {
  const row = selectById.get(req.params.id);
  if (!row) return res.status(404).send('Record not found');
  res.render('census/edit', { title: 'Edit Census', values: row, errors: {} });
});

// Update handler
router.post('/census/:id/edit', validators, (req, res) => {
  const errors = validationResult(req);
  const values = { ...req.body, id: req.params.id };
  if (!errors.isEmpty()) {
    const mapped = Object.fromEntries(errors.array().map(e => [e.path, e.msg]));
    return res.status(422).render('census/edit', { title: 'Edit Census', values, errors: mapped });
  }
  const payload = {
    id: Number(req.params.id),
    street: req.body.street,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip,
    num_people: req.body.num_people,
    year: req.body.year,
    taker: req.body.taker
  };
  updateStmt.run(payload);
  res.redirect('/census');
});

// Delete handler
router.post('/census/:id/delete', (req, res) => {
  deleteStmt.run(Number(req.params.id));
  res.redirect('/census');
});

module.exports = router;
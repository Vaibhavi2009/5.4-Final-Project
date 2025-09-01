/* scripts/seed.js - optional: wipe and seed demo data */
const db = require('../db');

db.prepare('DELETE FROM census').run();
const sample = [
  { street: '30 County Road 10', city: 'Grand Junction', state: 'CO', zip: '55111', num_people: 3, year: 2019, taker: 'Judy' },
  { street: '12 Oak St', city: 'Raleigh', state: 'NC', zip: '27601', num_people: 5, year: 2020, taker: 'A. Rivera' },
  { street: '77 Pine Ave', city: 'Greensboro', state: 'NC', zip: '27401', num_people: 2, year: 2021, taker: 'M. Chen' }
];
const insert = db.prepare(`
  INSERT INTO census (street, city, state, zip, num_people, year, taker)
  VALUES (@street, @city, @state, @zip, @num_people, @year, @taker)
`);
const txn = db.transaction((rows) => {
  for (const r of rows) insert.run(r);
});
txn(sample);
console.log('Database reset and seeded with sample rows.');
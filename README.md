# Census CRUD (Express + EJS + SQLite)

This is a minimal, **assignment-ready** Node/Express app that performs full CRUD for *Census* records and satisfies the rubric:

## List view shows ONLY (in order)

1. **Year of the Census**  
2. **Census Taker's Name**  
3. **Number of People in Household**  
4. **Household State**  
5. **Household City**

> Click any row to edit or delete the record.

## Create / Update capture

- Number of People in Household  
- Household Address (Street, City, State, Zip Code)  
- Year (of the Census)  
- Census Taker's Name

## Delete

- Delete from the **Edit** page.

---

## Getting Started

1. **Install Node** (v18+ recommended).
2. Install dependencies:

```bash
npm install
```

3. Start the server:

```bash
npm run dev   # with reload (nodemon)
# or
npm start
```

4. Open: **http://localhost:3000**

> The SQLite database file is created automatically at `data/census.sqlite` on first run.

### Optional: seed some demo data

```bash
npm run db:reset
```

---

## Project Structure

```
.
├── db.js
├── server.js
├── routes/
│   └── census.js
├── views/
│   ├── layout.ejs
│   └── census/
│       ├── index.ejs   # list (shows only 5 required columns)
│       ├── new.ejs     # create form
│       └── edit.ejs    # edit + delete
├── public/
│   └── styles.css
├── data/               # SQLite DB files live here (gitignored)
├── scripts/
│   └── seed.js
├── package.json
└── .gitignore
```

---

## Validations (server-side)

- State must be 2 letters (e.g., `CO`).
- Zip must be `12345` or `12345-6789`.
- Number of people must be at least `1`.
- Year must be a reasonable integer.

---

## GitHub Submission Checklist

- Create a public repo named something like **lastname_week5_census_crud** (or per your course style).  
- Select **.gitignore → Node** when creating the repo.
- Add your instructor as a **collaborator**.
- Clone the repo locally and copy this project into it.
- Run and test the app; take screenshots of:
  - List page showing the 5 columns in the required order
  - Add form
  - Edit form
  - Delete confirmation result (list without the deleted record)
- Save the screenshots in the repo root **beside** `README.md`.
- Commit and push:

```bash
git add .
git commit -m "Complete Census CRUD assignment"
git push origin main
```

- Submit the GitHub repository URL per your LMS instructions.
# MongoDB Basic Queries Practice

Express + Mongoose project practicing basic MongoDB queries on a `students` collection.

## Files

- `queries.js` — standalone script with every query for Tasks 1–7, in order, with console output. This is the file to review for the assignment.
- `server.js` — a minimal Express app exposing some of the same queries as REST routes (per the "setup an express project" requirement).
- `models/Student.js` — Mongoose schema for a student (`name`, `age`, `department`, `cgpa`).
- `config/db.js` — MongoDB connection helper.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy `.env.example` to `.env` and set your connection string (local MongoDB or MongoDB Atlas):
   ```bash
   cp .env.example .env
   ```
3. Make sure MongoDB is running locally, or use an Atlas connection string in `MONGO_URI`.

If the default local MongoDB server is not available, the app falls back to an in-memory MongoDB instance so the exercises can still run in a fresh environment.

## Run the queries script

```bash
npm run queries
```

This clears the `students` collection, inserts the sample documents, then runs every query from Task 1 through Task 7, printing results to the console.

## Run the Express server

```bash
npm start
```

Then visit:
- `GET /students` — all students
- `GET /students/:name` — one student by name
- `GET /students-basic` — name + department only
- `GET /students/department/:dept` — filter by department
- `GET /students-sorted` — sorted by CGPA descending
- `GET /students-count` — total count
- `GET /departments` — distinct departments

## Submitting to GitHub

```bash
git init
git add .
git commit -m "MongoDB basic queries practice - students collection"
git branch -M main
git remote add origin <your-empty-github-repo-url>
git push -u origin main
```

(Create the empty repo on GitHub first, then paste its URL in place of `<your-empty-github-repo-url>`.)

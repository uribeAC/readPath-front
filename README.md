![MIT License](https://img.shields.io/badge/license-MIT-green)
![Tech Stack](https://img.shields.io/badge/stack-MERN-blue)
![TypeScript](https://img.shields.io/badge/code-typescript-blue.svg)
![Build with Vite](https://img.shields.io/badge/built%20with-Vite-purple)
![Redux Toolkit](https://img.shields.io/badge/redux-toolkit-critical)
![Tests](https://github.com/uribeAC/readPath-front/actions/workflows/testing.yml/badge.svg)
[![Netlify Status](https://api.netlify.com/api/v1/badges/7f5238db-9fe8-4fb0-8860-d582c9853b34/deploy-status)](https://app.netlify.com/projects/alex-uribe-202502-front/deploys)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=uribeAC_readPath-front&metric=coverage)](https://sonarcloud.io/summary/new_code?id=uribeAC_readPath-front)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=uribeAC_readPath-front&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=uribeAC_readPath-front)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=uribeAC_readPath-front&metric=bugs)](https://sonarcloud.io/summary/new_code?id=uribeAC_readPath-front)

# 📚 readPath

**readPath** is a minimalist web app that lets you manage your personal book collection. It's a CRUD system (Create, Read, Update, Delete) built for readers who want to track their books without social distractions or clutter.

This project uses the **MERN stack** (MongoDB, Express, React, Node.js) with TypeScript and modern testing tools.

## 🧩 Features

- 📖 Add, edit, and delete books in your collection
- 📋 View a full list of your books with detailed info
- 🔍 Filter your book list by state (read/to read) and genre
- 📊 Track reading stats by year, genre, pages, and authors
- 📈 Charts powered by Chart.js and react-chartjs-2
- 🗄️ Persistent data storage via MongoDB
- ⚡ Fast frontend with React + Vite
- 🧪 Full test suite with coverage reports
- 🔐 Backend API

## 🛠️ Technologies Used

This project is built using:

### Frontend

- **[React](https://reactjs.org/)** – UI components
- **[Vite](https://vitejs.dev/)** – Frontend tooling
- **[TypeScript](https://www.typescriptlang.org/)** – Static typing
- **[React Router](https://reactrouter.com/)** – Client-side routing
- **[Redux Toolkit](https://redux-toolkit.js.org/)** – Global state management (books, stats, UI, filters)
- **[React Testing Library](https://testing-library.com/react)** – Component testing
- **[Vitest](https://vitest.dev/)** – Test runner
- **[MSW](https://mswjs.io/)** – API mocking
- **[Chart.js](https://www.chartjs.org/)** & **[react-chartjs-2](https://react-chartjs-2.js.org/)** – Data visualization

### Backend

- **[Node.js](https://nodejs.org/)** – Runtime environment
- **[Express](https://expressjs.com/)** – API server
- **[MongoDB](https://www.mongodb.com/)** – Database
- **[Mongoose](https://mongoosejs.com/)** – ODM for MongoDB
- **RESTful API** – Simple endpoints for books management

## 🚀 How to Use

To run the project locally (frontend + backend):

```bash
# 1. Clone the repository
git clone https://github.com/uribeAC/readPath-front.git
cd readpath

# 2. Install dependencies
npm install

# 3. Start frontend
npm run dev
```

Make sure the backend server and MongoDB are also running.

### Available scripts:

- `npm run test` – Run all tests once
- `npm run test:dev` – Watch mode for tests
- `npm run test:coverage` – Generate test coverage report

## 📦 Redux Store Slices

This app uses **Redux Toolkit** to manage global state:

- `booksSlice` – Manages loaded books and book totals
- `statsSlice` – Manages book statistics data (year, genres, totals)
- `uiSlice` – Manages loading and modal UI state
- `filterSlice` – Stores active genre/state filters for book list

Each slice is written with `createSlice` and fully typed in TypeScript.

## 📊 Stats Page

You can view an interactive statistics dashboard at:  
🔗 [https://alex-uribe-202502-front.netlify.app/stats](https://alex-uribe-202502-front.netlify.app/stats)

- View number of books read per year
- Compare pages read and number of authors
- See most-read genres in a doughnut chart
- Powered by Chart.js and Redux state

## 📦 API

The Express backend exposes endpoints such as:

## 📦 API Endpoints

The Express backend exposes the following RESTful endpoints to manage your book collection:

### 📘 Books

#### ➕ Create a book

`POST /books/`  
Creates a new book in the collection.

#### 📚 Get all books

`GET /books/`  
Retrieves all books, optionally filtered by `page`, `state`, or `genre`.

- Example:  
  `GET /books?page=2&state=read&genre=Fantasy`

#### 🔍 Get a book by ID

`GET /books/:bookId`  
Returns the book with the specified `bookId`.

#### ✏️ Modify an existing book

`PUT /books/:bookId`  
Updates an existing book with the specified `bookId`.

#### 🗑️ Delete a book

`DELETE /books/:bookId`  
Deletes the book with the specified `bookId`.

#### ✅ Mark a book as **read**

`PATCH /books/mark-as-read/:bookId`  
Sets the state of the book to `"read"`.

#### 📌 Mark a book as **to read**

`PATCH /books/mark-as-toread/:bookId`  
Sets the state of the book to `"to read"`.

#### 📈 Get bookshelf statistics

`GET /books/stats`  
Returns summary statistics about the collection, including totals, genres, and books read per year.

---

Data is stored in a MongoDB database.

## 📁 Project Structure

```
readPath-front/
├── public/                 # Static files (favicon, logo, etc.)
├── src/                    # Source code
│   ├── assets/             # Images, fonts, and global styles
│   ├── book/               # Main feature domain (books)
│   │   ├── components/     # Reusable book components (BookCard, BookForm, BookDetail, etc.)
│   │   ├── client/         # API client for books (get, post, delete, etc.)
│   │   ├── hooks/          # Custom hooks for book operations
│   │   ├── pages/          # Book-related pages (List, Add, Modify, Stats, etc.)
│   │   ├── slice/          # Redux slices: booksSlice, statsSlice, filtersSlice
│   │   ├── types.ts        # Type definitions for books
│   │   └── dto/            # Transformers for data models
│   ├── components/         # Shared components (Button, Header, Modal, Pagination, etc.)
│   ├── hooks/              # Global hooks (useLoading, useModal)
│   ├── router/             # React Router routes and navigation
│   ├── store/              # Redux store configuration and hooks
│   ├── testUtils/         # Setup for Vitest, MSW, and context testing
│   ├── App.tsx             # Main app component
│   └── main.tsx            # Vite entry point
├── .github/                # GitHub workflow and config files
├── .env                    # Environment variables (API URL, etc.)
├── index.html              # HTML entry
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite config
└── README.md               # Project documentation
```

## 💡 Need Help?

If you encounter any issues or have suggestions, feel free to open an issue or discussion on the GitHub repository:

🔗 [https://github.com/uribeAC/readPath-front](https://github.com/uribeAC/readPath-front)

## 👨‍💻 Authors

- [Alex Uribe](https://github.com/uribeAC) — Project creator & maintainer

## 📄 License

This project is licensed under the MIT License.

---

Made with ❤️ using the MERN stack: MongoDB, Express, React, and Node.js

# Transaction Manager

A full-stack CRUD application for managing financial transactions, built with React, Node.js/Express, and MongoDB.

## Tech Stack

- **Frontend:** React (Vite), Axios
- **Backend:** Express, Mongoose, dotenv, cors
- **Database:** MongoDB

## Project Structure

```
trans/
├── backend/
│   ├── controllers/
│   │   └── transactionControllers.js
│   ├── models/
│   │   └── Transaction.js
│   ├── routes/
│   │   └── transactionRoutes.js
│   ├── server.js
│   ├── .env
│   └── package.json
└── frontend/
    ├── src/
    │   ├── api/
    │   │   └── api.js
    │   ├── components/
    │   │   ├── SearchBar.jsx
    │   │   ├── TransactionForm.jsx
    │   │   ├── TransactionItem.jsx
    │   │   └── TransactionList.jsx
    │   ├── App.jsx
    │   ├── App.css
    │   ├── index.css
    │   └── main.jsx
    ├── index.html
    ├── vite.config.js
    └── package.json
```

## Setup

### Prerequisites
- Node.js
- MongoDB (running on localhost:27017)

### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/transactions | Create a transaction |
| GET | /api/transactions | Get all transactions |
| GET | /api/transactions/:id | Get a single transaction |
| PUT | /api/transactions/:id | Update a transaction |
| DELETE | /api/transactions/:id | Delete a transaction |

### Query Parameters (GET)
- `description` - Search by description (case-insensitive)
- `type` - Filter by type (income/expense)
- `startDate` - Filter by start date
- `endDate` - Filter by end date

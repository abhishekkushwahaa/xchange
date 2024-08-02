# XChange - Stock Exchange

XChange is a stock exchange application that allows users to buy and sell stocks. The application is built using Typescript and Postgres. The application allows users to create an account, login, view their portfolio, buy and sell stocks, and view their transaction history.

## Features

- User authentication
- Buy and sell stocks
- View portfolio
- View transaction history
- Delete account
- Error handling
- Validation
- Logging
- Testing
- Docker

## Technologies

- Typescript
- Node.js
- Express
- Postgres
- Prisma ORM
- JWT
- Docker
- Testing: Vitest
- Tailwind CSS

## Installation

1. Clone the repository
2. Run `bun install` to install the dependencies
3. Create a `.env` file in the root directory and add the following environment variables:

```
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=your_db_host
DB_PORT=your_db_port
DB_NAME=your_db_name
JWT_SECRET=your_jwt_secret
```

## Usage

1. Run `bun run dev` to start the server
2. Navigate to `http://localhost:3000` in your browser
3. Create an account
4. Login
5. Buy and sell stocks
6. View your portfolio and transaction history
7. Logout
8. Delete your account

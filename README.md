# Income-Expense Tracker

A full-stack web application for tracking personal income and expenses with account management and transaction categorization.

## 🚀 Features

- **User Authentication**: Secure registration and login with JWT tokens
- **Account Management**: Create and manage multiple accounts (Savings, Checking, Credit Card, etc.)
- **Transaction Tracking**: Add, edit, and categorize income and expense transactions
- **Dashboard**: Visual overview of accounts and financial data
- **Profile Management**: User profile with image upload support
- **Responsive Design**: Built with Tailwind CSS for mobile-friendly interface

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Headless UI** - Accessible UI components
- **Heroicons** - Beautiful SVG icons
- **Axios** - HTTP client for API requests

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **Multer** - File upload handling
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
income-expense-tracker/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── dashboard/  # Dashboard components
│   │   │   ├── forms/      # Form components
│   │   │   ├── navbar/     # Navigation components
│   │   │   └── profile/    # Profile components
│   │   └── utils/          # Utility functions
│   └── package.json
├── server/                 # Express backend
│   ├── config/            # Database configuration
│   ├── controllers/       # Route controllers
│   ├── middlewares/       # Custom middlewares
│   ├── model/            # Mongoose models
│   ├── routes/           # API routes
│   ├── utils/            # Utility functions
│   └── package.json
└── README.md
```

## 🗄️ Database Schema

### User Model
- Full name, email, password
- Account references
- Profile image URL
- Account creation status

### Account Model
- Account name and type (Savings, Checking, Credit Card, etc.)
- Initial balance
- Transaction references
- Notes and timestamps

### Transaction Model
- Transaction name and type (Income/Expenses)
- Amount and category
- Date and color coding
- Account and user references
- Notes

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd income-expense-tracker
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Environment Setup**
   
   Create a `.env` file in the server directory:
   ```env
   MONGODB_LOCAL=mongodb://localhost:27017/income-expense-tracker
   JWT_SECRET=your-jwt-secret-key
   PORT=9000
   ```

5. **Start MongoDB**
   
   Make sure MongoDB is running on your system.

### Running the Application

1. **Start the backend server**
   ```bash
   cd server
   npm run server  # Uses nodemon for development
   # or
   npm start      # Uses node for production
   ```

2. **Start the frontend client**
   ```bash
   cd client
   npm start
   ```

3. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:9000

## 📚 API Endpoints

### Authentication
- `POST /api/v1/users/register` - User registration
- `POST /api/v1/users/login` - User login

### Users
- `GET /api/v1/users/profile` - Get user profile
- `PUT /api/v1/users/profile` - Update user profile

### Accounts
- `GET /api/v1/accounts` - Get user accounts
- `POST /api/v1/accounts` - Create new account
- `GET /api/v1/accounts/:id` - Get account details
- `PUT /api/v1/accounts/:id` - Update account
- `DELETE /api/v1/accounts/:id` - Delete account

### Transactions
- `GET /api/v1/transactions` - Get transactions
- `POST /api/v1/transactions` - Create transaction
- `GET /api/v1/transactions/:id` - Get transaction details
- `PUT /api/v1/transactions/:id` - Update transaction
- `DELETE /api/v1/transactions/:id` - Delete transaction

## 🎨 Account Types

The application supports various account types:
- Savings
- Investments
- Checking
- Credit Card
- Building
- School
- Project
- Utilities
- Travel
- Personal
- Groceries
- Entertainment
- Loan
- Cash Flow
- Education
- Uncategorized

## 📊 Transaction Categories

Transactions can be categorized as:
- Food
- Transportation
- Entertainment
- Shopping
- Utilities
- Health
- Travel
- Education
- Personal
- Groceries
- Bills
- Building
- Uncategorized

## 🔒 Security Features

- Password hashing with bcryptjs
- JWT token-based authentication
- Protected routes and middleware
- Input validation and sanitization
- CORS configuration

## 👨‍💻 Author

**Taufiq Islam**

## 📄 License

This project is licensed under the ISC License.

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

If you have any questions or need help with setup, please create an issue in the repository.

import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/forms/Login';
import HomePage from './components/homePage/HomePage';
import Register from './components/forms/Register';
import Navbar from './components/navbar/Navbar';
import AddTransaction from './components/forms/AddTransaction';
import AccountDashboard from './components/dashboard/AccountDashboard';
import AccountDetails from './components/dashboard/AccountDetails';
import AddAccount from './components/forms/AddAccount';
import EditTransaction from './components/forms/EditTransaction';

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/add-transaction/:id" element={<AddTransaction/>}/>
        <Route path="/edit-transaction/:id" element={<EditTransaction/>}/>
        <Route path="/dashboard" element={<AccountDashboard/>}/>
        <Route path="/account-details/:accountID" element={<AccountDetails/>}/>
        <Route path="/dashboard/accounts/create" element={<AddAccount/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

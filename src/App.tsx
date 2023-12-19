import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from './components/Register/Register';
import Payment from './components/Payment/Payment';
import Home from './components/Home';
import './App.css';

const App = () => {

  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [payEmail, setPayEmail] = useState<string>('');
  const [newSelectedBatch, setNewSelectedBatch] = useState<string>('');
  const [newStartDate, setNewStartDate] = useState<string>('');

  return (
    <Router>
      <div className="App">
        <h1>Yoga Classes Booking</h1>
        <Routes>
        <Route
            path="/"
            element={<Home  
              setIsRegistered={setIsRegistered} 
              setPayEmail={setPayEmail} 
              setNewSelectedBatch={setNewSelectedBatch} 
              setNewStartDate={setNewStartDate} 
            />}
          />
        <Route
            path="/register"
            element={<Register 
              payEmail={payEmail} 
              newStartDate={newStartDate}   
              newSelectedBatch={newSelectedBatch}
              setIsRegistered={setIsRegistered} 
              setPayEmail={setPayEmail} 
              setNewStartDate={setNewStartDate}   
              setNewSelectedBatch={setNewSelectedBatch} 
            />}
          />
          {isRegistered ? (
            <Route path="/payment" element={<Payment 
              payEmail={payEmail} 
              newStartDate={newStartDate}   
              newSelectedBatch={newSelectedBatch} 
            />} />
          ) : (
            <Route
              path="/payment"
              element={<Navigate to="/" />} 
            />
          )}
        </Routes>
      </div>
    </Router>
  );
};

export default App;

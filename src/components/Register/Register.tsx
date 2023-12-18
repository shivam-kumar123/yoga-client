import React, { useState, ChangeEvent, FormEvent } from 'react';
import ToastError from '../Toaster/ToastError';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Register.module.css';

type TProps = {
  setIsRegistered: (isRegistered: boolean) => void;
  setPayEmail: (payEmail: string) => void;
}

type TFormData = {
  name: string;
  age: number | null;
  email: string;
  selectedBatch: string;
  gender: string;
  startDate: string;
};

const Register = ({setIsRegistered, setPayEmail}: TProps) => {
  const [formData, setFormData] = useState<TFormData>({
    name: '',
    age: null,
    email: '',
    selectedBatch: '',
    gender: '',
    startDate: '',
  });
  const [ageIssue, setAgeIssue] = useState<boolean>(false);
  const [emptyField, setEmptyField] = useState<boolean>(false);
  const [serverError, setServerError] = useState<boolean>(false);

  const navigate = useNavigate(); 

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (ageIssue) {
      setAgeIssue(false);
    }
    if (emptyField) {
      setEmptyField(false);
    }
    if (serverError) {
      setServerError(false);
    }
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (serverError) {
      setServerError(false);
    }

    const { name, age, email, selectedBatch, gender, startDate } = formData;
    if (name === '' || age === null || email === '' || selectedBatch === '' || gender === '' || startDate === '') {
      setEmptyField(true);
      return;
    }

    if (age < 18 || age > 65) {
      setAgeIssue(true);
      return;
    }

    try {
      setPayEmail(email);
      const res = await axios.post(`${process.env.REACT_APP_SERVER}/submit`, formData);

      if (res.status === 200) {
        setFormData({
          name: '',
          age: null,
          email: '',
          selectedBatch: '',
          gender: '',
          startDate: '',
        });
        setIsRegistered(true);
        if (res.data.redirectUrl) {
          navigate(res.data.redirectUrl);
        }

      } else if (res.status === 202) {
        setServerError(true);
      }
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div className="form-container">
      <ToastContainer />
      <h2>Register</h2>
      <form>
        <label>
          <span>Name:</span>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          <span>Age:</span>
          <input
            type="number"
            name="age"
            value={formData.age !== null ? formData.age : ''}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          <span>Email:</span>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          <span>Gender:</span>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="" disabled hidden>Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </label>

        <label>
          <span>Select Batch:</span>
          <select
            name="selectedBatch"
            value={formData.selectedBatch}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Select Batch</option>
            <option value="6-7AM">6-7AM</option>
            <option value="7-8AM">7-8AM</option>
            <option value="8-9AM">8-9AM</option>
            <option value="5-6PM">5-6PM</option>
          </select>
        </label>

        <label>
          <span>Start Date:</span>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
          />
        </label>

        <button onClick={handleSubmit}>Procees To Payment</button>
        <div style={{
          marginTop: "1%"
        }}>
          <button onClick={() => navigate('/')}>Existing User</button>
        </div>

        {emptyField && (
          <ToastError
            message="Some Fields are Empty"
            time={5000}
          />
        )}

        {ageIssue && (
          <ToastError
            message="Age must be between 18 and 65"
            time={5000}
          />
        )}
        {serverError && 
        <ToastError
          message="Email Already in use"
          time={8000}
        />
      }
      </form>
    </div>
  );
};

export default Register;
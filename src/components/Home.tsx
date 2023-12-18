import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

type TProps = {
  setIsRegistered: (isRegistered: boolean) => void;
  setPayEmail: (payEmail: string) => void;
};

type TFormData = {
  email: string;
  selectedBatch: string;
  startDate: string;
};

const Home = ({ setIsRegistered, setPayEmail }: TProps) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<TFormData>({
    email: '',
    selectedBatch: '',
    startDate: '',
  });

  const [existingUser, setExistingUser] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ [key in keyof TFormData]: string }>({
    email: '',
    selectedBatch: '',
    startDate: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors: { [key in keyof TFormData]: string } = { email: '', selectedBatch: '', startDate: '' };

    // Validate email
    if (!formData.email) {
      newErrors.email = 'Please enter your email';
      isValid = false;
    }

    // Validate selectedBatch
    if (!formData.selectedBatch) {
      newErrors.selectedBatch = 'Please select a batch';
      isValid = false;
    }

    // Validate startDate
    if (!formData.startDate) {
      newErrors.startDate = 'Please select a start date';
      isValid = false;
    }

    setErrors(newErrors);

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      // If the form is not valid, do not proceed
      return;
    }

    try {
      setPayEmail(formData.email);
      const res = await axios.post(`${process.env.REACT_APP_SERVER}/existing-user`, formData);
      if (res.status === 200) {
        // Old user redirect for payment
        setFormData({
          email: '',
          selectedBatch: '',
          startDate: '',
        });
        setExistingUser(true);
        setIsRegistered(true);
        navigate('/payment');
      } else if (res.status === 202) {
        // New user redirect to /register route
        navigate('/register');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleNewUser = () => {
    navigate('/register');
  };

  return (
    <div>
      {existingUser ? (
        <div>
          <div className="form-container">
            <h2>Renew Yoga Classes</h2>
            <form>
              <label>
                <span>Email:</span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <div style={{
                  color:'red'
                }}>{errors.email}</div>
              </label>

              <label>
                <span>Select Batch:</span>
                <select
                  name="selectedBatch"
                  value={formData.selectedBatch}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                    Select Batch
                  </option>
                  <option value="6-7AM">6-7AM</option>
                  <option value="7-8AM">7-8AM</option>
                  <option value="8-9AM">8-9AM</option>
                  <option value="5-6PM">5-6PM</option>
                </select>
                <div style={{
                  color:'red'
                }}>{errors.selectedBatch}</div>
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
                <div style={{
                  color:'red'
                }}>{errors.startDate}</div>
              </label>

              <button onClick={handleSubmit}>Proceed To Payment</button>
              <div style={{ marginTop: '1%' }}>
                <button onClick={handleNewUser}>New User</button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div>
          <div
            style={{
              marginBottom: '2%',
              marginTop: '10%',
            }}
          >
            <button onClick={handleNewUser}>New User</button>
          </div>
          <div>
            <button onClick={() => setExistingUser(true)}>Existing User</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;

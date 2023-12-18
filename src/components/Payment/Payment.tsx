import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './Payment.module.css';
import ToastSuccess from '../Toaster/ToastSuccess';
import ToastError from '../Toaster/ToastError';

type TProps = {
  payEmail: string;
  newStartDate: string;
  newSelectedBatch: string;
};

const Payment = ({ payEmail, newStartDate, newSelectedBatch }: TProps) => {
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvc: '',
    cardHolder: '',
    amount: 500,
  });
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [paid, setPaid] = useState<boolean>(false);
  const [paymentFailed, setPaymentFailed] = useState<boolean>(false);
  const [validationErrors, setValidationErrors] = useState({
    cardNumber: '',
    expiryDate: '',
    cvc: '',
    cardHolder: '',
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      cardNumber: '',
      expiryDate: '',
      cvc: '',
      cardHolder: '',
    };

    if (formData.cardNumber.length !== 16 || !/^\d+$/.test(formData.cardNumber)) {
      newErrors.cardNumber = 'Card number must be a 16-digit number';
      isValid = false;
    }

    if (!formData.expiryDate) {
      newErrors.expiryDate = 'Please enter the expiry date';
      isValid = false;
    }

    if (formData.cvc.length !== 3 || !/^\d+$/.test(formData.cvc)) {
      newErrors.cvc = 'CVV must be a 3-digit number';
      isValid = false;
    }

    if (!formData.cardHolder) {
      newErrors.cardHolder = 'Please enter the card holder name';
      isValid = false;
    }

    setValidationErrors(newErrors);

    return isValid;
  };

  const handleProceed = async () => {
    try {

      const data = {
        email: payEmail,
        startDate: newStartDate,
        selectedBatch: newSelectedBatch
      };
      setIsLoading(true);
      const res = await axios.post(`${process.env.REACT_APP_SERVER}/pay`, data);
      setPaymentFailed(false);
      setShowConfirmation(false);
      setIsLoading(false);
      setPaid(true);
    } catch (err) {
      setPaymentFailed(true);
      setIsLoading(false);
      console.log(err);
    }
  };

  const handleEdit = () => {
    setShowConfirmation(false);
  };

  const handlePay = () => {
    if (!validateForm()) {
      return;
    }
    setShowConfirmation(true);
  };

  return (
    <div className={styles.paymentContainer}>
      <ToastContainer />
      {isLoading && <h3>Processing ...</h3>}
      {showConfirmation === false && !paid && (
        <>
          <h2>Secure Payment</h2>
          <div className={styles.paymentCard}>
            <label htmlFor="cardNumber">Card Number:</label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              placeholder="**** **** **** ****"
              value={formData.cardNumber}
              minLength={16}
              onChange={handleInputChange}
              required
            />
            <div style={{
              color:'red'
            }}>{validationErrors.cardNumber}</div>
          </div>

          <div className={styles.paymentDetails}>
            <div className={styles.paymentExpiry}>
              <label htmlFor="expiryDate">Expiry Date:</label>
              <input
                type="text"
                id="expiryDate"
                name="expiryDate"
                placeholder="MM/YY"
                value={formData.expiryDate}
                onChange={handleInputChange}
                required
              />
              <div style={{
                color:'red'
              }}>{validationErrors.expiryDate}</div>
            </div>

            <div className={styles.paymentCvc}>
              <label htmlFor="cvc">CVV:</label>
              <input
                type="text"
                id="cvc"
                name="cvc"
                placeholder="***"
                minLength={3}
                value={formData.cvc}
                onChange={handleInputChange}
                required
              />
              <div style={{
                color:'red'
              }}>{validationErrors.cvc}</div>
            </div>
          </div>

          <div className={styles.paymentCardHolder}>
            <label htmlFor="cardHolder">Card Holder:</label>
            <input
              type="text"
              id="cardHolder"
              name="cardHolder"
              placeholder="Card Holder Name"
              value={formData.cardHolder}
              onChange={handleInputChange}
              required
            />
            <div style={{
              color:'red'
            }}>{validationErrors.cardHolder}</div>
          </div>

          <div className={styles.paymentAmount}>
            <label htmlFor="amount">Amount:</label>
            <input type="text" id="amount" name="amount" value={`Rs ${formData.amount}`} readOnly />
          </div>

          <button className={styles.paymentButton} onClick={handlePay}>
            Pay
          </button>
        </>
      )}

      {showConfirmation && !paid && (
        <div className={styles.confirmationModal}>
          <h3>Confirm Your Details</h3>

          <p>Card Number: {formData.cardNumber}</p>
          <p>Expiry Date: {formData.expiryDate}</p>
          <p>CVV: {formData.cvc}</p>
          <p>Card Holder: {formData.cardHolder}</p>
          <p>Amount: Rs {formData.amount}</p>

          <div className={styles.confirmationButtons}>
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleProceed}>Proceed</button>
          </div>
        </div>
      )}

      {paid && 
        <div>
          <div> Booking Completed Successfully  &#9989;</div>
          <ToastSuccess
            message="Payment successful, check E-Mail"
          />
        </div>
      }
      {
        paymentFailed && 
        <div>
          <div> Booking Failed &#10060;</div>
          <ToastError
            message="Payment Failed"
            time={8000}
          />
        </div>
      }
    </div>
  );
};

export default Payment;
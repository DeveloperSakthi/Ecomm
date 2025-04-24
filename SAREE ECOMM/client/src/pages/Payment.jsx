import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import './Payment.css';

const Payment = () => {
  const navigate = useNavigate();
  const [selectedPayment, setSelectedPayment] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({
    // Credit/Debit Card Fields
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    
    // UPI Fields
    upiId: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePayment = async () => {
    // Validate payment method selection
    if (!selectedPayment) {
      alert('Please select a payment method');
      return;
    }

    // Validate payment details based on selected method
    if (selectedPayment === 'credit' || selectedPayment === 'debit') {
      if (!paymentDetails.cardNumber || !paymentDetails.cardName || !paymentDetails.expiryDate || !paymentDetails.cvv) {
        alert('Please fill in all card details');
        return;
      }
      // Basic validation for card number (16 digits)
      if (!/^\d{16}$/.test(paymentDetails.cardNumber.replace(/\s/g, ''))) {
        alert('Please enter a valid 16-digit card number');
        return;
      }
      // Basic validation for CVV (3-4 digits)
      if (!/^\d{3,4}$/.test(paymentDetails.cvv)) {
        alert('Please enter a valid 3 or 4 digit CVV');
        return;
      }
    } else if (selectedPayment === 'upi') {
      if (!paymentDetails.upiId) {
        alert('Please enter your UPI ID');
        return;
      }
      // Basic validation for UPI ID (should contain @)
      if (!paymentDetails.upiId.includes('@')) {
        alert('Please enter a valid UPI ID');
        return;
      }
    }

    setIsProcessing(true);
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    const userId = window.Clerk && window.Clerk.user ? window.Clerk.user.id : 'anonymous';

    try {
      // Create the order in the database
      const response = await api.post('/orders', {
        orderItems: cart.map(item => ({
          product: item._id,
          qty: item.qty
        })),
        totalPrice,
        userId,
        paymentMethod: selectedPayment
      });
      
      if (response.status === 201) {
        // For each item, update the product's stock in the database
        await Promise.all(cart.map(item => {
          // Calculate the new stock count (ensure it doesn't go below 0)
          const newCount = Math.max(0, item.countInStock - item.qty);
          // Call the update endpoint with all product details
          return api.put(`/products/${item._id}`, {
            name: item.name,
            image: item.image,
            description: item.description,
            category: item.category,
            price: item.price,
            countInStock: newCount
          });
        }));
        
        // Clear the cart and navigate to the home page
        localStorage.removeItem('cart');
        alert('Payment successful and order created!');
        navigate('/');
      }
    } catch (error) {
      console.error(error);
      alert('Payment failed!');
    } finally {
      setIsProcessing(false);
    }
  };

  // Retrieve cart data to display the bill
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  // Render different payment forms based on the selected payment method
  const renderPaymentForm = () => {
    if (selectedPayment === 'credit' || selectedPayment === 'debit') {
      return (
        <div className="payment-form card-payment-form">
          <div className="form-group">
            <label htmlFor="cardNumber">Card Number</label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              placeholder="1234 5678 9012 3456"
              value={paymentDetails.cardNumber}
              onChange={handleInputChange}
              maxLength="19"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="cardName">Cardholder Name</label>
            <input
              type="text"
              id="cardName"
              name="cardName"
              placeholder="John Doe"
              value={paymentDetails.cardName}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="form-row">
            <div className="form-group half">
              <label htmlFor="expiryDate">Expiry Date</label>
              <input
                type="text"
                id="expiryDate"
                name="expiryDate"
                placeholder="MM/YY"
                value={paymentDetails.expiryDate}
                onChange={handleInputChange}
                maxLength="5"
              />
            </div>
            
            <div className="form-group half">
              <label htmlFor="cvv">CVV</label>
              <input
                type="password"
                id="cvv"
                name="cvv"
                placeholder="123"
                value={paymentDetails.cvv}
                onChange={handleInputChange}
                maxLength="4"
              />
            </div>
          </div>
        </div>
      );
    } else if (selectedPayment === 'upi') {
      return (
        <div className="payment-form upi-payment-form">
          <div className="form-group">
            <label htmlFor="upiId">UPI ID</label>
            <input
              type="text"
              id="upiId"
              name="upiId"
              placeholder="yourname@upi"
              value={paymentDetails.upiId}
              onChange={handleInputChange}
            />
          </div>
        </div>
      );
    } else if (selectedPayment === 'gpay' || selectedPayment === 'phonepe' || selectedPayment === 'paytm') {
      return (
        <div className="payment-form app-payment-form">
          <p className="app-payment-message">
            Click "Pay Now" to complete your payment with {selectedPayment === 'gpay' ? 'Google Pay' : selectedPayment === 'phonepe' ? 'PhonePe' : 'Paytm'}
          </p>
          <div className="app-payment-logo">
            {selectedPayment === 'gpay' && 'G'}
            {selectedPayment === 'phonepe' && 'P'}
            {selectedPayment === 'paytm' && 'P'}
          </div>
        </div>
      );
    }
    
    return null;
  };

  return (
    <div className="payment-container">
      <h2 className="payment-header">Checkout</h2>
      
      {/* Order Summary */}
      <div className="bill">
        <div className="bill-header">
          <h3>Order Summary</h3>
        </div>
        
        <table className="bill-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {cart.map(item => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.qty}</td>
                <td>₹{item.price * item.qty}</td>
              </tr>
            ))}
            <tr className="total-row">
              <td colSpan="2">Total</td>
              <td>₹{totalPrice}</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      {/* Payment Methods Section */}
      <div className="payment-methods">
        <h3>Select Payment Method</h3>
        
        <div className="payment-options">
          <div 
            className={`payment-option ${selectedPayment === 'gpay' ? 'selected' : ''}`}
            onClick={() => setSelectedPayment('gpay')}
          >
            <div className="payment-icon">G</div>
            <span>Google Pay (UPI)</span>
          </div>
          
          <div 
            className={`payment-option ${selectedPayment === 'phonepe' ? 'selected' : ''}`}
            onClick={() => setSelectedPayment('phonepe')}
          >
            <div className="payment-icon">P</div>
            <span>PhonePe (UPI)</span>
          </div>
          
          <div 
            className={`payment-option ${selectedPayment === 'paytm' ? 'selected' : ''}`}
            onClick={() => setSelectedPayment('paytm')}
          >
            <div className="payment-icon">P</div>
            <span>Paytm (UPI)</span>
          </div>
          
          <div 
            className={`payment-option ${selectedPayment === 'upi' ? 'selected' : ''}`}
            onClick={() => setSelectedPayment('upi')}
          >
            <div className="payment-icon">U</div>
            <span>Other UPI</span>
          </div>
          
          <div 
            className={`payment-option ${selectedPayment === 'credit' ? 'selected' : ''}`}
            onClick={() => setSelectedPayment('credit')}
          >
            <div className="payment-icon">C</div>
            <span>Credit Card</span>
          </div>
          
          <div 
            className={`payment-option ${selectedPayment === 'debit' ? 'selected' : ''}`}
            onClick={() => setSelectedPayment('debit')}
          >
            <div className="payment-icon">D</div>
            <span>Debit Card</span>
          </div>
        </div>
      </div>
      
      {/* Payment Form (conditional based on selected payment method) */}
      {selectedPayment && renderPaymentForm()}
      
      {/* Payment Actions */}
      <div className="payment-actions">
        <p className="payment-note">Proceed to continue, End to end secure payment.</p>
        <button 
          className="payment-button" 
          onClick={handlePayment}
          disabled={isProcessing}
        >
          {isProcessing ? 'Processing...' : 'Pay Now'}
        </button>
      </div>
    </div>
  );
};

export default Payment;
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';

const Cart = () => {
  const { isLoaded, isSignedIn } = useUser();
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  // Neon theme colors to match other pages
  const neonPink = '#ff00ff';
  const neonBlue = '#00f2ff';
  const neonPurple = '#bc13fe';

  useEffect(() => {
    if (!isLoaded) return;
    
    if (!isSignedIn) {
      localStorage.removeItem('cart');
      setCart([]);
    } else {
      const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
      setCart(storedCart);
    }
  }, [isLoaded, isSignedIn]);

  // Cart container style fixed to account for the left sidebar
  const cartContainerStyle = {
    marginLeft: '250px', // Fixed value instead of conditional to ensure it stays aligned
    width: 'calc(100% - 250px)', // Fixed calculation to match other pages
    padding: '40px 30px',
    fontFamily: '"Poppins", sans-serif',
    backgroundColor: '#050505',
    color: '#e0e0e0',
    minHeight: "100vh",
    transition: 'margin-left 0.3s ease, width 0.3s ease',
    boxSizing: 'border-box'
  };

  // Media query for mobile view
  useEffect(() => {
    const handleResize = () => {
      const container = document.getElementById('cart-container');
      if (container) {
        if (window.innerWidth <= 992) {
          container.style.marginLeft = '0';
          container.style.width = '100%';
        } else {
          container.style.marginLeft = '250px';
          container.style.width = 'calc(100% - 250px)';
        }
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial call
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const updateQuantity = (index, newQty) => {
    if (newQty < 1) return;
    
    const updatedCart = [...cart];
    updatedCart[index].qty = newQty;
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const removeFromCart = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  // Function to handle checkout - navigate to payment page directly like in old code
  const handleCheckout = () => {
    navigate('/payment');
  };

  if (!isLoaded) {
    return (
      <div id="cart-container" style={cartContainerStyle}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '70vh',
          width: '100%'
        }}>
          <div style={{
            width: '50px',
            height: '50px',
            border: `2px solid transparent`,
            borderRadius: '50%',
            borderTopColor: neonPink,
            borderLeftColor: neonBlue,
            animation: 'spin 1s linear infinite',
            marginBottom: '20px',
            boxShadow: `0 0 20px rgba(255, 0, 255, 0.5)`
          }}></div>
          <style>
            {`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}
          </style>
          <p style={{
            color: neonBlue,
            fontSize: '18px',
            textShadow: `0 0 10px ${neonBlue}`,
            letterSpacing: '3px'
          }}>
            Loading...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div id="cart-container" style={cartContainerStyle}>
      {/* Header */}
      <div style={{ 
        textAlign: 'center',
        position: 'relative',
        margin: '10px 0 40px'
      }}>
        <h1 style={{ 
          color: '#fff',
          textTransform: 'uppercase',
          letterSpacing: '3px',
          fontWeight: '400',
          fontSize: '28px',
          textShadow: `0 0 10px ${neonBlue}`,
          marginBottom: '10px'
        }}>
          Your Shopping Cart 🛒
        </h1>
        <span style={{
          display: 'block',
          width: '60px',
          height: '3px',
          backgroundColor: neonBlue,
          margin: '0 auto 15px',
          boxShadow: `0 0 10px ${neonBlue}`
        }}></span>
      </div>

      {cart.length === 0 ? (
        <div style={{ 
          textAlign: 'center', 
          marginTop: '50px',
          backgroundColor: 'rgba(0,0,0,0.4)',
          borderRadius: '8px',
          padding: '40px 20px',
          maxWidth: '600px',
          margin: '0 auto',
          border: `1px solid rgba(188, 19, 254, 0.2)`,
          boxShadow: `0 10px 30px rgba(0, 0, 0, 0.5)`
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            margin: '0 auto 20px',
            borderRadius: '50%',
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '40px',
            border: `1px solid ${neonPink}`,
            boxShadow: `0 0 15px ${neonPink}`,
            color: neonPink,
            textShadow: `0 0 10px ${neonPink}`
          }}>
            🛒
          </div>
          <p style={{ 
            fontSize: '24px', 
            marginBottom: '15px', 
            color: neonPink,
            textShadow: `0 0 8px ${neonPink}`
          }}>
            Your cart is empty!
          </p>
          <p style={{ 
            fontSize: '16px', 
            color: '#bbb', 
            marginBottom: '25px',
            maxWidth: '400px',
            margin: '0 auto 25px'
          }}>
            It looks like you haven't added any products yet.
          </p>
          <Link to="/products">
            <button
              style={{
                padding: '12px 30px',
                backgroundColor: 'transparent',
                color: neonPurple,
                border: `2px solid ${neonPurple}`,
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '15px',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                fontWeight: '500',
                transition: 'all 0.3s ease',
                boxShadow: `0 0 15px rgba(188, 19, 254, 0.3)`,
                textShadow: `0 0 5px ${neonPurple}`,
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = neonPurple;
                e.target.style.color = '#fff';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = neonPurple;
              }}
            >
              Browse Products
            </button>
          </Link>
        </div>
      ) : (
        <div style={{
          maxWidth: '900px',
          margin: '0 auto'
        }}>
          {/* Cart items */}
          <div style={{
            backgroundColor: 'rgba(0,0,0,0.3)',
            borderRadius: '8px',
            overflow: 'hidden',
            border: `1px solid rgba(188, 19, 254, 0.3)`,
            boxShadow: `0 10px 30px rgba(0,0,0,0.5)`,
            marginBottom: '30px'
          }}>
            {cart.map((item, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '20px',
                  borderBottom: index !== cart.length - 1 ? '1px solid rgba(255,255,255,0.1)' : 'none',
                  transition: 'background-color 0.3s ease',
                  backgroundColor: index % 2 === 0 ? 'rgba(0,0,0,0.2)' : 'transparent',
                  flexWrap: 'wrap'
                }}
              >
                {/* Product Image */}
                <div style={{ 
                  width: '80px', 
                  height: '80px',
                  marginRight: '20px',
                  borderRadius: '4px',
                  overflow: 'hidden',
                  flexShrink: 0,
                  border: `1px solid rgba(188, 19, 254, 0.3)`,
                }}>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </div>
                
                {/* Product Details */}
                <div style={{ 
                  flex: '1',
                  minWidth: '220px'
                }}>
                  <h3 style={{ 
                    fontSize: '16px',
                    marginBottom: '5px',
                    color: neonBlue,
                    textShadow: `0 0 5px rgba(0, 242, 255, 0.5)`,
                  }}>
                    {item.name}
                  </h3>
                  <p style={{ 
                    fontSize: '14px',
                    color: '#aaa',
                    marginBottom: '5px'
                  }}>
                    Category: {item.category}
                  </p>
                </div>
                
                {/* Quantity Controls */}
                <div style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  marginRight: '20px',
                  minWidth: '110px'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    border: `1px solid ${neonPurple}`,
                    borderRadius: '4px',
                    overflow: 'hidden',
                    backgroundColor: 'rgba(0,0,0,0.5)'
                  }}>
                    <button
                      onClick={() => updateQuantity(index, item.qty - 1)}
                      style={{
                        backgroundColor: 'transparent',
                        border: 'none',
                        color: neonPurple,
                        padding: '5px 8px',
                        fontSize: '14px',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      −
                    </button>
                    <span style={{
                      padding: '5px 10px',
                      fontSize: '14px',
                      color: '#fff',
                      minWidth: '20px',
                      textAlign: 'center'
                    }}>
                      {item.qty}
                    </span>
                    <button
                      onClick={() => updateQuantity(index, item.qty + 1)}
                      style={{
                        backgroundColor: 'transparent',
                        border: 'none',
                        color: neonPurple,
                        padding: '5px 8px',
                        fontSize: '14px',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
                
                {/* Price */}
                <div style={{ 
                  textAlign: 'right',
                  marginRight: '20px',
                  minWidth: '80px'
                }}>
                  <p style={{ 
                    fontSize: '16px',
                    color: neonPink,
                    fontWeight: 'bold',
                    textShadow: `0 0 5px rgba(255, 0, 255, 0.5)`
                  }}>
                    ₹{item.price * item.qty}
                  </p>
                  <p style={{ 
                    fontSize: '12px',
                    color: '#999'
                  }}>
                    ₹{item.price} each
                  </p>
                </div>
                
                {/* Remove Button */}
                <button
                  onClick={() => removeFromCart(index)}
                  style={{
                    backgroundColor: 'transparent',
                    border: `1px solid ${neonPink}`,
                    color: neonPink,
                    padding: '6px 10px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease',
                    boxShadow: `0 0 8px rgba(255, 0, 255, 0.2)`,
                  }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = neonPink;
                    e.target.style.color = '#000';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.color = neonPink;
                  }}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          
          {/* Summary */}
          <div style={{
            backgroundColor: 'rgba(0,0,0,0.4)',
            padding: '25px',
            borderRadius: '8px',
            marginBottom: '30px',
            border: `1px solid rgba(0, 242, 255, 0.3)`,
            boxShadow: `0 0 20px rgba(0, 242, 255, 0.1)`
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px',
              borderBottom: '1px solid rgba(255,255,255,0.1)',
              paddingBottom: '15px'
            }}>
              <h3 style={{ 
                color: neonBlue,
                fontSize: '18px',
                fontWeight: '500',
                textShadow: `0 0 5px rgba(0, 242, 255, 0.5)`
              }}>
                Order Summary
              </h3>
              <span style={{ 
                fontSize: '14px',
                color: '#aaa'
              }}>
                {cart.length} {cart.length === 1 ? 'item' : 'items'}
              </span>
            </div>
            
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '10px'
            }}>
              <span style={{ color: '#bbb' }}>Subtotal:</span>
              <span style={{ color: '#fff' }}>₹{totalPrice}</span>
            </div>
            
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '10px'
            }}>
              <span style={{ color: '#bbb' }}>Shipping:</span>
              <span style={{ color: '#fff' }}>{totalPrice >= 999 ? 'Free' : '₹100'}</span>
            </div>
            
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '20px',
              paddingTop: '15px',
              borderTop: '1px solid rgba(255,255,255,0.1)',
            }}>
              <span style={{ 
                color: '#fff',
                fontSize: '18px',
                fontWeight: '500'
              }}>
                Total:
              </span>
              <span style={{ 
                color: neonPink,
                fontSize: '22px',
                fontWeight: 'bold',
                textShadow: `0 0 8px rgba(255, 0, 255, 0.5)`
              }}>
                ₹{totalPrice + (totalPrice >= 999 ? 0 : 100)}
              </span>
            </div>
          </div>
          
          {/* Checkout Button - Now directs to /payment page like in old code */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '40px'
          }}>
            <button
              onClick={handleCheckout}
              style={{
                padding: '14px 40px',
                backgroundColor: 'transparent',
                color: neonPurple,
                border: `2px solid ${neonPurple}`,
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '16px',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                fontWeight: '500',
                boxShadow: `0 0 15px rgba(188, 19, 254, 0.3)`,
                textShadow: `0 0 5px ${neonPurple}`,
                transition: 'all 0.3s ease',
                width: window.innerWidth <= 768 ? '100%' : 'auto',
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = neonPurple;
                e.target.style.color = '#fff';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = neonPurple;
              }}
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
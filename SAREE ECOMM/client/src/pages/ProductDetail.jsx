import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState('');

  // Neon theme colors
  const neonPink = '#ff00ff';
  const neonBlue = '#00f2ff';
  const neonPurple = '#bc13fe';

  useEffect(() => {
    api.get(`/products/${id}`)
      .then(response => {
        setProduct(response.data);
        setMainImage(response.data.image);
      })
      .catch(error => console.error(error));
  }, [id]);

  const handleIncrease = () => {
    // Increase quantity only if less than available stock
    if (quantity < product.countInStock) {
      setQuantity(prev => prev + 1);
    }
  };

  const handleDecrease = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingIndex = cart.findIndex(item => item._id === product._id);
    if (existingIndex > -1) {
      // Check if adding the new quantity exceeds stock
      const newQty = cart[existingIndex].qty + quantity;
      if (newQty > product.countInStock) {
        alert('Cannot add more than available stock');
        return;
      }
      cart[existingIndex].qty = newQty;
    } else {
      cart.push({ ...product, qty: quantity });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Create a more attractive alert
    const alertDiv = document.createElement('div');
    alertDiv.style.position = 'fixed';
    alertDiv.style.top = '20px';
    alertDiv.style.left = '50%';
    alertDiv.style.transform = 'translateX(-50%)';
    alertDiv.style.backgroundColor = 'rgba(0,0,0,0.8)';
    alertDiv.style.color = neonBlue;
    alertDiv.style.padding = '15px 30px';
    alertDiv.style.borderRadius = '30px';
    alertDiv.style.border = `1px solid ${neonBlue}`;
    alertDiv.style.boxShadow = `0 0 15px ${neonBlue}`;
    alertDiv.style.zIndex = '1000';
    alertDiv.style.textAlign = 'center';
    alertDiv.style.fontFamily = '"Poppins", sans-serif';
    alertDiv.style.fontSize = '16px';
    alertDiv.textContent = '✓ Product added to cart';
    document.body.appendChild(alertDiv);
    
    setTimeout(() => {
      alertDiv.style.opacity = '0';
      alertDiv.style.transition = 'opacity 0.5s ease';
      setTimeout(() => document.body.removeChild(alertDiv), 500);
    }, 2000);
  };

  // Product detail container style to account for the left sidebar
  const detailContainerStyle = {
    marginLeft: window.innerWidth > 992 ? '250px' : '0',
    width: window.innerWidth > 992 ? 'calc(100% - 250px)' : '100%',
    backgroundColor: '#050505',
    color: '#e0e0e0',
    minHeight: "100vh",
    padding: '40px 20px',
    transition: 'margin-left 0.3s ease, width 0.3s ease',
    fontFamily: '"Poppins", sans-serif',
    display: 'flex',
    justifyContent: 'center',
    boxSizing: 'border-box'
  };

  // Media query for mobile view
  useEffect(() => {
    const handleResize = () => {
      const container = document.getElementById('product-detail-container');
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

  if (!product) {
    return (
      <div id="product-detail-container" style={detailContainerStyle}>
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
    <div id="product-detail-container" style={detailContainerStyle}>
      <div style={{
        backgroundColor: 'rgba(0,0,0,0.7)',
        borderRadius: '8px',
        border: `1px solid rgba(188, 19, 254, 0.3)`,
        boxShadow: `0 10px 30px rgba(0, 0, 0, 0.8)`,
        display: 'flex',
        flexDirection: window.innerWidth <= 992 ? 'column' : 'row',
        maxWidth: '1000px',
        width: '100%',
        overflow: 'hidden'
      }}>
        {/* Left Side - Image Section - IMPROVED */}
        <div style={{
          width: window.innerWidth <= 992 ? '100%' : '45%',
          height: window.innerWidth <= 992 ? '350px' : 'auto', // Fixed height on mobile
          position: 'relative',
          backgroundColor: 'rgba(0,0,0,0.5)'
        }}>
          {/* Main Image - IMPROVED */}
          <img
            src={mainImage}
            alt={product.name}
            style={{
              width: '100%',
              height: window.innerWidth <= 992 ? '350px' : '100%', // Full height on desktop
              objectFit: 'cover',
              display: 'block',
              transition: 'transform 0.5s ease'
            }}
            onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
          />
          
          {/* Category Badge */}
          <div style={{
            position: 'absolute',
            top: '15px',
            right: '15px',
            backgroundColor: 'rgba(0,0,0,0.7)',
            color: neonPink,
            padding: '5px 15px',
            borderRadius: '20px',
            fontSize: '12px',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            border: `1px solid ${neonPink}`,
            boxShadow: `0 0 10px ${neonPink}`,
            textShadow: `0 0 5px ${neonPink}`
          }}>
            {product.category}
          </div>
        </div>

        {/* Right Side - Details Section */}
        <div style={{
          width: window.innerWidth <= 992 ? '100%' : '55%',
          padding: '30px',
          color: '#e0e0e0',
          display: 'flex',
          flexDirection: 'column'
        }}>
          {/* Product Title */}
          <h1 style={{
            margin: '0 0 20px',
            color: neonBlue,
            fontSize: '28px',
            fontWeight: '500',
            letterSpacing: '1px',
            textShadow: `0 0 8px rgba(0, 242, 255, 0.5)`,
            position: 'relative',
            paddingBottom: '10px'
          }}>
            {product.name}
            <span style={{
              display: 'block',
              position: 'absolute',
              bottom: '0',
              left: '0',
              width: '80px',
              height: '3px',
              backgroundColor: neonBlue,
              borderRadius: '3px',
              boxShadow: `0 0 8px ${neonBlue}`
            }}></span>
          </h1>

          {/* Price Section */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '25px'
          }}>
            <span style={{
              fontSize: '24px',
              color: neonPink,
              fontWeight: 'bold',
              textShadow: `0 0 8px rgba(255, 0, 255, 0.5)`
            }}>
              ₹{product.price}
            </span>
            {product.countInStock <= 5 && product.countInStock > 0 && (
              <span style={{
                marginLeft: '15px',
                padding: '5px 10px',
                backgroundColor: 'rgba(255, 0, 0, 0.1)',
                color: '#ff6b6b',
                fontSize: '12px',
                borderRadius: '4px',
                border: '1px solid rgba(255, 0, 0, 0.3)'
              }}>
                Only {product.countInStock} left!
              </span>
            )}
          </div>

          {/* Description Section */}
          <div style={{
            marginBottom: '25px',
            backgroundColor: 'rgba(0,0,0,0.3)',
            padding: '15px',
            borderRadius: '8px',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <h3 style={{
              fontSize: '16px',
              color: '#ccc',
              marginBottom: '10px',
              fontWeight: '500',
              letterSpacing: '1px'
            }}>
              Description
            </h3>
            <p style={{
              lineHeight: '1.6',
              color: '#aaa',
              fontSize: '14px'
            }}>
              {product.description}
            </p>
          </div>

          {/* Available Quantity */}
          <div style={{
            marginBottom: '30px'
          }}>
            <span style={{
              fontSize: '14px',
              color: '#999',
              display: 'block',
              marginBottom: '5px'
            }}>
              Availability:
            </span>
            <div style={{
              height: '6px',
              width: '100%',
              backgroundColor: 'rgba(255,255,255,0.1)',
              borderRadius: '3px',
              overflow: 'hidden',
              position: 'relative'
            }}>
              <div style={{
                height: '100%',
                width: `${(product.countInStock / 20) * 100}%`, // Assuming max stock is 20
                backgroundColor: product.countInStock > 5 ? neonBlue : neonPink,
                borderRadius: '3px',
                boxShadow: `0 0 10px ${product.countInStock > 5 ? neonBlue : neonPink}`
              }}></div>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '12px',
              color: '#888',
              marginTop: '5px'
            }}>
              <span>{product.countInStock === 0 ? 'Out of stock' : `${product.countInStock} in stock`}</span>
              <span>{product.countInStock > 0 ? 'Available' : 'Currently unavailable'}</span>
            </div>
          </div>

          {/* Quantity Selector */}
          {product.countInStock > 0 && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '30px'
            }}>
              <span style={{
                fontSize: '14px',
                color: '#999',
                marginRight: '15px'
              }}>
                Quantity:
              </span>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                border: `1px solid ${neonPurple}`,
                borderRadius: '4px',
                overflow: 'hidden',
                backgroundColor: 'rgba(0,0,0,0.5)'
              }}>
                <button
                  onClick={handleDecrease}
                  style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    color: neonPurple,
                    padding: '8px 12px',
                    fontSize: '16px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    borderRight: `1px solid ${neonPurple}`
                  }}
                >
                  −
                </button>
                <span style={{
                  padding: '8px 15px',
                  fontSize: '16px',
                  color: '#fff',
                  minWidth: '30px',
                  textAlign: 'center'
                }}>
                  {quantity}
                </span>
                <button
                  onClick={handleIncrease}
                  style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    color: neonPurple,
                    padding: '8px 12px',
                    fontSize: '16px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    borderLeft: `1px solid ${neonPurple}`
                  }}
                >
                  +
                </button>
              </div>
            </div>
          )}

          {/* Add to Cart Button */}
          <div style={{
            marginTop: 'auto' // Pushes button to bottom when there's space
          }}>
            {product.countInStock === 0 ? (
              <button 
                disabled
                style={{
                  width: '100%',
                  padding: '12px 20px',
                  backgroundColor: 'rgba(50,50,50,0.5)',
                  color: '#777',
                  border: '1px solid #444',
                  borderRadius: '4px',
                  fontSize: '16px',
                  cursor: 'not-allowed',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}
              >
                Out of Stock
              </button>
            ) : (
              <button 
                onClick={addToCart}
                style={{
                  width: '100%',
                  padding: '14px 20px',
                  backgroundColor: 'transparent',
                  color: neonPurple,
                  border: `2px solid ${neonPurple}`,
                  borderRadius: '4px',
                  fontSize: '16px',
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  fontWeight: '500',
                  boxShadow: `0 0 15px rgba(188, 19, 254, 0.3)`,
                  textShadow: `0 0 5px ${neonPurple}`,
                  transition: 'all 0.3s ease'
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
                Add to Cart
              </button>
            )}
          </div>

          {/* Free Shipping Note */}
          <div style={{
            textAlign: 'center',
            marginTop: '20px',
            fontSize: '13px',
            color: '#999'
          }}>
            <span style={{
              display: 'inline-block',
              marginRight: '5px'
            }}>
              🚚
            </span>
            Free shipping on orders over ₹999
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
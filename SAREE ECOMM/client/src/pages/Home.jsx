import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles
import { Carousel } from 'react-responsive-carousel';
import { useUser } from '@clerk/clerk-react';

const Home = () => {
  // State variables
  const { user, isSignedIn } = useUser();
  const [storeProducts, setStoreProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Fetch store products from the backend
  const fetchStoreProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products');
      setStoreProducts(response.data);
      setFilteredProducts(response.data); // Initialize filtered products with all store products
    } catch (err) {
      console.error('Error fetching store products:', err);
    }
  };

  useEffect(() => {
    fetchStoreProducts();
  }, []);

  // Filter products based on search query and selected category
  useEffect(() => {
    let filtered = storeProducts;

    if (searchQuery.trim() !== '') {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product =>
        product.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    setFilteredProducts(filtered);
  }, [searchQuery, storeProducts, selectedCategory]);

  // Extract unique categories from store products
  const categories = Array.from(new Set(storeProducts.map(product => product.category)));

  // Neon theme colors
  const neonPink = '#ff00ff';
  const neonBlue = '#00f2ff';
  const neonPurple = '#bc13fe';

  // Home page container style
  const homeContainerStyle = {
    marginLeft: window.innerWidth > 992 ? '250px' : '0',
    padding: '0', // Removed padding for full-width carousel
    width: window.innerWidth > 992 ? 'calc(100% - 250px)' : '100%',
    fontFamily: '"Poppins", sans-serif',
    backgroundColor: '#050505',
    color: '#e0e0e0',
    minHeight: "100vh",
    transition: 'margin-left 0.3s ease, width 0.3s ease'
  };

  return (
    <div style={homeContainerStyle}>
      {/* Redesigned Hero Carousel */}
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        interval={3000}
        style={{ marginBottom: '40px' }}
      >
        {/* Carousel Item 1 */}
        <div style={{ position: 'relative', height: '500px' }}>
          <img 
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover', 
              borderRadius: '0',
              filter: 'brightness(0.6)'
            }} 
            src='/images/sareeb1.webp' 
            alt="Saree 1" 
          />
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            width: '80%',
          }}>
            <h2 style={{
              color: '#ffffff',
              fontSize: '36px',
              fontWeight: '600',
              marginBottom: '20px',
              textShadow: '0 0 15px rgba(0,0,0,0.8)',
              letterSpacing: '3px',
              textTransform: 'uppercase'
            }}>Shop A to Z Sarees 🛍️</h2>
            <div style={{
              display: 'inline-block',
              padding: '12px 30px',
              backgroundColor: 'rgba(0,0,0,0.6)',
              color: neonPink,
              border: `2px solid ${neonPink}`,
              boxShadow: `0 0 15px ${neonPink}`,
              textShadow: `0 0 5px ${neonPink}`,
              fontSize: '16px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              cursor: 'pointer'
            }}>
              Discover Collection
            </div>
          </div>
        </div>

        {/* Carousel Item 2 */}
        <div style={{ position: 'relative', height: '500px' }}>
          <img 
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: '0',
              filter: 'brightness(0.6)'
            }} 
            src='/images/sareeb4.jpg' 
            alt="Saree 2" 
          />
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            width: '80%',
          }}>
            <h2 style={{
              color: '#ffffff',
              fontSize: '36px',
              fontWeight: '600',
              marginBottom: '20px',
              textShadow: '0 0 15px rgba(0,0,0,0.8)',
              letterSpacing: '3px',
              textTransform: 'uppercase'
            }}>Welcome to Our Store 🎉</h2>
            <div style={{
              display: 'inline-block',
              padding: '12px 30px',
              backgroundColor: 'rgba(0,0,0,0.6)',
              color: neonBlue,
              border: `2px solid ${neonBlue}`,
              boxShadow: `0 0 15px ${neonBlue}`,
              textShadow: `0 0 5px ${neonBlue}`,
              fontSize: '16px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              cursor: 'pointer'
            }}>
              Shop Now
            </div>
          </div>
        </div>

        {/* Carousel Item 3 */}
        <div style={{ position: 'relative', height: '500px' }}>
          <img 
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: '0',
              filter: 'brightness(0.6)'
            }} 
            src='/images/sareeb3.jpg' 
            alt="Saree 3" 
          />
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            width: '80%',
          }}>
            <h2 style={{
              color: '#ffffff',
              fontSize: '36px',
              fontWeight: '600',
              marginBottom: '20px',
              textShadow: '0 0 15px rgba(0,0,0,0.8)',
              letterSpacing: '3px',
              textTransform: 'uppercase'
            }}>Special Discount Prices</h2>
            <div style={{
              display: 'inline-block',
              padding: '12px 30px',
              backgroundColor: 'rgba(0,0,0,0.6)',
              color: neonPurple,
              border: `2px solid ${neonPurple}`,
              boxShadow: `0 0 15px ${neonPurple}`,
              textShadow: `0 0 5px ${neonPurple}`,
              fontSize: '16px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              cursor: 'pointer'
            }}>
              View Offers
            </div>
          </div>
        </div>
      </Carousel>

      {/* Content Container with Padding */}
      <div style={{ padding: '0 40px 40px 40px' }}>
        {/* Welcome Section */}
        <div style={{ 
          textAlign: 'center', 
          margin: '40px auto',
          maxWidth: '800px'
        }}>
          {isSignedIn && user && (
            <h2 style={{ 
              marginBottom: '15px', 
              color: '#fff', 
              fontSize: '28px',
              letterSpacing: '2px', 
              fontWeight: '300',
              textTransform: 'uppercase'
            }}>
              Hi, {user.fullName || user.firstName || 'User'}!
            </h2>
          )}
          <p style={{
            fontSize: '16px',
            color: '#bbb',
            fontWeight: '300',
            letterSpacing: '1px',
            marginBottom: '30px',
            lineHeight: '1.6'
          }}>
            Welcome to our exclusive saree collection. Discover the perfect saree for any occasion.
          </p>
        </div>

        {/* Header */}
        <div style={{ 
          textAlign: 'center',
          position: 'relative',
          margin: '50px 0 40px'
        }}>
          <h1 style={{ 
            display: 'inline-block',
            position: 'relative',
            color: '#fff',
            textTransform: 'uppercase',
            letterSpacing: '5px',
            fontWeight: '400',
            fontSize: '32px',
            padding: '0 20px',
            textShadow: `0 0 10px ${neonBlue}`,
            marginBottom: '15px'
          }}>
            Our Products 🛍️
            <span style={{
              display: 'block',
              width: '80px',
              height: '3px',
              backgroundColor: neonBlue,
              margin: '15px auto 0',
              boxShadow: `0 0 10px ${neonBlue}`
            }}></span>
          </h1>
          <p style={{ 
            maxWidth: '600px',
            margin: '0 auto 40px',
            color: '#ccc',
            fontWeight: '300',
            letterSpacing: '1px',
            fontSize: '16px'
          }}>
            Browse through our extensive collection and find your favorites!
          </p>
        </div>

        {/* Search and Filter Container */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '20px',
          marginBottom: '40px' 
        }}>
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search for products 🔍..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              padding: '12px 20px',
              width: '300px',
              border: 'none',
              borderBottom: `2px solid ${neonBlue}`,
              borderRadius: '4px 4px 0 0',
              fontSize: '16px',
              backgroundColor: 'rgba(0,0,0,0.5)',
              color: '#fff',
              boxShadow: `0 0 10px ${neonBlue}`,
              outline: 'none'
            }}
          />

          {/* Category Filter */}
          <select
            id="category-filter"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{
              padding: '12px 20px',
              width: '300px',
              border: 'none',
              borderBottom: `2px solid ${neonPink}`,
              borderRadius: '4px 4px 0 0',
              fontSize: '16px',
              backgroundColor: 'rgba(0,0,0,0.5)',
              color: '#fff',
              boxShadow: `0 0 10px ${neonPink}`,
              outline: 'none'
            }}
          >
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Search Hint */}
        <p style={{
          textAlign: 'center',
          fontSize: '14px',
          color: '#999',
          fontWeight: '300',
          marginBottom: '30px',
        }}>
          Example: Search for a saree with colour or style...
        </p>

        {/* Product Listing */}
        {filteredProducts.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: '25px',
            justifyContent: 'center'
          }}>
            {filteredProducts.map(product => (
              <div
                key={product._id}
                style={{
                  border: `1px solid rgba(188, 19, 254, 0.3)`,
                  borderRadius: '8px',
                  backgroundColor: 'rgba(0,0,0,0.7)',
                  boxShadow: `0 5px 20px rgba(0,0,0,0.3)`,
                  overflow: 'hidden',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  transform: 'translateY(0)',
                  ':hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: `0 10px 25px rgba(188, 19, 254, 0.5)`,
                  }
                }}
              >
                <div style={{ position: 'relative', overflow: 'hidden' }}>
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{
                      width: '100%',
                      height: '200px',
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease',
                      ':hover': {
                        transform: 'scale(1.05)'
                      }
                    }}
                  />
                </div>

                <div style={{ padding: '20px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <h4 style={{ 
                    marginBottom: '10px', 
                    color: neonBlue, 
                    fontSize: '18px',
                    fontWeight: '500',
                    letterSpacing: '1px',
                    textShadow: `0 0 5px rgba(0, 242, 255, 0.5)`
                  }}>
                    {product.name}
                  </h4>
                  <p style={{ 
                    fontSize: '14px', 
                    color: '#ccc', 
                    marginBottom: '15px',
                    fontWeight: '300',
                    flexGrow: 1,
                    lineHeight: '1.5'
                  }}>
                    {product.description}
                  </p>
                  <p style={{ 
                    fontSize: '18px', 
                    color: neonPink, 
                    fontWeight: 'bold', 
                    marginBottom: '20px',
                    textShadow: `0 0 5px rgba(255, 0, 255, 0.5)`
                  }}>
                    ₹{product.price}
                  </p>
                  <Link
                    to={`/product/${product._id}`}
                    style={{
                      padding: '12px 0',
                      backgroundColor: 'rgba(0,0,0,0.6)',
                      color: '#fff',
                      textDecoration: 'none',
                      borderRadius: '4px',
                      border: `1px solid ${neonBlue}`,
                      cursor: 'pointer',
                      fontSize: '14px',
                      display: 'block',
                      textAlign: 'center',
                      transition: 'all 0.3s ease',
                      boxShadow: `0 0 10px rgba(0, 242, 255, 0.3)`,
                      textTransform: 'uppercase',
                      letterSpacing: '1px'
                    }}
                  >
                    Product Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ 
            textAlign: 'center', 
            padding: '50px 0',
            backgroundColor: 'rgba(0,0,0,0.4)',
            borderRadius: '8px',
            marginTop: '20px'
          }}>
            <p style={{ 
              fontSize: '22px', 
              color: neonPink,
              textShadow: `0 0 10px ${neonPink}`,
              letterSpacing: '2px',
              marginBottom: '15px'
            }}>
              No products found 😔
            </p>
            <p style={{
              fontSize: '16px',
              color: '#999'
            }}>
              Try a different search or category filter!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
import React, { useEffect, useState } from 'react';
import api from '../api';
import ProductCard from '../components/ProductCard';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Fetch all products on component mount
  useEffect(() => {
    api.get('/products')
      .then(response => {
        setProducts(response.data);
        setFilteredProducts(response.data);
      })
      .catch(error => console.error(error));
  }, []);

  // Filter products based on search query and selected category
  useEffect(() => {
    let filtered = products;

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
  }, [searchQuery, products, selectedCategory]);

  // Extract unique categories from products
  const categories = Array.from(new Set(products.map(product => product.category)));

  // Neon theme colors
  const neonPink = '#ff00ff';
  const neonBlue = '#00f2ff';
  const neonPurple = '#bc13fe';

  // Products page container style to account for the left sidebar
  const productsContainerStyle = {
    marginLeft: '250px',  // Fixed margin for sidebar
    width: 'calc(100% - 250px)',  // Fixed width accounting for sidebar
    padding: '30px 20px',
    fontFamily: '"Poppins", sans-serif',
    backgroundColor: '#050505',
    color: '#e0e0e0',
    minHeight: "100vh",
    boxSizing: 'border-box',  // Added to ensure padding doesn't add to width
  };

  // Media query for mobile view
  useEffect(() => {
    const handleResize = () => {
      const container = document.getElementById('products-container');
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

  return (
    <div id="products-container" style={productsContainerStyle}>
      {/* Header */}
      <div style={{ 
        textAlign: 'center',
        position: 'relative',
        margin: '10px 0 30px'
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
          Our Products 🛍️
        </h1>
        <span style={{
          display: 'block',
          width: '60px',
          height: '3px',
          backgroundColor: neonBlue,
          margin: '0 auto 15px',
          boxShadow: `0 0 10px ${neonBlue}`
        }}></span>
        <p style={{ 
          margin: '0 auto 20px',
          color: '#bbb',
          fontWeight: '300',
          letterSpacing: '1px',
          fontSize: '15px',
          maxWidth: '800px'
        }}>
          Browse through our extensive collection and find your favorites!
        </p>
      </div>

      {/* Search and Filter Container */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: '15px',
        marginBottom: '25px' 
      }}>
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search for products 🔍..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            padding: '10px 15px',
            width: '280px',
            border: 'none',
            borderBottom: `2px solid ${neonBlue}`,
            borderRadius: '4px 4px 0 0',
            fontSize: '15px',
            backgroundColor: 'rgba(0,0,0,0.5)',
            color: '#fff',
            boxShadow: `0 0 8px ${neonBlue}`,
            outline: 'none'
          }}
        />

        {/* Category Filter */}
        <select
          id="category-filter"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{
            padding: '10px 15px',
            width: '280px',
            border: 'none',
            borderBottom: `2px solid ${neonPink}`,
            borderRadius: '4px 4px 0 0',
            fontSize: '15px',
            backgroundColor: 'rgba(0,0,0,0.5)',
            color: '#fff',
            boxShadow: `0 0 8px ${neonPink}`,
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

      {/* Product Listing */}
      {filteredProducts.length > 0 ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '15px',
          padding: '0 5px',
          boxSizing: 'border-box',
          width: '100%'
        }}>
          {filteredProducts.map(product => (
            <div 
              key={product._id}
              style={{
                border: `1px solid rgba(188, 19, 254, 0.3)`,
                borderRadius: '8px',
                backgroundColor: 'rgba(0,0,0,0.7)',
                boxShadow: `0 5px 15px rgba(0,0,0,0.3)`,
                overflow: 'hidden',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
              }}
            >
              <div style={{ position: 'relative', overflow: 'hidden' }}>
                <img
                  src={product.image}
                  alt={product.name}
                  style={{
                    width: '100%',
                    height: '180px',
                    objectFit: 'cover'
                  }}
                />
              </div>

              <div style={{ padding: '15px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <h4 style={{ 
                  marginBottom: '10px', 
                  color: neonBlue, 
                  fontSize: '16px',
                  fontWeight: '500',
                  letterSpacing: '1px',
                  textShadow: `0 0 5px rgba(0, 242, 255, 0.5)`
                }}>
                  {product.name}
                </h4>
                <p style={{ 
                  fontSize: '13px', 
                  color: '#ccc', 
                  marginBottom: '10px',
                  fontWeight: '300',
                  flexGrow: 1,
                  lineHeight: '1.4',
                  display: '-webkit-box',
                  WebkitLineClamp: '2',
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {product.description}
                </p>
                <p style={{ 
                  fontSize: '16px', 
                  color: neonPink, 
                  fontWeight: 'bold', 
                  marginBottom: '15px',
                  textShadow: `0 0 5px rgba(255, 0, 255, 0.5)`
                }}>
                  ₹{product.price}
                </p>
                <a
                  href={`/product/${product._id}`}
                  style={{
                    padding: '8px 0',
                    backgroundColor: 'rgba(0,0,0,0.6)',
                    color: '#fff',
                    textDecoration: 'none',
                    borderRadius: '4px',
                    border: `1px solid ${neonBlue}`,
                    cursor: 'pointer',
                    fontSize: '13px',
                    display: 'block',
                    textAlign: 'center',
                    boxShadow: `0 0 8px rgba(0, 242, 255, 0.3)`,
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                  }}
                >
                  BUY NOW
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ 
          textAlign: 'center', 
          padding: '30px 20px',
          backgroundColor: 'rgba(0,0,0,0.4)',
          borderRadius: '8px',
          margin: '20px auto',
          maxWidth: '500px'
        }}>
          <p style={{ 
            fontSize: '18px', 
            color: neonPink,
            textShadow: `0 0 8px ${neonPink}`,
            letterSpacing: '1px',
            marginBottom: '10px'
          }}>
            No products found 😔
          </p>
          <p style={{
            fontSize: '14px',
            color: '#999'
          }}>
            Try a different search or category filter!
          </p>
        </div>
      )}
    </div>
  );
};

export default Products;
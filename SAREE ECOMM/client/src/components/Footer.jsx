import React from 'react';

const Footer = () => {
  // Neon theme colors matching Home page
  const neonPink = '#ff00ff';
  const neonBlue = '#00f2ff';
  const neonPurple = '#bc13fe';

  // Footer container style that matches the home container margin
  const footerContainerStyle = {
    marginLeft: window.innerWidth > 992 ? '250px' : '0',
    width: window.innerWidth > 992 ? 'calc(100% - 250px)' : '100%',
    backgroundColor: '#050505',
    color: '#fff',
    padding: '25px 20px',
    textAlign: 'center',
    position: 'relative',
    bottom: '0',
    borderTop: `1px solid ${neonPurple}`,
    boxShadow: `0 -5px 15px rgba(188, 19, 254, 0.2)`,
    fontFamily: '"Poppins", sans-serif',
    transition: 'margin-left 0.3s ease, width 0.3s ease'
  };

  return (
    <footer style={footerContainerStyle}>
      {/* Quote section */}
      <p style={{
        fontStyle: 'italic',
        color: '#ccc',
        maxWidth: '600px',
        margin: '0 auto 15px',
        fontSize: '14px',
        letterSpacing: '1px',
        lineHeight: '1.6',
        padding: '0 20px'
      }}>
        "Elegance is the only beauty that never fades."
        <span style={{ 
          display: 'block', 
          fontSize: '12px', 
          marginTop: '5px',
          color: neonBlue,
          textShadow: `0 0 5px ${neonBlue}`
        }}>
          — Audrey Hepburn
        </span>
      </p>
      
      {/* Second quote */}
      <p style={{
        fontStyle: 'italic',
        color: '#ccc',
        maxWidth: '600px',
        margin: '20px auto 15px',
        fontSize: '14px',
        letterSpacing: '1px',
        lineHeight: '1.6',
        padding: '0 20px'
      }}>
        "Fashion is about dressing according to what's fashionable. Style is more about being yourself."
        <span style={{ 
          display: 'block', 
          fontSize: '12px', 
          marginTop: '5px',
          color: neonPink,
          textShadow: `0 0 5px ${neonPink}`
        }}>
          — Oscar de la Renta
        </span>
      </p>
      
      {/* Copyright */}
      <p style={{
        margin: '25px 0 0',
        color: '#888',
        fontSize: '14px'
      }}>
        © {new Date().getFullYear()} 
        <span style={{ 
          color: neonPink, 
          textShadow: `0 0 5px ${neonPink}`,
          padding: '0 5px'
        }}>
          SareeECOMM
        </span> 
        All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
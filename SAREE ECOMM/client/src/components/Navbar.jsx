import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser, SignOutButton } from '@clerk/clerk-react';
import './Navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isSignedIn, user } = useUser();

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  // When a nav link is clicked, close the mobile menu.
  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      {/* Mobile toggle button */}
      <div className="mobile-toggle" onClick={toggleMenu}>
        <span className="mobile-toggle-bar"></span>
        <span className="mobile-toggle-bar"></span>
        <span className="mobile-toggle-bar"></span>
      </div>
      
      {/* Side navbar */}
      <aside className={`side-navbar ${menuOpen ? 'active' : ''}`}>
        <div className="side-navbar__container">
          <div className="side-navbar__header">
            <Link to="/" className="side-navbar__logo" onClick={closeMenu}>
              <img 
                src='/images/saree1.jpg' 
                alt="Logo" 
              />
            </Link>
            {/* Close button for mobile */}
            <div className="side-navbar__close" onClick={toggleMenu}>
              <span></span>
              <span></span>
            </div>
          </div>
          
          <div className="side-navbar__profile">
            {isSignedIn && user && (
              <div className="user-info">
                <p>Welcome,</p>
                <h4>{user.fullName || user.firstName || 'User'}</h4>
              </div>
            )}
          </div>
          
          <nav className="side-navbar__menu">
            <ul>
              <li>
                <Link to="/" onClick={closeMenu}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" onClick={closeMenu}>
                  Products
                </Link>
              </li>
              <li>
                <Link to="/cart" onClick={closeMenu}>
                  Cart
                </Link>
              </li>
              <li>
                <Link to="/admin" onClick={closeMenu}>
                  Admin
                </Link>
              </li>
              {isSignedIn && user ? (
                <>
                  <li>
                    <Link to="/profile" onClick={closeMenu}>
                      Profile
                    </Link>
                  </li>
                </>
              ) : (
                <li>
                  <Link to="/auth/signin" onClick={closeMenu}>
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </nav>
          
          <div className="side-navbar__footer">
            {isSignedIn && user && (
              <SignOutButton
                afterSignOutUrl="/auth"
                onSignOut={() => localStorage.removeItem('cart')}
              >
                <button className="side-navbar__signout" onClick={closeMenu}>
                  Sign Out
                </button>
              </SignOutButton>
            )}
          </div>
        </div>
      </aside>
      
      {/* Overlay for mobile */}
      <div 
        className={`side-navbar-overlay ${menuOpen ? 'active' : ''}`} 
        onClick={toggleMenu}
      ></div>
    </>
  );
};

export default Navbar;
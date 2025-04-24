import React from 'react';
import { UserProfile } from '@clerk/clerk-react';

// Custom CSS Injector to ensure styles override Clerk's defaults
const StyleInjector = () => {
  React.useEffect(() => {
    // Create a style element
    const styleEl = document.createElement('style');
    
    // Define the CSS to inject
    const css = `
      /* Fix for Clerk UI issues */
      .cl-component {
        width: 100% !important;
        max-width: 100% !important;
      }
      
      .cl-formButtonPrimary {
        background-color: transparent !important;
        border: 2px solid #bc13fe !important;
        color: #bc13fe !important;
        box-shadow: 0 0 15px rgba(188, 19, 254, 0.3) !important;
        padding: 10px 20px !important;
        transition: all 0.3s ease !important;
      }
      
      .cl-formButtonPrimary:hover {
        background-color: #bc13fe !important;
        color: #fff !important;
      }
      
      .cl-formFieldLabel {
        color: #e0e0e0 !important;
        font-size: 14px !important;
        display: block !important;
        margin-bottom: 8px !important;
      }
      
      .cl-formFieldInput {
        background-color: rgba(0, 0, 0, 0.5) !important;
        border: none !important;
        border-bottom: 2px solid #00f2ff !important;
        border-radius: 4px 4px 0 0 !important;
        color: #fff !important;
        padding: 12px !important;
        width: 100% !important;
        font-size: 14px !important;
      }
      
      .cl-headerTitle {
        color: #00f2ff !important;
        font-size: 18px !important;
        margin-bottom: 8px !important;
      }
      
      .cl-headerSubtitle {
        color: #e0e0e0 !important;
        font-size: 14px !important;
      }
      
      /* Fix visibility of text input and dropdown menus */
      .cl-formFieldInput:focus {
        outline: none !important;
        box-shadow: 0 0 10px rgba(0, 242, 255, 0.3) !important;
      }
      
      .cl-dropdown {
        background-color: rgba(20, 20, 20, 0.95) !important;
        border: 1px solid #00f2ff !important;
      }
      
      .cl-dropdownButtonItem {
        color: #e0e0e0 !important;
      }
      
      .cl-dropdownButtonItem:hover {
        background-color: rgba(0, 242, 255, 0.1) !important;
      }
      
      /* Make sure text is visible in all sections */
      .cl-userProfile-root * {
        color: #e0e0e0;
        font-family: 'Poppins', sans-serif;
      }
      
      .cl-profileSectionTitle {
        color: #00f2ff !important;
        font-size: 16px !important;
        margin-bottom: 10px !important;
        display: block !important;
      }
      
      .cl-profileSectionContent {
        color: #e0e0e0 !important;
      }
      
      .cl-accordionTriggerButton {
        color: #00f2ff !important;
      }
      
      /* Additional fixes for Clerk components */
      .cl-identityPreview {
        color: #e0e0e0 !important;
        background-color: rgba(0, 0, 0, 0.3) !important;
        border: 1px solid rgba(255, 255, 255, 0.1) !important;
        border-radius: 8px !important;
        padding: 10px !important;
      }
      
      .cl-identityPreviewText, 
      .cl-identityPreviewDetails {
        color: #e0e0e0 !important;
      }
      
      .cl-formFieldSuccessText {
        color: #81ff81 !important;
      }
      
      .cl-formFieldErrorText {
        color: #ff8181 !important;
      }
      
      .cl-navbar {
        width: 100% !important;
      }
      
      .cl-navbarButton {
        width: auto !important;
        padding: 5px 15px !important;
      }
      
      /* Fix width issues */
      .cl-userProfile-root {
        width: 100% !important;
        max-width: 100% !important;
      }
      
      .cl-card {
        width: 100% !important;
        max-width: 100% !important;
      }
      
      .cl-main {
        width: 100% !important;
        max-width: 100% !important;
      }
      
      .cl-pageScrollBox {
        width: 100% !important;
        max-width: 100% !important;
      }
      
      .cl-form {
        width: 100% !important;
        max-width: 100% !important;
      }
      
      .cl-formField {
        width: 100% !important;
      }
      
      .cl-formFieldRow {
        width: 100% !important;
        display: flex !important;
        flex-direction: column !important;
      }
      
      /* Force grid layouts to be full width */
      .cl-formButtonPrimary {
        width: auto !important;
        min-width: 120px !important;
      }
      
      /* Ensure the profile card doesn't shrink */
      .cl-card, .cl-cardBox, .cl-mainContent {
        min-width: 100% !important;
      }
      
      /* Fix any internal Clerk constraints */
      .cl-modalContent, .cl-modalContentInner {
        width: 100% !important;
        max-width: 100% !important;
      }
    `;
    
    // Set the CSS content
    styleEl.innerHTML = css;
    
    // Append to the head
    document.head.appendChild(styleEl);
    
    // Clean up when component unmounts
    return () => {
      document.head.removeChild(styleEl);
    };
  }, []);
  
  return null;
};

// Inline styles to match the neon theme
const styles = {
  profileContainer: {
    marginLeft: '250px',
    width: 'calc(100% - 250px)',
    minHeight: '100vh',
    backgroundColor: '#050505',
    padding: '40px 30px',
    color: '#e0e0e0',
    fontFamily: "'Poppins', sans-serif",
    boxSizing: 'border-box',
    transition: 'margin-left 0.3s ease, width 0.3s ease',
    position: 'relative',
  },
  profileHeader: {
    textAlign: 'center',
    position: 'relative',
    margin: '10px 0 40px'
  },
  profileTitle: {
    color: '#fff',
    textTransform: 'uppercase',
    letterSpacing: '3px',
    fontWeight: '400',
    fontSize: '28px',
    textShadow: '0 0 10px #00f2ff',
    marginBottom: '10px'
  },
  headerUnderline: {
    display: 'block',
    width: '60px',
    height: '3px',
    backgroundColor: '#00f2ff',
    margin: '0 auto 15px',
    boxShadow: '0 0 10px #00f2ff'
  },
  headerSubtitle: {
    color: '#aaa',
    fontSize: '16px',
    fontWeight: '300',
    marginTop: '10px'
  },
  profileCard: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: '15px',
    padding: '30px',
    position: 'relative',
    overflow: 'visible', // Changed from 'hidden' to allow content to define size
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
    border: '1px solid rgba(0, 242, 255, 0.2)',
    margin: '0 auto',
    width: '100%', // Set to 100% to take full available width
    maxWidth: '1200px' // Increased from 900px to allow more space
  },
  cardGlow: {
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    height: '3px',
    background: 'linear-gradient(90deg, #bc13fe, #00f2ff)',
    boxShadow: '0 0 20px rgba(0, 242, 255, 0.8)',
    zIndex: '1'
  },
  clerkWrapper: {
    width: '100%',
    minWidth: '100%',
    display: 'flex',
    justifyContent: 'center'
  }
};

const Profile = () => {
  // Use window.innerWidth as state to handle resize
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
  
  // Add resize event listener
  React.useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={{
      ...styles.profileContainer,
      ...(windowWidth <= 992 ? {
        marginLeft: 0,
        width: '100%',
        padding: '20px'
      } : {})
    }}>
      {/* Inject custom styles to override Clerk defaults */}
      <StyleInjector />
      
      <div style={styles.profileHeader}>
        <h1 style={styles.profileTitle}>Your Profile</h1>
        <span style={styles.headerUnderline}></span>
        <p style={styles.headerSubtitle}>Manage your account details and preferences</p>
      </div>

      <div style={styles.profileCard}>
        <div style={styles.cardGlow}></div>
        
        <div style={styles.clerkWrapper}>
          {/* Clerk UserProfile with custom appearance */}
          <UserProfile 
            appearance={{
              baseTheme: 'dark',
              elements: {
                rootBox: {
                  boxShadow: 'none',
                  backgroundColor: 'transparent',
                  width: '100%',
                  maxWidth: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'stretch'
                },
                card: {
                  backgroundColor: 'transparent',
                  boxShadow: 'none',
                  border: 'none',
                  width: '100%',
                  maxWidth: '100%'
                },
                main: {
                  width: '100%',
                  maxWidth: '100%'
                },
                navbar: {
                  backgroundColor: 'rgba(0, 0, 0, 0.4)',
                  borderRadius: '8px',
                  padding: '15px',
                  marginBottom: '20px',
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  flexWrap: 'wrap'
                },
                navbarButton: {
                  color: '#ffffff',
                  fontWeight: '500',
                  margin: '5px 10px'
                },
                navbarButtonActive: {
                  color: '#00f2ff',
                  fontWeight: '600'
                },
                pageScrollBox: {
                  padding: '0',
                  width: '100%',
                  maxWidth: '100%'
                },
                formFieldLabel: {
                  color: '#e0e0e0',
                  fontSize: '14px'
                },
                formButtonPrimary: {
                  backgroundColor: 'transparent',
                  border: '2px solid #bc13fe',
                  color: '#bc13fe',
                  boxShadow: '0 0 15px rgba(188, 19, 254, 0.3)',
                  padding: '10px 20px',
                  borderRadius: '4px'
                },
                headerTitle: {
                  color: '#00f2ff',
                  fontSize: '18px'
                },
                headerSubtitle: {
                  color: '#e0e0e0',
                  fontSize: '14px'
                },
                formFieldInput: {
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  border: 'none',
                  borderBottom: '2px solid #00f2ff',
                  borderRadius: '4px 4px 0 0',
                  color: '#fff',
                  padding: '12px',
                  fontSize: '14px',
                  width: '100%'
                },
                formFieldAction: {
                  color: '#00f2ff'
                },
                identityPreviewEditButton: {
                  color: '#00f2ff'
                },
                formFieldSuccessText: {
                  color: '#81ff81'
                },
                formFieldErrorText: {
                  color: '#ff8181'
                },
                avatarImageActionsUpload: {
                  color: '#00f2ff'
                },
                accordionTriggerButton: {
                  color: '#00f2ff'
                },
                profileSectionTitle: {
                  color: '#00f2ff',
                  fontSize: '16px'
                },
                profileSectionTitleText: {
                  color: '#00f2ff',
                  fontSize: '16px',
                  display: 'block',
                  marginBottom: '10px'
                },
                formResendCodeLink: {
                  color: '#00f2ff'
                },
                profileSectionContent: {
                  color: '#e0e0e0',
                  width: '100%'
                },
                formFieldInputGroup: {
                  width: '100%'
                },
                otpCodeFieldInput: {
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  border: '1px solid #00f2ff',
                  color: '#fff'
                },
                form: {
                  width: '100%'
                },
                formField: {
                  width: '100%'
                },
                formFieldRow: {
                  width: '100%'
                }
              },
              variables: {
                colorBackground: 'transparent',
                colorText: '#e0e0e0',
                colorPrimary: '#00f2ff',
                colorTextOnPrimaryBackground: '#000000',
                colorDanger: '#ff8181',
                colorSuccess: '#81ff81',
                borderRadius: '4px'
              },
              layout: {
                socialButtonsVariant: 'iconButton',
                socialButtonsPlacement: 'bottom',
                showOptionalFields: true,
                rootBox: {
                  width: '100%',
                  maxWidth: '100%'
                }
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
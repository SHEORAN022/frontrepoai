// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// const Navbar = () => {
//   const { isAuthenticated, logout, user } = useAuth();
//   const navigate = useNavigate();
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   const handleLogout = () => {
//     logout();
//     navigate('/login');
//   };

//   if (!isAuthenticated) return null;

//   return (
//     <>
//       <nav style={styles.navbar}>
//         <div style={styles.container}>
//           <div style={styles.navContent}>
//             {/* Logo */}
//             <Link to="/dashboard" style={styles.logo}>
              
//               <span style={styles.logoText}>Zentrue</span>
//             </Link>
            
//             {/* Desktop Menu */}
//             <div style={styles.desktopMenu}>
//               <Link to="/dashboard" style={styles.navLink}>
                
//                 Dashboard
//               </Link>
             
              
//               <div style={styles.userSection}>
//                 <div style={styles.userAvatar}>
//                   <span style={styles.avatarText}>
//                     {user?.name?.charAt(0) || 'U'}
//                   </span>
//                 </div>
//                 <div style={styles.userInfo}>
                  
//                   <span style={styles.userName}>{user?.name?.split(' ')[0] || 'User'}</span>
//                 </div>
//                 <button onClick={handleLogout} style={styles.logoutBtn}>
//                   <span style={styles.logoutIcon}>🚪</span>
//                   Logout
//                 </button>
//               </div>
//             </div>

//             {/* Mobile Menu Button */}
//             <button 
//               onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//               style={styles.mobileMenuBtn}
//             >
//               <span style={styles.menuIcon}>{isMobileMenuOpen ? '✕' : '☰'}</span>
//             </button>
//           </div>
//         </div>
//       </nav>

//       {/* Mobile Menu */}
//       {isMobileMenuOpen && (
//         <div style={styles.mobileMenu}>
//           <div style={styles.mobileMenuContent}>
//             <Link to="/dashboard" style={styles.mobileNavLink} onClick={() => setIsMobileMenuOpen(false)}>
//               <span style={styles.mobileNavIcon}>📊</span>
//               Dashboard
//             </Link>
//             <Link to="/generate" style={styles.mobileNavLink} onClick={() => setIsMobileMenuOpen(false)}>
//               <span style={styles.mobileNavIcon}>🎨</span>
//               Generate
//             </Link>
//             <Link to="/products" style={styles.mobileNavLink} onClick={() => setIsMobileMenuOpen(false)}>
//               <span style={styles.mobileNavIcon}>🛍️</span>
//               Products
//             </Link>
//             <div style={styles.mobileUserSection}>
//               <div style={styles.mobileUserAvatar}>
//                 <span style={styles.mobileAvatarText}>
//                   {user?.name?.charAt(0) || 'U'}
//                 </span>
//               </div>
//               <div>
//                 <div style={styles.mobileUserName}>{user?.name || 'User'}</div>
//                 <div style={styles.mobileUserEmail}>{user?.email || 'user@example.com'}</div>
//               </div>
//             </div>
//             <button onClick={handleLogout} style={styles.mobileLogoutBtn}>
//               <span style={styles.mobileLogoutIcon}>🚪</span>
//               Logout
//             </button>
//           </div>
//         </div>
//       )}

//       <style>{`
//         @keyframes slideDown {
//           from {
//             opacity: 0;
//             transform: translateY(-20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         @keyframes fadeIn {
//           from {
//             opacity: 0;
//           }
//           to {
//             opacity: 1;
//           }
//         }

//         @keyframes pulse {
//           0%, 100% {
//             transform: scale(1);
//           }
//           50% {
//             transform: scale(1.05);
//           }
//         }
//       `}</style>
//     </>
//   );
// };

// const styles = {
//   navbar: {
//     position: 'sticky',
//     top: 0,
//     zIndex: 1000,
//     background: 'rgba(255, 255, 255, 0.95)',
//     backdropFilter: 'blur(10px)',
//     borderBottom: '1px solid rgba(0,0,0,0.05)',
//     boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
//   },
  
//   container: {
//     maxWidth: '1200px',
//     margin: '0 auto',
//     padding: '0 20px',
//   },
  
//   navContent: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: '16px 0',
//   },
  
//   logo: {
//     display: 'flex',
//     alignItems: 'center',
//     gap: '10px',
//     textDecoration: 'none',
//     transition: 'all 0.3s ease',
//   },
  
//   logoIcon: {
//     fontSize: '28px',
//     display: 'inline-block',
//     animation: 'pulse 2s ease-in-out infinite',
//   },
  
//   logoText: {
//     fontSize: '22px',
//     fontWeight: '800',
//     background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//     WebkitBackgroundClip: 'text',
//     backgroundClip: 'text',
//     color: 'transparent',
//     letterSpacing: '-0.5px',
//   },
  
//   desktopMenu: {
//     display: 'flex',
//     alignItems: 'center',
//     gap: '30px',
//   },
  
//   navLink: {
//     display: 'flex',
//     alignItems: 'center',
//     gap: '8px',
//     color: '#4b5563',
//     textDecoration: 'none',
//     fontSize: '15px',
//     fontWeight: '500',
//     padding: '8px 12px',
//     borderRadius: '10px',
//     transition: 'all 0.3s ease',
//     position: 'relative',
//   },
  
//   navIcon: {
//     fontSize: '18px',
//   },
  
//   userSection: {
//     display: 'flex',
//     alignItems: 'center',
//     gap: '15px',
//     marginLeft: '20px',
//     paddingLeft: '20px',
//     borderLeft: '1px solid #e5e7eb',
//   },
  
//   userAvatar: {
//     width: '38px',
//     height: '38px',
//     borderRadius: '50%',
//     background: 'linear-gradient(135deg, #667eea, #764ba2)',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     boxShadow: '0 2px 10px rgba(102, 126, 234, 0.3)',
//   },
  
//   avatarText: {
//     color: 'white',
//     fontSize: '16px',
//     fontWeight: '600',
//   },
  
//   userInfo: {
//     display: 'flex',
//     flexDirection: 'column',
//   },
  
//   userGreeting: {
//     fontSize: '11px',
//     color: '#9ca3af',
//     lineHeight: '1.2',
//   },
  
//   userName: {
//     fontSize: '14px',
//     fontWeight: '600',
//     color: '#1f2937',
//   },
  
//   logoutBtn: {
//     display: 'flex',
//     alignItems: 'center',
//     gap: '6px',
//     background: 'none',
//     border: 'none',
//     color: '#ef4444',
//     fontSize: '14px',
//     fontWeight: '500',
//     cursor: 'pointer',
//     padding: '8px 12px',
//     borderRadius: '10px',
//     transition: 'all 0.3s ease',
//   },
  
//   logoutIcon: {
//     fontSize: '16px',
//   },
  
//   mobileMenuBtn: {
//     display: 'none',
//     background: 'none',
//     border: 'none',
//     cursor: 'pointer',
//     padding: '8px',
//     borderRadius: '8px',
//     transition: 'all 0.3s ease',
//   },
  
//   menuIcon: {
//     fontSize: '24px',
//     color: '#4b5563',
//   },
  
//   mobileMenu: {
//     position: 'fixed',
//     top: '70px',
//     left: 0,
//     right: 0,
//     background: 'white',
//     borderBottom: '1px solid #e5e7eb',
//     boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)',
//     animation: 'slideDown 0.3s ease-out',
//     zIndex: 999,
//   },
  
//   mobileMenuContent: {
//     padding: '20px',
//     display: 'flex',
//     flexDirection: 'column',
//     gap: '12px',
//   },
  
//   mobileNavLink: {
//     display: 'flex',
//     alignItems: 'center',
//     gap: '12px',
//     padding: '12px 16px',
//     color: '#4b5563',
//     textDecoration: 'none',
//     fontSize: '16px',
//     fontWeight: '500',
//     borderRadius: '12px',
//     transition: 'all 0.3s ease',
//   },
  
//   mobileNavIcon: {
//     fontSize: '20px',
//   },
  
//   mobileUserSection: {
//     display: 'flex',
//     alignItems: 'center',
//     gap: '12px',
//     padding: '16px',
//     background: '#f9fafb',
//     borderRadius: '12px',
//     marginTop: '8px',
//   },
  
//   mobileUserAvatar: {
//     width: '48px',
//     height: '48px',
//     borderRadius: '50%',
//     background: 'linear-gradient(135deg, #667eea, #764ba2)',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
  
//   mobileAvatarText: {
//     color: 'white',
//     fontSize: '20px',
//     fontWeight: '600',
//   },
  
//   mobileUserName: {
//     fontSize: '16px',
//     fontWeight: '600',
//     color: '#1f2937',
//   },
  
//   mobileUserEmail: {
//     fontSize: '12px',
//     color: '#6b7280',
//   },
  
//   mobileLogoutBtn: {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     gap: '8px',
//     width: '100%',
//     padding: '12px',
//     background: '#fee2e2',
//     border: 'none',
//     borderRadius: '12px',
//     color: '#dc2626',
//     fontSize: '16px',
//     fontWeight: '600',
//     cursor: 'pointer',
//     transition: 'all 0.3s ease',
//     marginTop: '8px',
//   },
  
//   mobileLogoutIcon: {
//     fontSize: '18px',
//   },
// };

// // Add hover styles via CSS injection
// const styleSheet = document.createElement("style");
// styleSheet.textContent = `
//   .nav-link:hover {
//     background: #f3f4f6 !important;
//     color: #667eea !important;
//     transform: translateY(-2px) !important;
//   }
  
//   .logo:hover {
//     transform: scale(1.05) !important;
//   }
  
//   .logout-btn:hover {
//     background: #fee2e2 !important;
//     transform: translateX(5px) !important;
//   }
  
//   .mobile-nav-link:hover {
//     background: #f3f4f6 !important;
//     color: #667eea !important;
//     transform: translateX(5px) !important;
//   }
  
//   .mobile-logout-btn:hover {
//     background: #fecaca !important;
//     transform: scale(1.02) !important;
//   }
  
//   .mobile-menu-btn:hover {
//     background: #f3f4f6 !important;
//   }
  
//   @media (max-width: 768px) {
//     .desktop-menu {
//       display: none !important;
//     }
    
//     .mobile-menu-btn {
//       display: block !important;
//     }
//   }
  
//   @media (min-width: 769px) {
//     .mobile-menu {
//       display: none !important;
//     }
//   }
// `;
// document.head.appendChild(styleSheet);

// export default Navbar;
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on window resize if screen becomes desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsMobileMenuOpen(false);
  };

  if (!isAuthenticated) return null;

  return (
    <>
      <nav style={{
        ...styles.navbar,
        ...(isScrolled && styles.navbarScrolled)
      }}>
        <div style={styles.container}>
          <div style={styles.navContent}>
            {/* Logo */}
            <Link to="/dashboard" style={styles.logo}>
              <span style={styles.logoText}>Zentrue</span>
            </Link>
            
            {/* Desktop Menu */}
            <div style={styles.desktopMenu}>
              <Link to="/dashboard" style={styles.navLink}>
                Dashboard
              </Link>
              
              <div style={styles.userSection}>
                <div style={styles.userAvatar}>
                  <span style={styles.avatarText}>
                    {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                  </span>
                </div>
                <span style={styles.userName}>{user?.name?.split(' ')[0] || 'User'}</span>
                <button onClick={handleLogout} style={styles.logoutBtn}>
                  Logout
                </button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              style={styles.mobileMenuBtn}
              aria-label="Toggle menu"
            >
              <div style={{
                ...styles.hamburger,
                transform: isMobileMenuOpen ? 'rotate(90deg)' : 'none'
              }}>
                <span style={{
                  ...styles.hamburgerLine,
                  transform: isMobileMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none',
                  opacity: isMobileMenuOpen ? 0 : 1
                }} />
                <span style={{
                  ...styles.hamburgerLine,
                  transform: isMobileMenuOpen ? 'rotate(-45deg) translate(7px, -6px)' : 'none'
                }} />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        onClick={() => setIsMobileMenuOpen(false)}
        style={{
          ...styles.overlay,
          visibility: isMobileMenuOpen ? 'visible' : 'hidden',
          opacity: isMobileMenuOpen ? 1 : 0
        }}
      />

      {/* Mobile Menu */}
      <div style={{
        ...styles.mobileMenu,
        transform: isMobileMenuOpen ? 'translateX(0)' : 'translateX(100%)'
      }}>
        <div style={styles.mobileMenuContent}>
          {/* User Profile Section */}
          <div style={styles.mobileUserSection}>
            <div style={styles.mobileUserAvatar}>
              <span style={styles.mobileAvatarText}>
                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </span>
            </div>
            <div style={styles.mobileUserInfo}>
              <div style={styles.mobileUserName}>{user?.name || 'User'}</div>
              <div style={styles.mobileUserEmail}>{user?.email || 'user@example.com'}</div>
            </div>
          </div>

          {/* Navigation Links */}
          <div style={styles.mobileNavLinks}>
            <Link 
              to="/dashboard" 
              style={styles.mobileNavLink} 
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span style={styles.mobileNavIcon}>📊</span>
              Dashboard
            </Link>
            
            <Link 
              to="/generate" 
              style={styles.mobileNavLink} 
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span style={styles.mobileNavIcon}>🎨</span>
              Generate
            </Link>
            
            <Link 
              to="/products" 
              style={styles.mobileNavLink} 
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span style={styles.mobileNavIcon}>🛍️</span>
              Products
            </Link>
          </div>

          {/* Logout Button */}
          <button onClick={handleLogout} style={styles.mobileLogoutBtn}>
            Logout
          </button>
        </div>
      </div>

      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideIn {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        @media (max-width: 768px) {
          .desktop-menu {
            display: none !important;
          }
          
          .mobile-menu-btn {
            display: flex !important;
          }
        }

        @media (min-width: 769px) {
          .mobile-menu, .mobile-overlay {
            display: none !important;
          }
        }

        /* Touch-friendly hover states for mobile */
        @media (max-width: 768px) {
          .mobile-nav-link:active {
            transform: scale(0.98);
            background: #f3f4f6;
          }
          
          .mobile-logout-btn:active {
            transform: scale(0.98);
          }
        }
      `}</style>
    </>
  );
};

const styles = {
  navbar: {
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    background: 'white',
    borderBottom: '1px solid rgba(0,0,0,0.05)',
    transition: 'all 0.3s ease',
  },
  
  navbarScrolled: {
    background: 'rgba(255, 255, 255, 0.98)',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
  },
  
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 16px',
  },
  
  navContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 0',
    minHeight: '60px',
  },
  
  logo: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    zIndex: 1001,
  },
  
  logoText: {
    fontSize: '20px',
    fontWeight: '800',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent',
    letterSpacing: '-0.5px',
  },
  
  desktopMenu: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
  },
  
  navLink: {
    color: '#4b5563',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '500',
    padding: '8px 12px',
    borderRadius: '8px',
    transition: 'all 0.3s ease',
  },
  
  userSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    paddingLeft: '20px',
    borderLeft: '1px solid #e5e7eb',
  },
  
  userAvatar: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  avatarText: {
    color: 'white',
    fontSize: '14px',
    fontWeight: '600',
  },
  
  userName: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#1f2937',
  },
  
  logoutBtn: {
    background: 'none',
    border: 'none',
    color: '#ef4444',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    padding: '6px 12px',
    borderRadius: '8px',
    transition: 'all 0.3s ease',
  },
  
  mobileMenuBtn: {
    display: 'none',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '8px',
    borderRadius: '8px',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1001,
    width: '40px',
    height: '40px',
  },
  
  hamburger: {
    width: '24px',
    height: '24px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '5px',
    transition: 'transform 0.3s ease',
  },
  
  hamburgerLine: {
    width: '100%',
    height: '2px',
    background: '#4b5563',
    transition: 'all 0.3s ease',
    borderRadius: '2px',
  },
  
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.5)',
    backdropFilter: 'blur(4px)',
    zIndex: 998,
    transition: 'all 0.3s ease',
  },
  
  mobileMenu: {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    maxWidth: '400px',
    background: 'white',
    boxShadow: '-5px 0 25px rgba(0,0,0,0.1)',
    zIndex: 999,
    transition: 'transform 0.3s ease',
    overflowY: 'auto',
  },
  
  mobileMenuContent: {
    padding: '80px 20px 20px 20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    minHeight: '100vh',
  },
  
  mobileUserSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '16px',
    background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
    borderRadius: '16px',
    marginBottom: '8px',
  },
  
  mobileUserAvatar: {
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  
  mobileAvatarText: {
    color: 'white',
    fontSize: '24px',
    fontWeight: '600',
  },
  
  mobileUserInfo: {
    flex: 1,
  },
  
  mobileUserName: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: '4px',
  },
  
  mobileUserEmail: {
    fontSize: '13px',
    color: '#6b7280',
    wordBreak: 'break-all',
  },
  
  mobileNavLinks: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  
  mobileNavLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '14px 16px',
    color: '#4b5563',
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: '500',
    borderRadius: '12px',
    transition: 'all 0.2s ease',
    active: {
      transform: 'scale(0.98)',
    },
  },
  
  mobileNavIcon: {
    fontSize: '20px',
    width: '24px',
  },
  
  mobileLogoutBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    width: '100%',
    padding: '14px',
    background: '#fee2e2',
    border: 'none',
    borderRadius: '12px',
    color: '#dc2626',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    marginTop: 'auto',
  },
};

// Add hover effects
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  .nav-link:hover {
    background: #f3f4f6;
    color: #667eea;
    transform: translateY(-1px);
  }
  
  .logo:hover {
    transform: scale(1.02);
  }
  
  .logout-btn:hover {
    background: #fee2e2;
    transform: translateX(3px);
  }
  
  @media (hover: hover) {
    .mobile-nav-link:hover {
      background: #f3f4f6;
      color: #667eea;
      transform: translateX(5px);
    }
    
    .mobile-logout-btn:hover {
      background: #fecaca;
      transform: scale(1.02);
    }
    
    .mobile-menu-btn:hover {
      background: #f3f4f6;
    }
  }
`;
document.head.appendChild(styleSheet);

export default Navbar;
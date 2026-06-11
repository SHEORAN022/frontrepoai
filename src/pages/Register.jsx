// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// const Register = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [agreeTerms, setAgreeTerms] = useState(false);
//   const [passwordStrength, setPasswordStrength] = useState(0);
//   const { register } = useAuth();
//   const navigate = useNavigate();

//   const calculatePasswordStrength = (pass) => {
//     let strength = 0;
//     if (pass.length >= 6) strength++;
//     if (pass.length >= 10) strength++;
//     if (/[A-Z]/.test(pass)) strength++;
//     if (/[0-9]/.test(pass)) strength++;
//     if (/[^A-Za-z0-9]/.test(pass)) strength++;
//     setPasswordStrength(strength);
//   };

//   const handlePasswordChange = (e) => {
//     setPassword(e.target.value);
//     calculatePasswordStrength(e.target.value);
//   };

//   const getStrengthColor = () => {
//     if (passwordStrength <= 1) return '#ef4444';
//     if (passwordStrength <= 3) return '#f59e0b';
//     return '#10b981';
//   };

//   const getStrengthText = () => {
//     if (passwordStrength <= 1) return 'Weak';
//     if (passwordStrength <= 3) return 'Medium';
//     return 'Strong';
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!agreeTerms) {
//       alert('Please agree to the Terms and Conditions');
//       return;
//     }
//     setLoading(true);
//     const success = await register(name, email, password);
//     setLoading(false);
//     if (success) navigate('/dashboard');
//   };

//   return (
//     <div style={styles.container}>
//       {/* Animated Background */}
//       <div style={styles.bgCircle1}></div>
//       <div style={styles.bgCircle2}></div>
//       <div style={styles.bgCircle3}></div>
      
//       {/* Floating Particles */}
//       {[...Array(30)].map((_, i) => (
//         <div
//           key={i}
//           style={{
//             ...styles.particle,
//             top: `${Math.random() * 100}%`,
//             left: `${Math.random() * 100}%`,
//             animationDelay: `${Math.random() * 5}s`,
//             animationDuration: `${3 + Math.random() * 4}s`
//           }}
//         />
//       ))}

//       {/* Register Card */}
//       <div style={styles.card}>
//         {/* Logo Section */}
//         <div style={styles.logoWrapper}>
//           <div style={styles.logoIcon}>
//             <span style={styles.logoEmoji}>🚀</span>
//           </div>
//           <h1 style={styles.title}>Zentrue Fashion</h1>
//           <p style={styles.subtitle}>Create your account</p>
//         </div>

//         {/* Form */}
//         <form onSubmit={handleSubmit} style={styles.form}>
//           <div style={styles.formGroup}>
//             <label style={styles.label}>Full Name</label>
//             <div style={styles.inputWrapper}>
//               <span style={styles.inputIcon}>👤</span>
//               <input
//                 type="text"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 style={styles.input}
//                 placeholder="Enter your full name"
//                 required
//               />
//             </div>
//           </div>

//           <div style={styles.formGroup}>
//             <label style={styles.label}>Email Address</label>
//             <div style={styles.inputWrapper}>
//               <span style={styles.inputIcon}>📧</span>
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 style={styles.input}
//                 placeholder="Enter your email"
//                 required
//               />
//             </div>
//           </div>

//           <div style={styles.formGroup}>
//             <label style={styles.label}>Password</label>
//             <div style={styles.inputWrapper}>
//               <span style={styles.inputIcon}>🔒</span>
//               <input
//                 type={showPassword ? "text" : "password"}
//                 value={password}
//                 onChange={handlePasswordChange}
//                 style={styles.input}
//                 placeholder="Create password"
//                 required
//                 minLength={6}
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 style={styles.passwordToggle}
//               >
//                 {showPassword ? "👁️" : "🔒"}
//               </button>
//             </div>
            
//             {/* Password Strength Indicator */}
//             {password && (
//               <div style={styles.strengthContainer}>
//                 <div style={styles.strengthBars}>
//                   {[1, 2, 3, 4, 5].map((level) => (
//                     <div
//                       key={level}
//                       style={{
//                         ...styles.strengthBar,
//                         backgroundColor: level <= passwordStrength ? getStrengthColor() : '#e5e7eb',
//                         width: `${20}%`,
//                       }}
//                     />
//                   ))}
//                 </div>
//                 <div style={styles.strengthText}>
//                   <span style={styles.strengthLabel}>Password Strength:</span>
//                   <span style={{ ...styles.strengthValue, color: getStrengthColor() }}>
//                     {getStrengthText()}
//                   </span>
//                 </div>
//                 <ul style={styles.requirementsList}>
//                   <li style={{ ...styles.requirementItem, color: password.length >= 6 ? '#10b981' : '#9ca3af' }}>
//                     {password.length >= 6 ? '✓' : '○'} At least 6 characters
//                   </li>
//                   <li style={{ ...styles.requirementItem, color: /[A-Z]/.test(password) ? '#10b981' : '#9ca3af' }}>
//                     {/[A-Z]/.test(password) ? '✓' : '○'} One uppercase letter
//                   </li>
//                   <li style={{ ...styles.requirementItem, color: /[0-9]/.test(password) ? '#10b981' : '#9ca3af' }}>
//                     {/[0-9]/.test(password) ? '✓' : '○'} One number
//                   </li>
//                 </ul>
//               </div>
//             )}
//           </div>

         

//           <button
//             type="submit"
//             disabled={loading}
//             style={styles.submitBtn}
//             onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
//             onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
//           >
//             {loading ? (
//               <div style={styles.loadingWrapper}>
//                 <div style={styles.spinner}></div>
//                 <span>Creating account...</span>
//               </div>
//             ) : (
//               'Create Account'
//             )}
//           </button>

         
//         </form>

//         <p style={styles.loginLink}>
//           Already have an account?{' '}
//           <Link to="/login" style={styles.loginLinkText}>
//             Sign In
//           </Link>
//         </p>
        
       
//       </div>

//       <style>{`
//         @keyframes fadeInUp {
//           from {
//             opacity: 0;
//             transform: translateY(30px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         @keyframes float {
//           0%, 100% {
//             transform: translateY(0px) translateX(0px);
//           }
//           25% {
//             transform: translateY(-20px) translateX(20px);
//           }
//           50% {
//             transform: translateY(0px) translateX(40px);
//           }
//           75% {
//             transform: translateY(20px) translateX(20px);
//           }
//         }

//         @keyframes floatSlow {
//           0%, 100% {
//             transform: translateY(0px) translateX(0px);
//           }
//           33% {
//             transform: translateY(-30px) translateX(-20px);
//           }
//           66% {
//             transform: translateY(30px) translateX(20px);
//           }
//         }

//         @keyframes pulse {
//           0%, 100% {
//             opacity: 0.3;
//           }
//           50% {
//             opacity: 0.6;
//           }
//         }

//         @keyframes spin {
//           to {
//             transform: rotate(360deg);
//           }
//         }

//         @keyframes gradientShift {
//           0% {
//             background-position: 0% 50%;
//           }
//           50% {
//             background-position: 100% 50%;
//           }
//           100% {
//             background-position: 0% 50%;
//           }
//         }

//         input:focus {
//           outline: none;
//         }

//         button {
//           cursor: pointer;
//         }
//       `}</style>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     minHeight: '100vh',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
//     position: 'relative',
//     overflow: 'hidden',
//     animation: 'gradientShift 10s ease infinite',
//     backgroundSize: '200% 200%',
//   },
  
//   bgCircle1: {
//     position: 'absolute',
//     width: '400px',
//     height: '400px',
//     background: 'linear-gradient(135deg, #ff6b6b, #feca57)',
//     borderRadius: '50%',
//     top: '-100px',
//     right: '-100px',
//     opacity: 0.3,
//     filter: 'blur(80px)',
//     animation: 'float 8s ease-in-out infinite',
//   },
  
//   bgCircle2: {
//     position: 'absolute',
//     width: '500px',
//     height: '500px',
//     background: 'linear-gradient(135deg, #48dbfb, #0abde3)',
//     borderRadius: '50%',
//     bottom: '-150px',
//     left: '-100px',
//     opacity: 0.3,
//     filter: 'blur(100px)',
//     animation: 'floatSlow 12s ease-in-out infinite',
//   },
  
//   bgCircle3: {
//     position: 'absolute',
//     width: '300px',
//     height: '300px',
//     background: 'linear-gradient(135deg, #feca57, #ff6b6b)',
//     borderRadius: '50%',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     opacity: 0.2,
//     filter: 'blur(60px)',
//     animation: 'pulse 4s ease-in-out infinite',
//   },
  
//   particle: {
//     position: 'absolute',
//     width: '4px',
//     height: '4px',
//     background: 'white',
//     borderRadius: '50%',
//     opacity: 0.5,
//     animation: 'float 3s ease-in-out infinite',
//   },
  
//   card: {
//     position: 'relative',
//     zIndex: 10,
//     background: 'rgba(255, 255, 255, 0.98)',
//     backdropFilter: 'blur(10px)',
//     borderRadius: '32px',
//     padding: '48px',
//     width: '100%',
//     maxWidth: '480px',
//     margin: '20px',
//     boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
//     animation: 'fadeInUp 0.6s ease-out',
//     transition: 'transform 0.3s ease, box-shadow 0.3s ease',
//     maxHeight: '90vh',
//     overflowY: 'auto',
//   },
  
//   logoWrapper: {
//     textAlign: 'center',
//     marginBottom: '32px',
//   },
  
//   logoIcon: {
//     display: 'inline-flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: '80px',
//     height: '80px',
//     background: 'linear-gradient(135deg, #667eea, #764ba2)',
//     borderRadius: '24px',
//     marginBottom: '20px',
//     animation: 'float 3s ease-in-out infinite',
//     boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
//     transition: 'transform 0.3s ease',
//   },
  
//   logoEmoji: {
//     fontSize: '40px',
//   },
  
//   title: {
//     fontSize: '32px',
//     fontWeight: '800',
//     background: 'linear-gradient(135deg, #667eea, #764ba2)',
//     WebkitBackgroundClip: 'text',
//     backgroundClip: 'text',
//     color: 'transparent',
//     marginBottom: '8px',
//   },
  
//   subtitle: {
//     color: '#6b7280',
//     fontSize: '14px',
//   },
  
//   form: {
//     marginTop: '32px',
//   },
  
//   formGroup: {
//     marginBottom: '20px',
//   },
  
//   label: {
//     display: 'block',
//     color: '#374151',
//     fontWeight: '600',
//     marginBottom: '8px',
//     fontSize: '14px',
//   },
  
//   inputWrapper: {
//     position: 'relative',
//   },
  
//   inputIcon: {
//     position: 'absolute',
//     left: '16px',
//     top: '50%',
//     transform: 'translateY(-50%)',
//     fontSize: '18px',
//     transition: 'all 0.3s ease',
//   },
  
//   input: {
//     width: '100%',
//     padding: '14px 16px 14px 48px',
//     border: '2px solid #e5e7eb',
//     borderRadius: '16px',
//     fontSize: '16px',
//     transition: 'all 0.3s ease',
//     background: 'white',
//     boxSizing: 'border-box',
//   },
  
//   passwordToggle: {
//     position: 'absolute',
//     right: '16px',
//     top: '50%',
//     transform: 'translateY(-50%)',
//     background: 'none',
//     border: 'none',
//     cursor: 'pointer',
//     fontSize: '18px',
//     transition: 'opacity 0.3s ease',
//     padding: 0,
//   },
  
//   strengthContainer: {
//     marginTop: '12px',
//   },
  
//   strengthBars: {
//     display: 'flex',
//     gap: '8px',
//     marginBottom: '8px',
//   },
  
//   strengthBar: {
//     height: '4px',
//     borderRadius: '2px',
//     transition: 'all 0.3s ease',
//   },
  
//   strengthText: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: '8px',
//   },
  
//   strengthLabel: {
//     fontSize: '12px',
//     color: '#6b7280',
//   },
  
//   strengthValue: {
//     fontSize: '12px',
//     fontWeight: '600',
//   },
  
//   requirementsList: {
//     listStyle: 'none',
//     padding: 0,
//     margin: '8px 0 0 0',
//     display: 'flex',
//     gap: '12px',
//     flexWrap: 'wrap',
//   },
  
//   requirementItem: {
//     fontSize: '11px',
//     display: 'flex',
//     alignItems: 'center',
//     gap: '4px',
//   },
  
//   checkboxLabel: {
//     display: 'flex',
//     alignItems: 'center',
//     gap: '8px',
//     marginBottom: '24px',
//     cursor: 'pointer',
//   },
  
//   checkbox: {
//     width: '18px',
//     height: '18px',
//     cursor: 'pointer',
//     accentColor: '#667eea',
//   },
  
//   checkboxText: {
//     fontSize: '13px',
//     color: '#4b5563',
//   },
  
//   linkText: {
//     color: '#667eea',
//     textDecoration: 'none',
//     transition: 'color 0.3s ease',
//   },
  
//   submitBtn: {
//     width: '100%',
//     padding: '14px',
//     background: 'linear-gradient(135deg, #667eea, #764ba2)',
//     color: 'white',
//     border: 'none',
//     borderRadius: '16px',
//     fontSize: '16px',
//     fontWeight: '600',
//     cursor: 'pointer',
//     transition: 'all 0.3s ease',
//     marginBottom: '24px',
//     position: 'relative',
//     overflow: 'hidden',
//   },
  
//   loadingWrapper: {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     gap: '8px',
//   },
  
//   spinner: {
//     display: 'inline-block',
//     width: '20px',
//     height: '20px',
//     border: '2px solid white',
//     borderTopColor: 'transparent',
//     borderRadius: '50%',
//     animation: 'spin 0.6s linear infinite',
//   },
  
//   divider: {
//     display: 'flex',
//     alignItems: 'center',
//     textAlign: 'center',
//     margin: '24px 0',
//   },
  
//   dividerLine: {
//     flex: 1,
//     borderBottom: '1px solid #e5e7eb',
//   },
  
//   dividerText: {
//     padding: '0 16px',
//     color: '#9ca3af',
//     fontSize: '12px',
//   },
  
//   socialButtons: {
//     display: 'grid',
//     gridTemplateColumns: '1fr 1fr',
//     gap: '12px',
//     marginBottom: '24px',
//   },
  
//   socialBtn: {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     gap: '8px',
//     padding: '12px',
//     background: 'white',
//     border: '2px solid #e5e7eb',
//     borderRadius: '16px',
//     cursor: 'pointer',
//     fontSize: '14px',
//     fontWeight: '500',
//     color: '#374151',
//     transition: 'all 0.3s ease',
//   },
  
//   socialIcon: {
//     width: '20px',
//     height: '20px',
//   },
  
//   loginLink: {
//     textAlign: 'center',
//     color: '#6b7280',
//     fontSize: '14px',
//   },
  
//   loginLinkText: {
//     color: '#667eea',
//     fontWeight: '600',
//     textDecoration: 'none',
//     transition: 'color 0.3s ease',
//   },
  
//   footerNote: {
//     textAlign: 'center',
//     marginTop: '24px',
//     color: '#9ca3af',
//     fontSize: '12px',
//   },
// };

// // Add hover styles via CSS injection
// const styleSheet = document.createElement("style");
// styleSheet.textContent = `
//   .social-btn:hover {
//     background: #f9fafb !important;
//     border-color: #667eea !important;
//     transform: translateY(-2px) !important;
//   }
  
//   .link-text:hover {
//     color: #764ba2 !important;
//     text-decoration: underline !important;
//   }
  
//   .login-link-text:hover {
//     color: #764ba2 !important;
//     text-decoration: underline !important;
//   }
  
//   input:focus {
//     border-color: #667eea !important;
//     box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1) !important;
//   }
  
//   .logo-icon:hover {
//     transform: scale(1.1) rotate(5deg) !important;
//   }
  
//   .card:hover {
//     transform: translateY(-5px) !important;
//     box-shadow: 0 35px 60px -15px rgba(0, 0, 0, 0.3) !important;
//   }
  
//   .password-toggle:hover {
//     opacity: 0.7 !important;
//   }
  
//   button:active {
//     transform: scale(0.98) !important;
//   }
  
//   /* Custom scrollbar for card */
//   .card::-webkit-scrollbar {
//     width: 6px;
//   }
  
//   .card::-webkit-scrollbar-track {
//     background: #f1f1f1;
//     border-radius: 10px;
//   }
  
//   .card::-webkit-scrollbar-thumb {
//     background: linear-gradient(135deg, #667eea, #764ba2);
//     border-radius: 10px;
//   }
// `;
// document.head.appendChild(styleSheet);

// export default Register;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  // const [agreeTerms, setAgreeTerms] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const { register } = useAuth();
  const navigate = useNavigate();

  const calculatePasswordStrength = (pass) => {
    let strength = 0;
    if (pass.length >= 6) strength++;
    if (pass.length >= 10) strength++;
    if (/[A-Z]/.test(pass)) strength++;
    if (/[0-9]/.test(pass)) strength++;
    if (/[^A-Za-z0-9]/.test(pass)) strength++;
    setPasswordStrength(strength);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    calculatePasswordStrength(e.target.value);
  };

  const getStrengthColor = () => {
    if (passwordStrength <= 1) return '#ef4444';
    if (passwordStrength <= 3) return '#f59e0b';
    return '#10b981';
  };

  const getStrengthText = () => {
    if (passwordStrength <= 1) return 'Weak';
    if (passwordStrength <= 3) return 'Medium';
    return 'Strong';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (!agreeTerms) {
    //   alert('Please agree to the Terms and Conditions');
    //   return;
    // }
    setLoading(true);
    const success = await register(name, email, password);
    setLoading(false);
    if (success) navigate('/dashboard');
  };

  return (
    <div style={styles.container}>
      {/* Animated Background */}
      <div style={styles.bgCircle1}></div>
      <div style={styles.bgCircle2}></div>
      <div style={styles.bgCircle3}></div>
      
      {/* Floating Particles */}
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          style={{
            ...styles.particle,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${3 + Math.random() * 4}s`
          }}
        />
      ))}

      {/* Register Card */}
      <div style={styles.card}>
        {/* Logo Section */}
        <div style={styles.logoWrapper}>
          <div style={styles.logoIcon}>
            <span style={styles.logoEmoji}>🚀</span>
          </div>
          <h1 style={styles.title}>Zentrue Fashion</h1>
          <p style={styles.subtitle}>Create your account</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Full Name</label>
            <div style={styles.inputWrapper}>
              <span style={styles.inputIcon}>👤</span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={styles.input}
                placeholder="Enter your full name"
                required
              />
            </div>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Email Address</label>
            <div style={styles.inputWrapper}>
              <span style={styles.inputIcon}>📧</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={styles.input}
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Password</label>
            <div style={styles.inputWrapper}>
              <span style={styles.inputIcon}>🔒</span>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={handlePasswordChange}
                style={styles.input}
                placeholder="Create password"
                required
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={styles.passwordToggle}
              >
                {showPassword ? "👁️" : "🔒"}
              </button>
            </div>
            
            {/* Password Strength Indicator */}
            {password && (
              <div style={styles.strengthContainer}>
                <div style={styles.strengthBars}>
                  {[1, 2, 3, 4, 5].map((level) => (
                    <div
                      key={level}
                      style={{
                        ...styles.strengthBar,
                        backgroundColor: level <= passwordStrength ? getStrengthColor() : '#e5e7eb',
                        width: `${20}%`,
                      }}
                    />
                  ))}
                </div>
                <div style={styles.strengthText}>
                  <span style={styles.strengthLabel}>Password Strength:</span>
                  <span style={{ ...styles.strengthValue, color: getStrengthColor() }}>
                    {getStrengthText()}
                  </span>
                </div>
                <ul style={styles.requirementsList}>
                  <li style={{ ...styles.requirementItem, color: password.length >= 6 ? '#10b981' : '#9ca3af' }}>
                    {password.length >= 6 ? '✓' : '○'} At least 6 characters
                  </li>
                  <li style={{ ...styles.requirementItem, color: /[A-Z]/.test(password) ? '#10b981' : '#9ca3af' }}>
                    {/[A-Z]/.test(password) ? '✓' : '○'} One uppercase letter
                  </li>
                  <li style={{ ...styles.requirementItem, color: /[0-9]/.test(password) ? '#10b981' : '#9ca3af' }}>
                    {/[0-9]/.test(password) ? '✓' : '○'} One number
                  </li>
                </ul>
              </div>
            )}
          </div>

         

          <button
            type="submit"
            disabled={loading}
            style={styles.submitBtn}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            {loading ? (
              <div style={styles.loadingWrapper}>
                <div style={styles.spinner}></div>
                <span>Creating account...</span>
              </div>
            ) : (
              'Create Account'
            )}
          </button>

         
        </form>

        <p style={styles.loginLink}>
          Already have an account?{' '}
          <Link to="/login" style={styles.loginLinkText}>
            Sign In
          </Link>
        </p>
        
       
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          25% {
            transform: translateY(-20px) translateX(20px);
          }
          50% {
            transform: translateY(0px) translateX(40px);
          }
          75% {
            transform: translateY(20px) translateX(20px);
          }
        }

        @keyframes floatSlow {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          33% {
            transform: translateY(-30px) translateX(-20px);
          }
          66% {
            transform: translateY(30px) translateX(20px);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        input:focus {
          outline: none;
        }

        button {
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
    position: 'relative',
    overflow: 'hidden',
    animation: 'gradientShift 10s ease infinite',
    backgroundSize: '200% 200%',
  },
  
  bgCircle1: {
    position: 'absolute',
    width: '400px',
    height: '400px',
    background: 'linear-gradient(135deg, #ff6b6b, #feca57)',
    borderRadius: '50%',
    top: '-100px',
    right: '-100px',
    opacity: 0.3,
    filter: 'blur(80px)',
    animation: 'float 8s ease-in-out infinite',
  },
  
  bgCircle2: {
    position: 'absolute',
    width: '500px',
    height: '500px',
    background: 'linear-gradient(135deg, #48dbfb, #0abde3)',
    borderRadius: '50%',
    bottom: '-150px',
    left: '-100px',
    opacity: 0.3,
    filter: 'blur(100px)',
    animation: 'floatSlow 12s ease-in-out infinite',
  },
  
  bgCircle3: {
    position: 'absolute',
    width: '300px',
    height: '300px',
    background: 'linear-gradient(135deg, #feca57, #ff6b6b)',
    borderRadius: '50%',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    opacity: 0.2,
    filter: 'blur(60px)',
    animation: 'pulse 4s ease-in-out infinite',
  },
  
  particle: {
    position: 'absolute',
    width: '4px',
    height: '4px',
    background: 'white',
    borderRadius: '50%',
    opacity: 0.5,
    animation: 'float 3s ease-in-out infinite',
  },
  
  card: {
    position: 'relative',
    zIndex: 10,
    background: 'rgba(255, 255, 255, 0.98)',
    backdropFilter: 'blur(10px)',
    borderRadius: '32px',
    padding: '48px',
    width: '100%',
    maxWidth: '480px',
    margin: '20px',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    animation: 'fadeInUp 0.6s ease-out',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    maxHeight: '90vh',
    overflowY: 'auto',
  },
  
  logoWrapper: {
    textAlign: 'center',
    marginBottom: '32px',
  },
  
  logoIcon: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80px',
    height: '80px',
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    borderRadius: '24px',
    marginBottom: '20px',
    animation: 'float 3s ease-in-out infinite',
    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease',
  },
  
  logoEmoji: {
    fontSize: '40px',
  },
  
  title: {
    fontSize: '32px',
    fontWeight: '800',
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent',
    marginBottom: '8px',
  },
  
  subtitle: {
    color: '#6b7280',
    fontSize: '14px',
  },
  
  form: {
    marginTop: '32px',
  },
  
  formGroup: {
    marginBottom: '20px',
  },
  
  label: {
    display: 'block',
    color: '#374151',
    fontWeight: '600',
    marginBottom: '8px',
    fontSize: '14px',
  },
  
  inputWrapper: {
    position: 'relative',
  },
  
  inputIcon: {
    position: 'absolute',
    left: '16px',
    top: '50%',
    transform: 'translateY(-50%)',
    fontSize: '18px',
    transition: 'all 0.3s ease',
  },
  
  input: {
    width: '100%',
    padding: '14px 16px 14px 48px',
    border: '2px solid #e5e7eb',
    borderRadius: '16px',
    fontSize: '16px',
    transition: 'all 0.3s ease',
    background: 'white',
    boxSizing: 'border-box',
  },
  
  passwordToggle: {
    position: 'absolute',
    right: '16px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '18px',
    transition: 'opacity 0.3s ease',
    padding: 0,
  },
  
  strengthContainer: {
    marginTop: '12px',
  },
  
  strengthBars: {
    display: 'flex',
    gap: '8px',
    marginBottom: '8px',
  },
  
  strengthBar: {
    height: '4px',
    borderRadius: '2px',
    transition: 'all 0.3s ease',
  },
  
  strengthText: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
  },
  
  strengthLabel: {
    fontSize: '12px',
    color: '#6b7280',
  },
  
  strengthValue: {
    fontSize: '12px',
    fontWeight: '600',
  },
  
  requirementsList: {
    listStyle: 'none',
    padding: 0,
    margin: '8px 0 0 0',
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap',
  },
  
  requirementItem: {
    fontSize: '11px',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '24px',
    cursor: 'pointer',
  },
  
  checkbox: {
    width: '18px',
    height: '18px',
    cursor: 'pointer',
    accentColor: '#667eea',
  },
  
  checkboxText: {
    fontSize: '13px',
    color: '#4b5563',
  },
  
  linkText: {
    color: '#667eea',
    textDecoration: 'none',
    transition: 'color 0.3s ease',
  },
  
  submitBtn: {
    width: '100%',
    padding: '14px',
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    color: 'white',
    border: 'none',
    borderRadius: '16px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    marginBottom: '24px',
    position: 'relative',
    overflow: 'hidden',
  },
  
  loadingWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
  },
  
  spinner: {
    display: 'inline-block',
    width: '20px',
    height: '20px',
    border: '2px solid white',
    borderTopColor: 'transparent',
    borderRadius: '50%',
    animation: 'spin 0.6s linear infinite',
  },
  
  divider: {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    margin: '24px 0',
  },
  
  dividerLine: {
    flex: 1,
    borderBottom: '1px solid #e5e7eb',
  },
  
  dividerText: {
    padding: '0 16px',
    color: '#9ca3af',
    fontSize: '12px',
  },
  
  socialButtons: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '12px',
    marginBottom: '24px',
  },
  
  socialBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '12px',
    background: 'white',
    border: '2px solid #e5e7eb',
    borderRadius: '16px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    color: '#374151',
    transition: 'all 0.3s ease',
  },
  
  socialIcon: {
    width: '20px',
    height: '20px',
  },
  
  loginLink: {
    textAlign: 'center',
    color: '#6b7280',
    fontSize: '14px',
  },
  
  loginLinkText: {
    color: '#667eea',
    fontWeight: '600',
    textDecoration: 'none',
    transition: 'color 0.3s ease',
  },
  
  footerNote: {
    textAlign: 'center',
    marginTop: '24px',
    color: '#9ca3af',
    fontSize: '12px',
  },
};

// Add hover styles via CSS injection
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  .social-btn:hover {
    background: #f9fafb !important;
    border-color: #667eea !important;
    transform: translateY(-2px) !important;
  }
  
  .link-text:hover {
    color: #764ba2 !important;
    text-decoration: underline !important;
  }
  
  .login-link-text:hover {
    color: #764ba2 !important;
    text-decoration: underline !important;
  }
  
  input:focus {
    border-color: #667eea !important;
    box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1) !important;
  }
  
  .logo-icon:hover {
    transform: scale(1.1) rotate(5deg) !important;
  }
  
  .card:hover {
    transform: translateY(-5px) !important;
    box-shadow: 0 35px 60px -15px rgba(0, 0, 0, 0.3) !important;
  }
  
  .password-toggle:hover {
    opacity: 0.7 !important;
  }
  
  button:active {
    transform: scale(0.98) !important;
  }
  
  /* Custom scrollbar for card */
  .card::-webkit-scrollbar {
    width: 6px;
  }
  
  .card::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }
  
  .card::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, #667eea, #764ba2);
    border-radius: 10px;
  }
`;
document.head.appendChild(styleSheet);

export default Register;

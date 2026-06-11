// import React, { useState } from 'react';
// import axios from 'axios';
// import toast from 'react-hot-toast';
// import ImageUpload from '../components/ImageUpload';

// const Generate = () => {
//   const [images, setImages] = useState([]);
//   const [gender, setGender] = useState('female');
//   const [background, setBackground] = useState('cream');
//   const [loading, setLoading] = useState(false);
//   const [result, setResult] = useState(null);
//   const [activeTab, setActiveTab] = useState('upload');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (images.length === 0) {
//       toast.error('Please upload at least one product image');
//       return;
//     }

//     setLoading(true);
//     const formData = new FormData();
//     images.forEach(img => formData.append('images', img.file));
//     formData.append('gender', gender);
//     formData.append('background', background);

//     try {
//       const response = await axios.post('/api/ai/generate', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' }
//       });
      
//       if (response.data.success) {
//         setResult(response.data);
//         setActiveTab('results');
//         toast.success('Fashion model generated successfully!');
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Generation failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDownload = (imageUrl, poseName) => {
//     const link = document.createElement('a');
//     link.href = imageUrl;
//     link.download = `ai-fashion-${poseName.toLowerCase().replace(/ /g, '-')}.jpg`;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//     toast.success('Download started!');
//   };

//   return (
//     <div style={styles.container}>
//       {/* Animated Background */}
//       <div style={styles.bgCircle1}></div>
//       <div style={styles.bgCircle2}></div>
//       <div style={styles.bgCircle3}></div>

//       {/* Hero Section */}
//       <div style={styles.heroSection}>
//         <div style={styles.heroContent}>
//           <div style={styles.heroBadge}>
//             <span style={styles.heroBadgeIcon}>🎨</span>
//             <span style={styles.heroBadgeText}>AI Powered Generation</span>
//           </div>
//           <h1 style={styles.heroTitle}>
//             Create Stunning AI <br />
//             <span style={styles.heroHighlight}>Fashion Models</span>
//           </h1>
//           <p style={styles.heroSubtitle}>
//             Transform your product images into professional fashion models using cutting-edge AI technology
//           </p>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div style={styles.mainContent}>
//         {/* Tabs */}
//         <div style={styles.tabsContainer}>
//           <button
//             onClick={() => setActiveTab('upload')}
//             style={{
//               ...styles.tab,
//               ...(activeTab === 'upload' ? styles.tabActive : styles.tabInactive)
//             }}
//           >
//             <span>📤</span> Upload Images
//           </button>
//           <button
//             onClick={() => setActiveTab('settings')}
//             style={{
//               ...styles.tab,
//               ...(activeTab === 'settings' ? styles.tabActive : styles.tabInactive),
//               ...(!images.length && activeTab !== 'settings' ? styles.tabDisabled : {})
//             }}
//             disabled={!images.length && activeTab !== 'settings'}
//           >
//             <span>⚙️</span> Configure Settings
//           </button>
//           <button
//             onClick={() => result && setActiveTab('results')}
//             style={{
//               ...styles.tab,
//               ...(activeTab === 'results' ? styles.tabActive : styles.tabInactive),
//               ...(!result ? styles.tabDisabled : {})
//             }}
//             disabled={!result}
//           >
//             <span>✨</span> View Results
//           </button>
//         </div>

//         {/* Tab Content */}
//         {activeTab === 'upload' && (
//           <div style={styles.tabContent}>
//             <div style={styles.card}>
//               <div style={styles.cardHeader}>
//                 <span style={styles.cardIcon}>📸</span>
//                 <h2 style={styles.cardTitle}>Upload Product Images</h2>
//               </div>
//               <div style={styles.cardBody}>
//                 <ImageUpload images={images} setImages={setImages} maxFiles={5} />
//                 {images.length > 0 && (
//                   <div style={styles.uploadSuccess}>
//                     <span>✅</span>
//                     <div>
//                       <div style={styles.successTitle}>Ready to Generate!</div>
//                       <div style={styles.successText}>{images.length} image(s) uploaded successfully</div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//               <div style={styles.cardFooter}>
//                 <button
//                   onClick={() => setActiveTab('settings')}
//                   style={styles.nextBtn}
//                   disabled={!images.length}
//                 >
//                   Continue to Settings →
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {activeTab === 'settings' && (
//           <div style={styles.tabContent}>
//             {/* Gender Selection */}
//             <div style={styles.card}>
//               <div style={styles.cardHeader}>
//                 <span style={styles.cardIcon}>👤</span>
//                 <h2 style={styles.cardTitle}>Select Model Type</h2>
//               </div>
//               <div style={styles.cardBody}>
//                 <div style={styles.genderGrid}>
//                   <button
//                     onClick={() => setGender('female')}
//                     style={{
//                       ...styles.genderBtn,
//                       ...(gender === 'female' ? styles.genderBtnActive : styles.genderBtnInactive)
//                     }}
//                   >
//                     <span style={styles.genderIcon}>👩</span>
//                     <div>
//                       <div style={styles.genderTitle}>Female Model</div>
//                       <div style={styles.genderDesc}>Elegant & Professional</div>
//                     </div>
//                   </button>
//                   <button
//                     onClick={() => setGender('male')}
//                     style={{
//                       ...styles.genderBtn,
//                       ...(gender === 'male' ? styles.genderBtnActive : styles.genderBtnInactive)
//                     }}
//                   >
//                     <span style={styles.genderIcon}>👨</span>
//                     <div>
//                       <div style={styles.genderTitle}>Male Model</div>
//                       <div style={styles.genderDesc}>Stylish & Dynamic</div>
//                     </div>
//                   </button>
//                   <button
//                     onClick={() => setGender('kid')}
//                     style={{
//                       ...styles.genderBtn,
//                       ...(gender === 'kid' ? styles.genderBtnActive : styles.genderBtnInactive)
//                     }}
//                   >
//                     <span style={styles.genderIcon}>🧒</span>
//                     <div>
//                       <div style={styles.genderTitle}>Kids Model</div>
//                       <div style={styles.genderDesc}>Cute & Natural</div>
//                     </div>
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* Background Selection */}
//             <div style={styles.card}>
//               <div style={styles.cardHeader}>
//                 <span style={styles.cardIcon}>🎨</span>
//                 <h2 style={styles.cardTitle}>Choose Background</h2>
//               </div>
//               <div style={styles.cardBody}>
//                 <div style={styles.bgGrid}>
//                   <button
//                     onClick={() => setBackground('cream')}
//                     style={{
//                       ...styles.bgBtn,
//                       background: '#fef3c7',
//                       ...(background === 'cream' ? styles.bgBtnActive : {})
//                     }}
//                   >
//                     <div style={styles.bgPreview}></div>
//                     <span>Cream</span>
//                   </button>
//                   <button
//                     onClick={() => setBackground('lightgrey')}
//                     style={{
//                       ...styles.bgBtn,
//                       background: '#e5e7eb',
//                       ...(background === 'lightgrey' ? styles.bgBtnActive : {})
//                     }}
//                   >
//                     <div style={styles.bgPreview}></div>
//                     <span>Light Grey</span>
//                   </button>
//                   <button
//                     onClick={() => setBackground('auto')}
//                     style={{
//                       ...styles.bgBtn,
//                       background: 'linear-gradient(135deg, #f3e8ff, #fce7f3)',
//                       ...(background === 'auto' ? styles.bgBtnActive : {})
//                     }}
//                   >
//                     <div style={styles.bgPreview}></div>
//                     <span>Auto</span>
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* AI Features */}
//             <div style={styles.featuresCard}>
//               <div style={styles.featuresGrid}>
//                 <div style={styles.featureItem}>
//                   <div style={styles.featureIcon}>🧠</div>
//                   <h3 style={styles.featureTitle}>Advanced AI</h3>
//                   <p style={styles.featureText}>State-of-the-art AI models</p>
//                 </div>
//                 <div style={styles.featureItem}>
//                   <div style={styles.featureIcon}>⚡</div>
//                   <h3 style={styles.featureTitle}>Fast Processing</h3>
//                   <p style={styles.featureText}>Generate in seconds</p>
//                 </div>
//                 <div style={styles.featureItem}>
//                   <div style={styles.featureIcon}>🔒</div>
//                   <h3 style={styles.featureTitle}>Secure & Private</h3>
//                   <p style={styles.featureText}>Your data is protected</p>
//                 </div>
//               </div>
//             </div>

//             {/* Action Buttons */}
//             <div style={styles.actionButtons}>
//               <button onClick={() => setActiveTab('upload')} style={styles.backBtn}>
//                 ← Back
//               </button>
//               <button onClick={handleSubmit} disabled={loading} style={styles.generateBtn}>
//                 {loading ? (
//                   <>
//                     <div style={styles.spinner}></div>
//                     Generating...
//                   </>
//                 ) : (
//                   <>
//                     ✨ Generate Models
//                   </>
//                 )}
//               </button>
//             </div>
//           </div>
//         )}

//         {activeTab === 'results' && result && (
//           <div style={styles.tabContent}>
//             {/* Success Message */}
//             <div style={styles.successCard}>
//               <span style={styles.successIcon}>✅</span>
//               <div>
//                 <h3 style={styles.successTitle}>Generation Complete!</h3>
//                 <p style={styles.successText}>Your AI fashion models are ready to use</p>
//               </div>
//             </div>

//             {/* Original Images */}
//             {result.originalImages && (
//               <div style={styles.card}>
//                 <div style={styles.cardHeader}>
//                   <span style={styles.cardIcon}>📸</span>
//                   <h2 style={styles.cardTitle}>Original Product Images</h2>
//                 </div>
//                 <div style={styles.cardBody}>
//                   <div style={styles.originalGrid}>
//                     {result.originalImages.map((img, idx) => (
//                       <div key={idx} style={styles.originalImageWrapper}>
//                         <img src={img} alt={`Original ${idx + 1}`} style={styles.originalImage} />
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Generated Models */}
//             {result.generatedPoses && (
//               <div style={styles.card}>
//                 <div style={styles.cardHeader}>
//                   <span style={styles.cardIcon}>✨</span>
//                   <h2 style={styles.cardTitle}>AI Generated Fashion Models</h2>
//                 </div>
//                 <div style={styles.cardBody}>
//                   <div style={styles.generatedGrid}>
//                     {result.generatedPoses.map((pose, idx) => (
//                       <div key={idx} style={styles.generatedCard}>
//                         <img src={pose.image} alt={pose.pose} style={styles.generatedImage} />
//                         <div style={styles.generatedOverlay}>
//                           <p style={styles.generatedPose}>{pose.pose}</p>
//                           <button onClick={() => handleDownload(pose.image, pose.pose)} style={styles.downloadBtn}>
//                             📥 Download
//                           </button>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Action Buttons */}
//             <div style={styles.resultActions}>
//               <button onClick={() => {
//                 setResult(null);
//                 setImages([]);
//                 setActiveTab('upload');
//               }} style={styles.newGenerateBtn}>
//                 Generate More
//               </button>
//               <Link to="/products" style={styles.viewProductsBtn}>
//                 View All Products →
//               </Link>
//             </div>
//           </div>
//         )}
//       </div>

//       <style>{`
//         @keyframes fadeInUp {
//           from { opacity: 0; transform: translateY(30px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         @keyframes float {
//           0%, 100% { transform: translateY(0px) translateX(0px); }
//           25% { transform: translateY(-20px) translateX(20px); }
//           50% { transform: translateY(0px) translateX(40px); }
//           75% { transform: translateY(20px) translateX(20px); }
//         }
//         @keyframes floatSlow {
//           0%, 100% { transform: translateY(0px) translateX(0px); }
//           33% { transform: translateY(-30px) translateX(-20px); }
//           66% { transform: translateY(30px) translateX(20px); }
//         }
//         @keyframes pulse {
//           0%, 100% { opacity: 0.3; }
//           50% { opacity: 0.6; }
//         }
//         @keyframes spin {
//           to { transform: rotate(360deg); }
//         }
//       `}</style>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     minHeight: '100vh',
//     background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
//     position: 'relative',
//     overflowX: 'hidden',
//   },
  
//   bgCircle1: {
//     position: 'fixed',
//     width: '400px',
//     height: '400px',
//     background: 'linear-gradient(135deg, #667eea20, #764ba220)',
//     borderRadius: '50%',
//     top: '-100px',
//     right: '-100px',
//     opacity: 0.5,
//     filter: 'blur(80px)',
//     animation: 'float 8s ease-in-out infinite',
//     pointerEvents: 'none',
//   },
  
//   bgCircle2: {
//     position: 'fixed',
//     width: '500px',
//     height: '500px',
//     background: 'linear-gradient(135deg, #f093fb20, #f5576c20)',
//     borderRadius: '50%',
//     bottom: '-150px',
//     left: '-100px',
//     opacity: 0.5,
//     filter: 'blur(100px)',
//     animation: 'floatSlow 12s ease-in-out infinite',
//     pointerEvents: 'none',
//   },
  
//   bgCircle3: {
//     position: 'fixed',
//     width: '300px',
//     height: '300px',
//     background: 'linear-gradient(135deg, #4facfe20, #00f2fe20)',
//     borderRadius: '50%',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     opacity: 0.3,
//     filter: 'blur(60px)',
//     animation: 'pulse 4s ease-in-out infinite',
//     pointerEvents: 'none',
//   },
  
//   heroSection: {
//     background: 'linear-gradient(135deg, #667eea, #764ba2)',
//     padding: '60px 20px',
//     textAlign: 'center',
//   },
  
//   heroContent: {
//     maxWidth: '800px',
//     margin: '0 auto',
//   },
  
//   heroBadge: {
//     display: 'inline-flex',
//     alignItems: 'center',
//     gap: '8px',
//     background: 'rgba(255,255,255,0.2)',
//     padding: '8px 20px',
//     borderRadius: '50px',
//     marginBottom: '24px',
//   },
  
//   heroBadgeIcon: { fontSize: '16px' },
//   heroBadgeText: { color: 'white', fontSize: '14px', fontWeight: '500' },
  
//   heroTitle: {
//     fontSize: '48px',
//     fontWeight: '800',
//     color: 'white',
//     marginBottom: '16px',
//     lineHeight: '1.2',
//   },
  
//   heroHighlight: {
//     background: 'linear-gradient(135deg, #f093fb, #f5576c)',
//     WebkitBackgroundClip: 'text',
//     backgroundClip: 'text',
//     color: 'transparent',
//   },
  
//   heroSubtitle: {
//     fontSize: '18px',
//     color: 'rgba(255,255,255,0.9)',
//     maxWidth: '600px',
//     margin: '0 auto',
//   },
  
//   mainContent: {
//     maxWidth: '1000px',
//     margin: '-30px auto 0 auto',
//     padding: '0 20px 60px 20px',
//     position: 'relative',
//     zIndex: 10,
//   },
  
//   tabsContainer: {
//     display: 'flex',
//     justifyContent: 'center',
//     gap: '12px',
//     marginBottom: '30px',
//     flexWrap: 'wrap',
//   },
  
//   tab: {
//     padding: '12px 24px',
//     borderRadius: '50px',
//     fontSize: '15px',
//     fontWeight: '600',
//     cursor: 'pointer',
//     transition: 'all 0.3s ease',
//     border: 'none',
//     display: 'flex',
//     alignItems: 'center',
//     gap: '8px',
//   },
  
//   tabActive: {
//     background: 'linear-gradient(135deg, #667eea, #764ba2)',
//     color: 'white',
//     boxShadow: '0 4px 15px rgba(102,126,234,0.3)',
//   },
  
//   tabInactive: {
//     background: 'white',
//     color: '#4b5563',
//   },
  
//   tabDisabled: {
//     opacity: 0.5,
//     cursor: 'not-allowed',
//   },
  
//   tabContent: {
//     animation: 'fadeInUp 0.5s ease-out',
//   },
  
//   card: {
//     background: 'white',
//     borderRadius: '24px',
//     marginBottom: '24px',
//     overflow: 'hidden',
//     boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)',
//   },
  
//   cardHeader: {
//     padding: '20px 24px',
//     borderBottom: '1px solid #e5e7eb',
//     display: 'flex',
//     alignItems: 'center',
//     gap: '12px',
//   },
  
//   cardIcon: { fontSize: '24px' },
//   cardTitle: { fontSize: '20px', fontWeight: '700', color: '#1f2937', margin: 0 },
  
//   cardBody: { padding: '24px' },
//   cardFooter: { padding: '16px 24px', background: '#f9fafb', borderTop: '1px solid #e5e7eb', textAlign: 'right' },
  
//   uploadSuccess: {
//     marginTop: '20px',
//     padding: '16px',
//     background: '#d1fae5',
//     borderRadius: '12px',
//     display: 'flex',
//     alignItems: 'center',
//     gap: '12px',
//   },
//   successTitle: { fontWeight: '600', color: '#065f46' },
//   successText: { fontSize: '14px', color: '#065f46' },
  
//   nextBtn: {
//     padding: '12px 24px',
//     background: 'linear-gradient(135deg, #667eea, #764ba2)',
//     color: 'white',
//     border: 'none',
//     borderRadius: '12px',
//     fontSize: '15px',
//     fontWeight: '600',
//     cursor: 'pointer',
//     transition: 'all 0.3s ease',
//   },
  
//   genderGrid: { display: 'flex', flexDirection: 'column', gap: '12px' },
  
//   genderBtn: {
//     display: 'flex',
//     alignItems: 'center',
//     gap: '16px',
//     padding: '16px',
//     borderRadius: '16px',
//     border: '2px solid',
//     cursor: 'pointer',
//     transition: 'all 0.3s ease',
//     width: '100%',
//     textAlign: 'left',
//   },
  
//   genderBtnActive: { borderColor: '#667eea', background: '#f0f0ff' },
//   genderBtnInactive: { borderColor: '#e5e7eb', background: 'white' },
//   genderIcon: { fontSize: '32px' },
//   genderTitle: { fontWeight: '600', color: '#1f2937' },
//   genderDesc: { fontSize: '12px', color: '#6b7280' },
  
//   bgGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' },
  
//   bgBtn: {
//     padding: '20px',
//     borderRadius: '16px',
//     border: '2px solid transparent',
//     cursor: 'pointer',
//     transition: 'all 0.3s ease',
//     textAlign: 'center',
//     fontWeight: '500',
//   },
  
//   bgBtnActive: { borderColor: '#667eea', boxShadow: '0 0 0 3px rgba(102,126,234,0.2)' },
//   bgPreview: { width: '100%', height: '60px', borderRadius: '8px', marginBottom: '12px' },
  
//   featuresCard: {
//     background: 'linear-gradient(135deg, #667eea, #764ba2)',
//     borderRadius: '24px',
//     padding: '24px',
//     marginBottom: '24px',
//   },
  
//   featuresGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' },
  
//   featureItem: { textAlign: 'center', color: 'white' },
//   featureIcon: { fontSize: '32px', marginBottom: '12px' },
//   featureTitle: { fontSize: '16px', fontWeight: '600', marginBottom: '4px' },
//   featureText: { fontSize: '12px', opacity: 0.8 },
  
//   actionButtons: { display: 'flex', gap: '16px', justifyContent: 'flex-end' },
  
//   backBtn: {
//     padding: '12px 24px',
//     background: 'white',
//     color: '#4b5563',
//     border: '2px solid #e5e7eb',
//     borderRadius: '12px',
//     fontSize: '15px',
//     fontWeight: '600',
//     cursor: 'pointer',
//     transition: 'all 0.3s ease',
//   },
  
//   generateBtn: {
//     padding: '12px 32px',
//     background: 'linear-gradient(135deg, #667eea, #764ba2)',
//     color: 'white',
//     border: 'none',
//     borderRadius: '12px',
//     fontSize: '15px',
//     fontWeight: '600',
//     cursor: 'pointer',
//     transition: 'all 0.3s ease',
//     display: 'flex',
//     alignItems: 'center',
//     gap: '8px',
//   },
  
//   spinner: {
//     width: '18px',
//     height: '18px',
//     border: '2px solid white',
//     borderTopColor: 'transparent',
//     borderRadius: '50%',
//     animation: 'spin 0.6s linear infinite',
//   },
  
//   successCard: {
//     background: '#d1fae5',
//     borderRadius: '16px',
//     padding: '20px',
//     marginBottom: '24px',
//     display: 'flex',
//     alignItems: 'center',
//     gap: '16px',
//   },
//   successIcon: { fontSize: '32px' },
  
//   originalGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px' },
//   originalImageWrapper: { borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' },
//   originalImage: { width: '100%', height: '150px', objectFit: 'cover' },
  
//   generatedGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' },
  
//   generatedCard: {
//     position: 'relative',
//     borderRadius: '16px',
//     overflow: 'hidden',
//     boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)',
//     transition: 'transform 0.3s ease',
//   },
  
//   generatedImage: { width: '100%', height: '300px', objectFit: 'cover' },
  
//   generatedOverlay: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
//     padding: '20px',
//     transform: 'translateY(100%)',
//     transition: 'transform 0.3s ease',
//   },
  
//   generatedPose: { color: 'white', fontWeight: '500', marginBottom: '8px' },
  
//   downloadBtn: {
//     padding: '6px 12px',
//     background: 'white',
//     border: 'none',
//     borderRadius: '8px',
//     cursor: 'pointer',
//     fontSize: '12px',
//     fontWeight: '500',
//   },
  
//   resultActions: { display: 'flex', gap: '16px', justifyContent: 'center', marginTop: '24px' },
  
//   newGenerateBtn: {
//     padding: '12px 24px',
//     background: 'white',
//     color: '#667eea',
//     border: '2px solid #667eea',
//     borderRadius: '12px',
//     fontSize: '15px',
//     fontWeight: '600',
//     cursor: 'pointer',
//   },
  
//   viewProductsBtn: {
//     padding: '12px 24px',
//     background: 'linear-gradient(135deg, #667eea, #764ba2)',
//     color: 'white',
//     textDecoration: 'none',
//     borderRadius: '12px',
//     fontWeight: '600',
//   },
// };

// // Add hover styles
// const styleSheet = document.createElement("style");
// styleSheet.textContent = `
//   .next-btn:hover, .generate-btn:hover, .view-products-btn:hover { transform: translateY(-2px); box-shadow: 0 10px 20px rgba(102,126,234,0.3); }
//   .back-btn:hover { background: #f3f4f6; }
//   .gender-btn:hover { transform: translateX(5px); }
//   .bg-btn:hover { transform: scale(1.05); }
//   .generated-card:hover { transform: translateY(-5px); }
//   .generated-card:hover .generated-overlay { transform: translateY(0); }
//   .new-generate-btn:hover { background: #f3f4f6; transform: translateY(-2px); }
//   @media (max-width: 768px) {
//     .hero-title { font-size: 32px; }
//     .features-grid { grid-template-columns: 1fr; gap: 16px; }
//     .bg-grid { grid-template-columns: 1fr; }
//     .generated-grid { grid-template-columns: 1fr; }
//   }
// `;
// document.head.appendChild(styleSheet);


// export default Generate;

import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import ImageUpload from '../components/ImageUpload';

const Generate = () => {
  const [images, setImages] = useState([]);
  const [gender, setGender] = useState('female');
  const [background, setBackground] = useState('cream');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [activeTab, setActiveTab] = useState('upload');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (images.length === 0) {
      toast.error('Please upload at least one product image');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    images.forEach(img => formData.append('images', img.file));
    formData.append('gender', gender);
    formData.append('background', background);

    try {
      // const response = await axios.post('/api/ai/generate', formData, {

      const { data } = await axios.post(
  'https://ai-2sy7.onrender.com/api/ai/generate',
  formData,
  {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      if (response.data.success) {
        setResult(response.data);
        setActiveTab('results');
        toast.success('Fashion model generated successfully!');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Generation failed');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = (imageUrl, poseName) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `ai-fashion-${poseName.toLowerCase().replace(/ /g, '-')}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Download started!');
  };

  return (
    <div style={styles.container}>
      {/* Animated Background */}
      <div style={styles.bgCircle1}></div>
      <div style={styles.bgCircle2}></div>
      <div style={styles.bgCircle3}></div>

      {/* Hero Section */}
      <div style={styles.heroSection}>
        <div style={styles.heroContent}>
          <div style={styles.heroBadge}>
            <span style={styles.heroBadgeIcon}>🎨</span>
            <span style={styles.heroBadgeText}>AI Powered Generation</span>
          </div>
          <h1 style={styles.heroTitle}>
            Create Stunning AI <br />
            <span style={styles.heroHighlight}>Fashion Models</span>
          </h1>
          <p style={styles.heroSubtitle}>
            Transform your product images into professional fashion models using cutting-edge AI technology
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        {/* Tabs */}
        <div style={styles.tabsContainer}>
          <button
            onClick={() => setActiveTab('upload')}
            style={{
              ...styles.tab,
              ...(activeTab === 'upload' ? styles.tabActive : styles.tabInactive)
            }}
          >
            <span>📤</span> Upload Images
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            style={{
              ...styles.tab,
              ...(activeTab === 'settings' ? styles.tabActive : styles.tabInactive),
              ...(!images.length && activeTab !== 'settings' ? styles.tabDisabled : {})
            }}
            disabled={!images.length && activeTab !== 'settings'}
          >
            <span>⚙️</span> Configure Settings
          </button>
          <button
            onClick={() => result && setActiveTab('results')}
            style={{
              ...styles.tab,
              ...(activeTab === 'results' ? styles.tabActive : styles.tabInactive),
              ...(!result ? styles.tabDisabled : {})
            }}
            disabled={!result}
          >
            <span>✨</span> View Results
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'upload' && (
          <div style={styles.tabContent}>
            <div style={styles.card}>
              <div style={styles.cardHeader}>
                <span style={styles.cardIcon}>📸</span>
                <h2 style={styles.cardTitle}>Upload Product Images</h2>
              </div>
              <div style={styles.cardBody}>
                <ImageUpload images={images} setImages={setImages} maxFiles={5} />
                {images.length > 0 && (
                  <div style={styles.uploadSuccess}>
                    <span>✅</span>
                    <div>
                      <div style={styles.successTitle}>Ready to Generate!</div>
                      <div style={styles.successText}>{images.length} image(s) uploaded successfully</div>
                    </div>
                  </div>
                )}
              </div>
              <div style={styles.cardFooter}>
                <button
                  onClick={() => setActiveTab('settings')}
                  style={styles.nextBtn}
                  disabled={!images.length}
                >
                  Continue to Settings →
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div style={styles.tabContent}>
            {/* Gender Selection */}
            <div style={styles.card}>
              <div style={styles.cardHeader}>
                <span style={styles.cardIcon}>👤</span>
                <h2 style={styles.cardTitle}>Select Model Type</h2>
              </div>
              <div style={styles.cardBody}>
                <div style={styles.genderGrid}>
                  <button
                    onClick={() => setGender('female')}
                    style={{
                      ...styles.genderBtn,
                      ...(gender === 'female' ? styles.genderBtnActive : styles.genderBtnInactive)
                    }}
                  >
                    <span style={styles.genderIcon}>👩</span>
                    <div>
                      <div style={styles.genderTitle}>Female Model</div>
                      <div style={styles.genderDesc}>Elegant & Professional</div>
                    </div>
                  </button>
                  <button
                    onClick={() => setGender('male')}
                    style={{
                      ...styles.genderBtn,
                      ...(gender === 'male' ? styles.genderBtnActive : styles.genderBtnInactive)
                    }}
                  >
                    <span style={styles.genderIcon}>👨</span>
                    <div>
                      <div style={styles.genderTitle}>Male Model</div>
                      <div style={styles.genderDesc}>Stylish & Dynamic</div>
                    </div>
                  </button>
                  <button
                    onClick={() => setGender('kid')}
                    style={{
                      ...styles.genderBtn,
                      ...(gender === 'kid' ? styles.genderBtnActive : styles.genderBtnInactive)
                    }}
                  >
                    <span style={styles.genderIcon}>🧒</span>
                    <div>
                      <div style={styles.genderTitle}>Kids Model</div>
                      <div style={styles.genderDesc}>Cute & Natural</div>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Background Selection */}
            <div style={styles.card}>
              <div style={styles.cardHeader}>
                <span style={styles.cardIcon}>🎨</span>
                <h2 style={styles.cardTitle}>Choose Background</h2>
              </div>
              <div style={styles.cardBody}>
                <div style={styles.bgGrid}>
                  <button
                    onClick={() => setBackground('cream')}
                    style={{
                      ...styles.bgBtn,
                      background: '#fef3c7',
                      ...(background === 'cream' ? styles.bgBtnActive : {})
                    }}
                  >
                    <div style={styles.bgPreview}></div>
                    <span>Cream</span>
                  </button>
                  <button
                    onClick={() => setBackground('lightgrey')}
                    style={{
                      ...styles.bgBtn,
                      background: '#e5e7eb',
                      ...(background === 'lightgrey' ? styles.bgBtnActive : {})
                    }}
                  >
                    <div style={styles.bgPreview}></div>
                    <span>Light Grey</span>
                  </button>
                  <button
                    onClick={() => setBackground('auto')}
                    style={{
                      ...styles.bgBtn,
                      background: 'linear-gradient(135deg, #f3e8ff, #fce7f3)',
                      ...(background === 'auto' ? styles.bgBtnActive : {})
                    }}
                  >
                    <div style={styles.bgPreview}></div>
                    <span>Auto</span>
                  </button>
                </div>
              </div>
            </div>

            {/* AI Features */}
            <div style={styles.featuresCard}>
              <div style={styles.featuresGrid}>
                <div style={styles.featureItem}>
                  <div style={styles.featureIcon}>🧠</div>
                  <h3 style={styles.featureTitle}>Advanced AI</h3>
                  <p style={styles.featureText}>State-of-the-art AI models</p>
                </div>
                <div style={styles.featureItem}>
                  <div style={styles.featureIcon}>⚡</div>
                  <h3 style={styles.featureTitle}>Fast Processing</h3>
                  <p style={styles.featureText}>Generate in seconds</p>
                </div>
                <div style={styles.featureItem}>
                  <div style={styles.featureIcon}>🔒</div>
                  <h3 style={styles.featureTitle}>Secure & Private</h3>
                  <p style={styles.featureText}>Your data is protected</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={styles.actionButtons}>
              <button onClick={() => setActiveTab('upload')} style={styles.backBtn}>
                ← Back
              </button>
              <button onClick={handleSubmit} disabled={loading} style={styles.generateBtn}>
                {loading ? (
                  <>
                    <div style={styles.spinner}></div>
                    Generating...
                  </>
                ) : (
                  <>
                    ✨ Generate Models
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {activeTab === 'results' && result && (
          <div style={styles.tabContent}>
            {/* Success Message */}
            <div style={styles.successCard}>
              <span style={styles.successIcon}>✅</span>
              <div>
                <h3 style={styles.successTitle}>Generation Complete!</h3>
                <p style={styles.successText}>Your AI fashion models are ready to use</p>
              </div>
            </div>

            {/* Original Images */}
            {result.originalImages && (
              <div style={styles.card}>
                <div style={styles.cardHeader}>
                  <span style={styles.cardIcon}>📸</span>
                  <h2 style={styles.cardTitle}>Original Product Images</h2>
                </div>
                <div style={styles.cardBody}>
                  <div style={styles.originalGrid}>
                    {result.originalImages.map((img, idx) => (
                      <div key={idx} style={styles.originalImageWrapper}>
                        <img src={img} alt={`Original ${idx + 1}`} style={styles.originalImage} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Generated Models */}
            {result.generatedPoses && (
              <div style={styles.card}>
                <div style={styles.cardHeader}>
                  <span style={styles.cardIcon}>✨</span>
                  <h2 style={styles.cardTitle}>AI Generated Fashion Models</h2>
                </div>
                <div style={styles.cardBody}>
                  <div style={styles.generatedGrid}>
                    {result.generatedPoses.map((pose, idx) => (
                      <div key={idx} style={styles.generatedCard}>
                        <img src={pose.image} alt={pose.pose} style={styles.generatedImage} />
                        <div style={styles.generatedOverlay}>
                          <p style={styles.generatedPose}>{pose.pose}</p>
                          <button onClick={() => handleDownload(pose.image, pose.pose)} style={styles.downloadBtn}>
                            📥 Download
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div style={styles.resultActions}>
              <button onClick={() => {
                setResult(null);
                setImages([]);
                setActiveTab('upload');
              }} style={styles.newGenerateBtn}>
                Generate More
              </button>
              <Link to="/products" style={styles.viewProductsBtn}>
                View All Products →
              </Link>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-20px) translateX(20px); }
          50% { transform: translateY(0px) translateX(40px); }
          75% { transform: translateY(20px) translateX(20px); }
        }
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          33% { transform: translateY(-30px) translateX(-20px); }
          66% { transform: translateY(30px) translateX(20px); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    position: 'relative',
    overflowX: 'hidden',
  },
  
  bgCircle1: {
    position: 'fixed',
    width: '400px',
    height: '400px',
    background: 'linear-gradient(135deg, #667eea20, #764ba220)',
    borderRadius: '50%',
    top: '-100px',
    right: '-100px',
    opacity: 0.5,
    filter: 'blur(80px)',
    animation: 'float 8s ease-in-out infinite',
    pointerEvents: 'none',
  },
  
  bgCircle2: {
    position: 'fixed',
    width: '500px',
    height: '500px',
    background: 'linear-gradient(135deg, #f093fb20, #f5576c20)',
    borderRadius: '50%',
    bottom: '-150px',
    left: '-100px',
    opacity: 0.5,
    filter: 'blur(100px)',
    animation: 'floatSlow 12s ease-in-out infinite',
    pointerEvents: 'none',
  },
  
  bgCircle3: {
    position: 'fixed',
    width: '300px',
    height: '300px',
    background: 'linear-gradient(135deg, #4facfe20, #00f2fe20)',
    borderRadius: '50%',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    opacity: 0.3,
    filter: 'blur(60px)',
    animation: 'pulse 4s ease-in-out infinite',
    pointerEvents: 'none',
  },
  
  heroSection: {
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    padding: '60px 20px',
    textAlign: 'center',
  },
  
  heroContent: {
    maxWidth: '800px',
    margin: '0 auto',
  },
  
  heroBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    background: 'rgba(255,255,255,0.2)',
    padding: '8px 20px',
    borderRadius: '50px',
    marginBottom: '24px',
  },
  
  heroBadgeIcon: { fontSize: '16px' },
  heroBadgeText: { color: 'white', fontSize: '14px', fontWeight: '500' },
  
  heroTitle: {
    fontSize: '48px',
    fontWeight: '800',
    color: 'white',
    marginBottom: '16px',
    lineHeight: '1.2',
  },
  
  heroHighlight: {
    background: 'linear-gradient(135deg, #f093fb, #f5576c)',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent',
  },
  
  heroSubtitle: {
    fontSize: '18px',
    color: 'rgba(255,255,255,0.9)',
    maxWidth: '600px',
    margin: '0 auto',
  },
  
  mainContent: {
    maxWidth: '1000px',
    margin: '-30px auto 0 auto',
    padding: '0 20px 60px 20px',
    position: 'relative',
    zIndex: 10,
  },
  
  tabsContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '12px',
    marginBottom: '30px',
    flexWrap: 'wrap',
  },
  
  tab: {
    padding: '12px 24px',
    borderRadius: '50px',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  
  tabActive: {
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    color: 'white',
    boxShadow: '0 4px 15px rgba(102,126,234,0.3)',
  },
  
  tabInactive: {
    background: 'white',
    color: '#4b5563',
  },
  
  tabDisabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
  
  tabContent: {
    animation: 'fadeInUp 0.5s ease-out',
  },
  
  card: {
    background: 'white',
    borderRadius: '24px',
    marginBottom: '24px',
    overflow: 'hidden',
    boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)',
  },
  
  cardHeader: {
    padding: '20px 24px',
    borderBottom: '1px solid #e5e7eb',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  
  cardIcon: { fontSize: '24px' },
  cardTitle: { fontSize: '20px', fontWeight: '700', color: '#1f2937', margin: 0 },
  
  cardBody: { padding: '24px' },
  cardFooter: { padding: '16px 24px', background: '#f9fafb', borderTop: '1px solid #e5e7eb', textAlign: 'right' },
  
  uploadSuccess: {
    marginTop: '20px',
    padding: '16px',
    background: '#d1fae5',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  successTitle: { fontWeight: '600', color: '#065f46' },
  successText: { fontSize: '14px', color: '#065f46' },
  
  nextBtn: {
    padding: '12px 24px',
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  
  genderGrid: { display: 'flex', flexDirection: 'column', gap: '12px' },
  
  genderBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '16px',
    borderRadius: '16px',
    border: '2px solid',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    width: '100%',
    textAlign: 'left',
  },
  
  genderBtnActive: { borderColor: '#667eea', background: '#f0f0ff' },
  genderBtnInactive: { borderColor: '#e5e7eb', background: 'white' },
  genderIcon: { fontSize: '32px' },
  genderTitle: { fontWeight: '600', color: '#1f2937' },
  genderDesc: { fontSize: '12px', color: '#6b7280' },
  
  bgGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' },
  
  bgBtn: {
    padding: '20px',
    borderRadius: '16px',
    border: '2px solid transparent',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textAlign: 'center',
    fontWeight: '500',
  },
  
  bgBtnActive: { borderColor: '#667eea', boxShadow: '0 0 0 3px rgba(102,126,234,0.2)' },
  bgPreview: { width: '100%', height: '60px', borderRadius: '8px', marginBottom: '12px' },
  
  featuresCard: {
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    borderRadius: '24px',
    padding: '24px',
    marginBottom: '24px',
  },
  
  featuresGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' },
  
  featureItem: { textAlign: 'center', color: 'white' },
  featureIcon: { fontSize: '32px', marginBottom: '12px' },
  featureTitle: { fontSize: '16px', fontWeight: '600', marginBottom: '4px' },
  featureText: { fontSize: '12px', opacity: 0.8 },
  
  actionButtons: { display: 'flex', gap: '16px', justifyContent: 'flex-end' },
  
  backBtn: {
    padding: '12px 24px',
    background: 'white',
    color: '#4b5563',
    border: '2px solid #e5e7eb',
    borderRadius: '12px',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  
  generateBtn: {
    padding: '12px 32px',
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  
  spinner: {
    width: '18px',
    height: '18px',
    border: '2px solid white',
    borderTopColor: 'transparent',
    borderRadius: '50%',
    animation: 'spin 0.6s linear infinite',
  },
  
  successCard: {
    background: '#d1fae5',
    borderRadius: '16px',
    padding: '20px',
    marginBottom: '24px',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  successIcon: { fontSize: '32px' },
  
  originalGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px' },
  originalImageWrapper: { borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' },
  originalImage: { width: '100%', height: '150px', objectFit: 'cover' },
  
  generatedGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' },
  
  generatedCard: {
    position: 'relative',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)',
    transition: 'transform 0.3s ease',
  },
  
  generatedImage: { width: '100%', height: '300px', objectFit: 'cover' },
  
  generatedOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
    padding: '20px',
    transform: 'translateY(100%)',
    transition: 'transform 0.3s ease',
  },
  
  generatedPose: { color: 'white', fontWeight: '500', marginBottom: '8px' },
  
  downloadBtn: {
    padding: '6px 12px',
    background: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: '500',
  },
  
  resultActions: { display: 'flex', gap: '16px', justifyContent: 'center', marginTop: '24px' },
  
  newGenerateBtn: {
    padding: '12px 24px',
    background: 'white',
    color: '#667eea',
    border: '2px solid #667eea',
    borderRadius: '12px',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  
  viewProductsBtn: {
    padding: '12px 24px',
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '12px',
    fontWeight: '600',
  },
};

// Add hover styles
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  .next-btn:hover, .generate-btn:hover, .view-products-btn:hover { transform: translateY(-2px); box-shadow: 0 10px 20px rgba(102,126,234,0.3); }
  .back-btn:hover { background: #f3f4f6; }
  .gender-btn:hover { transform: translateX(5px); }
  .bg-btn:hover { transform: scale(1.05); }
  .generated-card:hover { transform: translateY(-5px); }
  .generated-card:hover .generated-overlay { transform: translateY(0); }
  .new-generate-btn:hover { background: #f3f4f6; transform: translateY(-2px); }
  @media (max-width: 768px) {
    .hero-title { font-size: 32px; }
    .features-grid { grid-template-columns: 1fr; gap: 16px; }
    .bg-grid { grid-template-columns: 1fr; }
    .generated-grid { grid-template-columns: 1fr; }
  }
`;
document.head.appendChild(styleSheet);

export default Generate;

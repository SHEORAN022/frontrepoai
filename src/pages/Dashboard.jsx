// // import React, { useState } from 'react';
// // import { Link } from 'react-router-dom';
// // import axios from 'axios';
// // import toast from 'react-hot-toast';

// // // ─── Model preview images ──────────────────────────────────────────────────────
// // const MODEL_PREVIEW = {
// //   female: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?w=400',
// //   male:   'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?w=400',
// //   kid:    'https://images.pexels.com/photos/2253871/pexels-photo-2253871.jpeg?w=400',
// // };

// // const GENDER_OPTIONS = [
// //   { value: 'female', emoji: '👩', label: 'Female Model', desc: 'Elegant & Professional' },
// //   { value: 'male',   emoji: '👨', label: 'Male Model',   desc: 'Stylish & Dynamic'      },
// //   { value: 'kid',    emoji: '🧒', label: 'Kids Model',   desc: 'Cute & Natural'         },
// // ];

// // const BG_OPTIONS = [
// //   { value: 'cream',     label: 'Cream',      color: '#fef3c7'                                    },
// //   { value: 'lightgrey', label: 'Light Grey', color: '#e5e7eb'                                    },
// //   { value: 'auto',      label: 'Auto AI',    color: 'linear-gradient(135deg, #f3e8ff, #fce7f3)' },
// // ];

// // const POSE_ICONS  = ['👤', '⬅️', '➡️', '🔙'];
// // const POSE_ANGLES = ['Front • 0°', 'Left • 45°', 'Right • 45°', 'Back • 180°'];

// // // ─────────────────────────────────────────────────────────────────────────────
// // export default function Generate() {
// //   const [step,       setStep]       = useState('upload');  // upload | settings | loading | results
// //   const [dragOver,   setDragOver]   = useState(false);
// //   const [image,      setImage]      = useState(null);      // { file, preview, name }
// //   const [gender,     setGender]     = useState('female');
// //   const [background, setBackground] = useState('cream');
// //   const [result,     setResult]     = useState(null);
// //   const [progress,   setProgress]   = useState(0);

// //   // ── file helpers ──────────────────────────────────────────────────────────
// //   const loadFile = (file) => {
// //     if (!file) return;
// //     if (!file.type.startsWith('image/')) {
// //       toast.error('Only image files are allowed');
// //       return;
// //     }
// //     if (image?.preview) URL.revokeObjectURL(image.preview);
// //     setImage({ file, preview: URL.createObjectURL(file), name: file.name });
// //     toast.success('Image uploaded!');
// //   };

// //   const removeImage = () => {
// //     if (image?.preview) URL.revokeObjectURL(image.preview);
// //     setImage(null);
// //     setResult(null);
// //     setStep('upload');
// //   };

// //   // ── fake progress while Replicate works (~2-4 min) ────────────────────────
// //   const startFakeProgress = () => {
// //     setProgress(0);
// //     const id = setInterval(() => {
// //       setProgress((p) => {
// //         if (p >= 88) { clearInterval(id); return 88; }
// //         return p + Math.random() * 1.2;
// //       });
// //     }, 3500);
// //     return id;
// //   };

// //   // ── generate ──────────────────────────────────────────────────────────────
// //   const handleGenerate = async () => {
// //     if (!image) { toast.error('Please upload a dress image first'); return; }

// //     setStep('loading');
// //     const timerId = startFakeProgress();

// //     const formData = new FormData();
// //     formData.append('images', image.file);
// //     formData.append('gender', gender);
// //     formData.append('background', background);

// //     try {
// //       const { data } = await axios.post('/api/ai/generate', formData, {
// //         headers: { 'Content-Type': 'multipart/form-data' },
// //         timeout: 420000, // 7 min
// //       });

// //       clearInterval(timerId);
// //       setProgress(100);

// //       if (data.success) {
// //         setResult(data);
// //         setTimeout(() => setStep('results'), 700);
// //         toast.success('✅ AI Fashion Models generated!');
// //       } else {
// //         toast.error(data.message || 'Generation failed');
// //         setStep('settings');
// //       }
// //     } catch (err) {
// //       clearInterval(timerId);
// //       const msg = err.response?.data?.message || 'Generation failed. Check backend terminal.';
// //       toast.error(msg);
// //       setStep('settings');
// //     }
// //   };

// //   // ── download ──────────────────────────────────────────────────────────────
// //   const downloadImage = async (url, fileName) => {
// //     try {
// //       const res  = await fetch(url);
// //       const blob = await res.blob();
// //       const link = document.createElement('a');
// //       link.href     = URL.createObjectURL(blob);
// //       link.download = fileName;
// //       document.body.appendChild(link);
// //       link.click();
// //       document.body.removeChild(link);
// //       toast.success('Downloaded!');
// //     } catch {
// //       toast.error('Download failed. Try right-click → Save image.');
// //     }
// //   };

// //   const downloadAll = () => {
// //     result?.generatedPoses?.forEach((pose, i) => {
// //       setTimeout(
// //         () => downloadImage(pose.image, `${pose.pose.replace(/ /g, '-')}.jpg`),
// //         i * 600
// //       );
// //     });
// //   };

// //   // ─── RENDER ───────────────────────────────────────────────────────────────
// //   return (
// //     <div style={S.page}>

// //       {/* ══ HERO ══════════════════════════════════════════════════════════ */}
// //       <div style={S.hero}>
        
        
// //         <p style={S.heroSub}>
// //           Upload your dress → AI places it on real models in 4 professional poses
// //         </p>
// //         <div style={S.heroStepsRow}>
// //           {['1. Upload Dress', '2. Choose Model', '3. AI Generates', '4. Download'].map((t, i) => (
// //             <span key={i} style={S.heroStep}>{t}</span>
// //           ))}
// //         </div>
// //       </div>

     

// //       <div style={S.body}>

// //         {/* ══ UPLOAD ════════════════════════════════════════════════════════ */}
// //         {step === 'upload' && (
// //           <div style={S.card}>
// //             <div style={S.cardHead}>
// //               <span style={S.cardIcon}>📸</span>
// //               <h2 style={S.cardTitle}>Upload Your Dress / Garment</h2>
// //             </div>

// //             {!image ? (
// //               <div
// //                 style={{ ...S.dropzone, ...(dragOver ? S.dropzoneActive : {}) }}
// //                 onClick={() => document.getElementById('fileInput').click()}
// //                 onDragOver={(e)  => { e.preventDefault(); setDragOver(true);  }}
// //                 onDragLeave={()  => setDragOver(false)}
// //                 onDrop={(e)      => { e.preventDefault(); setDragOver(false); loadFile(e.dataTransfer.files[0]); }}
// //               >
// //                 <input
// //                   id="fileInput" type="file" accept="image/*"
// //                   style={{ display: 'none' }}
// //                   onChange={(e) => loadFile(e.target.files[0])}
// //                 />
// //                 <div style={{ fontSize: 56, marginBottom: 14 }}>👗</div>
// //                 <p style={S.dropTitle}>Click or drag & drop your garment image</p>
// //                 <p style={S.dropHint}>PNG · JPG · WEBP · Max 10 MB</p>
// //                 <p style={S.dropHint}>The AI will place this exact garment on the model</p>
// //               </div>
// //             ) : (
// //               <div style={S.previewRow}>
// //                 <img src={image.preview} alt="garment" style={S.previewImg} />
// //                 <div>
// //                   <p style={{ fontWeight: 700, color: '#065f46', margin: '0 0 6px', fontSize: 15 }}>
// //                     ✅ {image.name}
// //                   </p>
// //                   <p style={{ fontSize: 13, color: '#047857', margin: '0 0 16px', lineHeight: 1.5 }}>
// //                     This garment will be virtually placed on the AI model in all 4 poses using Replicate IDM-VTON.
// //                   </p>
// //                   <button onClick={removeImage} style={S.ghostSmBtn}>🔄 Change Image</button>
// //                 </div>
// //               </div>
// //             )}

// //             <div style={S.cardFoot}>
// //               <button
// //                 onClick={() => image && setStep('settings')}
// //                 style={{ ...S.primaryBtn, ...(!image ? S.btnDisabled : {}) }}
// //                 disabled={!image}
// //               >
// //                 Continue to Settings →
// //               </button>
// //             </div>
// //           </div>
// //         )}

// //         {/* ══ SETTINGS ══════════════════════════════════════════════════════ */}
// //         {step === 'settings' && (
// //           <>
// //             {/* Garment + model preview */}
// //             <div style={{ ...S.card, padding: 24 }}>
// //               <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
// //                 {/* Garment preview */}
// //                 <div style={{ flex: '0 0 auto' }}>
// //                   <p style={S.sectionLabel}>Your Garment</p>
// //                   <img
// //                     src={image?.preview} alt="garment"
// //                     style={{ width: 140, height: 180, objectFit: 'cover', borderRadius: 12, border: '1px solid #e5e7eb' }}
// //                   />
// //                 </div>

// //                 {/* Model preview (updates on gender change) */}
// //                 <div style={{ flex: '0 0 auto' }}>
// //                   <p style={S.sectionLabel}>Model Preview</p>
// //                   <img
// //                     src={MODEL_PREVIEW[gender]} alt="model"
// //                     style={{ width: 140, height: 180, objectFit: 'cover', borderRadius: 12, border: '1px solid #e5e7eb' }}
// //                   />
// //                 </div>

// //                 {/* Gender selection */}
// //                 <div style={{ flex: 1, minWidth: 220 }}>
// //                   <p style={S.sectionLabel}>Select Model Type</p>
// //                   <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
// //                     {GENDER_OPTIONS.map(({ value, emoji, label, desc }) => (
// //                       <button
// //                         key={value}
// //                         onClick={() => setGender(value)}
// //                         style={{ ...S.genderBtn, ...(gender === value ? S.genderBtnActive : {}) }}
// //                       >
// //                         <span style={{ fontSize: 28, flexShrink: 0 }}>{emoji}</span>
// //                         <div style={{ textAlign: 'left' }}>
// //                           <div style={{ fontWeight: 700, fontSize: 14, color: '#1f2937' }}>{label}</div>
// //                           <div style={{ fontSize: 12, color: '#6b7280', marginTop: 2 }}>{desc}</div>
// //                         </div>
// //                         {gender === value && <span style={S.checkChip}>✓ Selected</span>}
// //                       </button>
// //                     ))}
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Background */}
// //             <div style={{ ...S.card, padding: 24 }}>
// //               <p style={S.sectionLabel}>Background Style</p>
// //               <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
// //                 {BG_OPTIONS.map(({ value, label, color }) => (
// //                   <button
// //                     key={value}
// //                     onClick={() => setBackground(value)}
// //                     style={{
// //                       ...S.bgBtn,
// //                       border: background === value
// //                         ? '2px solid #667eea'
// //                         : '2px solid #e5e7eb',
// //                       boxShadow: background === value
// //                         ? '0 0 0 3px rgba(102,126,234,.2)'
// //                         : 'none',
// //                     }}
// //                   >
// //                     <div style={{ width: '100%', height: 52, borderRadius: 8, marginBottom: 8, background: color }} />
// //                     <span style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>{label}</span>
// //                     {background === value && (
// //                       <span style={{ fontSize: 11, color: '#667eea', marginTop: 4 }}>✓ Selected</span>
// //                     )}
// //                   </button>
// //                 ))}
// //               </div>
// //             </div>

           
// //             {/* Actions */}
// //             <div style={{ display: 'flex', gap: 14, justifyContent: 'flex-end' }}>
// //               <button onClick={() => setStep('upload')} style={S.ghostBtn}>← Back</button>
// //               <button onClick={handleGenerate} style={S.generateBtn}>
// //                 ✨ Generate AI Fashion Models
// //               </button>
// //             </div>
// //           </>
// //         )}

// //         {/* ══ LOADING ═══════════════════════════════════════════════════════ */}
// //         {step === 'loading' && (
// //           <div style={{ ...S.card, padding: '56px 32px', textAlign: 'center' }}>
// //             <div style={S.bigSpinner} />
// //             <h2 style={{ margin: '24px 0 8px', fontSize: 22, fontWeight: 700, color: '#111827' }}>
// //               AI is generating your models…
// //             </h2>
// //             <p style={{ color: '#6b7280', margin: '0 0 32px', fontSize: 15 }}>
// //               Replicate IDM-VTON is placing your dress on the model.<br />
// //               This takes <strong>2–4 minutes</strong> — please don't close this page.
// //             </p>

// //             {/* Progress bar */}
// //             <div style={S.progressTrack}>
// //               <div style={{ ...S.progressFill, width: `${Math.min(progress, 100).toFixed(1)}%` }} />
// //             </div>
// //             <p style={{ fontSize: 13, color: '#9ca3af', margin: '10px 0 36px' }}>
// //               {Math.min(progress, 100).toFixed(0)}% complete
// //             </p>

// //             {/* Step list */}
// //             <div style={{ display: 'inline-flex', flexDirection: 'column', gap: 14, textAlign: 'left' }}>
// //               {[
// //                 'Uploading garment to Cloudinary',
// //                 'Sending to Replicate IDM-VTON API',
// //                 'Generating Front View (0°)',
// //                 'Generating Left Angle (45°)',
// //                 'Generating Right Angle (45°)',
// //                 'Generating Back View (180°)',
// //               ].map((label, i) => {
// //                 const done = progress > i * 14;
// //                 return (
// //                   <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
// //                     <div style={{
// //                       width: 10, height: 10, borderRadius: '50%', flexShrink: 0,
// //                       background: done ? '#667eea' : '#e5e7eb',
// //                       transition: 'background .6s',
// //                     }} />
// //                     <span style={{ fontSize: 14, color: done ? '#111827' : '#9ca3af', transition: 'color .6s' }}>
// //                       {label}
// //                     </span>
// //                   </div>
// //                 );
// //               })}
// //             </div>
// //           </div>
// //         )}

// //         {/* ══ RESULTS ═══════════════════════════════════════════════════════ */}
// //         {step === 'results' && result && (
// //           <>
// //             {/* Success banner */}
// //             <div style={S.successBanner}>
// //               <span style={{ fontSize: 36 }}>✅</span>
// //               <div style={{ flex: 1 }}>
// //                 <p style={{ margin: 0, fontWeight: 700, fontSize: 16, color: '#065f46' }}>
// //                   Generation Complete!
// //                 </p>
// //                 <p style={{ margin: '4px 0 0', fontSize: 13, color: '#047857' }}>
// //                   Your dress has been virtually placed on the AI model in 4 poses using IDM-VTON
// //                 </p>
// //               </div>
// //               <button onClick={downloadAll} style={S.dlAllBtn}>⬇️ Download All 4</button>
// //             </div>

// //             {/* Original garment */}
// //             <div style={{ ...S.card, padding: '18px 24px', display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
// //               {result.originalImages?.map((img, i) => (
// //                 <img
// //                   key={i} src={img} alt="original garment"
// //                   style={{ width: 80, height: 100, objectFit: 'cover', borderRadius: 10, border: '1px solid #e5e7eb' }}
// //                 />
// //               ))}
// //               <div>
// //                 <p style={{ margin: 0, fontWeight: 700, fontSize: 15, color: '#111827' }}>Original Garment</p>
// //                 <p style={{ margin: '5px 0 0', fontSize: 13, color: '#6b7280' }}>
// //                   Virtually placed on the model using Replicate IDM-VTON AI
// //                 </p>
// //               </div>
// //             </div>

// //             {/* 4 pose cards */}
// //             <div style={S.card}>
// //               <div style={S.cardHead}>
// //                 <span style={S.cardIcon}>✨</span>
// //                 <h2 style={S.cardTitle}>AI Generated — 4 Poses</h2>
// //               </div>
// //               <div style={S.posesGrid}>
// //                 {result.generatedPoses?.map((pose, idx) => (
// //                   <div key={idx} style={S.poseCard}>
// //                     {/* Pose header */}
// //                     <div style={S.poseCardHead}>
// //                       <span style={{ fontSize: 18 }}>{POSE_ICONS[idx]}</span>
// //                       <span style={{ fontWeight: 700, fontSize: 13, color: '#1f2937' }}>{pose.pose}</span>
// //                     </div>

// //                     {/* Image + overlay */}
// //                     <div style={{ position: 'relative' }}>
// //                       <img
// //                         src={pose.image}
// //                         alt={pose.pose}
// //                         style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover', display: 'block' }}
// //                       />
// //                       {/* Always-visible bottom overlay */}
// //                       <div style={S.poseOverlay}>
// //                         <p style={{ margin: '0 0 8px', fontSize: 11, color: 'rgba(255,255,255,.85)' }}>
// //                           {POSE_ANGLES[idx]}
// //                         </p>
// //                         <button
// //                           onClick={() => downloadImage(pose.image, `${pose.pose.replace(/ /g, '-')}.jpg`)}
// //                           style={S.dlBtn}
// //                         >
// //                           📥 Download
// //                         </button>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 ))}
// //               </div>
// //             </div>

// //             {/* Bottom actions */}
// //             <div style={{ display: 'flex', gap: 14, justifyContent: 'center', marginTop: 8 }}>
// //               <button
// //                 onClick={() => { setImage(null); setResult(null); setStep('upload'); }}
// //                 style={S.ghostBtn}
// //               >
// //                 🔄 Generate New
// //               </button>
// //               <Link to="/products" style={S.primaryLinkBtn}>
// //                 View All Products →
// //               </Link>
// //             </div>
// //           </>
// //         )}

// //       </div>{/* end body */}

// //       <style>{`
// //         @keyframes spin    { to { transform: rotate(360deg); } }
// //         @keyframes fadeUp  { from { opacity:0; transform:translateY(22px); } to { opacity:1; transform:translateY(0); } }
// //         * { box-sizing: border-box; }
// //         @media (max-width: 700px) {
// //           .poses-grid { grid-template-columns: repeat(2,1fr) !important; }
// //         }
// //       `}</style>
// //     </div>
// //   );
// // }

// // // ═══════════════════════════════════════════════════════════════════════════════
// // //  STYLES
// // // ═══════════════════════════════════════════════════════════════════════════════
// // const S = {
// //   page: { minHeight: '100vh', background: '#f1f5f9' },

// //   // Hero
// //   hero: {
// //     background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
// //     padding: '60px 20px 78px',
// //     textAlign: 'center',
// //     color: 'white',
// //   },
// //   heroBadge: {
// //     display: 'inline-block',
// //     background: 'rgba(255,255,255,.2)',
// //     padding: '7px 20px',
// //     borderRadius: 50,
// //     fontSize: 14,
// //     fontWeight: 500,
// //     marginBottom: 18,
// //   },
// //   heroTitle: { fontSize: 40, fontWeight: 800, margin: '0 0 12px', lineHeight: 1.2 },
// //   heroAccent: {
// //     background: 'linear-gradient(135deg, #f9a8d4, #fde68a)',
// //     WebkitBackgroundClip: 'text',
// //     backgroundClip: 'text',
// //     color: 'transparent',
// //   },
// //   heroSub: { fontSize: 16, opacity: .9, margin: '0 0 24px' },
// //   heroStepsRow: { display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' },
// //   heroStep: {
// //     background: 'rgba(255,255,255,.15)',
// //     padding: '8px 18px',
// //     borderRadius: 50,
// //     fontSize: 13,
// //     fontWeight: 500,
// //   },

// //   // Tabs
// //   tabsWrap: {
// //     display: 'flex',
// //     justifyContent: 'center',
// //     gap: 10,
// //     padding: '0 20px',
// //     marginTop: -24,
// //     marginBottom: 28,
// //     flexWrap: 'wrap',
// //   },
// //   tab: {
// //     padding: '10px 24px',
// //     borderRadius: 50,
// //     border: 'none',
// //     fontSize: 14,
// //     fontWeight: 600,
// //     cursor: 'pointer',
// //     background: 'white',
// //     color: '#6b7280',
// //     boxShadow: '0 2px 10px rgba(0,0,0,.1)',
// //     transition: 'all .2s',
// //   },
// //   tabActive: {
// //     background: 'linear-gradient(135deg, #667eea, #764ba2)',
// //     color: 'white',
// //     boxShadow: '0 4px 16px rgba(102,126,234,.4)',
// //   },
// //   tabDisabled: { opacity: .4, cursor: 'not-allowed' },

// //   // Body
// //   body: {
// //     maxWidth: 980,
// //     margin: '0 auto',
// //     padding: '0 20px 60px',
// //     animation: 'fadeUp .4s ease',
// //   },

// //   // Card
// //   card: {
// //     background: 'white',
// //     borderRadius: 20,
// //     boxShadow: '0 4px 24px rgba(0,0,0,.07)',
// //     marginBottom: 20,
// //     overflow: 'hidden',
// //   },
// //   cardHead: {
// //     padding: '18px 24px',
// //     borderBottom: '1px solid #f1f5f9',
// //     display: 'flex',
// //     alignItems: 'center',
// //     gap: 12,
// //   },
// //   cardIcon:  { fontSize: 22 },
// //   cardTitle: { fontSize: 18, fontWeight: 700, color: '#111827', margin: 0 },
// //   cardFoot:  {
// //     padding: '14px 24px',
// //     background: '#f9fafb',
// //     borderTop: '1px solid #f1f5f9',
// //     display: 'flex',
// //     justifyContent: 'flex-end',
// //   },

// //   // Drop zone
// //   dropzone: {
// //     margin: '20px',
// //     border: '2px dashed #d1d5db',
// //     borderRadius: 16,
// //     padding: '52px 20px',
// //     textAlign: 'center',
// //     cursor: 'pointer',
// //     transition: 'all .2s',
// //     background: 'white',
// //   },
// //   dropzoneActive: { borderColor: '#667eea', background: '#f0efff' },
// //   dropTitle: { fontSize: 16, fontWeight: 600, color: '#374151', margin: '0 0 8px' },
// //   dropHint:  { fontSize: 13, color: '#9ca3af', margin: '4px 0 0' },

// //   // Preview row
// //   previewRow: {
// //     display: 'flex',
// //     gap: 20,
// //     alignItems: 'center',
// //     padding: '20px 24px',
// //     background: '#f0fdf4',
// //     margin: 20,
// //     borderRadius: 14,
// //     border: '1px solid #bbf7d0',
// //     flexWrap: 'wrap',
// //   },
// //   previewImg: {
// //     width: 90, height: 110,
// //     objectFit: 'cover',
// //     borderRadius: 10,
// //     border: '1px solid #e5e7eb',
// //     flexShrink: 0,
// //   },

// //   sectionLabel: {
// //     fontSize: 12,
// //     fontWeight: 700,
// //     color: '#6b7280',
// //     textTransform: 'uppercase',
// //     letterSpacing: '.6px',
// //     margin: '0 0 10px',
// //   },

// //   // Gender button
// //   genderBtn: {
// //     display: 'flex',
// //     alignItems: 'center',
// //     gap: 14,
// //     padding: '14px 16px',
// //     borderRadius: 12,
// //     border: '2px solid #e5e7eb',
// //     background: 'white',
// //     cursor: 'pointer',
// //     width: '100%',
// //     transition: 'all .2s',
// //     position: 'relative',
// //   },
// //   genderBtnActive: { borderColor: '#667eea', background: '#f5f3ff' },
// //   checkChip: {
// //     marginLeft: 'auto',
// //     background: '#667eea',
// //     color: 'white',
// //     padding: '3px 10px',
// //     borderRadius: 50,
// //     fontSize: 11,
// //     fontWeight: 700,
// //     flexShrink: 0,
// //   },

// //   // Background button
// //   bgBtn: {
// //     flex: '1 1 100px',
// //     padding: '14px',
// //     borderRadius: 14,
// //     background: 'white',
// //     cursor: 'pointer',
// //     textAlign: 'center',
// //     display: 'flex',
// //     flexDirection: 'column',
// //     alignItems: 'center',
// //     transition: 'all .2s',
// //   },

// //   // Info row
// //   infoRow: { display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 20 },
// //   infoChip: {
// //     padding: '8px 16px',
// //     borderRadius: 50,
// //     background: 'linear-gradient(135deg, #667eea, #764ba2)',
// //     color: 'white',
// //     fontSize: 13,
// //     fontWeight: 500,
// //   },

// //   // Buttons
// //   primaryBtn: {
// //     padding: '12px 28px',
// //     background: 'linear-gradient(135deg, #667eea, #764ba2)',
// //     color: 'white',
// //     border: 'none',
// //     borderRadius: 12,
// //     fontSize: 15,
// //     fontWeight: 600,
// //     cursor: 'pointer',
// //   },
// //   primaryLinkBtn: {
// //     padding: '12px 28px',
// //     background: 'linear-gradient(135deg, #667eea, #764ba2)',
// //     color: 'white',
// //     textDecoration: 'none',
// //     borderRadius: 12,
// //     fontSize: 15,
// //     fontWeight: 600,
// //     display: 'inline-block',
// //   },
// //   ghostBtn: {
// //     padding: '12px 24px',
// //     background: 'white',
// //     color: '#4b5563',
// //     border: '2px solid #e5e7eb',
// //     borderRadius: 12,
// //     fontSize: 15,
// //     fontWeight: 600,
// //     cursor: 'pointer',
// //   },
// //   ghostSmBtn: {
// //     padding: '7px 14px',
// //     background: 'white',
// //     color: '#374151',
// //     border: '1px solid #d1d5db',
// //     borderRadius: 8,
// //     fontSize: 13,
// //     fontWeight: 500,
// //     cursor: 'pointer',
// //   },
// //   generateBtn: {
// //     padding: '13px 32px',
// //     background: 'linear-gradient(135deg, #667eea, #764ba2)',
// //     color: 'white',
// //     border: 'none',
// //     borderRadius: 12,
// //     fontSize: 15,
// //     fontWeight: 700,
// //     cursor: 'pointer',
// //     boxShadow: '0 4px 16px rgba(102,126,234,.4)',
// //   },
// //   btnDisabled: { opacity: .5, cursor: 'not-allowed' },

// //   // Loading
// //   bigSpinner: {
// //     width: 60,
// //     height: 60,
// //     border: '5px solid #e5e7eb',
// //     borderTopColor: '#667eea',
// //     borderRadius: '50%',
// //     margin: '0 auto',
// //     animation: 'spin 1s linear infinite',
// //   },
// //   progressTrack: {
// //     height: 10,
// //     background: '#e5e7eb',
// //     borderRadius: 10,
// //     overflow: 'hidden',
// //     maxWidth: 520,
// //     margin: '0 auto',
// //   },
// //   progressFill: {
// //     height: '100%',
// //     borderRadius: 10,
// //     background: 'linear-gradient(135deg, #667eea, #764ba2)',
// //     transition: 'width .9s ease',
// //   },

// //   // Success banner
// //   successBanner: {
// //     background: '#d1fae5',
// //     border: '1px solid #6ee7b7',
// //     borderRadius: 16,
// //     padding: '18px 22px',
// //     display: 'flex',
// //     alignItems: 'center',
// //     gap: 16,
// //     marginBottom: 20,
// //     flexWrap: 'wrap',
// //   },
// //   dlAllBtn: {
// //     padding: '10px 20px',
// //     background: '#059669',
// //     color: 'white',
// //     border: 'none',
// //     borderRadius: 10,
// //     fontWeight: 700,
// //     fontSize: 14,
// //     cursor: 'pointer',
// //   },

// //   // Poses grid
// //   posesGrid: {
// //     display: 'grid',
// //     gridTemplateColumns: 'repeat(4, 1fr)',
// //     gap: 16,
// //     padding: '16px 24px 24px',
// //   },
// //   poseCard: {
// //     borderRadius: 12,
// //     overflow: 'hidden',
// //     border: '1px solid #e5e7eb',
// //     background: '#f9fafb',
// //   },
// //   poseCardHead: {
// //     padding: '10px 12px',
// //     display: 'flex',
// //     alignItems: 'center',
// //     gap: 8,
// //     background: '#f1f5f9',
// //     borderBottom: '1px solid #e5e7eb',
// //   },
// //   poseOverlay: {
// //     position: 'absolute',
// //     bottom: 0,
// //     left: 0,
// //     right: 0,
// //     background: 'linear-gradient(to top, rgba(0,0,0,.78) 0%, transparent 100%)',
// //     padding: '22px 12px 12px',
// //     display: 'flex',
// //     flexDirection: 'column',
// //     alignItems: 'center',
// //   },
// //   dlBtn: {
// //     padding: '6px 18px',
// //     background: 'white',
// //     border: 'none',
// //     borderRadius: 8,
// //     fontSize: 12,
// //     fontWeight: 700,
// //     cursor: 'pointer',
// //     color: '#111827',
// //   },
// // };
// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import toast from 'react-hot-toast';

// // ─── Model preview images ──────────────────────────────────────────────────────
// const MODEL_PREVIEW = {
//   female: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?w=400',
//   male:   'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?w=400',
//   kid:    'https://images.pexels.com/photos/2253871/pexels-photo-2253871.jpeg?w=400',
// };

// const GENDER_OPTIONS = [
//   { value: 'female', emoji: '👩', label: 'Female Model', desc: 'Elegant & Professional' },
//   { value: 'male',   emoji: '👨', label: 'Male Model',   desc: 'Stylish & Dynamic'      },
//   { value: 'kid',    emoji: '🧒', label: 'Kids Model',   desc: 'Cute & Natural'         },
// ];

// const BG_OPTIONS = [
//   { value: 'cream',     label: 'Cream',      color: '#fef3c7'                                    },
//   { value: 'lightgrey', label: 'Light Grey', color: '#e5e7eb'                                    },
//   { value: 'auto',      label: 'Auto AI',    color: 'linear-gradient(135deg, #f3e8ff, #fce7f3)' },
// ];

// const POSE_ICONS  = ['👤', '⬅️', '➡️', '🔙'];
// const POSE_ANGLES = ['Front • 0°', 'Left • 45°', 'Right • 45°', 'Back • 180°'];

// // ─────────────────────────────────────────────────────────────────────────────
// export default function Generate() {
//   const [step,       setStep]       = useState('upload');  // upload | settings | loading | results
//   const [dragOver,   setDragOver]   = useState(false);
//   const [image,      setImage]      = useState(null);      // { file, preview, name }
//   const [gender,     setGender]     = useState('female');
//   const [background, setBackground] = useState('cream');
//   const [result,     setResult]     = useState(null);
//   const [progress,   setProgress]   = useState(0);
//   const [isMobile,   setIsMobile]   = useState(false);

//   // Check if mobile
//   useEffect(() => {
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth <= 768);
//     };
//     checkMobile();
//     window.addEventListener('resize', checkMobile);
//     return () => window.removeEventListener('resize', checkMobile);
//   }, []);

//   // ── file helpers ──────────────────────────────────────────────────────────
//   const loadFile = (file) => {
//     if (!file) return;
//     if (!file.type.startsWith('image/')) {
//       toast.error('Only image files are allowed');
//       return;
//     }
//     if (file.size > 10 * 1024 * 1024) {
//       toast.error('File size must be less than 10MB');
//       return;
//     }
//     if (image?.preview) URL.revokeObjectURL(image.preview);
//     setImage({ file, preview: URL.createObjectURL(file), name: file.name });
//     toast.success('Image uploaded!');
//   };

//   const removeImage = () => {
//     if (image?.preview) URL.revokeObjectURL(image.preview);
//     setImage(null);
//     setResult(null);
//     setStep('upload');
//   };

//   // ── fake progress while Replicate works (~2-4 min) ────────────────────────
//   const startFakeProgress = () => {
//     setProgress(0);
//     const id = setInterval(() => {
//       setProgress((p) => {
//         if (p >= 88) { clearInterval(id); return 88; }
//         return p + Math.random() * 1.2;
//       });
//     }, 3500);
//     return id;
//   };

//   // ── generate ──────────────────────────────────────────────────────────────
//   const handleGenerate = async () => {
//     if (!image) { toast.error('Please upload a dress image first'); return; }

//     setStep('loading');
//     const timerId = startFakeProgress();

//     const formData = new FormData();
//     formData.append('images', image.file);
//     formData.append('gender', gender);
//     formData.append('background', background);

//     try {
//       const { data } = await axios.post('/api/ai/generate', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//         timeout: 420000, // 7 min
//       });

//       clearInterval(timerId);
//       setProgress(100);

//       if (data.success) {
//         setResult(data);
//         setTimeout(() => setStep('results'), 700);
//         toast.success('✅ AI Fashion Models generated!');
//       } else {
//         toast.error(data.message || 'Generation failed');
//         setStep('settings');
//       }
//     } catch (err) {
//       clearInterval(timerId);
//       const msg = err.response?.data?.message || 'Generation failed. Check backend terminal.';
//       toast.error(msg);
//       setStep('settings');
//     }
//   };

//   // ── download ──────────────────────────────────────────────────────────────
//   const downloadImage = async (url, fileName) => {
//     try {
//       const res  = await fetch(url);
//       const blob = await res.blob();
//       const link = document.createElement('a');
//       link.href     = URL.createObjectURL(blob);
//       link.download = fileName;
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//       toast.success('Downloaded!');
//     } catch {
//       toast.error('Download failed. Try right-click → Save image.');
//     }
//   };

//   const downloadAll = () => {
//     result?.generatedPoses?.forEach((pose, i) => {
//       setTimeout(
//         () => downloadImage(pose.image, `${pose.pose.replace(/ /g, '-')}.jpg`),
//         i * 600
//       );
//     });
//   };

//   // ─── RENDER ───────────────────────────────────────────────────────────────
//   return (
//     <div style={S.page}>

//       {/* ══ HERO ══════════════════════════════════════════════════════════ */}
//       <div style={S.hero}>
        
//         <h1 style={S.heroTitle}>
//                     Zentrue{' '}
//           <span style={S.heroAccent}>
//             Fashion
//           </span>
//           <br />

//         </h1>
//         <p style={S.heroSub}>
//           Upload your dress → AI places it on real models in 4 professional poses
//         </p>
        
//       </div>

//       <div style={S.body}>

//         {/* ══ UPLOAD ════════════════════════════════════════════════════════ */}
//         {step === 'upload' && (
//           <div style={S.card}>
//             <div style={S.cardHead}>
//               <span style={S.cardIcon}>📸</span>
//               <h2 style={S.cardTitle}>Upload Your Dress</h2>
//             </div>

//             {!image ? (
//               <div
//                 style={{ ...S.dropzone, ...(dragOver ? S.dropzoneActive : {}) }}
//                 onClick={() => document.getElementById('fileInput').click()}
//                 onDragOver={(e)  => { e.preventDefault(); setDragOver(true);  }}
//                 onDragLeave={()  => setDragOver(false)}
//                 onDrop={(e)      => { e.preventDefault(); setDragOver(false); loadFile(e.dataTransfer.files[0]); }}
//               >
//                 <input
//                   id="fileInput" type="file" accept="image/*"
//                   style={{ display: 'none' }}
//                   onChange={(e) => loadFile(e.target.files[0])}
//                 />
//                 <div style={{ fontSize: isMobile ? 48 : 56, marginBottom: 14 }}>👗</div>
//                 <p style={S.dropTitle}>Tap to upload your garment</p>
//                 <p style={S.dropHint}>PNG · JPG · WEBP · Max 10 MB</p>
//                 <p style={S.dropHint}>AI will place this garment on the model</p>
//               </div>
//             ) : (
//               <div style={S.previewRow}>
//                 <img src={image.preview} alt="garment" style={S.previewImg} />
//                 <div style={S.previewInfo}>
//                   <p style={S.previewName}>✅ {image.name}</p>
//                   <p style={S.previewDesc}>
//                     This garment will be virtually placed on the Zentrue AI model in all 4 poses
//                   </p>
//                   <button onClick={removeImage} style={S.ghostSmBtn}>🔄 Change Image</button>
//                 </div>
//               </div>
//             )}

//             <div style={S.cardFoot}>
//               <button
//                 onClick={() => image && setStep('settings')}
//                 style={{ ...S.primaryBtn, ...(!image ? S.btnDisabled : {}) }}
//                 disabled={!image}
//               >
//                 Continue →
//               </button>
//             </div>
//           </div>
//         )}

//         {/* ══ SETTINGS ══════════════════════════════════════════════════════ */}
//         {step === 'settings' && (
//           <>
//             {/* Garment + model preview */}
//             <div style={{ ...S.card, padding: isMobile ? 16 : 24 }}>
//               <div style={S.settingsGrid}>
//                 {/* Garment preview */}
//                 <div style={S.previewBox}>
//                   <p style={S.sectionLabel}>Your Garment</p>
//                   <img
//                     src={image?.preview} alt="garment"
//                     style={S.smallPreviewImg}
//                   />
//                 </div>

//                 {/* Model preview */}
//                 <div style={S.previewBox}>
//                   <p style={S.sectionLabel}>Model Preview</p>
//                   <img
//                     src={MODEL_PREVIEW[gender]} alt="model"
//                     style={S.smallPreviewImg}
//                   />
//                 </div>

//                 {/* Gender selection - scrollable on mobile */}
//                 <div style={S.genderSection}>
//                   <p style={S.sectionLabel}>Select Model Type</p>
//                   <div style={S.genderList}>
//                     {GENDER_OPTIONS.map(({ value, emoji, label, desc }) => (
//                       <button
//                         key={value}
//                         onClick={() => setGender(value)}
//                         style={{ ...S.genderBtn, ...(gender === value ? S.genderBtnActive : {}) }}
//                       >
//                         <span style={{ fontSize: isMobile ? 24 : 28, flexShrink: 0 }}>{emoji}</span>
//                         <div style={{ textAlign: 'left', flex: 1 }}>
//                           <div style={S.genderLabel}>{label}</div>
//                           {!isMobile && <div style={S.genderDesc}>{desc}</div>}
//                         </div>
//                         {gender === value && <span style={S.checkChip}>✓</span>}
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Background */}
//             <div style={{ ...S.card, padding: isMobile ? 16 : 24 }}>
//               <p style={S.sectionLabel}>Background Style</p>
//               <div style={S.bgGrid}>
//                 {BG_OPTIONS.map(({ value, label, color }) => (
//                   <button
//                     key={value}
//                     onClick={() => setBackground(value)}
//                     style={{
//                       ...S.bgBtn,
//                       border: background === value
//                         ? '2px solid #667eea'
//                         : '2px solid #e5e7eb',
//                     }}
//                   >
//                     <div style={{ ...S.bgPreview, background: color }} />
//                     <span style={S.bgLabel}>{label}</span>
//                     {background === value && (
//                       <span style={S.bgSelected}>✓</span>
//                     )}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Actions */}
//             <div style={S.actionButtons}>
//               <button onClick={() => setStep('upload')} style={S.ghostBtn}>← Back</button>
//               <button onClick={handleGenerate} style={S.generateBtn}>
//                 ✨ Generate
//               </button>
//             </div>
//           </>
//         )}

//         {/* ══ LOADING ═══════════════════════════════════════════════════════ */}
//         {step === 'loading' && (
//           <div style={{ ...S.card, padding: isMobile ? '40px 20px' : '56px 32px', textAlign: 'center' }}>
//             <div style={S.bigSpinner} />
//             <h2 style={S.loadingTitle}>
//               AI is generating...
//             </h2>
//             <p style={S.loadingSub}>
//               This takes <strong>2–4 minutes</strong> — please don't close this page.
//             </p>

//             {/* Progress bar */}
//             <div style={S.progressTrack}>
//               <div style={{ ...S.progressFill, width: `${Math.min(progress, 100).toFixed(1)}%` }} />
//             </div>
//             <p style={S.progressText}>
//               {Math.min(progress, 100).toFixed(0)}% complete
//             </p>

//             {/* Step list */}
//             <div style={S.stepList}>
//               {[
//                 'Uploading to Cloudinary',
//                 'Sending to Replicate AI',
//                 'Generating Front View',
//                 'Generating Left Angle',
//                 'Generating Right Angle',
//                 'Generating Back View',
//               ].map((label, i) => {
//                 const done = progress > i * 14;
//                 return (
//                   <div key={i} style={S.stepItem}>
//                     <div style={{
//                       ...S.stepDot,
//                       background: done ? '#667eea' : '#e5e7eb',
//                     }} />
//                     <span style={{
//                       ...S.stepLabel,
//                       color: done ? '#111827' : '#9ca3af',
//                     }}>
//                       {isMobile && label.length > 20 ? label.substring(0, 20) + '...' : label}
//                     </span>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         )}

//         {/* ══ RESULTS ═══════════════════════════════════════════════════════ */}
//         {step === 'results' && result && (
//           <>
//             {/* Success banner */}
//             <div style={S.successBanner}>
//               <span style={{ fontSize: isMobile ? 28 : 36 }}>✅</span>
//               <div style={{ flex: 1 }}>
//                 <p style={S.successTitle}>Generation Complete!</p>
//                 <p style={S.successDesc}>
//                   Your dress has been placed on the AI model
//                 </p>
//               </div>
//               {!isMobile && (
//                 <button onClick={downloadAll} style={S.dlAllBtn}>Download All</button>
//               )}
//             </div>

//             {isMobile && (
//               <button onClick={downloadAll} style={{...S.dlAllBtn, width: '100%', marginBottom: 16}}>
//                 ⬇️ Download All 4
//               </button>
//             )}

//             {/* Original garment */}
//             <div style={S.originalCard}>
//               {result.originalImages?.map((img, i) => (
//                 <img
//                   key={i} src={img} alt="original garment"
//                   style={S.originalImg}
//                 />
//               ))}
//               <div>
//                 <p style={S.originalTitle}>Original Garment</p>
//                 <p style={S.originalDesc}>
//                   Virtually placed using AI

//                 </p>
//               </div>
//             </div>

//             {/* 4 pose cards */}
//             <div style={S.card}>
//               <div style={S.cardHead}>
//                 <span style={S.cardIcon}>✨</span>
//                 <h2 style={S.cardTitle}>Generated Poses</h2>
//               </div>
//               <div style={S.posesGrid}>
//                 {result.generatedPoses?.map((pose, idx) => (
//                   <div key={idx} style={S.poseCard}>
//                     <div style={S.poseCardHead}>
//                       <span style={{ fontSize: isMobile ? 16 : 18 }}>{POSE_ICONS[idx]}</span>
//                       <span style={S.poseName}>{pose.pose}</span>
//                     </div>

//                     <div style={{ position: 'relative' }}>
//                       <img
//                         src={pose.image}
//                         alt={pose.pose}
//                         style={S.poseImage}
//                       />
//                       <div style={S.poseOverlay}>
//                         <p style={S.poseAngle}>{POSE_ANGLES[idx]}</p>
//                         <button
//                           onClick={() => downloadImage(pose.image, `${pose.pose.replace(/ /g, '-')}.jpg`)}
//                           style={S.dlBtn}
//                         >
//                           📥 Download
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Bottom actions */}
//             <div style={S.bottomActions}>
//               <button
//                 onClick={() => { setImage(null); setResult(null); setStep('upload'); }}
//                 style={S.ghostBtn}
//               >
//                 🔄 New Generation
//               </button>
//               <Link to="/products" style={S.primaryLinkBtn}>
//                 View Products →
//               </Link>
//             </div>
//           </>
//         )}

//       </div>

//       <style>{`
//         @keyframes spin { to { transform: rotate(360deg); } }
//         @keyframes fadeUp { from { opacity:0; transform:translateY(22px); } to { opacity:1; transform:translateY(0); } }
//         * { box-sizing: border-box; }
        
//         @media (max-width: 768px) {
//           .poses-grid {
//             grid-template-columns: repeat(2, 1fr) !important;
//             gap: 12px !important;
//             padding: 12px !important;
//           }
//         }
        
//         @media (max-width: 480px) {
//           .hero-title {
//             font-size: 28px !important;
//           }
//           .hero-steps-row {
//             gap: 6px !important;
//           }
//           .hero-step {
//             padding: 6px 12px !important;
//             font-size: 11px !important;
//           }
//         }
        
//         @media (hover: hover) {
//           button:hover {
//             transform: translateY(-2px);
//             transition: transform 0.2s;
//           }
//         }
        
//         button:active {
//           transform: scale(0.98);
//         }
//       `}</style>
//     </div>
//   );
// }

// // ═══════════════════════════════════════════════════════════════════════════════
// //  STYLES - Mobile Optimized
// // ═══════════════════════════════════════════════════════════════════════════════
// const S = {
//   page: { 
//     minHeight: '100vh', 
//     background: '#f1f5f9',
//     paddingBottom: '20px',
//   },

//   // Hero
//   hero: {
//     background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//     padding: '40px 16px 50px',
//     textAlign: 'center',
//     color: 'white',
//   },
//   heroBadge: {
//     display: 'inline-block',
//     background: 'rgba(255,255,255,.2)',
//     padding: '6px 16px',
//     borderRadius: 50,
//     fontSize: 12,
//     fontWeight: 500,
//     marginBottom: 16,
//   },
//   heroTitle: { 
//     fontSize: 32, 
//     fontWeight: 800, 
//     margin: '0 0 12px', 
//     lineHeight: 1.2,
//     '@media (max-width: 480px)': { fontSize: 28 },
//   },
//   heroAccent: {
//     background: 'linear-gradient(135deg, #f9a8d4, #fde68a)',
//     WebkitBackgroundClip: 'text',
//     backgroundClip: 'text',
//     color: 'transparent',
//   },
//   heroSub: { 
//     fontSize: 14, 
//     opacity: .9, 
//     margin: '0 0 20px',
//     padding: '0 16px',
//   },
//   heroStepsRow: { 
//     display: 'flex', 
//     gap: 8, 
//     justifyContent: 'center', 
//     flexWrap: 'wrap',
//   },
//   heroStep: {
//     background: 'rgba(255,255,255,.15)',
//     padding: '6px 14px',
//     borderRadius: 50,
//     fontSize: 12,
//     fontWeight: 500,
//   },

//   // Body
//   body: {
//     maxWidth: 980,
//     margin: '0 auto',
//     padding: '0 16px 40px',
//     animation: 'fadeUp .4s ease',
//   },

//   // Card
//   card: {
//     background: 'white',
//     borderRadius: 16,
//     boxShadow: '0 2px 12px rgba(0,0,0,.08)',
//     marginBottom: 16,
//     overflow: 'hidden',
//   },
//   cardHead: {
//     padding: '16px',
//     borderBottom: '1px solid #f1f5f9',
//     display: 'flex',
//     alignItems: 'center',
//     gap: 10,
//   },
//   cardIcon:  { fontSize: 20 },
//   cardTitle: { fontSize: 16, fontWeight: 700, color: '#111827', margin: 0 },
//   cardFoot:  {
//     padding: '12px 16px',
//     background: '#f9fafb',
//     borderTop: '1px solid #f1f5f9',
//     display: 'flex',
//     justifyContent: 'flex-end',
//   },

//   // Drop zone
//   dropzone: {
//     margin: '16px',
//     border: '2px dashed #d1d5db',
//     borderRadius: 16,
//     padding: '40px 16px',
//     textAlign: 'center',
//     cursor: 'pointer',
//     transition: 'all .2s',
//     background: 'white',
//   },
//   dropzoneActive: { borderColor: '#667eea', background: '#f0efff' },
//   dropTitle: { fontSize: 15, fontWeight: 600, color: '#374151', margin: '0 0 8px' },
//   dropHint:  { fontSize: 12, color: '#9ca3af', margin: '4px 0 0' },

//   // Preview row
//   previewRow: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     gap: 16,
//     padding: '16px',
//     background: '#f0fdf4',
//     margin: 16,
//     borderRadius: 14,
//     border: '1px solid #bbf7d0',
//   },
//   previewImg: {
//     width: 120,
//     height: 150,
//     objectFit: 'cover',
//     borderRadius: 10,
//     border: '1px solid #e5e7eb',
//   },
//   previewInfo: {
//     textAlign: 'center',
//   },
//   previewName: {
//     fontWeight: 700,
//     color: '#065f46',
//     margin: '0 0 6px',
//     fontSize: 13,
//   },
//   previewDesc: {
//     fontSize: 12,
//     color: '#047857',
//     margin: '0 0 12px',
//     lineHeight: 1.4,
//   },

//   sectionLabel: {
//     fontSize: 11,
//     fontWeight: 700,
//     color: '#6b7280',
//     textTransform: 'uppercase',
//     letterSpacing: '.5px',
//     margin: '0 0 10px',
//   },

//   settingsGrid: {
//     display: 'flex',
//     flexDirection: 'column',
//     gap: 20,
//   },
//   previewBox: {
//     textAlign: 'center',
//   },
//   smallPreviewImg: {
//     width: 100,
//     height: 130,
//     objectFit: 'cover',
//     borderRadius: 12,
//     border: '1px solid #e5e7eb',
//   },
//   genderSection: {
//     width: '100%',
//   },
//   genderList: {
//     display: 'flex',
//     flexDirection: 'column',
//     gap: 8,
//   },
//   genderBtn: {
//     display: 'flex',
//     alignItems: 'center',
//     gap: 12,
//     padding: '12px',
//     borderRadius: 12,
//     border: '2px solid #e5e7eb',
//     background: 'white',
//     cursor: 'pointer',
//     width: '100%',
//     transition: 'all .2s',
//   },
//   genderBtnActive: { borderColor: '#667eea', background: '#f5f3ff' },
//   genderLabel: {
//     fontWeight: 700,
//     fontSize: 13,
//     color: '#1f2937',
//   },
//   genderDesc: {
//     fontSize: 11,
//     color: '#6b7280',
//     marginTop: 2,
//   },
//   checkChip: {
//     background: '#667eea',
//     color: 'white',
//     padding: '2px 8px',
//     borderRadius: 50,
//     fontSize: 11,
//     fontWeight: 700,
//   },

//   bgGrid: {
//     display: 'grid',
//     gridTemplateColumns: 'repeat(3, 1fr)',
//     gap: 12,
//   },
//   bgBtn: {
//     padding: '12px',
//     borderRadius: 12,
//     background: 'white',
//     cursor: 'pointer',
//     textAlign: 'center',
//     transition: 'all .2s',
//   },
//   bgPreview: {
//     width: '100%',
//     height: 48,
//     borderRadius: 8,
//     marginBottom: 8,
//   },
//   bgLabel: {
//     fontSize: 12,
//     fontWeight: 600,
//     color: '#374151',
//   },
//   bgSelected: {
//     fontSize: 10,
//     color: '#667eea',
//     marginTop: 4,
//     display: 'block',
//   },

//   actionButtons: {
//     display: 'flex',
//     gap: 12,
//     justifyContent: 'space-between',
//     marginTop: 8,
//   },

//   primaryBtn: {
//     padding: '12px 24px',
//     background: 'linear-gradient(135deg, #667eea, #764ba2)',
//     color: 'white',
//     border: 'none',
//     borderRadius: 12,
//     fontSize: 14,
//     fontWeight: 600,
//     cursor: 'pointer',
//     width: '100%',
//   },
//   primaryLinkBtn: {
//     padding: '12px 20px',
//     background: 'linear-gradient(135deg, #667eea, #764ba2)',
//     color: 'white',
//     textDecoration: 'none',
//     borderRadius: 12,
//     fontSize: 14,
//     fontWeight: 600,
//     display: 'inline-block',
//     textAlign: 'center',
//     flex: 1,
//   },
//   ghostBtn: {
//     padding: '12px 20px',
//     background: 'white',
//     color: '#4b5563',
//     border: '2px solid #e5e7eb',
//     borderRadius: 12,
//     fontSize: 14,
//     fontWeight: 600,
//     cursor: 'pointer',
//     flex: 1,
//   },
//   ghostSmBtn: {
//     padding: '8px 16px',
//     background: 'white',
//     color: '#374151',
//     border: '1px solid #d1d5db',
//     borderRadius: 8,
//     fontSize: 12,
//     fontWeight: 500,
//     cursor: 'pointer',
//   },
//   generateBtn: {
//     padding: '12px 24px',
//     background: 'linear-gradient(135deg, #667eea, #764ba2)',
//     color: 'white',
//     border: 'none',
//     borderRadius: 12,
//     fontSize: 14,
//     fontWeight: 700,
//     cursor: 'pointer',
//     flex: 1,
//   },
//   btnDisabled: { opacity: .5, cursor: 'not-allowed' },

//   // Loading
//   bigSpinner: {
//     width: 50,
//     height: 50,
//     border: '4px solid #e5e7eb',
//     borderTopColor: '#667eea',
//     borderRadius: '50%',
//     margin: '0 auto',
//     animation: 'spin 1s linear infinite',
//   },
//   loadingTitle: {
//     margin: '20px 0 8px',
//     fontSize: 18,
//     fontWeight: 700,
//     color: '#111827',
//   },
//   loadingSub: {
//     color: '#6b7280',
//     margin: '0 0 24px',
//     fontSize: 13,
//   },
//   progressTrack: {
//     height: 8,
//     background: '#e5e7eb',
//     borderRadius: 10,
//     overflow: 'hidden',
//     maxWidth: '100%',
//     margin: '0 auto 12px',
//   },
//   progressFill: {
//     height: '100%',
//     borderRadius: 10,
//     background: 'linear-gradient(135deg, #667eea, #764ba2)',
//     transition: 'width .9s ease',
//   },
//   progressText: {
//     fontSize: 12,
//     color: '#9ca3af',
//     margin: '0 0 24px',
//   },
//   stepList: {
//     display: 'flex',
//     flexDirection: 'column',
//     gap: 12,
//     textAlign: 'left',
//     maxWidth: '100%',
//   },
//   stepItem: {
//     display: 'flex',
//     alignItems: 'center',
//     gap: 10,
//   },
//   stepDot: {
//     width: 8,
//     height: 8,
//     borderRadius: '50%',
//     flexShrink: 0,
//     transition: 'background .6s',
//   },
//   stepLabel: {
//     fontSize: 13,
//     transition: 'color .6s',
//   },

//   // Success banner
//   successBanner: {
//     background: '#d1fae5',
//     border: '1px solid #6ee7b7',
//     borderRadius: 14,
//     padding: '16px',
//     display: 'flex',
//     alignItems: 'center',
//     gap: 12,
//     marginBottom: 16,
//   },
//   successTitle: {
//     margin: 0,
//     fontWeight: 700,
//     fontSize: 14,
//     color: '#065f46',
//   },
//   successDesc: {
//     margin: '4px 0 0',
//     fontSize: 11,
//     color: '#047857',
//   },
//   dlAllBtn: {
//     padding: '10px 16px',
//     background: '#059669',
//     color: 'white',
//     border: 'none',
//     borderRadius: 10,
//     fontWeight: 700,
//     fontSize: 13,
//     cursor: 'pointer',
//   },

//   originalCard: {
//     background: 'white',
//     borderRadius: 14,
//     padding: '16px',
//     display: 'flex',
//     alignItems: 'center',
//     gap: 16,
//     marginBottom: 16,
//     boxShadow: '0 2px 12px rgba(0,0,0,.08)',
//   },
//   originalImg: {
//     width: 60,
//     height: 80,
//     objectFit: 'cover',
//     borderRadius: 10,
//     border: '1px solid #e5e7eb',
//   },
//   originalTitle: {
//     margin: 0,
//     fontWeight: 700,
//     fontSize: 13,
//     color: '#111827',
//   },
//   originalDesc: {
//     margin: '4px 0 0',
//     fontSize: 11,
//     color: '#6b7280',
//   },

//   posesGrid: {
//     display: 'grid',
//     gridTemplateColumns: 'repeat(4, 1fr)',
//     gap: 12,
//     padding: '12px',
//   },
//   poseCard: {
//     borderRadius: 10,
//     overflow: 'hidden',
//     border: '1px solid #e5e7eb',
//     background: '#f9fafb',
//   },
//   poseCardHead: {
//     padding: '8px',
//     display: 'flex',
//     alignItems: 'center',
//     gap: 6,
//     background: '#f1f5f9',
//     borderBottom: '1px solid #e5e7eb',
//   },
//   poseName: {
//     fontWeight: 700,
//     fontSize: 11,
//     color: '#1f2937',
//   },
//   poseImage: {
//     width: '100%',
//     aspectRatio: '3/4',
//     objectFit: 'cover',
//     display: 'block',
//   },
//   poseOverlay: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     background: 'linear-gradient(to top, rgba(0,0,0,.8) 0%, transparent 100%)',
//     padding: '16px 8px 8px',
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//   },
//   poseAngle: {
//     margin: '0 0 6px',
//     fontSize: 9,
//     color: 'rgba(255,255,255,.85)',
//   },
//   dlBtn: {
//     padding: '5px 12px',
//     background: 'white',
//     border: 'none',
//     borderRadius: 6,
//     fontSize: 10,
//     fontWeight: 700,
//     cursor: 'pointer',
//     color: '#111827',
//   },

//   bottomActions: {
//     display: 'flex',
//     gap: 12,
//     justifyContent: 'center',
//     marginTop: 16,
//   },
// };



import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

// ─── Model preview images ──────────────────────────────────────────────────────
const MODEL_PREVIEW = {
  female: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?w=400',
  male:   'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?w=400',
  kid:    'https://images.pexels.com/photos/2253871/pexels-photo-2253871.jpeg?w=400',
};

const GENDER_OPTIONS = [
  { value: 'female', emoji: '👩', label: 'Female Model', desc: 'Elegant & Professional' },
  { value: 'male',   emoji: '👨', label: 'Male Model',   desc: 'Stylish & Dynamic'      },
  { value: 'kid',    emoji: '🧒', label: 'Kids Model',   desc: 'Cute & Natural'         },
];

const BG_OPTIONS = [
  { value: 'cream',     label: 'Cream',      color: '#fef3c7'                                    },
  { value: 'lightgrey', label: 'Light Grey', color: '#e5e7eb'                                    },
  { value: 'auto',      label: 'Auto AI',    color: 'linear-gradient(135deg, #f3e8ff, #fce7f3)' },
];

const POSE_ICONS  = ['👤', '⬅️', '➡️', '🔙'];
const POSE_ANGLES = ['Front • 0°', 'Left • 45°', 'Right • 45°', 'Back • 180°'];

// ─────────────────────────────────────────────────────────────────────────────
export default function Generate() {
  const [step,       setStep]       = useState('upload');  // upload | settings | loading | results
  const [dragOver,   setDragOver]   = useState(false);
  const [image,      setImage]      = useState(null);      // { file, preview, name }
  const [gender,     setGender]     = useState('female');
  const [background, setBackground] = useState('cream');
  const [result,     setResult]     = useState(null);
  const [progress,   setProgress]   = useState(0);
  const [isMobile,   setIsMobile]   = useState(false);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // ── file helpers ──────────────────────────────────────────────────────────
  const loadFile = (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      toast.error('Only image files are allowed');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error('File size must be less than 10MB');
      return;
    }
    if (image?.preview) URL.revokeObjectURL(image.preview);
    setImage({ file, preview: URL.createObjectURL(file), name: file.name });
    toast.success('Image uploaded!');
  };

  const removeImage = () => {
    if (image?.preview) URL.revokeObjectURL(image.preview);
    setImage(null);
    setResult(null);
    setStep('upload');
  };

  // ── fake progress while Replicate works (~2-4 min) ────────────────────────
  const startFakeProgress = () => {
    setProgress(0);
    const id = setInterval(() => {
      setProgress((p) => {
        if (p >= 88) { clearInterval(id); return 88; }
        return p + Math.random() * 1.2;
      });
    }, 3500);
    return id;
  };

  // ── generate ──────────────────────────────────────────────────────────────
  const handleGenerate = async () => {
    if (!image) { toast.error('Please upload a dress image first'); return; }

    setStep('loading');
    const timerId = startFakeProgress();

    const formData = new FormData();
    formData.append('images', image.file);
    formData.append('gender', gender);
    formData.append('background', background);

    try {
      // const { data } = await axios.post('/api/ai/generate', formData, {
      const { data } = await axios.post(
  'https://ai-2sy7.onrender.com/api/ai/generate',
  formData,
  {

        headers: { 'Content-Type': 'multipart/form-data' },
        timeout: 420000, // 7 min
      });

      clearInterval(timerId);
      setProgress(100);

      if (data.success) {
        setResult(data);
        setTimeout(() => setStep('results'), 700);
        toast.success('✅ AI Fashion Models generated!');
      } else {
        toast.error(data.message || 'Generation failed');
        setStep('settings');
      }
    } catch (err) {
      clearInterval(timerId);
      const msg = err.response?.data?.message || 'Generation failed. Check backend terminal.';
      toast.error(msg);
      setStep('settings');
    }
  };

  // ── download ──────────────────────────────────────────────────────────────
  const downloadImage = async (url, fileName) => {
    try {
      const res  = await fetch(url);
      const blob = await res.blob();
      const link = document.createElement('a');
      link.href     = URL.createObjectURL(blob);
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success('Downloaded!');
    } catch {
      toast.error('Download failed. Try right-click → Save image.');
    }
  };

  const downloadAll = () => {
    result?.generatedPoses?.forEach((pose, i) => {
      setTimeout(
        () => downloadImage(pose.image, `${pose.pose.replace(/ /g, '-')}.jpg`),
        i * 600
      );
    });
  };

  // ─── RENDER ───────────────────────────────────────────────────────────────
  return (
    <div style={S.page}>

      {/* ══ HERO ══════════════════════════════════════════════════════════ */}
      <div style={S.hero}>
        
        <h1 style={S.heroTitle}>
                    Zentrue{' '}
          <span style={S.heroAccent}>
            Fashion
          </span>
          <br />

        </h1>
        <p style={S.heroSub}>
          Upload your dress → AI places it on real models in 4 professional poses
        </p>
        
      </div>

      <div style={S.body}>

        {/* ══ UPLOAD ════════════════════════════════════════════════════════ */}
        {step === 'upload' && (
          <div style={S.card}>
            <div style={S.cardHead}>
              <span style={S.cardIcon}>📸</span>
              <h2 style={S.cardTitle}>Upload Your Dress</h2>
            </div>

            {!image ? (
              <div
                style={{ ...S.dropzone, ...(dragOver ? S.dropzoneActive : {}) }}
                onClick={() => document.getElementById('fileInput').click()}
                onDragOver={(e)  => { e.preventDefault(); setDragOver(true);  }}
                onDragLeave={()  => setDragOver(false)}
                onDrop={(e)      => { e.preventDefault(); setDragOver(false); loadFile(e.dataTransfer.files[0]); }}
              >
                <input
                  id="fileInput" type="file" accept="image/*"
                  style={{ display: 'none' }}
                  onChange={(e) => loadFile(e.target.files[0])}
                />
                <div style={{ fontSize: isMobile ? 48 : 56, marginBottom: 14 }}>👗</div>
                <p style={S.dropTitle}>Tap to upload your garment</p>
                <p style={S.dropHint}>PNG · JPG · WEBP · Max 10 MB</p>
                <p style={S.dropHint}>AI will place this garment on the model</p>
              </div>
            ) : (
              <div style={S.previewRow}>
                <img src={image.preview} alt="garment" style={S.previewImg} />
                <div style={S.previewInfo}>
                  <p style={S.previewName}>✅ {image.name}</p>
                  <p style={S.previewDesc}>
                    This garment will be virtually placed on the Zentrue AI model in all 4 poses
                  </p>
                  <button onClick={removeImage} style={S.ghostSmBtn}>🔄 Change Image</button>
                </div>
              </div>
            )}

            <div style={S.cardFoot}>
              <button
                onClick={() => image && setStep('settings')}
                style={{ ...S.primaryBtn, ...(!image ? S.btnDisabled : {}) }}
                disabled={!image}
              >
                Continue →
              </button>
            </div>
          </div>
        )}

        {/* ══ SETTINGS ══════════════════════════════════════════════════════ */}
        {step === 'settings' && (
          <>
            {/* Garment + model preview */}
            <div style={{ ...S.card, padding: isMobile ? 16 : 24 }}>
              <div style={S.settingsGrid}>
                {/* Garment preview */}
                <div style={S.previewBox}>
                  <p style={S.sectionLabel}>Your Garment</p>
                  <img
                    src={image?.preview} alt="garment"
                    style={S.smallPreviewImg}
                  />
                </div>

                {/* Model preview */}
                <div style={S.previewBox}>
                  <p style={S.sectionLabel}>Model Preview</p>
                  <img
                    src={MODEL_PREVIEW[gender]} alt="model"
                    style={S.smallPreviewImg}
                  />
                </div>

                {/* Gender selection - scrollable on mobile */}
                <div style={S.genderSection}>
                  <p style={S.sectionLabel}>Select Model Type</p>
                  <div style={S.genderList}>
                    {GENDER_OPTIONS.map(({ value, emoji, label, desc }) => (
                      <button
                        key={value}
                        onClick={() => setGender(value)}
                        style={{ ...S.genderBtn, ...(gender === value ? S.genderBtnActive : {}) }}
                      >
                        <span style={{ fontSize: isMobile ? 24 : 28, flexShrink: 0 }}>{emoji}</span>
                        <div style={{ textAlign: 'left', flex: 1 }}>
                          <div style={S.genderLabel}>{label}</div>
                          {!isMobile && <div style={S.genderDesc}>{desc}</div>}
                        </div>
                        {gender === value && <span style={S.checkChip}>✓</span>}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Background */}
            <div style={{ ...S.card, padding: isMobile ? 16 : 24 }}>
              <p style={S.sectionLabel}>Background Style</p>
              <div style={S.bgGrid}>
                {BG_OPTIONS.map(({ value, label, color }) => (
                  <button
                    key={value}
                    onClick={() => setBackground(value)}
                    style={{
                      ...S.bgBtn,
                      border: background === value
                        ? '2px solid #667eea'
                        : '2px solid #e5e7eb',
                    }}
                  >
                    <div style={{ ...S.bgPreview, background: color }} />
                    <span style={S.bgLabel}>{label}</span>
                    {background === value && (
                      <span style={S.bgSelected}>✓</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div style={S.actionButtons}>
              <button onClick={() => setStep('upload')} style={S.ghostBtn}>← Back</button>
              <button onClick={handleGenerate} style={S.generateBtn}>
                ✨ Generate
              </button>
            </div>
          </>
        )}

        {/* ══ LOADING ═══════════════════════════════════════════════════════ */}
        {step === 'loading' && (
          <div style={{ ...S.card, padding: isMobile ? '40px 20px' : '56px 32px', textAlign: 'center' }}>
            <div style={S.bigSpinner} />
            <h2 style={S.loadingTitle}>
              AI is generating...
            </h2>
            <p style={S.loadingSub}>
              This takes <strong>2–4 minutes</strong> — please don't close this page.
            </p>

            {/* Progress bar */}
            <div style={S.progressTrack}>
              <div style={{ ...S.progressFill, width: `${Math.min(progress, 100).toFixed(1)}%` }} />
            </div>
            <p style={S.progressText}>
              {Math.min(progress, 100).toFixed(0)}% complete
            </p>

            {/* Step list */}
            <div style={S.stepList}>
              {[
                'Uploading to Cloudinary',
                'Sending to Replicate AI',
                'Generating Front View',
                'Generating Left Angle',
                'Generating Right Angle',
                'Generating Back View',
              ].map((label, i) => {
                const done = progress > i * 14;
                return (
                  <div key={i} style={S.stepItem}>
                    <div style={{
                      ...S.stepDot,
                      background: done ? '#667eea' : '#e5e7eb',
                    }} />
                    <span style={{
                      ...S.stepLabel,
                      color: done ? '#111827' : '#9ca3af',
                    }}>
                      {isMobile && label.length > 20 ? label.substring(0, 20) + '...' : label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ══ RESULTS ═══════════════════════════════════════════════════════ */}
        {step === 'results' && result && (
          <>
            {/* Success banner */}
            <div style={S.successBanner}>
              <span style={{ fontSize: isMobile ? 28 : 36 }}>✅</span>
              <div style={{ flex: 1 }}>
                <p style={S.successTitle}>Generation Complete!</p>
                <p style={S.successDesc}>
                  Your dress has been placed on the AI model
                </p>
              </div>
              {!isMobile && (
                <button onClick={downloadAll} style={S.dlAllBtn}>Download All</button>
              )}
            </div>

            {isMobile && (
              <button onClick={downloadAll} style={{...S.dlAllBtn, width: '100%', marginBottom: 16}}>
                ⬇️ Download All 4
              </button>
            )}

            {/* Original garment */}
            <div style={S.originalCard}>
              {result.originalImages?.map((img, i) => (
                <img
                  key={i} src={img} alt="original garment"
                  style={S.originalImg}
                />
              ))}
              <div>
                <p style={S.originalTitle}>Original Garment</p>
                <p style={S.originalDesc}>
                  Virtually placed using AI

                </p>
              </div>
            </div>

            {/* 4 pose cards */}
            <div style={S.card}>
              <div style={S.cardHead}>
                <span style={S.cardIcon}>✨</span>
                <h2 style={S.cardTitle}>Generated Poses</h2>
              </div>
              <div style={S.posesGrid}>
                {result.generatedPoses?.map((pose, idx) => (
                  <div key={idx} style={S.poseCard}>
                    <div style={S.poseCardHead}>
                      <span style={{ fontSize: isMobile ? 16 : 18 }}>{POSE_ICONS[idx]}</span>
                      <span style={S.poseName}>{pose.pose}</span>
                    </div>

                    <div style={{ position: 'relative' }}>
                      <img
                        src={pose.image}
                        alt={pose.pose}
                        style={S.poseImage}
                      />
                      <div style={S.poseOverlay}>
                        <p style={S.poseAngle}>{POSE_ANGLES[idx]}</p>
                        <button
                          onClick={() => downloadImage(pose.image, `${pose.pose.replace(/ /g, '-')}.jpg`)}
                          style={S.dlBtn}
                        >
                          📥 Download
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom actions */}
            <div style={S.bottomActions}>
              <button
                onClick={() => { setImage(null); setResult(null); setStep('upload'); }}
                style={S.ghostBtn}
              >
                🔄 New Generation
              </button>
              <Link to="/products" style={S.primaryLinkBtn}>
                View Products →
              </Link>
            </div>
          </>
        )}

      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeUp { from { opacity:0; transform:translateY(22px); } to { opacity:1; transform:translateY(0); } }
        * { box-sizing: border-box; }
        
        @media (max-width: 768px) {
          .poses-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 12px !important;
            padding: 12px !important;
          }
        }
        
        @media (max-width: 480px) {
          .hero-title {
            font-size: 28px !important;
          }
          .hero-steps-row {
            gap: 6px !important;
          }
          .hero-step {
            padding: 6px 12px !important;
            font-size: 11px !important;
          }
        }
        
        @media (hover: hover) {
          button:hover {
            transform: translateY(-2px);
            transition: transform 0.2s;
          }
        }
        
        button:active {
          transform: scale(0.98);
        }
      `}</style>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//  STYLES - Mobile Optimized
// ═══════════════════════════════════════════════════════════════════════════════
const S = {
  page: { 
    minHeight: '100vh', 
    background: '#f1f5f9',
    paddingBottom: '20px',
  },

  // Hero
  hero: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '40px 16px 50px',
    textAlign: 'center',
    color: 'white',
  },
  heroBadge: {
    display: 'inline-block',
    background: 'rgba(255,255,255,.2)',
    padding: '6px 16px',
    borderRadius: 50,
    fontSize: 12,
    fontWeight: 500,
    marginBottom: 16,
  },
  heroTitle: { 
    fontSize: 32, 
    fontWeight: 800, 
    margin: '0 0 12px', 
    lineHeight: 1.2,
    '@media (max-width: 480px)': { fontSize: 28 },
  },
  heroAccent: {
    background: 'linear-gradient(135deg, #f9a8d4, #fde68a)',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent',
  },
  heroSub: { 
    fontSize: 14, 
    opacity: .9, 
    margin: '0 0 20px',
    padding: '0 16px',
  },
  heroStepsRow: { 
    display: 'flex', 
    gap: 8, 
    justifyContent: 'center', 
    flexWrap: 'wrap',
  },
  heroStep: {
    background: 'rgba(255,255,255,.15)',
    padding: '6px 14px',
    borderRadius: 50,
    fontSize: 12,
    fontWeight: 500,
  },

  // Body
  body: {
    maxWidth: 980,
    margin: '0 auto',
    padding: '0 16px 40px',
    animation: 'fadeUp .4s ease',
  },

  // Card
  card: {
    background: 'white',
    borderRadius: 16,
    boxShadow: '0 2px 12px rgba(0,0,0,.08)',
    marginBottom: 16,
    overflow: 'hidden',
  },
  cardHead: {
    padding: '16px',
    borderBottom: '1px solid #f1f5f9',
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
  cardIcon:  { fontSize: 20 },
  cardTitle: { fontSize: 16, fontWeight: 700, color: '#111827', margin: 0 },
  cardFoot:  {
    padding: '12px 16px',
    background: '#f9fafb',
    borderTop: '1px solid #f1f5f9',
    display: 'flex',
    justifyContent: 'flex-end',
  },

  // Drop zone
  dropzone: {
    margin: '16px',
    border: '2px dashed #d1d5db',
    borderRadius: 16,
    padding: '40px 16px',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'all .2s',
    background: 'white',
  },
  dropzoneActive: { borderColor: '#667eea', background: '#f0efff' },
  dropTitle: { fontSize: 15, fontWeight: 600, color: '#374151', margin: '0 0 8px' },
  dropHint:  { fontSize: 12, color: '#9ca3af', margin: '4px 0 0' },

  // Preview row
  previewRow: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 16,
    padding: '16px',
    background: '#f0fdf4',
    margin: 16,
    borderRadius: 14,
    border: '1px solid #bbf7d0',
  },
  previewImg: {
    width: 120,
    height: 150,
    objectFit: 'cover',
    borderRadius: 10,
    border: '1px solid #e5e7eb',
  },
  previewInfo: {
    textAlign: 'center',
  },
  previewName: {
    fontWeight: 700,
    color: '#065f46',
    margin: '0 0 6px',
    fontSize: 13,
  },
  previewDesc: {
    fontSize: 12,
    color: '#047857',
    margin: '0 0 12px',
    lineHeight: 1.4,
  },

  sectionLabel: {
    fontSize: 11,
    fontWeight: 700,
    color: '#6b7280',
    textTransform: 'uppercase',
    letterSpacing: '.5px',
    margin: '0 0 10px',
  },

  settingsGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },
  previewBox: {
    textAlign: 'center',
  },
  smallPreviewImg: {
    width: 100,
    height: 130,
    objectFit: 'cover',
    borderRadius: 12,
    border: '1px solid #e5e7eb',
  },
  genderSection: {
    width: '100%',
  },
  genderList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  genderBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '12px',
    borderRadius: 12,
    border: '2px solid #e5e7eb',
    background: 'white',
    cursor: 'pointer',
    width: '100%',
    transition: 'all .2s',
  },
  genderBtnActive: { borderColor: '#667eea', background: '#f5f3ff' },
  genderLabel: {
    fontWeight: 700,
    fontSize: 13,
    color: '#1f2937',
  },
  genderDesc: {
    fontSize: 11,
    color: '#6b7280',
    marginTop: 2,
  },
  checkChip: {
    background: '#667eea',
    color: 'white',
    padding: '2px 8px',
    borderRadius: 50,
    fontSize: 11,
    fontWeight: 700,
  },

  bgGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 12,
  },
  bgBtn: {
    padding: '12px',
    borderRadius: 12,
    background: 'white',
    cursor: 'pointer',
    textAlign: 'center',
    transition: 'all .2s',
  },
  bgPreview: {
    width: '100%',
    height: 48,
    borderRadius: 8,
    marginBottom: 8,
  },
  bgLabel: {
    fontSize: 12,
    fontWeight: 600,
    color: '#374151',
  },
  bgSelected: {
    fontSize: 10,
    color: '#667eea',
    marginTop: 4,
    display: 'block',
  },

  actionButtons: {
    display: 'flex',
    gap: 12,
    justifyContent: 'space-between',
    marginTop: 8,
  },

  primaryBtn: {
    padding: '12px 24px',
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    color: 'white',
    border: 'none',
    borderRadius: 12,
    fontSize: 14,
    fontWeight: 600,
    cursor: 'pointer',
    width: '100%',
  },
  primaryLinkBtn: {
    padding: '12px 20px',
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    color: 'white',
    textDecoration: 'none',
    borderRadius: 12,
    fontSize: 14,
    fontWeight: 600,
    display: 'inline-block',
    textAlign: 'center',
    flex: 1,
  },
  ghostBtn: {
    padding: '12px 20px',
    background: 'white',
    color: '#4b5563',
    border: '2px solid #e5e7eb',
    borderRadius: 12,
    fontSize: 14,
    fontWeight: 600,
    cursor: 'pointer',
    flex: 1,
  },
  ghostSmBtn: {
    padding: '8px 16px',
    background: 'white',
    color: '#374151',
    border: '1px solid #d1d5db',
    borderRadius: 8,
    fontSize: 12,
    fontWeight: 500,
    cursor: 'pointer',
  },
  generateBtn: {
    padding: '12px 24px',
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    color: 'white',
    border: 'none',
    borderRadius: 12,
    fontSize: 14,
    fontWeight: 700,
    cursor: 'pointer',
    flex: 1,
  },
  btnDisabled: { opacity: .5, cursor: 'not-allowed' },

  // Loading
  bigSpinner: {
    width: 50,
    height: 50,
    border: '4px solid #e5e7eb',
    borderTopColor: '#667eea',
    borderRadius: '50%',
    margin: '0 auto',
    animation: 'spin 1s linear infinite',
  },
  loadingTitle: {
    margin: '20px 0 8px',
    fontSize: 18,
    fontWeight: 700,
    color: '#111827',
  },
  loadingSub: {
    color: '#6b7280',
    margin: '0 0 24px',
    fontSize: 13,
  },
  progressTrack: {
    height: 8,
    background: '#e5e7eb',
    borderRadius: 10,
    overflow: 'hidden',
    maxWidth: '100%',
    margin: '0 auto 12px',
  },
  progressFill: {
    height: '100%',
    borderRadius: 10,
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    transition: 'width .9s ease',
  },
  progressText: {
    fontSize: 12,
    color: '#9ca3af',
    margin: '0 0 24px',
  },
  stepList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    textAlign: 'left',
    maxWidth: '100%',
  },
  stepItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
  stepDot: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    flexShrink: 0,
    transition: 'background .6s',
  },
  stepLabel: {
    fontSize: 13,
    transition: 'color .6s',
  },

  // Success banner
  successBanner: {
    background: '#d1fae5',
    border: '1px solid #6ee7b7',
    borderRadius: 14,
    padding: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  successTitle: {
    margin: 0,
    fontWeight: 700,
    fontSize: 14,
    color: '#065f46',
  },
  successDesc: {
    margin: '4px 0 0',
    fontSize: 11,
    color: '#047857',
  },
  dlAllBtn: {
    padding: '10px 16px',
    background: '#059669',
    color: 'white',
    border: 'none',
    borderRadius: 10,
    fontWeight: 700,
    fontSize: 13,
    cursor: 'pointer',
  },

  originalCard: {
    background: 'white',
    borderRadius: 14,
    padding: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    marginBottom: 16,
    boxShadow: '0 2px 12px rgba(0,0,0,.08)',
  },
  originalImg: {
    width: 60,
    height: 80,
    objectFit: 'cover',
    borderRadius: 10,
    border: '1px solid #e5e7eb',
  },
  originalTitle: {
    margin: 0,
    fontWeight: 700,
    fontSize: 13,
    color: '#111827',
  },
  originalDesc: {
    margin: '4px 0 0',
    fontSize: 11,
    color: '#6b7280',
  },

  posesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: 12,
    padding: '12px',
  },
  poseCard: {
    borderRadius: 10,
    overflow: 'hidden',
    border: '1px solid #e5e7eb',
    background: '#f9fafb',
  },
  poseCardHead: {
    padding: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    background: '#f1f5f9',
    borderBottom: '1px solid #e5e7eb',
  },
  poseName: {
    fontWeight: 700,
    fontSize: 11,
    color: '#1f2937',
  },
  poseImage: {
    width: '100%',
    aspectRatio: '3/4',
    objectFit: 'cover',
    display: 'block',
  },
  poseOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    background: 'linear-gradient(to top, rgba(0,0,0,.8) 0%, transparent 100%)',
    padding: '16px 8px 8px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  poseAngle: {
    margin: '0 0 6px',
    fontSize: 9,
    color: 'rgba(255,255,255,.85)',
  },
  dlBtn: {
    padding: '5px 12px',
    background: 'white',
    border: 'none',
    borderRadius: 6,
    fontSize: 10,
    fontWeight: 700,
    cursor: 'pointer',
    color: '#111827',
  },

  bottomActions: {
    display: 'flex',
    gap: 12,
    justifyContent: 'center',
    marginTop: 16,
  },
};

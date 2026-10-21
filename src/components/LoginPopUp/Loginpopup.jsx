// import React, { useState } from 'react';
// import { assets } from '../../assets/assets';
// import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   updateProfile
// } from 'firebase/auth';
// import { auth, database } from '../../firebase/firebase';
// import { ref, set } from 'firebase/database';

// const Loginpopup = ({ setShowlogin }) => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [currentState, setCurrentState] = useState('Sign Up');
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);

//     try {
//       if (currentState === 'Sign Up') {
//         const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//         const user = userCredential.user;
//         await updateProfile(user, { displayName: name });
//         await set(ref(database, `users/${user.uid}/profile`), {
//           name,
//           email,
//           uid: user.uid
//         });
//         setShowlogin(false);
//       } else {
//         await signInWithEmailAndPassword(auth, email, password);
//         setShowlogin(false);
//       }
//     } catch (error) {
//       console.log('Firebase Error:', error.code);
//       if (
//         error.code === 'auth/invalid-credential' ||
//         error.code === 'auth/user-not-found' ||
//         error.code === 'auth/wrong-password'
//       ) {
//         setError('Invalid email or password.');
//       } else if (error.code === 'auth/invalid-email') {
//         setError('Please enter a valid email address.');
//       } else if (error.code === 'auth/email-already-in-use') {
//         setError('This email is already registered.');
//       } else if (error.code === 'auth/weak-password') {
//         setError('Password must be at least 6 characters.');
//       } else if (error.code === 'auth/missing-password') {
//         setError('Please enter your password.');
//       } else if (error.code === 'auth/network-request-failed') {
//         setError('Network error. Please check your internet connection.');
//       } else {
//         setError('Something went wrong. Please try again.');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="login-popup-overlay">
//       <div className="login-popup">
//         <form onSubmit={handleSubmit} className="login-popup-container">
//           <div className="login-popup-header">
//             <h2>{currentState}</h2>
//             <img
//               onClick={() => setShowlogin(false)}
//               src={assets.cross_icon}
//               alt="Close"
//               className="close-icon"
//             />
//           </div>

//           <div className="login-popup-body">
//             {currentState === 'Sign Up' && (
//               <div className="input-group">
//                 <User className="input-icon" size={20} />
//                 <input
//                   type="text"
//                   placeholder="Your Name"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   required
//                 />
//               </div>
//             )}

//             <div className="input-group">
//               <Mail className="input-icon" size={20} />
//               <input
//                 type="email"
//                 placeholder="Email Address"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </div>

//             <div className="input-group password-group">
//               <Lock className="input-icon" size={20} />
//               <input
//                 type={showPassword ? 'text' : 'password'}
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//               {showPassword ? (
//                 <EyeOff
//                   className="password-toggle"
//                   onClick={() => setShowPassword(false)}
//                 />
//               ) : (
//                 <Eye
//                   className="password-toggle"
//                   onClick={() => setShowPassword(true)}
//                 />
//               )}
//             </div>

//             {error && <p className="login-error">{error}</p>}

//             <button type="submit" className="login-submit" disabled={loading}>
//               {loading ? 'Please wait...' : currentState === 'Sign Up' ? 'Create Account' : 'Login'}
//             </button>

//             <div className="login-popup-footer">
//               <div className="terms">
//                 <input type="checkbox" required />
//                 <span>I agree to the <a href="#">Terms of Use</a> & <a href="#">Privacy Policy</a></span>
//               </div>

//               <p className="toggle-text">
//                 {currentState === 'Login' ? (
//                   <>
//                     Don't have an account?{' '}
//                     <span onClick={() => { setCurrentState('Sign Up'); setError(''); }}>
//                       Sign Up
//                     </span>
//                   </>
//                 ) : (
//                   <>
//                     Already have an account?{' '}
//                     <span onClick={() => { setCurrentState('Login'); setError(''); }}>
//                       Login
//                     </span>
//                   </>
//                 )}
//               </p>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Loginpopup;
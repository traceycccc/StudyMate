// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;


// src/App.js

// src/App.js
// import React from 'react';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import './App.css';
// import Login from './components/Login';
// import Home from './components/Home';
// import { AuthProvider } from './context/AuthContext';
// import ProtectedRoute from './components/ProtectedRoute';

// function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <div className="App">
//           <header className="App-header">
//             <Switch>
//               <Route path="/login" component={Login} />
//               <ProtectedRoute exact path="/" component={Home} />
//             </Switch>
//           </header>
//         </div>
//       </Router>
//     </AuthProvider>
//   );
// }

// export default App;

// src/App.js
// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import './App.css';
// import Login from './components/Login';
// import Home from './components/Home';
// import { AuthProvider } from './context/AuthContext';
// import ProtectedRoute from './components/ProtectedRoute';

// function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <div className="App">
//           <header className="App-header">
//             <Routes>
//               <Route path="/login" element={<Login />} />
//               <Route path="/" element={
//                 <ProtectedRoute>
//                   <Home />
//                 </ProtectedRoute>
//               } />
//             </Routes>
//           </header>
//         </div>
//       </Router>
//     </AuthProvider>
//   );
// }

// export default App;

// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import './App.css';
// import Login from './components/Login';
// import Home from './components/Home';
// import { AuthProvider } from './context/AuthContext';
// import ProtectedRoute from './components/ProtectedRoute';

// function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <div className="App">
//           <header className="App-header">
//             <Routes>
//               <Route path="/login" element={<Login />} />
//               <Route path="/" element={
//                 <ProtectedRoute>
//                   <Home />
//                 </ProtectedRoute>
//               } />
//             </Routes>
//           </header>
//         </div>
//       </Router>
//     </AuthProvider>
//   );
// }

// export default App;


//ver 1.35
// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import './App.css';
// import Login from './components/Login';
// import Home from './components/Home';
// import Profile from './components/Profile'; // Import Profile component
// import { AuthProvider } from './context/AuthContext';
// import ProtectedRoute from './components/ProtectedRoute';

// function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <div className="App">
//           <header className="App-header">
//             <Routes>
//               <Route path="/login" element={<Login />} />
//               <Route path="/" element={
//                 <ProtectedRoute>
//                   <Home />
//                 </ProtectedRoute>
//               } />
//               <Route path="/profile" element={
//                 <ProtectedRoute>
//                   <Profile />
//                 </ProtectedRoute>
//               } />
//             </Routes>
//           </header>
//         </div>
//       </Router>
//     </AuthProvider>
//   );
// }

// export default App;



// 1.4
// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import './App.css';
// import Login from './components/Login';
// import Register from './components/Register';
// import Home from './components/Home';
// import Profile from './components/Profile'; // Import Profile component
// import { AuthProvider } from './context/AuthContext';
// import ProtectedRoute from './components/ProtectedRoute';

// function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <div className="App">
//           <header className="App-header">
//             <Routes>
//               <Route path="/login" element={<Login />} />
//               <Route path="/register" element={<Register />} />
//               <Route path="/" element={
//                 <ProtectedRoute>
//                   <Home />
//                 </ProtectedRoute>
//               } />
//               <Route path="/profile" element={
//                 <ProtectedRoute>
//                   <Profile />
//                 </ProtectedRoute>
//               } />
//             </Routes>
//           </header>
//         </div>
//       </Router>
//     </AuthProvider>
//   );
// }

// export default App;

//2.2
// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Home from './components/Home';
import Profile from './components/Profile';
import ForgotPassword from './components/ForgotPassword';
import Register from './components/Register'; // Import Register component
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <header className="App-header">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} /> {/* Add Register route */}
              <Route path="/forgot-password" element={<ForgotPassword />} /> {/* Add Register route */}
              <Route path="/" element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
            </Routes>
          </header>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;





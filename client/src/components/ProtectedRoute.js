// // src/components/ProtectedRoute.js
// import React, { useContext } from 'react';
// import { Route, Redirect } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';

// const ProtectedRoute = ({ component: Component, ...rest }) => {
//   const { currentUser } = useContext(AuthContext);

//   return (
//     <Route
//       {...rest}
//       render={props => {
//         return currentUser ? <Component {...props} /> : <Redirect to="/login" />;
//       }}
//     ></Route>
//   );
// };

// export default ProtectedRoute;


// src/components/ProtectedRoute.js
// import React, { useContext } from 'react';
// import { Route, Redirect } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';

// const ProtectedRoute = ({ component: Component, ...rest }) => {
//   const { currentUser } = useContext(AuthContext);

//   return (
//     <Route
//       {...rest}
//       render={props => {
//         return currentUser ? <Component {...props} /> : <Redirect to="/login" />;
//       }}
//     ></Route>
//   );
// };

// export default ProtectedRoute;


// src/components/ProtectedRoute.js
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useContext(AuthContext);

  return currentUser ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;

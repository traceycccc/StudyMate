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
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const location = useLocation();

  return currentUser
    ?  children
    : <Navigate to="/login" />;

};

export default ProtectedRoute;
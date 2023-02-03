import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../firebase/Auth';
const PrivateRoute = ({children}) => {
  const {currentUser} = useContext(AuthContext);
  return currentUser ? children : <Navigate to='/login'/>  
};

export default PrivateRoute;

// import React, { useContext } from 'react';
// import { Route, Navigate } from 'react-router-dom';
// import { AuthContext } from './AuthProvider';

// const PrivateRoute = ({ component: Component, ...rest }) => {
//   const { currentUser } = useContext(AuthContext);

//   return (
//     <Route
//       {...rest}
//       render={(props) =>
//         currentUser ? (
//           <Component {...props} />
//         ) : (
//           <Navigate to={{ pathname: '/login' }} />
//         )
//       }
//     />
//   );
// };
// export default PrivateRoute;
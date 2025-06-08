// // // // src/context/AuthContext.jsx
// // // import React, { createContext, useState, useEffect, useContext } from 'react';


// // // const AuthContext = createContext();

// // // export const AuthProvider = ({ children }) => {
// // //   const [user, setUser] = useState(null);

// // //   // Load user from localStorage on mount
// // //   useEffect(() => {
// // //     const storedUser = localStorage.getItem("user");
// // //     const token = localStorage.getItem("token");
// // //     if (storedUser && token) {
// // //       try {
// // //         jwt.verify(token, process.env.JWT_SECRET); // Replace with your secret key
// // //         setUser(JSON.parse(storedUser));
// // //       } catch (error) {
// // //         console.error("Invalid token");
// // //         localStorage.removeItem("user");
// // //         localStorage.removeItem("token");
// // //       }
// // //     }
// // //   }, []);
  

// // //   const login = (userData, token) => {
// // //     setUser(userData);
// // //     localStorage.setItem("user", JSON.stringify(userData));
// // //     localStorage.setItem("token", token);
// // //   };

// // //   const logout = () => {
// // //     setUser(null);
// // //     localStorage.removeItem("user");
// // //     localStorage.removeItem("token");
// // //   };

// // //   return (
// // //     <AuthContext.Provider value={{ user, login, logout }}>
// // //       {children}
// // //     </AuthContext.Provider>
// // //   );
// // // };

// // // export const useAuth = () => useContext(AuthContext);


// import React, { createContext, useState, useEffect, useContext } from 'react';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   // Load user from localStorage on mount
//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     const token = localStorage.getItem("token");
//     if (storedUser && token) {
//       console.log("Stored User: ", JSON.parse(storedUser));
//       // Just check if the user and token exist, no need to verify token here
//       setUser(JSON.parse(storedUser));
//     }
//   }, []);

//   const login = (userData, token) => {
//     console.log("Logging in user:", userData); // Log user data to check
//     setUser(userData);
//     localStorage.setItem("user", JSON.stringify(userData));
//     localStorage.setItem("token", token);
//   };
  

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem("user");
//     localStorage.removeItem("token");
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);


import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser({ token });
    }
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    setUser({ token });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
// import { createContext, useContext, useEffect, useState } from "react";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   // Fetch the user from localStorage when the app loads
//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     const token = localStorage.getItem("token");

//     if (storedUser && token) {
//       setUser(JSON.parse(storedUser)); // Set user from localStorage
//     }
//   }, []);

//   const login = (userData, token) => {
//     localStorage.setItem("user", JSON.stringify(userData));  // Store user in localStorage
//     localStorage.setItem("token", token);  // Store token in localStorage
//     setUser(userData);  // Set the user in the context state
//   };

//   const logout = () => {
//     localStorage.removeItem("user");
//     localStorage.removeItem("token");
//     setUser(null);  // Reset user state when logging out
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);

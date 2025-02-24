/* eslint-disable react/prop-types */
// Disables the ESLint rule that warns about missing prop type validation.
// Useful when you don't want to explicitly define prop types for this component.

/* eslint-disable react-refresh/only-export-components */
// Disables the ESLint rule that ensures only the main component is exported in hot-reloading environments.

import { createContext, useState } from "react";
// Importing `createContext` from React to create a new context for user data.
// Importing `useState` to manage user-related state within the context.

export const UserDataContext = createContext();
// Creating a context called `UserDataContext`. This will allow components to access and update user data
// without passing props manually at multiple levels in the component tree.

const UserContext = ({ children }) => {
  // `UserContext` is a functional component that wraps its children with a context provider.
  // It accepts a `children` prop, which represents any components wrapped inside this provider.

  const [user, setUser] = useState({
    // `useState` initializes the `user` state, which holds user-related information.
    // The state consists of an object with:
    // - `email`: An empty string, representing the user's email.
    // - `fullName`: An object containing:
    //    - `firstName`: Empty string, representing the user's first name.
    //    - `lastName`: Empty string, representing the user's last name.
    email: "",
    fullName: {
      firstName: "",
      lastName: "",
    },
  });

  return (
    <div value={[user, setUser]}>
      <UserDataContext.Provider>
        {/* This is the actual context provider but is missing the `value` prop. */}
        {/* It should wrap `children` so that any component inside it can access the user data via `UserDataContext`. */}
        {children}
      </UserDataContext.Provider>
    </div>
  );
};

export default UserContext;
// Exporting `UserContext` so it can be used in other parts of the application.

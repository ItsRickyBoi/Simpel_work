// import React from 'react';
// import { Link } from 'react-router-dom';
// import './Navbar.css';
// import { useUser } from '../../UserHandler/UserContext';

// export const Navbar = () => {
//   const { user, logout } = useUser();

//   return (
//     <header className="navbar-place">
//       <Link to="/" className="home-button">
//         <div className="logo">Logo</div>
//       </Link>
//       <nav className="nav-links">
//         {user ? (
//           <>
//             {user.role === 'ceo' && <Link to="/managing">Managing</Link>}
//             {user.role === 'ceo' ? (
//               <Link to="/dashboardceo">Dashboard</Link>
//             ) : (
//               <Link to="/dashboardemployee">Dashboard</Link>
//             )}
//             {user.role === 'ceo' && <Link to="/edit-company">Edit Company</Link>}
//             <Link to="/settings">Settings</Link>
//             <button className="logout-button" onClick={logout}>Log out</button>
//           </>
//         ) : (
//           <>
//             <Link to="/about">About us</Link>
//             <Link to="/products">Products</Link>
//             <Link to="/login" className="contact-button">Log in</Link>
//           </>
//         )}
//       </nav>
//     </header>
//   );
// };

// export default Navbar;


import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { useUser } from '../../UserHandler/UserContext';

export const Navbar = () => {
  const { user, logout } = useUser();

  return (
    <header className="navbar-place">
      <Link to="/" className="home-button">
        <div className="logo">Logo</div>
      </Link>
      <nav className="nav-links">
        {user ? (
          <>
            {user.role === 'ceo' && <Link to="/managing">Managing</Link>}
            {user.role === 'ceo' ? (
              <Link to="/dashboardceo">Dashboard</Link>
            ) : (
              <Link to="/dashboardemployee">Dashboard</Link>
            )}
            {user.role === 'ceo' && <Link to="/edit-company">Edit Company</Link>}
            <Link to="/settings">Settings</Link>
            <button className="logout-button" onClick={logout}>Log out</button>
          </>
        ) : (
          <>
            <Link to="/about">About us</Link>
            <Link to="/products">Products</Link>
            <Link to="/login" className="contact-button">Log in</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Navbar;

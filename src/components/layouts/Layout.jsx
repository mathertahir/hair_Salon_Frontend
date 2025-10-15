// // components/layouts/DashboardLayout.jsx
// import React, { useState } from 'react';
// import { Outlet } from 'react-router-dom';

// import Header from './Header.jsx';
// import Footer from './Footer.jsx';

// const Layout = ({ children }) => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       {/* Sidebar */}
//       {/* <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} /> */}

//       {/* Main content with Header and page content */}
//       <div className=" flex flex-col w-full bg-white">
//         <Header
//           onBurgerClick={() => setIsSidebarOpen(!isSidebarOpen)}
//           isSidebarOpen={isSidebarOpen}
//         />
//         <main className="flex-1 overflow-y-auto">
//           {children || <Outlet />}
//         </main>

//         <Footer />
//       </div>

//     </div>
//   );
// };

// export default Layout;

import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";

import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar can go here if needed */}
      <div className="flex flex-col w-full bg-white">
        <Header
          onBurgerClick={() => setIsSidebarOpen(!isSidebarOpen)}
          isSidebarOpen={isSidebarOpen}
        />
        <main className="flex-1 overflow-y-auto">
          <Outlet /> {/* 👈 This is where page content will render */}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;

// components/layouts/DashboardLayout.jsx
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

import Header from './Header.jsx';

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      {/* <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} /> */}


      {/* Main content with Header and page content */}
      <div className="flex-1 flex flex-col w-full bg-white">
        <Header
          onBurgerClick={() => setIsSidebarOpen(!isSidebarOpen)}
          isSidebarOpen={isSidebarOpen}
        />
        <main className="flex-1 overflow-y-auto">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
};

export default Layout;

import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import { SidebarProvider, useSidebar } from '../../hooks/useSidebar';

const LayoutContent = () => {
  const { isCollapsed, isMobile, toggleSidebar } = useSidebar();

  return (
    <div className="flex h-screen bg-gray-50 relative">
      {/* Mobile Overlay */}
      {isMobile && !isCollapsed && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
      
      {/* Sidebar */}
      <div className={`${
        isMobile 
          ? 'fixed left-0 top-0 z-30 h-full transform transition-transform duration-300' +
            (isCollapsed ? ' -translate-x-full' : ' translate-x-0')
          : 'relative z-10'
      }`}>
        <Sidebar />
      </div>
      
      {/* Main Content */}
      <div className={`flex-1 flex flex-col overflow-hidden ${
        isMobile ? 'w-full' : ''
      }`}>
        <TopBar />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

const Layout = () => {
  return (
    <SidebarProvider>
      <LayoutContent />
    </SidebarProvider>
  );
};

export default Layout;

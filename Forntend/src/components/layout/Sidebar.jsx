import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  Calendar, 
  MapPin, 
  Users, 
  Briefcase, 
  FileText, 
  Settings,
  ChevronLeft,
  ChevronRight 
} from 'lucide-react';
import { useSidebar } from '../../hooks/useSidebar';

const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Calendar', href: '/calendar', icon: Calendar },
  { name: 'Map', href: '/map', icon: MapPin },
  { name: 'Clients', href: '/clients', icon: Users },
  { name: 'Jobs', href: '/jobs', icon: Briefcase },
  { name: 'Quotes', href: '/quotes', icon: FileText },
  { name: 'My Services', href: '/services', icon: Settings },
];

const Sidebar = () => {
  const { isCollapsed, toggleSidebar, isMobile } = useSidebar();

  const handleNavClick = () => {
    // Auto-close sidebar on mobile when navigation item is clicked
    if (isMobile && !isCollapsed) {
      toggleSidebar();
    }
  };

  return (
    <div className={`${
      isCollapsed ? 'w-20' : 'w-64'
    } bg-white h-screen flex flex-col border-r border-gray-100 sidebar-transition relative shadow-sm ${
      isMobile ? 'shadow-xl' : ''
    }`}>
      {/* Collapse Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="absolute -right-3 top-8 w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all z-10 hover:bg-gray-50"
      >
        {isCollapsed ? (
          <ChevronRight className="h-3 w-3 text-gray-600" />
        ) : (
          <ChevronLeft className="h-3 w-3 text-gray-600" />
        )}
      </button>

      {/* Logo */}
      <div className={`${isCollapsed ? 'p-4 flex justify-center' : 'p-6'} transition-all duration-300`}>
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-2'}`}>
          
          {!isCollapsed && (
            <span className="text-5xl font-bold opacity-100 transition-opacity duration-300">
              <span className="text-teal-500">Vin</span><span className="text-gray-900">Shik</span>
            </span>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className={`flex-1 space-y-2 ${isCollapsed ? 'px-2' : 'px-4'} transition-all duration-300`}>
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.href}
              onClick={handleNavClick}
              className={({ isActive }) =>
                `group flex items-center text-sm font-medium rounded-lg transition-all duration-200 relative ${
                  isCollapsed 
                    ? 'p-3 justify-center hover:bg-gray-50' 
                    : 'px-3 py-2.5 hover:bg-gray-50'
                } ${
                  isActive
                    ? isCollapsed
                      ? 'bg-teal-100 text-teal-700'
                      : 'bg-teal-50 text-teal-700 border-l-4 border-teal-500'
                    : 'text-gray-600 hover:text-gray-900'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    className={`${isCollapsed ? 'h-6 w-6' : 'h-5 w-5'} transition-all duration-200 ${
                      isActive ? 'text-teal-600' : 'text-gray-400 group-hover:text-gray-500'
                    } ${isCollapsed ? '' : 'mr-3'}`}
                  />
                  {!isCollapsed && (
                    <span className="opacity-100 transition-opacity duration-300">
                      {item.name}
                    </span>
                  )}
                  {/* Tooltip for collapsed state */}
                  {isCollapsed && (
                    <div className="sidebar-tooltip">
                      {item.name}
                    </div>
                  )}
                  {/* Active indicator for collapsed state */}
                  {isCollapsed && isActive && (
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-teal-500 rounded-l-full"></div>
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom padding for better spacing */}
      <div className="p-4"></div>
    </div>
  );
};

export default Sidebar;

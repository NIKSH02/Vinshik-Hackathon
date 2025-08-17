import React, { useState, useRef, useEffect } from 'react';
import { Mail, Settings, ChevronDown, Bell, User, LogOut, Eye, Menu } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import { useSidebar } from '../../hooks/useSidebar';

const TopBar = () => {
  const { toggleSidebar, isMobile } = useSidebar();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [theme, setTheme] = useState('light');
  const [compactSpacing, setCompactSpacing] = useState(false);
  const [emailAlerts, setEmailAlerts] = useState(true);

  const notificationsRef = useRef(null);
  const settingsRef = useRef(null);
  const profileRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (settingsRef.current && !settingsRef.current.contains(event.target)) {
        setShowSettings(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const showToast = (message) => {
    // Simple toast implementation - you could use a toast library here
    const toast = document.createElement('div');
    toast.className = 'fixed top-4 right-4 bg-teal-600 text-white px-4 py-2 rounded-lg shadow-lg z-50';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 3000);
  };

  const notifications = [
    { id: 1, text: "New client inquiry received", time: "5 min ago", read: false },
    { id: 2, text: "Project deadline approaching", time: "1 hour ago", read: false },
    { id: 3, text: "Team meeting scheduled", time: "2 hours ago", read: true },
  ];

  return (
    <div className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-4 sm:px-6 gap-4">
      {/* Mobile Menu Button */}
      {isMobile && (
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors lg:hidden"
        >
          <Menu className="h-5 w-5 text-gray-600" />
        </button>
      )}

      {/* Right Section */}
      <div className="flex items-center gap-2 sm:gap-4 ml-auto">
        {/* Notifications */}
        <div className="relative" ref={notificationsRef}>
        <button
          onClick={() => setShowNotifications(!showNotifications)}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative"
        >
          <Mail className="h-5 w-5 text-gray-600" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-teal-500 rounded-full"></span>
        </button>

        <AnimatePresence>
          {showNotifications && (
            <div
              className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50 fade-in"
            >
              <div className="p-4 border-b border-gray-100">
                <h3 className="font-semibold text-gray-900">Notifications</h3>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-3 border-b border-gray-50 hover:bg-gray-50 ${
                      !notification.read ? 'bg-teal-50' : ''
                    }`}
                  >
                    <p className="text-sm text-gray-900">{notification.text}</p>
                    <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                  </div>
                ))}
              </div>
              <div className="p-3 border-t border-gray-100">
                <button
                  onClick={() => showToast('All notifications marked as read')}
                  className="text-sm text-teal-600 hover:text-teal-700"
                >
                  Mark all as read
                </button>
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Settings */}
      <div className="relative" ref={settingsRef}>
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <Settings className="h-5 w-5 text-gray-600" />
        </button>

        <AnimatePresence>
          {showSettings && (
            <div
              className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-200 z-50 fade-in"
            >
              <div className="p-4 border-b border-gray-100">
                <h3 className="font-semibold text-gray-900">Settings</h3>
              </div>
              <div className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Theme</span>
                  <select
                    value={theme}
                    onChange={(e) => {
                      setTheme(e.target.value);
                      showToast(`Theme changed to ${e.target.value}`);
                    }}
                    className="text-sm border border-gray-300 rounded px-2 py-1"
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Compact Spacing</span>
                  <input
                    type="checkbox"
                    checked={compactSpacing}
                    onChange={(e) => {
                      setCompactSpacing(e.target.checked);
                      showToast(`Compact spacing ${e.target.checked ? 'enabled' : 'disabled'}`);
                    }}
                    className="rounded"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Email Alerts</span>
                  <input
                    type="checkbox"
                    checked={emailAlerts}
                    onChange={(e) => {
                      setEmailAlerts(e.target.checked);
                      showToast(`Email alerts ${e.target.checked ? 'enabled' : 'disabled'}`);
                    }}
                    className="rounded"
                  />
                </div>
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Profile */}
      <div className="relative" ref={profileRef}>
        <button
          onClick={() => setShowProfile(!showProfile)}
          className="flex items-center gap-2 p-1 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face"
              alt="Profile"
              className="w-8 h-8 rounded-full"
            />
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></span>
          </div>
          <ChevronDown className="h-4 w-4 text-gray-500" />
        </button>

        <AnimatePresence>
          {showProfile && (
            <div
              className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50 fade-in"
            >
              <div className="p-3 border-b border-gray-100">
                <p className="font-medium text-gray-900">Julie Anderson</p>
                <p className="text-sm text-gray-500">julie@vinshik.com</p>
              </div>
              <div className="py-1">
                <button className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <Eye className="mr-3 h-4 w-4" />
                  View Profile
                </button>
                <button className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <User className="mr-3 h-4 w-4" />
                  Account
                </button>
                <button className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <Settings className="mr-3 h-4 w-4" />
                  Preferences
                </button>
                <hr className="my-1" />
                <button className="flex items-center w-full px-3 py-2 text-sm text-red-700 hover:bg-red-50">
                  <LogOut className="mr-3 h-4 w-4" />
                  Sign out
                </button>
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>
      </div>
    </div>
  );
};

export default TopBar;

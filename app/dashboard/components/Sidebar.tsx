"use client";
import React from 'react';
import { useAuth } from '@/app/contexts/AuthContext';
import CompanySidebar from './CompanySidebar';
import UserSidebar from './UserSidebar';

const Sidebar = () => {
  const { user } = useAuth();

  if (user.userType === 'company') {
    return <CompanySidebar />;
  }

  if (user.userType === 'user') {
    return <UserSidebar />;
  }

  // Default or loading state
  return <CompanySidebar />;
};

export default Sidebar;
import Sidebar from './components/Sidebar';
import React from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="dashboard-container" style={{ display: 'flex', flexDirection: 'row', minHeight: '100vh', flexWrap: 'nowrap' }}>
      <Sidebar />
      <div className="dashboard-content-container" style={{ flexGrow: 1 }}>
        <div className="dashboard-content-inner" style={{ padding: '20px' }}>
          {children}
        </div>
      </div>
    </div>
  )
}

import Sidebar from './components/Sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-content-container">
        <div className="dashboard-content-inner">
          {children}
        </div>
      </div>
    </div>
  )
}
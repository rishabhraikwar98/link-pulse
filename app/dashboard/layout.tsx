import DashboardNav from "./DashboardNav"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <DashboardNav />
      {children}
    </div>
  )
}
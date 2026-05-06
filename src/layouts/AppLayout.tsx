import React, { useState } from 'react'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { 
  Menu, 
  X, 
  Home, 
  Calendar, 
  User, 
  Settings, 
  LogOut, 
  Bell,
  Search,
  Users
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '../components/ui/Button'
import { Avatar } from '../components/ui/Avatar'
import { LiaAIChatbot } from '../components/LiaAIChatbot'
import { cn } from '../lib/utils'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Bookings', href: '/dashboard/bookings', icon: Calendar },
  { name: 'Find Helpers', href: '/dashboard/helpers', icon: Search },
  { name: 'Family Members', href: '/dashboard/family', icon: Users },
  { name: 'Profile', href: '/dashboard/profile', icon: User },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
]

export default function AppLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.clear()
    navigate('/auth/login')
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-[240px] transform bg-surface border-r border-border transition-transform duration-200 ease-in-out lg:translate-x-0",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-sm bg-primary flex items-center justify-center">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <span className="font-display text-xl font-bold text-primary">SobatAman</span>
          </Link>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-text-secondary">
            <X size={24} />
          </button>
        </div>

        <nav className="mt-4 px-4 space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-sm text-sm font-medium transition-colors",
                  isActive 
                    ? "bg-primary-light text-primary" 
                    : "text-text-secondary hover:bg-gray-50 hover:text-primary"
                )}
              >
                <item.icon size={20} />
                {item.name}
              </Link>
            )
          })}
        </nav>

        <div className="absolute bottom-4 left-0 w-full px-4">
          <Button 
            variant="ghost" 
            className="w-full justify-start gap-3 text-error hover:bg-error/5 hover:text-error"
            onClick={handleLogout}
          >
            <LogOut size={20} />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-[240px]">
        {/* Header */}
        <header className="sticky top-0 z-30 h-16 bg-surface border-b border-border flex items-center justify-between px-4 lg:px-8">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden text-text-secondary p-2"
          >
            <Menu size={24} />
          </button>

          <div className="flex-1 max-w-xl mx-4 hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
              <input 
                type="text" 
                placeholder="Search services, helpers..." 
                className="w-full pl-10 pr-4 py-2 rounded-sm border border-border bg-background focus:ring-1 focus:ring-primary focus:border-primary outline-none text-sm"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <button className="relative p-2 text-text-secondary hover:bg-gray-50 rounded-full transition-colors">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-error rounded-full border-2 border-surface"></span>
            </button>
            
            <div className="h-8 w-px bg-border mx-1"></div>
            
            <Link to="/profile" className="flex items-center gap-3 pl-2">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-text-primary">Budi Santoso</p>
                <p className="text-xs text-text-secondary leading-none">Keluarga</p>
              </div>
              <Avatar fallback="BS" />
            </Link>
          </div>
        </header>

        <main className="p-4 lg:p-8">
          <div className="container-custom">
            <Outlet />
          </div>
        </main>
        <LiaAIChatbot />
      </div>
    </div>
  )
}

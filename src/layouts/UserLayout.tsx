import React, { useState } from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
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
  Users,
  MessageSquare,
  History
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '../components/ui/Button'
import { Avatar } from '../components/ui/Avatar'
import { LiaAIChatbot } from '../components/LiaAIChatbot'
import { cn } from '../lib/utils'

const navItems = [
  { name: 'Home', href: '/dashboard', icon: Home },
  { name: 'Cari Helper', href: '/dashboard/helpers', icon: Search },
  { name: 'Jadwal', href: '/dashboard/bookings', icon: Calendar },
  { name: 'Chat', href: '/dashboard/chat', icon: MessageSquare },
  { name: 'Riwayat', href: '/dashboard/payment/history', icon: History },
]

export default function UserLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navbar - Integrated & Transparent */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent h-24 transition-all duration-300">
        <div className="container-custom h-full flex items-center justify-between px-4 sm:px-8 lg:px-12">
          <Link to="/" className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-white flex items-center justify-center shadow-lg shadow-primary/40 border border-white/20">
              <span className="text-primary font-bold text-2xl">S</span>
            </div>
            <span className="font-display text-2xl font-bold text-white drop-shadow-md hidden sm:block">SobatAman</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1 px-1 py-1 bg-white/10 backdrop-blur-md rounded-pill border border-white/20 shadow-lg">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "px-6 py-2.5 rounded-pill text-sm font-bold transition-all duration-200",
                    isActive 
                      ? "bg-white text-primary shadow-lg" 
                      : "text-white hover:bg-white/20"
                  )}
                >
                  {item.name}
                </Link>
              )
            })}
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-3 text-white bg-white/10 backdrop-blur-md rounded-full border border-white/20 hover:bg-white/20 transition-all shadow-lg">
              <Bell size={22} />
              <span className="absolute top-2.5 right-2.5 h-3 w-3 bg-accent rounded-full border-2 border-white animate-pulse"></span>
            </button>
            
            <div className="hidden sm:flex items-center gap-3 pl-4 pr-1 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-lg">
              <div className="text-right">
                <p className="text-sm font-bold text-white">Sari Wijaya</p>
                <p className="text-[10px] text-white/60 uppercase font-bold tracking-widest leading-none">Keluarga</p>
              </div>
              <Avatar fallback="S" className="h-10 w-10 border-2 border-white/30" />
            </div>

            {/* Mobile menu button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white shadow-lg"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 lg:hidden"
          >
            <div className="space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-4 p-4 rounded-card border border-border text-lg font-bold text-text-primary hover:bg-primary-light hover:border-primary/20 transition-all"
                >
                  <item.icon size={24} className="text-primary" />
                  {item.name}
                </Link>
              ))}
              <hr className="border-border" />
              <Button variant="ghost" className="w-full justify-start gap-4 p-4 h-auto text-error">
                <LogOut size={24} />
                Logout
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content Area */}
      <main className="pt-20">
        <Outlet />
      </main>

      <LiaAIChatbot />
    </div>
  )
}

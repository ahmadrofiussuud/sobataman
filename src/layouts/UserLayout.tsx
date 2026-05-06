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
  Users,
  MessageSquare,
  History,
  BookOpen
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
  { name: 'Jurnal', href: '/dashboard/journals', icon: BookOpen },
  { name: 'Anggota', href: '/dashboard/family', icon: Users },
  { name: 'Chat', href: '/dashboard/chat', icon: MessageSquare },
  { name: 'Riwayat', href: '/dashboard/payment/history', icon: History },
  { name: 'Profil', href: '/dashboard/profile', icon: User },
]

export default function UserLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.clear()
    navigate('/auth/login')
  }

  // Detect scroll to change navbar style
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    handleScroll() // Check initial state
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Check if we are on a page that needs a solid navbar
  const isSolidPage = location.pathname.includes('/payment/') || 
                     location.pathname.includes('/chat') ||
                     location.pathname.includes('/profile') ||
                     location.pathname.includes('/family') ||
                     location.pathname.includes('/settings') ||
                     location.pathname.includes('/client/helper-list') ||
                     (window.innerWidth < 1024 && isScrolled) // Always solid on mobile when scrolled
  
  const showSolidNav = isScrolled || isSolidPage

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navbar - Integrated & Transparent */}
      <nav className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 max-w-full overflow-x-hidden",
        showSolidNav 
          ? "bg-white/95 backdrop-blur-xl border-b border-border shadow-sm h-16 md:h-20" 
          : "bg-transparent h-20 md:h-28"
      )}>
        <div className="w-full max-w-full h-full flex items-center justify-between px-4 md:px-12">
          <Link to="/" className="flex items-center gap-2 md:gap-3 group shrink-0">
            <div className={cn(
              "h-9 w-9 md:h-12 md:w-12 rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110",
              showSolidNav 
                ? "bg-primary shadow-primary/20" 
                : "bg-white shadow-black/10"
            )}>
              <span className={cn(
                "font-bold text-lg md:text-2xl",
                showSolidNav ? "text-white" : "text-primary"
              )}>S</span>
            </div>
            <span className={cn(
              "font-display text-lg md:text-2xl font-bold transition-colors duration-300",
              showSolidNav ? "text-text-primary" : "text-white drop-shadow-md"
            )}>SobatAman</span>
          </Link>

          {/* Desktop Nav */}
          <div className={cn(
            "hidden lg:flex items-center gap-1 px-1 py-1 rounded-pill transition-all duration-300",
            showSolidNav ? "bg-gray-100/80 border border-border" : "bg-white/10 backdrop-blur-md border border-white/20"
          )}>
            {navItems.map((item) => {
              const isActive = location.pathname === item.href
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "px-6 py-2.5 rounded-pill text-sm font-bold transition-all duration-300",
                    isActive 
                      ? (showSolidNav ? "bg-primary text-white shadow-lg" : "bg-white text-primary shadow-lg")
                      : (showSolidNav ? "text-text-secondary hover:text-primary hover:bg-white" : "text-white hover:bg-white/20")
                  )}
                >
                  {item.name}
                </Link>
              )
            })}
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <button className={cn(
              "relative p-2 md:p-3 rounded-full transition-all duration-300",
              showSolidNav ? "bg-white border border-border text-text-secondary" : "bg-white/20 border border-white/20 text-white"
            )}>
              <Bell size={20} className="md:w-[22px] md:h-[22px]" />
              <span className="absolute top-2 right-2 h-2.5 w-2.5 bg-accent rounded-full border-2 border-white"></span>
            </button>
            
            <div className={cn(
              "hidden sm:flex items-center gap-3 pl-4 pr-1 py-1 rounded-full border transition-all duration-300",
              showSolidNav ? "bg-white border-border shadow-sm" : "bg-white/10 border-white/20 shadow-lg"
            )}>
              <div className="text-right">
                <p className={cn("text-sm font-bold leading-none mb-1", showSolidNav ? "text-text-primary" : "text-white")}>Sari Wijaya</p>
                <p className={cn("text-[10px] uppercase font-bold tracking-widest leading-none", showSolidNav ? "text-text-muted" : "text-white/60")}>Keluarga</p>
              </div>
              <Avatar fallback="S" className={cn("h-10 w-10 border", showSolidNav ? "border-border" : "border-white/30")} />
            </div>

            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={cn(
                "lg:hidden p-2.5 rounded-xl border transition-all duration-300",
                showSolidNav 
                  ? "bg-primary text-white border-primary shadow-lg shadow-primary/20" 
                  : "bg-white text-primary border-white shadow-xl"
              )}
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
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
              <Button 
                variant="ghost" 
                className="w-full justify-start gap-4 p-4 h-auto text-error"
                onClick={handleLogout}
              >
                <LogOut size={24} />
                Logout
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content Area */}
      <main className="transition-all duration-500 min-h-screen">
        <Outlet />
      </main>

      <LiaAIChatbot />
    </div>
  )
}

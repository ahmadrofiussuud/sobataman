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
  Wallet,
  MessageSquare,
  Award
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '../components/ui/Button'
import { Avatar } from '../components/ui/Avatar'
import { LiaAIChatbot } from '../components/LiaAIChatbot'
import { cn } from '../lib/utils'

const helperNavigation = [
  { name: 'Dashboard', href: '/helper', icon: Home },
  { name: 'Jadwal Saya', href: '/helper/schedule', icon: Calendar },
  { name: 'Dompet', href: '/helper/earnings', icon: Wallet },
  { name: 'Sertifikasi', href: '/helper/onboarding', icon: Award },
  { name: 'Pesan', href: '/helper/chat', icon: MessageSquare },
  { name: 'Profil', href: '/helper/profile', icon: User },
]

export default function HelperLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = () => {
    // Perform any cleanup here
    localStorage.clear()
    navigate('/auth/login')
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
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
          "fixed inset-y-0 left-0 z-50 w-[260px] transform bg-white border-r border-border transition-transform duration-300 ease-in-out lg:translate-x-0 shadow-2xl shadow-gray-200/50",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-20 items-center justify-between px-8">
          <Link to="/" className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
              <span className="text-white font-bold text-2xl">S</span>
            </div>
            <span className="font-display text-xl font-bold text-text-primary tracking-tight">SobatAman</span>
          </Link>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-text-secondary p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        <nav className="mt-6 px-4 space-y-2">
          <p className="px-4 text-[10px] font-black text-text-muted uppercase tracking-[0.2em] mb-4">Menu Utama</p>
          {helperNavigation.map((item) => {
            const isActive = location.pathname === item.href
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all duration-200 group",
                  isActive 
                    ? "bg-primary text-white shadow-xl shadow-primary/20 scale-[1.02]" 
                    : "text-text-secondary hover:bg-primary-light/50 hover:text-primary"
                )}
              >
                <item.icon size={20} className={cn(isActive ? "text-white" : "text-text-muted group-hover:text-primary")} />
                {item.name}
              </Link>
            )
          })}
        </nav>

        <div className="absolute bottom-8 left-0 w-full px-4 space-y-4">
          <div className="mx-4 p-4 bg-primary-light/30 rounded-2xl border border-primary/10">
            <p className="text-[10px] font-black text-primary uppercase tracking-wider mb-1">Status Kerja</p>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 bg-success rounded-full animate-pulse"></div>
              <p className="text-xs font-bold text-text-primary">Siap Menerima Order</p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            className="w-full justify-start gap-4 px-4 py-6 rounded-2xl text-error hover:bg-error/5 hover:text-error font-bold"
            onClick={handleLogout}
          >
            <LogOut size={20} />
            Keluar Akun
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-[260px]">
        {/* Header */}
        <header className="sticky top-0 z-30 h-20 bg-white/80 backdrop-blur-md border-b border-border flex items-center justify-between px-6 lg:px-12">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden text-text-secondary p-3 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Menu size={24} />
          </button>

          <div className="flex-1 max-w-xl hidden md:block">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary transition-colors" size={20} />
              <input 
                type="text" 
                placeholder="Cari jadwal, riwayat, atau ulasan..." 
                className="w-full pl-12 pr-4 py-2.5 rounded-xl border border-border bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm transition-all shadow-sm"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 lg:gap-6">
            <button className="relative p-3 text-text-secondary hover:bg-gray-50 hover:text-primary rounded-xl transition-all shadow-sm border border-transparent hover:border-border">
              <Bell size={22} />
              <span className="absolute top-2.5 right-2.5 h-3 w-3 bg-error rounded-full border-2 border-white shadow-sm"></span>
            </button>
            
            <div className="h-10 w-px bg-border mx-1"></div>
            
            <Link to="/helper/profile" className="flex items-center gap-3 pl-2 group">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-text-primary group-hover:text-primary transition-colors">Ahmad Fauzi</p>
                <p className="text-[10px] text-text-muted font-black uppercase tracking-widest leading-none">Mitra Helper</p>
              </div>
              <Avatar src="https://i.pravatar.cc/150?u=1" fallback="AF" className="h-11 w-11 border-2 border-primary-light shadow-md group-hover:scale-105 transition-transform" />
            </Link>
          </div>
        </header>

        <main className="p-6 lg:p-10 max-w-[1600px] mx-auto">
          <Outlet />
        </main>
        <LiaAIChatbot />
      </div>
    </div>
  )
}

import React from 'react'
import { motion } from 'framer-motion'
import { 
  User, 
  Settings, 
  Shield, 
  Bell, 
  LogOut, 
  ChevronRight, 
  Camera,
  CreditCard,
  MapPin,
  Mail,
  Phone
} from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { Card, CardContent } from '../../components/ui/Card'
import { Avatar } from '../../components/ui/Avatar'
import { useNavigate } from 'react-router-dom'

export default function ProfilePage() {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.clear()
    navigate('/auth/login')
  }

  const sections = [
    {
      title: 'Akun & Keamanan',
      items: [
        { icon: User, label: 'Informasi Pribadi', desc: 'Nama, email, dan nomor telepon', color: 'text-blue-500' },
        { icon: Shield, label: 'Kata Sandi & Keamanan', desc: 'Ubah kata sandi dan 2FA', color: 'text-emerald-500' },
        { icon: MapPin, label: 'Alamat Tersimpan', desc: 'Rumah, kantor, dan lokasi jemput', color: 'text-rose-500' },
      ]
    },
    {
      title: 'Pembayaran & Langganan',
      items: [
        { icon: CreditCard, label: 'Metode Pembayaran', desc: 'AmanPay, GoPay, dan Kartu Kredit', color: 'text-amber-500' },
        { icon: Settings, label: 'Preferensi Layanan', desc: 'Atur durasi minimum dan jenis helper', color: 'text-purple-500' },
      ]
    },
    {
      title: 'Notifikasi',
      items: [
        { icon: Bell, label: 'Pemberitahuan', desc: 'Push notification, email, dan WhatsApp', color: 'text-orange-500' },
      ]
    }
  ]

  return (
    <div className="container-custom px-4 lg:px-12 pt-28 md:pt-36 pb-20 space-y-10">
      {/* PROFILE HEADER */}
      <div className="flex flex-col md:flex-row items-center gap-8 bg-surface p-8 rounded-card border border-border shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="relative group">
          <Avatar src="https://i.pravatar.cc/150?u=sari" fallback="S" size="xl" className="h-28 w-28 md:h-32 md:w-32 border-4 border-white shadow-xl" />
          <button className="absolute bottom-1 right-1 p-2 bg-primary text-white rounded-full shadow-lg hover:scale-110 transition-transform">
            <Camera size={18} />
          </button>
        </div>

        <div className="flex-1 text-center md:text-left space-y-2">
          <h1 className="text-3xl font-display font-bold text-text-primary">Sari Wijaya</h1>
          <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-text-secondary">
            <span className="flex items-center gap-1.5"><Mail size={14} className="text-primary" /> sari.wijaya@email.com</span>
            <span className="flex items-center gap-1.5"><Phone size={14} className="text-primary" /> +62 812-3456-7890</span>
          </div>
          <div className="pt-2">
            <Button variant="outline" size="sm" className="rounded-pill px-6 font-bold text-xs uppercase tracking-widest border-primary/20 text-primary hover:bg-primary-light">
              Edit Profil
            </Button>
          </div>
        </div>
      </div>

      {/* SETTINGS SECTIONS */}
      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          {sections.map((section, idx) => (
            <section key={idx} className="space-y-4">
              <h3 className="text-lg font-display font-bold px-2">{section.title}</h3>
              <div className="space-y-3">
                {section.items.map((item, i) => (
                  <Card key={i} className="border-border/50 hover:border-primary/20 hover:shadow-md transition-all cursor-pointer group">
                    <CardContent className="p-4 md:p-6 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-xl bg-gray-50 ${item.color} group-hover:scale-110 transition-transform`}>
                          <item.icon size={22} />
                        </div>
                        <div>
                          <p className="font-bold text-text-primary">{item.label}</p>
                          <p className="text-xs text-text-secondary">{item.desc}</p>
                        </div>
                      </div>
                      <ChevronRight size={18} className="text-text-muted group-hover:translate-x-1 transition-transform" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="lg:col-span-4 space-y-6">
          <Card className="bg-primary text-white border-none shadow-xl shadow-primary/20 overflow-hidden relative">
            <CardContent className="p-8 space-y-6 relative z-10">
              <div className="space-y-2">
                <p className="text-xs font-black uppercase tracking-widest opacity-80">Paket Saat Ini</p>
                <h4 className="text-2xl font-display font-bold">Premium Family</h4>
              </div>
              <p className="text-xs leading-relaxed opacity-90">
                Anda memiliki akses tak terbatas ke AI Analysis dan prioritas booking helper.
              </p>
              <Button className="w-full bg-white text-primary hover:bg-white/90 font-bold">
                Kelola Langganan
              </Button>
            </CardContent>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
          </Card>

          <Button 
            variant="ghost" 
            className="w-full h-14 justify-start gap-4 px-6 text-error hover:bg-error/5 hover:text-error rounded-xl font-bold"
            onClick={handleLogout}
          >
            <LogOut size={20} /> Keluar Akun
          </Button>
        </div>
      </div>
    </div>
  )
}

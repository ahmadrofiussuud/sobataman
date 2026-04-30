import React from 'react'
import { motion } from 'framer-motion'
import { 
  CheckCircle2, 
  Copy, 
  ArrowRight, 
  Share2, 
  Home,
  Calendar,
  Clock,
  User
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { Card, CardContent } from '../../components/ui/Card'

export default function PaymentSuccessPage() {
  const navigate = useNavigate()
  const bookingId = "EMP-9824105"

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-8"
      >
        <div className="text-center space-y-6">
          <div className="relative inline-block">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 12, stiffness: 200, delay: 0.2 }}
              className="w-24 h-24 bg-success rounded-full flex items-center justify-center text-white shadow-xl shadow-success/20"
            >
              <CheckCircle2 size={48} strokeWidth={3} />
            </motion.div>
            
            {/* Success particles */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: [1, 0], scale: [1, 2], x: (Math.random() - 0.5) * 200, y: (Math.random() - 0.5) * 200 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-success/40"
              />
            ))}
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-display font-bold text-text-primary">Pembayaran Berhasil!</h1>
            <p className="text-text-secondary">Yeay! Pendampingan Anda telah berhasil dijadwalkan.</p>
          </div>
        </div>

        <Card className="border-border/50 shadow-md">
          <CardContent className="p-6 space-y-6">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md border border-border">
              <div className="space-y-0.5">
                <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest">Nomor Booking</p>
                <p className="font-mono font-bold text-text-primary">{bookingId}</p>
              </div>
              <button 
                onClick={() => navigator.clipboard.writeText(bookingId)}
                className="p-2 text-primary hover:bg-primary-light rounded-sm transition-colors"
              >
                <Copy size={18} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-primary-light rounded-full flex items-center justify-center text-primary">
                  <User size={20} />
                </div>
                <div>
                  <p className="text-xs text-text-muted font-bold uppercase">Helper</p>
                  <p className="text-sm font-bold">Ahmad Fauzi</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-primary-light rounded-full flex items-center justify-center text-primary">
                  <Calendar size={20} />
                </div>
                <div>
                  <p className="text-xs text-text-muted font-bold uppercase">Tanggal & Waktu</p>
                  <p className="text-sm font-bold">30 April 2026 · 08:00 WIB</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-accent-light/30 rounded-md border border-accent/10">
              <p className="text-xs text-accent font-bold text-center">
                Helper akan mengonfirmasi dalam maks. 30 menit kedepan.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-3">
          <Button 
            onClick={() => navigate('/dashboard/bookings')}
            className="w-full h-12 font-bold gap-2"
          >
            Lihat Detail Booking <ArrowRight size={18} />
          </Button>
          <div className="grid grid-cols-2 gap-3">
            <Button 
              variant="outline" 
              onClick={() => navigate('/dashboard')}
              className="h-12 font-bold gap-2"
            >
              <Home size={18} /> Beranda
            </Button>
            <Button 
              variant="secondary" 
              className="h-12 font-bold gap-2"
            >
              <Share2 size={18} /> Bagikan
            </Button>
          </div>
        </div>

        <p className="text-[10px] text-text-muted text-center max-w-[280px] mx-auto leading-relaxed">
          Keluarga Anda telah menerima notifikasi otomatis mengenai jadwal pendampingan ini di dashboard mereka.
        </p>
      </motion.div>
    </div>
  )
}

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Star, 
  MapPin, 
  ShieldCheck, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  MessageSquare, 
  ChevronLeft,
  Share2,
  MoreVertical,
  Activity,
  Heart,
  ArrowRight,
  Sparkles
} from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'
import { Avatar } from '../../components/ui/Avatar'
import { Card, CardContent } from '../../components/ui/Card'
import { cn } from '../../lib/utils'

export default function SessionReportPage() {
  const navigate = useNavigate()
  const [rating, setRating] = useState(0)

  return (
    <div className="max-w-2xl mx-auto space-y-8 pb-12">
      {/* HEADER */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <button className="flex items-center gap-2 text-text-secondary hover:text-primary transition-colors text-sm font-semibold">
            <ChevronLeft size={16} /> Kembali ke Dashboard
          </button>
          <div className="flex gap-2">
            <button className="p-2 bg-surface border border-border rounded-full text-text-secondary hover:bg-gray-50 transition-colors">
              <Share2 size={18} />
            </button>
            <button className="p-2 bg-surface border border-border rounded-full text-text-secondary hover:bg-gray-50 transition-colors">
              <MoreVertical size={18} />
            </button>
          </div>
        </div>

        <div className="bg-surface p-6 lg:p-8 rounded-card border border-border shadow-sm space-y-6">
          <div className="flex items-center gap-4">
            <div className="shrink-0">
              <Avatar fallback="B" size="xl" className="h-16 w-16 bg-primary-light text-primary font-bold border-2 border-primary/10" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-display font-bold text-text-primary">Laporan Sesi Bambang</h1>
                <Badge variant="success">SESI SELESAI</Badge>
              </div>
              <p className="text-sm text-text-secondary">Rabu, 29 April 2026 · 08:00 — 11:00 (3 Jam)</p>
            </div>
          </div>

          <div className="flex items-center gap-6 pt-4 border-t border-border/50">
            <div className="flex items-center gap-3">
              <Avatar src="https://i.pravatar.cc/150?u=1" size="sm" />
              <div>
                <p className="text-xs font-bold text-text-primary">Helper: Ahmad Fauzi</p>
                <div className="flex items-center gap-1 text-[10px] text-text-muted">
                  <ShieldCheck size={10} className="text-primary" /> Certified Helper
                </div>
              </div>
            </div>
            <div className="h-8 w-px bg-border"></div>
            <div className="flex items-center gap-1.5">
              <Star size={16} className="text-accent" fill="currentColor" />
              <span className="text-sm font-bold">4.9</span>
              <span className="text-[10px] text-text-muted uppercase font-bold">(Rating Helper)</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-8">
        {/* AKTIVITAS */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Activity size={20} className="text-primary" /> Aktivitas Sesi
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { icon: CheckCircle2, text: "Latihan jalan 30 menit" },
              { icon: CheckCircle2, text: "Bantu makan siang" },
              { icon: CheckCircle2, text: "Navigasi ke taman" },
              { icon: CheckCircle2, text: "Latihan peregangan otot" }
            ].map((act, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-surface rounded-md border border-border">
                <act.icon size={18} className="text-success" />
                <span className="text-sm text-text-primary font-medium">{act.text}</span>
              </div>
            ))}
          </div>
        </section>

        {/* KONDISI KLIEN */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Heart size={20} className="text-primary" /> Kondisi Klien
          </h2>
          <Card className="bg-success/5 border-success/20">
            <CardContent className="p-6 flex items-center gap-6">
              <div className="h-16 w-16 rounded-full bg-success text-white flex items-center justify-center shrink-0">
                <CheckCircle2 size={32} />
              </div>
              <div className="space-y-1">
                <p className="text-lg font-bold text-success">Sangat Baik</p>
                <p className="text-sm text-text-secondary">
                  Helper melaporkan bahwa Bambang dalam kondisi fisik dan emosional yang sangat prima selama sesi berlangsung.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* CATATAN HELPER */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold">Catatan dari Helper</h2>
          <blockquote className="relative p-6 bg-surface border-l-4 border-primary rounded-r-md shadow-sm">
            <p className="text-text-primary leading-relaxed italic">
              "Bambang sangat bersemangat hari ini saat latihan di taman. Ia berhasil menempuh jarak 50 meter tanpa bantuan sama sekali, sebuah kemajuan besar dari sesi minggu lalu. Ia juga sempat bercerita tentang hobi barunya menggambar."
            </p>
          </blockquote>
          
          <Button 
            variant="accent" 
            className="w-full h-14 bg-gradient-to-r from-primary to-accent hover:from-primary-hover hover:to-accent-hover text-white text-lg font-bold rounded-pill shadow-xl shadow-primary/20"
            onClick={() => navigate('/dashboard/ai-analysis/session-1')}
          >
            <Sparkles size={22} className="mr-3" /> Analisis AI (Smart Assessment)
          </Button>
        </section>

        {/* DOKUMENTASI */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold">Dokumentasi Foto</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="aspect-square bg-gray-100 rounded-md overflow-hidden border border-border">
              <img src="https://images.unsplash.com/photo-1531050171602-32867146014b?auto=format&fit=crop&q=80&w=400" alt="Activity" className="w-full h-full object-cover" />
            </div>
            <div className="aspect-square bg-gray-100 rounded-md overflow-hidden border border-border">
              <img src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=400" alt="Activity" className="w-full h-full object-cover" />
            </div>
          </div>
        </section>

        <hr className="border-border" />

        {/* RESPONSE & RATING SECTION */}
        <section className="space-y-6">
          <div className="text-center space-y-4">
            <h2 className="text-xl font-display font-bold">Beri Feedback untuk Sesi Ini</h2>
            <div className="flex justify-center gap-3">
              {[1, 2, 3, 4, 5].map((s) => (
                <button 
                  key={s} 
                  onClick={() => setRating(s)}
                  className={cn(
                    "p-1 transition-transform active:scale-90",
                    rating >= s ? "text-accent" : "text-gray-200"
                  )}
                >
                  <Star size={32} fill={rating >= s ? "currentColor" : "none"} />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold">Balas Catatan ke Helper</label>
              <textarea 
                className="w-full p-4 rounded-sm border border-border bg-background focus:ring-1 focus:ring-primary outline-none text-sm h-24 resize-none"
                placeholder="Terima kasih Fauzi! Senang dengar kabar kemajuan Bambang..."
              ></textarea>
            </div>
            <Button className="w-full h-12 font-bold">Kirim Feedback</Button>
          </div>

          <div className="bg-primary-light/30 p-8 rounded-card text-center space-y-4 border border-primary/10">
            <h3 className="text-lg font-bold text-primary">Puas dengan pelayanan Fauzi?</h3>
            <p className="text-sm text-text-secondary max-w-sm mx-auto">
              Anda bisa menjadwalkan sesi berikutnya sekarang untuk memastikan ketersediaan waktu beliau.
            </p>
            <Button variant="primary" className="gap-2 mx-auto">
              Booking Sesi Berikutnya <ArrowRight size={18} />
            </Button>
          </div>
        </section>
      </div>
    </div>
  )
}

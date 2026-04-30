import React, { useState } from 'react'
import { 
  Circle, 
  Calendar, 
  Wallet, 
  Star, 
  Activity, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  XCircle, 
  TrendingUp, 
  ChevronRight,
  AlertCircle,
  MoreVertical,
  Play,
  Download,
  Info
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'
import { Avatar } from '../../components/ui/Avatar'
import { Card, CardContent } from '../../components/ui/Card'
import { cn } from '../../lib/utils'

export default function HelperDashboardPage() {
  const [isOnline, setIsOnline] = useState(true)
  const [isSessionActive, setIsSessionActive] = useState(false)
  const [activeTab, setActiveTab] = useState('schedule')

  return (
    <div className="space-y-8 pb-12">
      {/* ACTIVE SESSION BANNER */}
      <AnimatePresence>
        {isSessionActive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-primary text-white p-4 lg:p-6 rounded-card shadow-xl shadow-primary/20 flex flex-col lg:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Avatar fallback="B" className="h-12 w-12 border-2 border-white/20" />
                  <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-success rounded-full border-2 border-primary animate-pulse"></div>
                </div>
                <div className="space-y-1">
                  <p className="text-xs opacity-70 uppercase font-bold tracking-widest">Sesi Berlangsung</p>
                  <h2 className="text-lg font-bold">Bambang Wijaya · <span className="font-mono">01:42:15</span></h2>
                </div>
              </div>
              <div className="flex gap-3 w-full lg:w-auto">
                <Button 
                  variant="outline" 
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20 flex-1 font-bold"
                  onClick={() => setIsSessionActive(false)}
                >
                  Selesaikan Sesi
                </Button>
                <Button 
                  variant="outline" 
                  className="bg-error/20 border-error/30 text-white hover:bg-error/40 px-4"
                >
                  <AlertCircle size={20} />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HEADER */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-2xl lg:text-3xl font-display font-bold text-text-primary">Halo, Fauzi!</h1>
          <p className="text-text-secondary text-sm">Selamat bekerja hari ini, bantu sesama dengan sepenuh hati.</p>
        </div>
        
        <button 
          onClick={() => setIsOnline(!isOnline)}
          className={cn(
            "relative w-full md:w-64 h-14 rounded-card flex items-center px-6 transition-all shadow-lg overflow-hidden group",
            isOnline ? "bg-success text-white shadow-success/20" : "bg-gray-100 text-text-secondary shadow-none"
          )}
        >
          <div className="flex items-center gap-3 relative z-10">
            <div className={cn(
              "h-3 w-3 rounded-full border-2 border-current",
              isOnline ? "bg-white animate-pulse" : "bg-transparent"
            )}></div>
            <span className="font-bold text-sm tracking-wide">
              {isOnline ? "ONLINE — SIAP BEKERJA" : "OFFLINE — ISTIRAHAT"}
            </span>
          </div>
          <div className={cn(
            "absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500",
            isOnline ? "block" : "hidden"
          )}></div>
        </button>
      </header>

      {/* QUICK STATS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {[
          { label: 'Sesi Hari Ini', value: '3', icon: Calendar, color: 'text-primary' },
          { label: 'Pendapatan Mei', value: 'Rp 2.4jt', icon: Wallet, color: 'text-accent' },
          { label: 'Rating Rata-rata', value: '4.9', icon: Star, color: 'text-success' },
          { label: 'Response Rate', value: '98%', icon: Activity, color: 'text-blue-500' }
        ].map((stat, i) => (
          <Card key={i} className="border-border/50 hover:shadow-md transition-all">
            <CardContent className="p-4 lg:p-6 flex flex-col items-center text-center space-y-2">
              <div className={cn("p-2 rounded-full bg-gray-50", stat.color)}>
                <stat.icon size={20} />
              </div>
              <div>
                <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest">{stat.label}</p>
                <p className="text-xl font-display font-bold text-text-primary">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* SECTION: BOOKING REQUESTS */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-display font-bold flex items-center gap-3">
                Permintaan Baru
                <span className="bg-error text-white text-[10px] font-bold px-2 py-0.5 rounded-pill">2</span>
              </h3>
              <button className="text-primary text-sm font-bold hover:underline">Lihat Semua</button>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { name: 'R***i', type: 'Tunadaksa', date: 'Besok, 30 Apr', time: '08:00', duration: '3 jam', price: 65000, note: 'Butuh bantuan navigasi ke RS.' },
                { name: 'A***n', type: 'Autisme', date: 'Jumat, 01 Mei', time: '14:00', duration: '2 jam', price: 75000, note: 'Pendampingan belajar di rumah.' }
              ].map((req, i) => (
                <Card key={i} className="border-border/50 overflow-hidden relative">
                  <div className="absolute top-0 right-0 p-2">
                    <div className="flex items-center gap-1 text-[10px] font-bold text-error bg-error/5 px-2 py-1 rounded-sm">
                      <Clock size={10} /> 25m
                    </div>
                  </div>
                  <CardContent className="p-5 space-y-4">
                    <div className="flex items-center gap-3">
                      <Avatar fallback={req.name[0]} size="md" />
                      <div>
                        <p className="font-bold text-sm">{req.name}</p>
                        <p className="text-[10px] text-text-secondary uppercase font-bold">{req.type}</p>
                      </div>
                    </div>
                    <div className="space-y-2 text-xs">
                      <p className="flex items-center gap-2 text-text-secondary">
                        <Calendar size={14} className="text-primary" /> {req.date} · {req.time} ({req.duration})
                      </p>
                      <p className="flex items-center gap-2 text-text-secondary">
                        <Wallet size={14} className="text-primary" /> Rp {req.price.toLocaleString('id-ID')}/jam
                      </p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-md text-[11px] italic text-text-secondary leading-relaxed">
                      "{req.note}"
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1 bg-success hover:bg-success/90 h-9">Terima</Button>
                      <Button variant="outline" size="sm" className="flex-1 text-error border-error/20 hover:bg-error/5 h-9">Tolak</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* SECTION: TODAY'S SCHEDULE */}
          <section className="space-y-4">
            <h3 className="text-xl font-display font-bold">Jadwal Hari Ini</h3>
            <div className="bg-surface rounded-card border border-border overflow-hidden">
              <div className="divide-y divide-border/50">
                {[
                  { time: '08:00', client: 'Bambang Wijaya', status: 'FINISHED', location: 'Lowokwaru' },
                  { time: '13:00', client: 'Siti Aminah', status: 'UPCOMING', location: 'Blimbing' },
                  { time: '16:00', client: '-', status: 'EMPTY', location: '-' }
                ].map((slot, i) => (
                  <div key={i} className="flex gap-4 p-4 lg:p-6 group hover:bg-gray-50 transition-colors">
                    <div className="w-12 text-center pt-1 shrink-0">
                      <p className="text-sm font-mono font-bold text-text-primary">{slot.time}</p>
                    </div>
                    <div className="flex-1">
                      {slot.status === 'EMPTY' ? (
                        <div className="h-16 rounded-md border-2 border-dashed border-border flex items-center justify-center">
                          <button className="text-xs font-bold text-text-muted hover:text-primary transition-colors flex items-center gap-2">
                            + Tambah Jadwal Blokir
                          </button>
                        </div>
                      ) : (
                        <div className={cn(
                          "p-4 rounded-md border flex justify-between items-center",
                          slot.status === 'FINISHED' ? "bg-gray-50 border-border opacity-60" : "bg-primary-light/20 border-primary/20"
                        )}>
                          <div className="space-y-1">
                            <p className="font-bold text-sm">{slot.client}</p>
                            <p className="text-[10px] text-text-secondary flex items-center gap-1.5 uppercase font-bold">
                              <MapPin size={10} /> {slot.location}
                            </p>
                          </div>
                          {slot.status === 'UPCOMING' && (
                            <Button size="sm" className="h-8 text-[10px] font-bold uppercase gap-1.5" onClick={() => setIsSessionActive(true)}>
                              <Play size={10} fill="currentColor" /> Mulai Sesi
                            </Button>
                          )}
                          {slot.status === 'FINISHED' && (
                            <Badge variant="outline" className="bg-white border-border">SELESAI</Badge>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        <div className="space-y-8">
          {/* SECTION: PENDAPATAN */}
          <section className="space-y-4">
            <h3 className="text-lg font-display font-bold">Pendapatan</h3>
            <Card className="border-border/50 shadow-md">
              <CardContent className="p-6 space-y-6">
                <div className="flex justify-between items-end">
                  <div className="space-y-1">
                    <p className="text-[10px] text-text-muted font-bold uppercase">Sudah Cair</p>
                    <p className="text-2xl font-mono font-bold text-text-primary">Rp 1.450.000</p>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="text-[10px] text-text-muted font-bold uppercase">Pending</p>
                    <p className="text-sm font-mono font-bold text-accent">Rp 950.000</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-text-muted uppercase">
                    <span>Tren 7 Hari</span>
                    <TrendingUp size={14} className="text-success" />
                  </div>
                  <div className="flex items-end gap-1.5 h-24">
                    {[40, 65, 30, 85, 45, 90, 70].map((h, i) => (
                      <div key={i} className="flex-1 bg-primary/10 rounded-t-sm relative group">
                        <motion.div 
                          initial={{ height: 0 }}
                          animate={{ height: `${h}%` }}
                          className="absolute bottom-0 left-0 right-0 bg-primary group-hover:bg-primary-hover transition-colors rounded-t-sm"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between text-[8px] font-bold text-text-muted uppercase px-1">
                    <span>Sen</span><span>Sel</span><span>Rab</span><span>Kam</span><span>Jum</span><span>Sab</span><span>Min</span>
                  </div>
                </div>

                <Button className="w-full h-11 font-bold gap-2">
                  <Wallet size={18} /> Tarik Saldo
                </Button>
              </CardContent>
            </Card>
          </section>

          {/* SECTION: PERFORMA */}
          <section className="space-y-4">
            <h3 className="text-lg font-display font-bold">Performa & Badge</h3>
            <Card className="border-border/50">
              <CardContent className="p-6 space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-[10px] text-text-muted font-bold uppercase">Progress Tier</p>
                      <p className="font-bold text-sm">Menuju Certified</p>
                    </div>
                    <p className="text-xs font-bold text-primary">85%</p>
                  </div>
                  <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '85%' }}
                      className="h-full bg-primary"
                    />
                  </div>
                  <p className="text-[10px] text-text-secondary leading-relaxed">
                    Selesaikan <span className="font-bold text-text-primary">12 sesi lagi</span> dan ikuti pelatihan kepekaan untuk menjadi Certified Helper.
                  </p>
                </div>

                <hr className="border-border/50" />

                <div className="space-y-3">
                  <p className="text-[10px] text-text-muted font-bold uppercase">Badges Koleksi</p>
                  <div className="flex flex-wrap gap-2">
                    {['On Time', 'Patient', 'Strong', 'Communicative'].map(b => (
                      <div key={b} className="h-8 w-8 rounded-full bg-accent-light/50 border border-accent/20 flex items-center justify-center text-accent" title={b}>
                        <TrendingUp size={14} />
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* RECENT REVIEWS */}
          <section className="space-y-4">
            <h3 className="text-lg font-display font-bold">Ulasan Terbaru</h3>
            <div className="space-y-3">
              {[1, 2].map(i => (
                <div key={i} className="p-4 bg-white rounded-md border border-border shadow-sm space-y-2">
                  <div className="flex justify-between items-start">
                    <div className="flex text-accent">
                      {[1, 2, 3, 4, 5].map(s => <Star key={s} size={10} fill="currentColor" />)}
                    </div>
                    <span className="text-[10px] text-text-muted">2 jam yang lalu</span>
                  </div>
                  <p className="text-[11px] text-text-primary italic leading-relaxed">
                    "Fauzi sangat sabar membimbing Bambang latihan jalan."
                  </p>
                </div>
              ))}
              <button className="w-full py-2 text-xs font-bold text-primary hover:underline">Lihat Semua Ulasan</button>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

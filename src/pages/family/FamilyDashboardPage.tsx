import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Bell, 
  MapPin, 
  Phone, 
  AlertTriangle, 
  ChevronRight, 
  Calendar, 
  Clock, 
  CreditCard, 
  Star, 
  Activity,
  UserPlus,
  MoreHorizontal,
  X,
  Navigation,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Search,
  Sparkles
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'
import { Avatar } from '../../components/ui/Avatar'
import { Card, CardContent } from '../../components/ui/Card'
import { cn } from '../../lib/utils'

export default function FamilyDashboardPage() {
  const navigate = useNavigate()
  const [isMapModalOpen, setIsMapModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'overview' | 'payment'>('overview')

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="flex justify-between items-center">
          <div className="h-8 w-48 bg-gray-200 rounded" />
          <div className="h-10 w-10 bg-gray-200 rounded-full" />
        </div>
        <div className="h-64 w-full bg-gray-200 rounded-card" />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => <div key={i} className="h-24 bg-gray-100 rounded-card" />)}
        </div>
      </div>
    )
  }

  return (
    <div className="pb-20">
      {/* HERO SECTION - REBITE STYLE */}
      <section className="relative -mt-20 md:-mt-28 pt-32 md:pt-60 pb-20 md:pb-32 overflow-hidden min-h-[600px] flex items-center">
        {/* Background Image with Dark Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/hero.png" 
            alt="SobatAman Hero" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60 md:bg-black/50"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
        </div>
        
        <div className="container-custom relative z-10 px-6 lg:px-12">
          <div className="max-w-4xl space-y-8 md:space-y-10 text-center md:text-left flex flex-col items-center md:items-start">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4 md:space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 backdrop-blur-md rounded-full border border-primary/30 text-primary-light text-[10px] md:text-xs font-bold uppercase tracking-widest mx-auto md:mx-0">
                <Activity size={14} className="text-accent" /> Family Growth Partner
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-8xl font-display font-bold text-white leading-[1.1] tracking-tight">
                Selamat pagi, <br />
                <span className="text-accent italic">Bu Sari</span>
              </h1>
              <p className="text-white/80 text-base sm:text-lg lg:text-2xl font-medium max-w-2xl leading-relaxed mx-auto md:mx-0">
                Bagaimana kabar Bambang hari ini? Mari pantau aktivitas dan kemandiriannya dengan bantuan pendamping terpercaya kami.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            >
              <Button size="lg" className="h-14 md:h-16 px-8 md:px-10 rounded-pill text-base md:text-xl font-bold shadow-2xl shadow-primary/40 hover:scale-105 transition-transform">
                Booking Baru <ChevronRight className="ml-2" />
              </Button>
              <Button variant="outline" size="lg" className="h-14 md:h-16 px-8 md:px-10 rounded-pill text-base md:text-xl font-bold border-white/30 text-white hover:bg-white/10 backdrop-blur-md transition-all">
                Lihat Jadwal
              </Button>
            </motion.div>
          </div>

          {/* Quick Search Bar - Floating Bottom */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-12 md:mt-16 bg-white/10 backdrop-blur-xl p-2 md:p-3 rounded-2xl md:rounded-[32px] shadow-2xl border border-white/20 flex flex-col md:flex-row items-center gap-2 md:gap-3 max-w-3xl mx-auto md:mx-0"
          >
            <div className="flex-1 flex items-center px-6 gap-4 w-full border-r border-white/10 hidden md:flex">
              <Search className="text-white/60" size={20} />
              <input 
                type="text" 
                placeholder="Cari helper, jadwal, atau laporan..." 
                className="bg-transparent border-none focus:ring-0 w-full h-12 text-sm font-semibold text-white placeholder:text-white/40"
              />
            </div>
            <div className="flex gap-2 w-full md:w-auto p-1">
              <Button variant="ghost" className="flex-1 md:flex-none h-11 md:h-12 px-4 md:px-6 rounded-xl md:rounded-pill text-white/80 font-bold hover:bg-white/10 text-xs md:text-sm">
                Bantuan
              </Button>
              <Button className="flex-2 md:flex-none h-11 md:h-12 px-6 md:px-8 rounded-xl md:rounded-pill font-bold bg-accent hover:bg-accent-hover text-white shadow-lg shadow-accent/20 text-xs md:text-sm">
                Cari Sekarang
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container-custom px-6 lg:px-12 space-y-12 mt-12">

      {activeTab === 'overview' ? (
        <>
          {/* SECTION 1: ACTIVE SESSION MONITOR */}
          <section>
            <Card className="bg-primary text-white border-none shadow-2xl overflow-hidden relative group">
              <CardContent className="p-0">
                <div className="p-5 md:p-8 lg:p-10 space-y-6 md:space-y-8 relative z-10">
                  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                    <div className="space-y-2">
                      <Badge variant="accent" className="bg-accent text-white border-none animate-pulse px-3 py-1 text-[10px]">SESI BERLANGSUNG</Badge>
                      <h2 className="text-xl md:text-3xl font-display font-bold leading-tight">Pendampingan Mobilitas Pagi</h2>
                    </div>
                    <div className="flex items-center justify-between w-full lg:w-auto gap-4">
                      <div className="text-left lg:text-right">
                        <p className="text-[9px] md:text-[10px] opacity-70 uppercase font-bold tracking-wider">Estimasi Selesai</p>
                        <p className="text-lg md:text-2xl font-mono font-bold">00:45:12</p>
                      </div>
                      <div className="h-10 w-px bg-white/20 hidden lg:block"></div>
                      <Button 
                        variant="outline" 
                        className="bg-white text-primary border-white hover:bg-primary-light hover:text-primary font-bold h-11 md:h-14 px-5 md:px-6 shadow-xl text-xs"
                        onClick={() => setIsMapModalOpen(true)}
                      >
                        <Navigation size={16} className="mr-2" /> Lokasi
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 py-6 border-y border-white/10">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-6">
                      <div className="flex items-center gap-4 w-full sm:w-auto">
                        <div className="space-y-1">
                          <p className="text-[9px] opacity-70 uppercase font-bold tracking-widest text-primary-light">Klien</p>
                          <div className="flex items-center gap-2">
                            <Avatar fallback="B" className="h-10 w-10 border-2 border-white/20" />
                            <p className="font-bold text-sm md:text-lg">Bambang</p>
                          </div>
                        </div>
                        <div className="text-primary-light mx-auto sm:mx-2 rotate-90 sm:rotate-0">
                          <ChevronRight size={20} className="opacity-50" />
                        </div>
                        <div className="space-y-1">
                          <p className="text-[9px] opacity-70 uppercase font-bold tracking-widest text-primary-light">Helper</p>
                          <div className="flex items-center gap-2">
                            <Avatar src="https://i.pravatar.cc/150?u=1" fallback="AF" className="h-10 w-10 border-2 border-white/20" />
                            <div>
                              <p className="font-bold text-sm md:text-lg">Ahmad Fauzi</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-end text-[11px] md:text-sm">
                        <span className="opacity-80 font-medium">Progress Sesi (2/3 jam)</span>
                        <span className="font-bold text-accent">66%</span>
                      </div>
                      <div className="h-2.5 w-full bg-white/10 rounded-full overflow-hidden shadow-inner">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: '66%' }}
                          className="h-full bg-accent shadow-[0_0_15px_rgba(249,115,22,0.5)]"
                        ></motion.div>
                      </div>
                      <p className="text-[10px] md:text-xs opacity-70 flex items-center gap-2 font-medium">
                        <Clock size={12} className="text-accent" /> Dimulai 08:00 WIB · Taman Krida
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20 h-11 md:h-14 font-bold rounded-xl flex-1 text-xs">
                      <Phone size={16} className="mr-2" /> Hubungi
                    </Button>
                    <Button variant="outline" className="bg-error/20 border-error/30 text-white hover:bg-error/40 h-11 md:h-14 font-bold rounded-xl flex-1 text-xs shadow-lg shadow-error/10">
                      <AlertTriangle size={16} className="mr-2" /> Darurat
                    </Button>
                  </div>
                </div>

                {/* Background Decoration */}
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-white/5 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700"></div>
              </CardContent>
            </Card>
          </section>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* SECTION 2: REGISTERED FAMILY MEMBERS */}
              <section className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-display font-bold">Anggota Keluarga</h3>
                  <button className="text-primary text-[10px] font-black uppercase tracking-widest flex items-center gap-1 hover:underline">
                    <UserPlus size={14} /> Tambah
                  </button>
                </div>
                <div className="flex overflow-x-auto pb-4 gap-4 scrollbar-hide -mx-1 px-1">
                  {[
                    { name: "Bambang Wijaya", role: "Anak", type: "Tunadaksa", status: "Sedang Sesi" },
                    { name: "Siti Aminah", role: "Ibu", type: "Lansia", status: "Tidak Ada Jadwal" }
                  ].map((member, i) => (
                    <Card key={i} className="min-w-[240px] md:min-w-[280px] border-border/50 hover:border-primary transition-colors cursor-pointer group shadow-sm">
                      <CardContent className="p-4 md:p-5 flex items-center gap-3">
                        <Avatar fallback={member.name[0]} size="md" className="bg-primary-light text-primary font-bold border border-primary/10" />
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-text-primary text-sm truncate">{member.name}</p>
                          <p className="text-[10px] text-text-secondary truncate">{member.role} · {member.type}</p>
                          <Badge variant={member.status === 'Sedang Sesi' ? 'primary' : 'outline'} className="text-[8px] py-0 mt-1 h-4 font-black uppercase tracking-widest border-none">
                            {member.status}
                          </Badge>
                        </div>
                      </CardContent>
                      <div className="px-4 md:px-5 pb-4 md:pb-5">
                        <Button variant="secondary" className="w-full text-[10px] h-8 md:h-9 font-bold uppercase tracking-wider">Booking untuk {member.name.split(' ')[0]}</Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </section>

              {/* SECTION 3: UPCOMING BOOKINGS */}
              <section className="space-y-4">
                <h3 className="text-xl font-display font-bold px-1">Jadwal Mendatang</h3>
                <div className="space-y-4">
                  {[
                    { date: "Besok, 30 Apr", time: "10:00 - 13:00", helper: "Siti Rahma", role: "ADHD Specialist", status: "Menunggu Konfirmasi" },
                    { date: "Jumat, 01 Mei", time: "15:00 - 17:00", helper: "Budi Hartono", role: "Mobilitas Specialist", status: "Terkonfirmasi" }
                  ].map((booking, i) => (
                    <Card key={i} className="border-border/50 overflow-hidden hover:border-primary/10 transition-all shadow-sm">
                      <CardContent className="p-0">
                        <div className="flex flex-col sm:flex-row sm:items-center p-4 md:p-6 gap-4 md:gap-8">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 md:w-16 md:h-16 bg-primary-light rounded-xl flex flex-col items-center justify-center text-primary border border-primary/5 shrink-0">
                              <p className="text-[8px] md:text-[9px] font-black uppercase tracking-tighter opacity-70 leading-none">{booking.date.split(', ')[0]}</p>
                              <p className="text-base md:text-xl font-display font-black leading-none">{booking.date.split(', ')[1].split(' ')[0]}</p>
                            </div>
                            <div className="flex-1 min-w-0 space-y-1">
                              <p className="font-extrabold text-text-primary text-sm md:text-lg truncate">{booking.helper}</p>
                              <Badge variant={booking.status === 'Terkonfirmasi' ? 'success' : 'warning'} className="text-[7px] md:text-[8px] py-0 px-1.5 h-4 rounded-md border-none uppercase font-black tracking-widest">
                                {booking.status}
                              </Badge>
                            </div>
                          </div>

                          <div className="flex-1 flex flex-row sm:flex-col justify-between items-center sm:items-start gap-1">
                            <p className="text-[10px] md:text-xs text-text-secondary font-bold flex items-center gap-1.5 order-2 sm:order-1">
                              <Clock size={12} className="text-primary/60" /> {booking.time}
                            </p>
                          </div>

                          <div className="flex items-center gap-2 w-full sm:w-auto">
                            {booking.status === 'Menunggu Konfirmasi' && (
                              <Button variant="primary" size="sm" className="bg-success hover:bg-success/90 h-9 md:h-10 flex-1 sm:flex-none px-4 md:px-6 text-[9px] md:text-xs font-black uppercase tracking-widest rounded-xl">Approve</Button>
                            )}
                            <Button variant="outline" size="sm" className="text-error border-error/20 hover:bg-error/5 h-9 md:h-10 flex-1 sm:flex-none px-4 md:px-6 text-[9px] md:text-xs font-black uppercase tracking-widest rounded-xl">Batal</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>

              {/* SECTION 5: HELPER JOURNAL */}
              <section className="space-y-4">
                <div className="flex items-center justify-between px-1">
                  <h3 className="text-xl font-display font-bold">Laporan dari Helper</h3>
                  <button className="text-primary text-xs font-black uppercase tracking-widest hover:underline">Lihat Semua</button>
                </div>
                <div className="space-y-4">
                  {[
                    { date: "Kemarin, 28 Apr", helper: "Dewi Lestari", client: "Bambang", status: "Sangat Baik", activities: ["Latihan jalan", "Makan siang", "Navigasi"], note: "Bambang sangat bersemangat hari ini. Progres jalan meningkat." }
                  ].map((report, i) => (
                    <Card key={i} className="border-border/50 hover:shadow-lg transition-shadow overflow-hidden">
                      <CardContent className="p-4 md:p-8 space-y-5 md:space-y-6">
                        <div className="flex justify-between items-center gap-4">
                          <div className="flex items-center gap-3">
                            <Avatar src="https://i.pravatar.cc/150?u=4" fallback="DL" size="md" className="border-2 border-primary-light" />
                            <div>
                              <p className="font-extrabold text-text-primary text-sm md:text-lg">Laporan {report.helper}</p>
                              <p className="text-[10px] md:text-xs text-text-muted font-bold uppercase tracking-tighter">{report.date}</p>
                            </div>
                          </div>
                          <Badge variant="success" className="gap-1 px-2 md:px-3 bg-success/10 text-success border-none text-[9px] md:text-xs font-black uppercase tracking-widest rounded-lg">
                            <CheckCircle2 size={12} /> {report.status}
                          </Badge>
                        </div>

                        <div className="flex overflow-x-auto gap-2 pb-1 scrollbar-hide">
                          {report.activities.map(act => (
                            <span key={act} className="shrink-0 px-2.5 py-1 bg-gray-50 border border-border/50 rounded-lg text-[9px] font-bold text-text-secondary">
                              {act}
                            </span>
                          ))}
                        </div>

                        <div className="bg-primary-light/10 p-4 md:p-5 rounded-xl border border-primary/5 relative overflow-hidden">
                          <div className="absolute top-0 left-0 w-1 h-full bg-primary/20"></div>
                          <p className="text-[9px] md:text-[10px] font-black text-primary uppercase tracking-widest mb-1.5">Catatan Helper</p>
                          <p className="text-xs md:text-sm text-text-primary leading-relaxed italic font-medium">"{report.note}"</p>
                        </div>

                        <Button 
                          variant="accent" 
                          className="w-full h-11 md:h-14 bg-gradient-to-br from-primary via-primary to-accent text-white font-black uppercase text-[10px] md:text-xs tracking-[0.15em] rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all"
                          onClick={() => navigate(`/dashboard/ai-analysis/${i + 1}`)}
                        >
                          <Sparkles size={16} className="mr-2" /> Analisis AI
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            </div>

            <div className="space-y-8">
              {/* SECTION 6: QUICK STATS */}
              <section className="grid grid-cols-2 gap-3 md:gap-4">
                <Card className="border-border/50 bg-surface hover:border-primary/20 transition-colors shadow-sm">
                  <CardContent className="p-4 text-center space-y-1">
                    <p className="text-xl md:text-2xl font-mono font-bold text-primary">24</p>
                    <p className="text-[9px] md:text-[10px] text-text-muted uppercase font-black tracking-widest">Sesi Bulan Ini</p>
                  </CardContent>
                </Card>
                <Card className="border-border/50 bg-surface hover:border-primary/20 transition-colors shadow-sm">
                  <CardContent className="p-4 text-center space-y-1">
                    <p className="text-lg md:text-xl font-mono font-bold text-primary">Rp 1.2jt</p>
                    <p className="text-[9px] md:text-[10px] text-text-muted uppercase font-black tracking-widest">Total Biaya</p>
                  </CardContent>
                </Card>
                <Card className="border-border/50 bg-surface hover:border-primary/20 transition-colors shadow-sm">
                  <CardContent className="p-4 text-center space-y-1">
                    <p className="text-xl md:text-2xl font-mono font-bold text-primary">4.9</p>
                    <p className="text-[9px] md:text-[10px] text-text-muted uppercase font-black tracking-widest">Avg Rating</p>
                  </CardContent>
                </Card>
                <Card className="border-border/50 bg-surface hover:border-primary/20 transition-colors shadow-sm">
                  <CardContent className="p-4 text-center space-y-1">
                    <div className="flex justify-center -space-x-1.5">
                      <Avatar src="https://i.pravatar.cc/150?u=1" className="h-6 w-6 border-2 border-white shadow-sm" />
                      <Avatar src="https://i.pravatar.cc/150?u=4" className="h-6 w-6 border-2 border-white shadow-sm" />
                    </div>
                    <p className="text-[9px] md:text-[10px] text-text-muted uppercase font-black tracking-widest mt-1">Helper Favorit</p>
                  </CardContent>
                </Card>
              </section>

              {/* SECTION 4: RECURRING SCHEDULE */}
              <section className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-display font-bold">Jadwal Rutin</h3>
                  <button className="text-primary text-xs font-bold hover:underline">Edit</button>
                </div>
                <Card className="border-border/50">
                  <CardContent className="p-0">
                    <div className="divide-y divide-border/50">
                      {[
                        { day: "Senin", helper: "Fauzi", time: "08:00", type: "Fisik" },
                        { day: "Rabu", helper: "Fauzi", time: "08:00", type: "Fisik" },
                        { day: "Jumat", helper: "Fauzi", time: "08:00", type: "Fisik" }
                      ].map((slot, i) => (
                        <div key={i} className="flex items-center justify-between p-4 hover:bg-primary-light/10 transition-colors">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary-light rounded flex items-center justify-center text-primary font-bold text-xs">
                              {slot.day.substring(0, 3)}
                            </div>
                            <div>
                              <p className="text-sm font-bold">{slot.helper} · {slot.time}</p>
                              <p className="text-[10px] text-text-muted">{slot.type}</p>
                            </div>
                          </div>
                          <Badge variant="primary" className="h-5 py-0 px-2 text-[8px]">ROUTINE</Badge>
                        </div>
                      ))}
                    </div>
                    <button className="w-full py-4 text-xs font-bold text-primary hover:bg-gray-50 border-t border-border/50 transition-colors">
                      + Tambah Jadwal Rutin
                    </button>
                  </CardContent>
                </Card>
              </section>

              <Card className="bg-accent-light/50 border-accent/20 border">
                <CardContent className="p-5 flex gap-4">
                  <div className="shrink-0 w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center">
                    <AlertCircle size={20} />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-accent">Tips Keamanan</p>
                    <p className="text-xs text-text-secondary leading-relaxed">
                      Selalu minta helper untuk menunjukkan ID di aplikasi saat pertama kali bertemu.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </>
      ) : (
        /* PAYMENT SECTION PLACEHOLDER */
        <section className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="md:col-span-2 border-border/50">
              <CardContent className="p-6 space-y-6">
                <h3 className="text-lg font-bold">Riwayat Pembayaran</h3>
                <div className="space-y-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gray-100 rounded-md text-text-secondary">
                          <CreditCard size={18} />
                        </div>
                        <div>
                          <p className="text-sm font-bold">Topup Saldo AmanPay</p>
                          <p className="text-xs text-text-muted">25 April 2026 · 14:20</p>
                        </div>
                      </div>
                      <p className="font-mono font-bold text-success">+ Rp 500.000</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card className="bg-primary text-white border-none">
              <CardContent className="p-6 space-y-6">
                <div>
                  <p className="text-xs opacity-70 uppercase font-bold mb-1">Saldo AmanPay</p>
                  <p className="text-3xl font-mono font-bold">Rp 742.500</p>
                </div>
                <Button className="w-full bg-white text-primary border-white hover:bg-primary-light hover:text-primary font-bold">
                  Top Up Saldo
                </Button>
                <hr className="border-white/10" />
                <div className="space-y-3">
                  <p className="text-xs font-bold uppercase opacity-70 tracking-widest">Kartu Tersimpan</p>
                  <div className="flex items-center justify-between bg-white/10 p-3 rounded border border-white/10">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-5 bg-white/20 rounded"></div>
                      <span className="text-sm font-mono">**** 4242</span>
                    </div>
                    <Badge className="bg-white/20 text-[8px]">PRIMARY</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      </div>

      {/* MAP MODAL */}
      <AnimatePresence>
        {isMapModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMapModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-4xl h-[80vh] bg-surface rounded-card shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="p-4 border-b border-border flex items-center justify-between bg-white z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center text-primary">
                    <Navigation size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold">Real-Time Location Tracking</h3>
                    <p className="text-xs text-text-secondary flex items-center gap-1">
                      <div className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" /> Update otomatis setiap 30 detik
                    </p>
                  </div>
                </div>
                <button onClick={() => setIsMapModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 relative bg-gray-100 overflow-hidden">
                <img 
                  src="/images/map-bg.png" 
                  alt="Map Background" 
                  className="w-full h-full object-cover opacity-60 grayscale-[0.5]"
                />
                
                {/* Marker Klien */}
                <motion.div 
                  animate={{ 
                    y: [0, -10, 0],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
                >
                  <div className="bg-primary text-white p-2 rounded-lg shadow-xl mb-1 flex items-center gap-2">
                    <Avatar fallback="B" size="sm" className="border-none" />
                    <span className="text-xs font-bold whitespace-nowrap">Bambang Wijaya</span>
                  </div>
                  <div className="w-4 h-4 bg-primary rounded-full border-2 border-white shadow-lg shadow-primary/50"></div>
                </motion.div>

                {/* Marker Helper */}
                <motion.div 
                  animate={{ 
                    x: [0, 20, 0],
                    y: [0, 10, 0],
                  }}
                  transition={{ duration: 10, repeat: Infinity }}
                  className="absolute top-1/2 left-2/3 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
                >
                  <div className="bg-accent text-white p-2 rounded-lg shadow-xl mb-1 flex items-center gap-2">
                    <Avatar src="https://i.pravatar.cc/150?u=1" fallback="AF" size="sm" className="border-none" />
                    <span className="text-xs font-bold whitespace-nowrap">Ahmad Fauzi (Helper)</span>
                  </div>
                  <div className="w-4 h-4 bg-accent rounded-full border-2 border-white shadow-lg shadow-accent/50"></div>
                </motion.div>

                <div className="absolute bottom-6 left-6 right-6 lg:left-auto lg:w-80 bg-white p-4 rounded-card shadow-xl border border-border">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <p className="text-xs font-bold text-text-muted uppercase">Status Lokasi</p>
                      <Badge variant="primary">Menuju Lokasi Berikutnya</Badge>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary-light rounded-full flex items-center justify-center text-primary">
                        <MapPin size={16} />
                      </div>
                      <div>
                        <p className="text-sm font-bold">Taman Krida Budaya</p>
                        <p className="text-xs text-text-secondary">Jl. Soekarno Hatta, Malang</p>
                      </div>
                    </div>
                    <hr className="border-border/50" />
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-text-secondary italic">"Sedang membantu Bambang latihan jalan di area taman."</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

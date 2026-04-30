import React, { useState, useEffect } from 'react'
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
  Search
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'
import { Avatar } from '../../components/ui/Avatar'
import { Card, CardContent } from '../../components/ui/Card'
import { cn } from '../../lib/utils'

export default function FamilyDashboardPage() {
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
      <section className="relative -mt-24 pt-48 pb-32 overflow-hidden min-h-[600px] flex items-center">
        {/* Background Image with Dark Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/hero.png" 
            alt="SobatAman Hero" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
        </div>
        
        <div className="container-custom relative z-10 px-4 sm:px-8 lg:px-12">
          <div className="max-w-4xl space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 backdrop-blur-md rounded-full border border-primary/30 text-primary-light text-xs font-bold uppercase tracking-widest">
                <Activity size={14} className="text-accent" /> Family Growth Partner
              </div>
              <h1 className="text-5xl lg:text-8xl font-display font-bold text-white leading-[1.1]">
                Selamat pagi, <br />
                <span className="text-accent italic">Bu Sari</span>
              </h1>
              <p className="text-white/80 text-xl lg:text-2xl font-medium max-w-2xl leading-relaxed">
                Bagaimana kabar Bambang hari ini? Mari pantau aktivitas dan kemandiriannya dengan bantuan pendamping terpercaya kami.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap gap-4"
            >
              <Button size="lg" className="h-16 px-10 rounded-pill text-xl font-bold shadow-2xl shadow-primary/40 hover:scale-105 transition-transform">
                Booking Pendamping Baru <ChevronRight className="ml-2" />
              </Button>
              <Button variant="outline" size="lg" className="h-16 px-10 rounded-pill text-xl font-bold border-white/30 text-white hover:bg-white/10 backdrop-blur-md transition-all">
                Lihat Jadwal
              </Button>
            </motion.div>
          </div>

          {/* Quick Search Bar - Floating Bottom */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-16 bg-white/10 backdrop-blur-xl p-3 rounded-[32px] shadow-2xl border border-white/20 flex flex-col md:flex-row items-center gap-3 max-w-3xl"
          >
            <div className="flex-1 flex items-center px-6 gap-4 w-full border-r border-white/10 hidden md:flex">
              <Search className="text-white/60" size={20} />
              <input 
                type="text" 
                placeholder="Cari helper, jadwal, atau laporan..." 
                className="bg-transparent border-none focus:ring-0 w-full h-12 text-sm font-semibold text-white placeholder:text-white/40"
              />
            </div>
            <div className="flex gap-3 w-full md:w-auto p-1">
              <Button variant="ghost" className="flex-1 md:flex-none h-12 px-6 rounded-pill text-white/80 font-bold hover:bg-white/10">
                Bantuan
              </Button>
              <Button className="flex-1 md:flex-none h-12 px-8 rounded-pill font-bold bg-accent hover:bg-accent-hover text-white shadow-lg shadow-accent/20">
                Cari Sekarang
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container-custom px-4 sm:px-8 lg:px-12 space-y-12 mt-12">

      {activeTab === 'overview' ? (
        <>
          {/* SECTION 1: ACTIVE SESSION MONITOR */}
          <section>
            <Card className="bg-primary text-white border-none shadow-xl overflow-hidden relative group">
              <CardContent className="p-0">
                <div className="p-6 lg:p-8 space-y-6 relative z-10">
                  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                    <div className="space-y-1">
                      <Badge variant="accent" className="bg-accent text-white border-none animate-pulse">SESI BERLANGSUNG</Badge>
                      <h2 className="text-2xl font-display font-bold">Pendampingan Mobilitas Pagi</h2>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="text-xs opacity-70 uppercase font-bold">Estimasi Selesai</p>
                        <p className="text-xl font-mono font-bold">00:45:12</p>
                      </div>
                      <div className="h-10 w-px bg-white/20"></div>
                      <Button 
                        variant="outline" 
                        className="bg-white text-primary border-white hover:bg-primary-light hover:text-primary font-bold"
                        onClick={() => setIsMapModalOpen(true)}
                      >
                        <Navigation size={18} className="mr-2" /> Lihat Lokasi Real-Time
                      </Button>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8 py-4 border-y border-white/10">
                    <div className="flex items-center gap-4">
                      <div className="space-y-1">
                        <p className="text-[10px] opacity-70 uppercase font-bold">Klien (Anak)</p>
                        <div className="flex items-center gap-3">
                          <Avatar fallback="B" className="border-2 border-white/20" />
                          <p className="font-bold text-lg">Bambang Wijaya</p>
                        </div>
                      </div>
                      <div className="text-primary-light mx-4">
                        <ChevronRight size={24} />
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] opacity-70 uppercase font-bold">Helper</p>
                        <div className="flex items-center gap-3">
                          <Avatar src="https://i.pravatar.cc/150?u=1" fallback="AF" className="border-2 border-white/20" />
                          <div>
                            <p className="font-bold text-lg">Ahmad Fauzi</p>
                            <p className="text-[10px] flex items-center gap-1"><ShieldCheck size={10} /> Certified</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-end text-sm">
                        <span className="opacity-70">Progress Sesi (2/3 jam)</span>
                        <span className="font-bold">66%</span>
                      </div>
                      <div className="h-2 w-full bg-white/20 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: '66%' }}
                          className="h-full bg-accent"
                        ></motion.div>
                      </div>
                      <p className="text-xs opacity-70 flex items-center gap-1.5">
                        <Clock size={12} /> Dimulai pukul 08:00 WIB · Lokasi: Taman Krida Budaya
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20 flex-1">
                      <Phone size={18} className="mr-2" /> Hubungi Helper
                    </Button>
                    <Button variant="outline" className="bg-error/20 border-error/30 text-white hover:bg-error/40 flex-1 font-bold">
                      <AlertTriangle size={18} className="mr-2" /> Darurat / SOS
                    </Button>
                  </div>
                </div>

                {/* Background Decoration */}
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700"></div>
              </CardContent>
            </Card>
          </section>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* SECTION 2: REGISTERED FAMILY MEMBERS */}
              <section className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-display font-bold">Anggota Keluarga</h3>
                  <button className="text-primary text-sm font-bold flex items-center gap-1 hover:underline">
                    <UserPlus size={16} /> Tambah
                  </button>
                </div>
                <div className="flex overflow-x-auto pb-4 gap-4 scrollbar-hide">
                  {[
                    { name: "Bambang Wijaya", role: "Anak", type: "Tunadaksa", status: "Sedang Sesi" },
                    { name: "Siti Aminah", role: "Ibu", type: "Lansia", status: "Tidak Ada Jadwal" }
                  ].map((member, i) => (
                    <Card key={i} className="min-w-[280px] border-border/50 hover:border-primary transition-colors cursor-pointer">
                      <CardContent className="p-5 flex items-center gap-4">
                        <Avatar fallback={member.name[0]} size="lg" className="bg-primary-light text-primary font-bold" />
                        <div className="flex-1 space-y-1">
                          <p className="font-bold text-text-primary">{member.name}</p>
                          <p className="text-xs text-text-secondary">{member.role} · {member.type}</p>
                          <Badge variant={member.status === 'Sedang Sesi' ? 'primary' : 'outline'} className="text-[10px] py-0">
                            {member.status}
                          </Badge>
                        </div>
                      </CardContent>
                      <div className="px-5 pb-5">
                        <Button variant="secondary" className="w-full text-xs h-9">Booking untuk {member.name.split(' ')[0]}</Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </section>

              {/* SECTION 3: UPCOMING BOOKINGS */}
              <section className="space-y-4">
                <h3 className="text-xl font-display font-bold">Jadwal Mendatang</h3>
                <div className="space-y-3">
                  {[
                    { date: "Besok, 30 Apr", time: "10:00 - 13:00", helper: "Siti Rahma", role: "ADHD Specialist", status: "Menunggu Konfirmasi" },
                    { date: "Jumat, 01 Mei", time: "15:00 - 17:00", helper: "Budi Hartono", role: "Mobilitas Specialist", status: "Terkonfirmasi" }
                  ].map((booking, i) => (
                    <Card key={i} className="border-border/50 overflow-hidden">
                      <CardContent className="p-0">
                        <div className="flex items-center p-4 gap-4">
                          <div className="w-16 h-16 bg-primary-light rounded-md flex flex-col items-center justify-center text-primary shrink-0">
                            <p className="text-[10px] font-bold uppercase">{booking.date.split(', ')[0]}</p>
                            <p className="text-lg font-mono font-bold leading-none">{booking.date.split(', ')[1].split(' ')[0]}</p>
                            <p className="text-[10px] font-bold uppercase">{booking.date.split(', ')[1].split(' ')[1]}</p>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <p className="font-bold truncate">{booking.helper}</p>
                              <Badge variant={booking.status === 'Terkonfirmasi' ? 'success' : 'warning'} className="text-[9px] py-0">
                                {booking.status}
                              </Badge>
                            </div>
                            <p className="text-xs text-text-secondary flex items-center gap-1.5">
                              <Clock size={12} /> {booking.time} · {booking.role}
                            </p>
                          </div>
                          <div className="flex gap-2 shrink-0">
                            {booking.status === 'Menunggu Konfirmasi' && (
                              <Button variant="primary" size="sm" className="bg-success hover:bg-success/90 h-8 text-xs">Approve</Button>
                            )}
                            <Button variant="outline" size="sm" className="text-error border-error/30 hover:bg-error/5 h-8 text-xs">Batal</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>

              {/* SECTION 5: HELPER JOURNAL */}
              <section className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-display font-bold">Laporan dari Helper</h3>
                  <button className="text-primary text-sm font-bold hover:underline">Lihat Semua</button>
                </div>
                <div className="space-y-4">
                  {[
                    { date: "Kemarin, 28 Apr", helper: "Dewi Lestari", client: "Bambang", status: "Sangat Baik", activities: ["Latihan jalan 30 menit", "Bantu makan siang", "Navigasi ke taman"], note: "Bambang sangat bersemangat hari ini. Progres jalan tanpa bantuan meningkat." }
                  ].map((report, i) => (
                    <Card key={i} className="border-border/50">
                      <CardContent className="p-6 space-y-4">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-3">
                            <Avatar src="https://i.pravatar.cc/150?u=4" fallback="DL" />
                            <div>
                              <p className="font-bold text-sm">Laporan {report.helper}</p>
                              <p className="text-xs text-text-muted">{report.date} · Klien: {report.client}</p>
                            </div>
                          </div>
                          <Badge variant="success" className="gap-1.5">
                            <CheckCircle2 size={12} /> {report.status}
                          </Badge>
                        </div>
                        <div className="space-y-2">
                          <p className="text-xs font-bold text-text-muted uppercase tracking-wider">Aktivitas Sesi</p>
                          <div className="flex flex-wrap gap-2">
                            {report.activities.map(act => (
                              <span key={act} className="px-2 py-1 bg-gray-50 border border-border rounded text-[10px] text-text-secondary">
                                {act}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="bg-primary-light/10 p-4 rounded-md border border-primary/5">
                          <p className="text-xs font-bold text-primary uppercase tracking-wider mb-1">Catatan Helper</p>
                          <p className="text-sm text-text-primary leading-relaxed italic">"{report.note}"</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            </div>

            <div className="space-y-8">
              {/* SECTION 6: QUICK STATS */}
              <section className="grid grid-cols-2 gap-4">
                <Card className="border-border/50">
                  <CardContent className="p-4 text-center space-y-1">
                    <p className="text-2xl font-mono font-bold text-primary">24</p>
                    <p className="text-[10px] text-text-muted uppercase font-bold">Sesi Bulan Ini</p>
                  </CardContent>
                </Card>
                <Card className="border-border/50">
                  <CardContent className="p-4 text-center space-y-1">
                    <p className="text-xl font-mono font-bold text-primary">Rp 1.2jt</p>
                    <p className="text-[10px] text-text-muted uppercase font-bold">Total Biaya</p>
                  </CardContent>
                </Card>
                <Card className="border-border/50">
                  <CardContent className="p-4 text-center space-y-1">
                    <p className="text-2xl font-mono font-bold text-primary">4.9</p>
                    <p className="text-[10px] text-text-muted uppercase font-bold">Rata-rata Rating</p>
                  </CardContent>
                </Card>
                <Card className="border-border/50">
                  <CardContent className="p-4 text-center space-y-1">
                    <div className="flex justify-center -space-x-2">
                      <Avatar src="https://i.pravatar.cc/150?u=1" className="h-6 w-6 border border-white" />
                      <Avatar src="https://i.pravatar.cc/150?u=4" className="h-6 w-6 border border-white" />
                    </div>
                    <p className="text-[10px] text-text-muted uppercase font-bold mt-2">Helper Favorit</p>
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

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  BookOpen, 
  ChevronRight, 
  Search, 
  Filter,
  Calendar,
  User,
  Activity,
  Heart,
  MessageSquare,
  Sparkles,
  CheckCircle2,
  Clock,
  Image as ImageIcon
} from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'
import { Avatar } from '../../components/ui/Avatar'
import { Card, CardContent } from '../../components/ui/Card'
import { cn } from '../../lib/utils'

const MOCK_JOURNALS = [
  {
    id: '1',
    helper: 'Ahmad Fauzi',
    client: 'Bambang Wijaya',
    date: '29 Apr 2026',
    time: '08:00 - 11:00',
    status: 'Sangat Baik',
    activities: ['Latihan jalan 30 menit', 'Bantu makan siang', 'Navigasi ke taman'],
    note: 'Bambang sangat bersemangat hari ini. Progres jalan tanpa bantuan meningkat signifikan.',
    hasPhotos: true,
    hasAIAnalysis: true
  },
  {
    id: '2',
    helper: 'Siti Rahma',
    client: 'Bambang Wijaya',
    date: '27 Apr 2026',
    time: '13:00 - 16:00',
    status: 'Baik',
    activities: ['Latihan kognitif', 'Membaca buku', 'Makan sore'],
    note: 'Fokus Bambang membaik saat sesi membaca. Ia mulai bisa merangkai kalimat dengan lebih lancar.',
    hasPhotos: true,
    hasAIAnalysis: true
  },
  {
    id: '3',
    helper: 'Ahmad Fauzi',
    client: 'Bambang Wijaya',
    date: '25 Apr 2026',
    time: '08:00 - 11:00',
    status: 'Cukup',
    activities: ['Latihan mobilitas', 'Fisioterapi ringan'],
    note: 'Sedikit lemas karena kurang tidur semalam, tapi tetap kooperatif saat latihan.',
    hasPhotos: false,
    hasAIAnalysis: false
  }
]

export default function HelperJournalPage() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="min-h-screen pb-20">
      {/* Hero Section - Provides background for transparent navbar */}
      <div className="bg-primary pt-32 pb-24 lg:pt-40 lg:pb-36 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white rounded-full blur-3xl translate-x-1/4 -translate-y-1/4"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>
        </div>
        
        <div className="container-custom relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-2xl space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Badge variant="accent" className="bg-white/20 text-white border-white/20 px-4 py-1">
                  Monitoring & Progres
                </Badge>
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl lg:text-6xl font-display font-extrabold text-white tracking-tight"
              >
                Jurnal <span className="text-accent">Pendampingan</span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-white/80 text-lg font-medium max-w-xl"
              >
                Pantau setiap detail perkembangan, aktivitas harian, dan kesehatan keluarga Anda melalui laporan terperinci dari helper kami.
              </motion.p>
            </div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex gap-3 w-full lg:w-auto bg-white/10 backdrop-blur-md p-2 rounded-2xl border border-white/10 shadow-2xl"
            >
              <div className="relative flex-1 lg:w-80">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" size={18} />
                <input 
                  type="text" 
                  placeholder="Cari jurnal atau helper..."
                  className="w-full pl-11 pr-5 py-3 rounded-xl bg-white/10 border-transparent text-white placeholder:text-white/40 text-sm outline-none focus:ring-2 focus:ring-white/20 transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button className="p-3 bg-white text-primary rounded-xl hover:bg-accent hover:text-white transition-all shadow-lg shadow-black/10">
                <Filter size={22} />
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container-custom -mt-16 relative z-20 space-y-12">
        {/* STATS SUMMARY */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: 'Total Jurnal', value: '24', icon: BookOpen, color: 'text-primary', bg: 'bg-primary-light' },
            { label: 'Sesi Selesai', value: '18', icon: CheckCircle2, color: 'text-success', bg: 'bg-emerald-50' },
            { label: 'Jam Pendamping', value: '54 Jam', icon: Clock, color: 'text-accent', bg: 'bg-amber-50' },
            { label: 'Smart Analysis', value: '12', icon: Sparkles, color: 'text-purple-600', bg: 'bg-purple-50' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
            >
              <Card className="border-none shadow-xl hover:shadow-2xl transition-all duration-300">
                <CardContent className="p-6 flex items-center gap-5">
                  <div className={cn("p-4 rounded-2xl shadow-sm", stat.bg, stat.color)}>
                    <stat.icon size={28} />
                  </div>
                  <div>
                    <p className="text-2xl font-display font-extrabold text-text-primary tracking-tight">{stat.value}</p>
                    <p className="text-[10px] text-text-muted font-black uppercase tracking-[0.2em]">{stat.label}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* JOURNAL LIST */}
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-text-primary flex items-center gap-2">
              <Activity size={24} className="text-primary" />
              Riwayat Jurnal Terbaru
            </h3>
            <span className="text-sm font-medium text-text-secondary">Menampilkan 3 jurnal terakhir</span>
          </div>

          <div className="space-y-6">
            {MOCK_JOURNALS.map((journal, idx) => (
              <motion.div
                key={journal.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * idx }}
                whileHover={{ y: -4 }}
                className="group cursor-pointer"
                onClick={() => navigate(`/dashboard/reports/${journal.id}`)}
              >
                <Card className="border-border/40 hover:shadow-2xl hover:border-primary/20 transition-all duration-500 overflow-hidden bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row">
                      {/* Left Side: Info */}
                      <div className="p-8 flex-1 space-y-6">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-5">
                            <div className="relative">
                              <Avatar src={`https://i.pravatar.cc/150?u=${journal.id}`} size="lg" className="ring-4 ring-primary-light" />
                              <div className="absolute -bottom-1 -right-1 bg-white p-1 rounded-full shadow-sm border border-border">
                                <Badge variant="success" className="p-0.5"><CheckCircle2 size={10} /></Badge>
                              </div>
                            </div>
                            <div>
                              <p className="font-extrabold text-xl text-text-primary tracking-tight">{journal.helper}</p>
                              <div className="flex items-center gap-4 mt-1 text-sm text-text-secondary font-medium">
                                <span className="flex items-center gap-1.5"><Calendar size={14} className="text-primary" /> {journal.date}</span>
                                <span className="flex items-center gap-1.5"><Clock size={14} className="text-primary" /> {journal.time}</span>
                              </div>
                            </div>
                          </div>
                          <Badge variant={journal.status === 'Sangat Baik' ? 'success' : 'warning'} className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
                            {journal.status}
                          </Badge>
                        </div>

                        <div className="space-y-4">
                          <div className="flex flex-wrap gap-2">
                            {journal.activities.map((act, i) => (
                              <span key={i} className="px-4 py-1.5 bg-primary-light text-primary rounded-xl text-[10px] font-black uppercase tracking-wider border border-primary/10">
                                {act}
                              </span>
                            ))}
                          </div>
                          <div className="bg-gray-50/80 p-5 rounded-2xl border border-gray-100 relative italic">
                            <span className="absolute -top-3 left-4 text-3xl text-primary/20 font-serif">"</span>
                            <p className="text-sm text-text-secondary font-medium leading-relaxed">
                              {journal.note}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Right Side: Quick Actions & Tags */}
                      <div className="md:w-80 bg-gradient-to-br from-white to-gray-50/50 p-8 border-t md:border-t-0 md:border-l border-border/40 flex flex-col justify-between items-stretch">
                        <div className="space-y-6">
                          <p className="text-[10px] text-text-muted font-black uppercase tracking-widest text-center md:text-left">Kelengkapan Jurnal</p>
                          <div className="flex justify-center md:justify-start gap-3">
                            <div className={cn("p-3 rounded-2xl border transition-all", journal.hasPhotos ? "bg-white border-primary/20 text-primary shadow-sm" : "bg-gray-100 border-transparent text-text-muted opacity-40")}>
                              <ImageIcon size={22} />
                            </div>
                            <div className={cn("p-3 rounded-2xl border transition-all", journal.hasAIAnalysis ? "bg-purple-50 border-purple-200 text-purple-600 shadow-sm" : "bg-gray-100 border-transparent text-text-muted opacity-40")}>
                              <Sparkles size={22} />
                            </div>
                            <div className="p-3 bg-white rounded-2xl border border-border text-text-muted shadow-sm">
                              <MessageSquare size={22} />
                            </div>
                          </div>
                        </div>
                        
                        <Button 
                          variant="primary" 
                          size="md"
                          className="w-full rounded-xl font-black uppercase tracking-widest text-[11px] gap-2 mt-8 shadow-lg shadow-primary/20"
                        >
                          Lihat Detail <ChevronRight size={16} />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* FOOTER ACTION */}
        <div className="flex flex-col items-center gap-4 pt-12 pb-10">
          <Button 
            variant="outline" 
            size="lg"
            className="rounded-pill px-10 font-black uppercase tracking-[0.15em] text-xs border-2 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
          >
            Tampilkan Jurnal Lainnya
          </Button>
          <p className="text-sm text-text-muted font-medium">Menampilkan 3 dari 24 Jurnal</p>
        </div>
      </div>
    </div>
  )
}

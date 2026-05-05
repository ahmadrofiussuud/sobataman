import React, { useState, useEffect } from 'react'
import { 
  BrainCircuit, 
  Sparkles, 
  TrendingUp, 
  Heart, 
  Activity, 
  MessageSquare, 
  ShieldCheck, 
  ChevronLeft,
  Download,
  Share2,
  Zap,
  Target,
  Users,
  Search
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'
import { Card, CardContent } from '../../components/ui/Card'
import { Avatar } from '../../components/ui/Avatar'
import { cn } from '../../lib/utils'
import { useNavigate, useParams } from 'react-router-dom'

export default function AIAnalysisPage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [isScanning, setIsScanning] = useState(true)
  const [activeTab, setActiveTab] = useState<'overview' | 'details' | 'forecast'>('overview')

  useEffect(() => {
    const timer = setTimeout(() => setIsScanning(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  const scores = [
    { label: 'Mobilitas Fisik', score: 85, icon: Activity, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: 'Kesejahteraan Emosional', score: 92, icon: Heart, color: 'text-rose-500', bg: 'bg-rose-500/10' },
    { label: 'Interaksi Sosial', score: 78, icon: Users, color: 'text-amber-500', bg: 'bg-amber-500/10' },
    { label: 'Kemandirian', score: 65, icon: Target, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  ]

  const insights = [
    {
      title: "Peningkatan Mobilitas Signifikan",
      description: "Bambang menunjukkan peningkatan koordinasi motorik sebesar 12% dibandingkan rata-rata sesi minggu lalu.",
      type: "positive"
    },
    {
      title: "Keterlibatan Emosional Tinggi",
      description: "Analisis semantik dari catatan helper menunjukkan nada 'Antusias' dan 'Bahagia' yang dominan.",
      type: "positive"
    },
    {
      title: "Area Fokus: Kemandirian Sosial",
      description: "Saran: Dorong interaksi dengan teman sebaya di taman untuk meningkatkan kepercayaan diri sosial.",
      type: "focus"
    }
  ]

  return (
    <div className="min-h-screen bg-[#0A0C10] text-white pb-20">
      {/* SCANNING OVERLAY */}
      <AnimatePresence>
        {isScanning && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center space-y-8"
          >
            <div className="relative">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="w-32 h-32 rounded-full border-2 border-primary/20 border-t-primary"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <BrainCircuit size={40} className="text-primary animate-pulse" />
              </div>
              <motion.div 
                animate={{ 
                  y: [-20, 20, -20],
                  opacity: [0.2, 0.5, 0.2]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -inset-4 bg-primary/10 blur-2xl rounded-full"
              />
            </div>
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-display font-bold tracking-tight">Menghubungkan ke Neural Engine...</h2>
              <p className="text-white/40 font-mono text-xs uppercase tracking-widest">Menganalisis data helper · Mengekstrak pola perilaku · Menghitung skor kemajuan</p>
            </div>
            
            <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 3 }}
                className="h-full bg-primary shadow-[0_0_15px_rgba(var(--primary-rgb),0.5)]"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-[#0A0C10]/80 backdrop-blur-xl border-b border-white/5">
        <div className="container-custom px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-white/5 rounded-full transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="h-8 w-px bg-white/10 mx-2" />
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center border border-primary/30">
                <Sparkles size={20} className="text-primary" />
              </div>
              <div>
                <h1 className="font-display font-bold text-lg leading-tight">Analisis AI SobatAman</h1>
                <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Laporan #SR-2026-{id || '001'}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" className="hidden md:flex text-white/60 hover:text-white hover:bg-white/5">
              <Download size={18} className="mr-2" /> Export PDF
            </Button>
            <Button className="bg-primary hover:bg-primary-hover text-white rounded-pill">
              <Share2 size={18} className="mr-2" /> Bagikan Laporan
            </Button>
          </div>
        </div>
      </header>

      <main className="container-custom px-4 mt-8 space-y-8">
        {/* HERO ANALYSIS CARD */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <section className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-primary/20 via-[#12161D] to-background border border-white/10 p-8 lg:p-12">
              <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px]" />
              
              <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center">
                <div className="relative shrink-0">
                  <svg className="w-48 h-48 transform -rotate-90">
                    <circle
                      cx="96"
                      cy="96"
                      r="88"
                      stroke="currentColor"
                      strokeWidth="12"
                      fill="transparent"
                      className="text-white/5"
                    />
                    <motion.circle
                      cx="96"
                      cy="96"
                      r="88"
                      stroke="currentColor"
                      strokeWidth="12"
                      fill="transparent"
                      strokeDasharray={2 * Math.PI * 88}
                      initial={{ strokeDashoffset: 2 * Math.PI * 88 }}
                      animate={{ strokeDashoffset: 2 * Math.PI * 88 * (1 - 0.88) }}
                      transition={{ duration: 2, delay: 0.5 }}
                      className="text-primary"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <motion.span 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-5xl font-display font-bold"
                    >
                      88
                    </motion.span>
                    <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Wellness Score</span>
                  </div>
                </div>

                <div className="space-y-6 flex-1 text-center md:text-left">
                  <Badge className="bg-primary/20 text-primary border-primary/30">PREMIUM ANALYSIS</Badge>
                  <h2 className="text-3xl lg:text-4xl font-display font-bold">Ringkasan Kemajuan Bambang</h2>
                  <p className="text-white/60 leading-relaxed">
                    Berdasarkan analisis terhadap 5 sesi terakhir dan laporan helper hari ini, Bambang menunjukkan lintasan positif yang konsisten. Skor kesejahteraannya meningkat <span className="text-primary font-bold">+5%</span> dari rata-rata bulan lalu.
                  </p>
                  <div className="flex flex-wrap justify-center md:justify-start gap-4">
                    <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
                      <TrendingUp size={16} className="text-success" />
                      <span className="text-xs font-bold text-success">Pertumbuhan Stabil</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
                      <ShieldCheck size={16} className="text-primary" />
                      <span className="text-xs font-bold text-primary">Data Terverifikasi</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* DIMENSIONS GRID */}
            <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {scores.map((item, i) => (
                <Card key={i} className="bg-[#12161D] border-white/5 hover:border-primary/30 transition-all group overflow-hidden">
                  <CardContent className="p-6 space-y-4">
                    <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110", item.bg)}>
                      <item.icon className={item.color} size={24} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">{item.label}</p>
                      <div className="flex items-end gap-2">
                        <span className="text-2xl font-display font-bold">{item.score}</span>
                        <span className="text-[10px] text-white/20 mb-1">/100</span>
                      </div>
                    </div>
                    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${item.score}%` }}
                        className={cn("h-full", item.bg.replace('/10', ''))}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </section>

            {/* INSIGHTS */}
            <section className="space-y-4">
              <h3 className="text-xl font-display font-bold flex items-center gap-2">
                <BrainCircuit size={24} className="text-primary" /> AI Insights & Pola
              </h3>
              <div className="grid gap-4">
                {insights.map((insight, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="group relative p-6 rounded-2xl bg-[#12161D] border border-white/5 hover:border-white/10 transition-colors"
                  >
                    <div className="flex gap-4 items-start">
                      <div className={cn(
                        "mt-1 w-2 h-2 rounded-full",
                        insight.type === 'positive' ? 'bg-success' : 'bg-primary'
                      )} />
                      <div className="space-y-1">
                        <h4 className="font-bold text-lg">{insight.title}</h4>
                        <p className="text-sm text-white/60 leading-relaxed">{insight.description}</p>
                      </div>
                    </div>
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Zap size={16} className="text-primary" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          </div>

          {/* SIDEBAR */}
          <div className="space-y-8">
            {/* SENTIMENT ANALYSIS */}
            <Card className="bg-[#12161D] border-white/5 overflow-hidden">
              <CardContent className="p-6 space-y-6">
                <h4 className="text-sm font-bold uppercase tracking-widest text-white/40">Analisis Sentimen</h4>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-success/20 flex items-center justify-center text-success">
                      <Heart size={24} fill="currentColor" />
                    </div>
                    <div>
                      <p className="font-bold">Sangat Positif</p>
                      <p className="text-[10px] text-white/40">Confidence: 94%</p>
                    </div>
                  </div>
                  <Badge variant="success">OPTIMIS</Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-white/40">
                    <span>Emosi Terdeteksi</span>
                    <span>Intensitas</span>
                  </div>
                  {[
                    { label: 'Antusiasme', value: 88, color: 'bg-primary' },
                    { label: 'Ketekunan', value: 72, color: 'bg-blue-500' },
                    { label: 'Kecemasan', value: 12, color: 'bg-rose-500' },
                  ].map((emo, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>{emo.label}</span>
                        <span className="font-mono text-white/40">{emo.value}%</span>
                      </div>
                      <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                        <div className={cn("h-full", emo.color)} style={{ width: `${emo.value}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* RECOMMENDATIONS */}
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-2 text-primary">
                  <Target size={20} />
                  <h4 className="font-bold">Rekomendasi Strategis</h4>
                </div>
                <ul className="space-y-4">
                  {[
                    "Tingkatkan durasi latihan kemandirian di lingkungan baru.",
                    "Lanjutkan pola diet protein tinggi sesuai respons sesi hari ini.",
                    "Jadwalkan sesi dengan Helper Fauzi kembali (Kecocokan 98%)."
                  ].map((rec, i) => (
                    <li key={i} className="flex gap-3 text-sm text-white/80 leading-relaxed">
                      <div className="mt-1.5 w-1 h-1 rounded-full bg-primary shrink-0" />
                      {rec}
                    </li>
                  ))}
                </ul>
                <Button className="w-full bg-primary hover:bg-primary-hover text-white font-bold mt-4 shadow-xl shadow-primary/20">
                  Terapkan Rekomendasi
                </Button>
              </CardContent>
            </Card>

            {/* AI CHAT ASSISTANT PREVIEW */}
            <div className="bg-[#12161D] border border-white/5 p-6 rounded-3xl space-y-4">
              <div className="flex items-center gap-3">
                <Avatar src="/images/ai-avatar.png" fallback="AI" className="bg-primary text-white border-none" />
                <div>
                  <p className="text-sm font-bold">Tanya AI Assistant</p>
                  <p className="text-[10px] text-success flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" /> Online & Siap Membantu
                  </p>
                </div>
              </div>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Tanyakan detail kemajuan..." 
                  className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-3 text-xs focus:ring-1 focus:ring-primary outline-none"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white">
                  <ChevronLeft className="rotate-180" size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER ACTION */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-[#0A0C10]/80 backdrop-blur-xl border-t border-white/5 z-40 md:hidden">
        <Button className="w-full h-14 bg-primary hover:bg-primary-hover text-white text-lg font-bold rounded-pill">
          Booking Sesi Lanjutan
        </Button>
      </div>
    </div>
  )
}

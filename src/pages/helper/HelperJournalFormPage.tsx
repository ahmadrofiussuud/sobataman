import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Clock, 
  Check, 
  Smile, 
  Meh, 
  Frown, 
  AlertCircle, 
  Camera, 
  X, 
  Send,
  ChevronRight,
  Info,
  ChevronLeft,
  Activity
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'
import { Avatar } from '../../components/ui/Avatar'
import { Card, CardContent } from '../../components/ui/Card'
import { analyzeJournal } from '../../lib/gemini'
import { cn } from '../../lib/utils'

const ACTIVITIES = [
  'Antar ke kampus', 
  'Antar ke kantor', 
  'Bantu belanja', 
  'Antar ke RS', 
  'Pendampingan mobilitas', 
  'Fisioterapi',
  'Lainnya'
]

const CONDITIONS = [
  { id: 'very_good', label: 'Sangat baik', icon: Smile, color: 'text-success', bg: 'bg-success/10' },
  { id: 'good', label: 'Baik', icon: Check, color: 'text-primary', bg: 'bg-primary/10' },
  { id: 'fair', label: 'Cukup', icon: Meh, color: 'text-warning', bg: 'bg-warning/10' },
  { id: 'attention', label: 'Perlu perhatian', icon: Frown, color: 'text-error', bg: 'bg-error/10' }
]

export default function HelperJournalFormPage() {
  const [selectedActivities, setSelectedActivities] = useState<string[]>([])
  const [selectedCondition, setSelectedCondition] = useState<string | null>(null)
  const [isUrgent, setIsUrgent] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const navigate = useNavigate()

  const [notes, setNotes] = useState('')
  const [aiAnalysis, setAiAnalysis] = useState<any>(null)

  const toggleActivity = (activity: string) => {
    setSelectedActivities(prev => 
      prev.includes(activity) ? prev.filter(a => a !== activity) : [...prev, activity]
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      // 1. Prepare journal text
      const journalText = `Aktivitas: ${selectedActivities.join(', ')}. Catatan: ${notes}`
      
      // 2. Call Gemini for Analysis
      const analysis = await analyzeJournal(journalText)
      setAiAnalysis(analysis)
      
      // 3. Simulate saving to database (could be real Supabase later)
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setIsSuccess(true)
    } catch (error) {
      console.error('Submission error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-background">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-md w-full text-center space-y-6"
        >
          <div className="w-24 h-24 bg-success rounded-full flex items-center justify-center text-white mx-auto shadow-lg shadow-success/20">
            <Check size={48} strokeWidth={3} />
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl font-display font-bold text-text-primary">Laporan Terkirim!</h2>
            <p className="text-text-secondary">Terima kasih telah memberikan laporan yang detail. Keluarga Bambang akan segera mendapatkan notifikasi.</p>
          </div>

          {aiAnalysis && (
            <Card className="text-left bg-primary-light/30 border-primary/10">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center gap-2 text-primary font-bold text-sm">
                  <Activity size={16} /> AI Insight untuk Keluarga:
                </div>
                <p className="text-sm text-text-primary italic">"{aiAnalysis.summary}"</p>
                <div className="flex flex-wrap gap-2">
                  {aiAnalysis.key_points?.map((point: string, i: number) => (
                    <Badge key={i} variant="outline" className="bg-white text-[10px]">{point}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          <Button 
            className="w-full h-12 text-lg font-bold" 
            variant="primary"
            onClick={() => navigate('/helper')}
          >
            Kembali ke Dashboard
          </Button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8 pb-12">
      {/* HEADER */}
      <div className="space-y-6">
        <button className="flex items-center gap-2 text-text-secondary hover:text-primary transition-colors text-sm font-semibold">
          <ChevronLeft size={16} /> Batal
        </button>
        
        <div className="bg-surface p-6 rounded-card border border-border shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <Avatar fallback="B" className="h-14 w-14 bg-primary-light text-primary font-bold" />
            <div>
              <p className="text-xs text-text-muted uppercase font-bold tracking-widest">Sesi Selesai Dengan</p>
              <h1 className="text-xl font-display font-bold">Bambang Wijaya</h1>
              <p className="text-xs text-text-secondary">Rabu, 29 Apr · 3 Jam Pendampingan</p>
            </div>
          </div>
          <div className="space-y-2 min-w-[140px]">
            <div className="flex justify-between text-[10px] font-bold uppercase text-text-muted">
              <span>Batas Waktu Laporan</span>
              <span className="text-primary">45 Menit</span>
            </div>
            <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-primary w-3/4"></div>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* SECTION 1: AKTIVITAS */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-primary-light text-primary flex items-center justify-center font-bold text-xs">1</div>
            <h2 className="text-lg font-bold">Apa saja yang kita lakukan hari ini?</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {ACTIVITIES.map(activity => (
              <button
                key={activity}
                type="button"
                onClick={() => toggleActivity(activity)}
                className={cn(
                  "px-4 py-2 rounded-pill border text-sm font-semibold transition-all",
                  selectedActivities.includes(activity) 
                    ? "bg-primary text-white border-primary shadow-md" 
                    : "bg-white text-text-secondary border-border hover:border-primary/50"
                )}
              >
                {activity}
              </button>
            ))}
          </div>
          <textarea 
            className="w-full p-4 rounded-sm border border-border bg-background focus:ring-1 focus:ring-primary outline-none text-sm h-32 resize-none"
            placeholder="Ceritakan lebih detail aktivitas yang dilakukan (opsional)..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          ></textarea>
        </section>

        {/* SECTION 2: KONDISI KLIEN */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-primary-light text-primary flex items-center justify-center font-bold text-xs">2</div>
            <h2 className="text-lg font-bold">Bagaimana kondisi klien hari ini?</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {CONDITIONS.map(cond => {
              const Icon = cond.icon
              const isSelected = selectedCondition === cond.id
              return (
                <button
                  key={cond.id}
                  type="button"
                  onClick={() => setSelectedCondition(cond.id)}
                  className={cn(
                    "p-4 rounded-md border-2 flex flex-col items-center gap-2 transition-all",
                    isSelected 
                      ? `border-primary ${cond.bg} ${cond.color}` 
                      : "border-border bg-white text-text-muted hover:border-primary/50"
                  )}
                >
                  <Icon size={28} />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-center leading-tight">{cond.label}</span>
                </button>
              )
            })}
          </div>
          {selectedCondition === 'attention' && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-2"
            >
              <p className="text-xs font-bold text-error">Mohon jelaskan kondisi yang memerlukan perhatian:</p>
              <textarea 
                required
                className="w-full p-4 rounded-sm border border-error/30 bg-error/5 focus:ring-1 focus:ring-error outline-none text-sm h-24 resize-none"
                placeholder="Apa yang terjadi? Bagaimana penanganannya?"
              ></textarea>
            </motion.div>
          )}
        </section>

        {/* SECTION 3: CATATAN PENTING */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-primary-light text-primary flex items-center justify-center font-bold text-xs">3</div>
            <h2 className="text-lg font-bold">Catatan untuk keluarga (opsional)</h2>
          </div>
          <textarea 
            className="w-full p-4 rounded-sm border border-border bg-background focus:ring-1 focus:ring-primary outline-none text-sm h-32 resize-none"
            placeholder="Ada hal penting yang perlu diketahui keluarga?"
          ></textarea>
          <label className="flex items-center gap-3 p-4 bg-error/5 border border-error/10 rounded-md cursor-pointer group">
            <input 
              type="checkbox" 
              checked={isUrgent}
              onChange={(e) => setIsUrgent(e.target.checked)}
              className="w-5 h-5 rounded border-error/30 text-error focus:ring-error" 
            />
            <div className="flex-1">
              <p className="text-sm font-bold text-error flex items-center gap-2">
                <AlertCircle size={16} /> Tandai sebagai mendesak
              </p>
              <p className="text-xs text-text-muted">Keluarga akan segera menerima notifikasi push prioritas</p>
            </div>
          </label>
        </section>

        {/* SECTION 4: DOKUMENTASI */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-primary-light text-primary flex items-center justify-center font-bold text-xs">4</div>
            <h2 className="text-lg font-bold">Dokumentasi Foto (opsional)</h2>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <button type="button" className="aspect-square border-2 border-dashed border-border rounded-md flex flex-col items-center justify-center gap-2 text-text-muted hover:bg-gray-50 transition-colors">
              <Camera size={24} />
              <span className="text-[10px] font-bold uppercase">Tambah</span>
            </button>
            <div className="aspect-square bg-gray-100 rounded-md"></div>
            <div className="aspect-square bg-gray-100 rounded-md"></div>
          </div>
        </section>

        <div className="pt-6 border-t border-border space-y-4">
          <div className="flex items-start gap-3 p-4 bg-primary-light/10 rounded-md border border-primary/10">
            <Info size={18} className="text-primary shrink-0 mt-0.5" />
            <p className="text-xs text-text-secondary leading-relaxed">
              Laporan ini akan dikirimkan secara otomatis kepada <span className="font-bold text-text-primary">Bu Sari (Keluarga)</span> setelah Anda menekan tombol kirim.
            </p>
          </div>
          <Button 
            type="submit" 
            className="w-full h-14 text-lg font-bold gap-2 shadow-lg shadow-primary/20"
            disabled={isLoading || !selectedCondition || selectedActivities.length === 0}
          >
            {isLoading ? "Mengirim Laporan..." : <><Send size={20} /> Kirim Laporan ke Keluarga</>}
          </Button>
        </div>
      </form>
    </div>
  )
}

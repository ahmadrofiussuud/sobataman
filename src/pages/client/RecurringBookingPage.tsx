import React, { useState } from 'react'
import { 
  Plus, 
  Calendar, 
  Clock, 
  MoreVertical, 
  Trash2, 
  Edit2, 
  Pause, 
  Play,
  ChevronRight,
  Info,
  ShieldCheck
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'
import { Avatar } from '../../components/ui/Avatar'
import { Card, CardContent } from '../../components/ui/Card'
import { RecurringBookingModal } from '../../components/RecurringBookingModal'
import { cn } from '../../lib/utils'

interface RecurringSchedule {
  id: string
  days: string[]
  timeStart: string
  timeEnd: string
  helperName: string
  helperAvatar: string
  helperTier: 'CERTIFIED' | 'BASIC'
  serviceType: string
  status: 'ACTIVE' | 'PAUSED' | 'PENDING'
  nextSession: string
}

const MOCK_SCHEDULES: RecurringSchedule[] = [
  {
    id: '1',
    days: ['Senin', 'Rabu', 'Jumat'],
    timeStart: '08:00',
    timeEnd: '10:00',
    helperName: 'Ahmad Fauzi',
    helperAvatar: 'https://i.pravatar.cc/150?u=1',
    helperTier: 'CERTIFIED',
    serviceType: 'Latihan Fisik / Fisioterapi',
    status: 'ACTIVE',
    nextSession: 'Senin, 04 Mei'
  },
  {
    id: '2',
    days: ['Sabtu', 'Minggu'],
    timeStart: '15:00',
    timeEnd: '18:00',
    helperName: 'Siti Rahma',
    helperAvatar: 'https://i.pravatar.cc/150?u=2',
    helperTier: 'BASIC',
    serviceType: 'Pendampingan Rekreasi',
    status: 'PAUSED',
    nextSession: '-'
  }
]

export default function RecurringBookingPage() {
  const [schedules, setSchedules] = useState<RecurringSchedule[]>(MOCK_SCHEDULES)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const toggleStatus = (id: string) => {
    setSchedules(prev => prev.map(s => 
      s.id === id ? { ...s, status: s.status === 'ACTIVE' ? 'PAUSED' : 'ACTIVE' } : s
    ))
  }

  const removeSchedule = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus jadwal rutin ini?')) {
      setSchedules(prev => prev.filter(s => s.id !== id))
    }
  }

  return (
    <div className="min-h-screen pb-20">
      {/* Hero Section - Provides background for transparent navbar */}
      <div className="bg-primary pt-32 pb-20 lg:pt-40 lg:pb-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        </div>
        
        <div className="container-custom relative z-10">
          <div className="max-w-3xl space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge variant="accent" className="bg-white/20 text-white border-white/20 px-4 py-1">
                Fitur Eksklusif
              </Badge>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl lg:text-6xl font-display font-extrabold text-white tracking-tight"
            >
              Jadwal Pendampingan <br />
              <span className="text-accent">Rutin Otomatis</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-white/80 text-lg lg:text-xl max-w-2xl font-medium leading-relaxed"
            >
              Set sekali, helper siap setiap minggunya. Nikmati ketenangan pikiran dengan pendampingan yang konsisten dan terencana bagi keluarga tercinta.
            </motion.p>
          </div>
        </div>
      </div>

      <div className="container-custom -mt-12 relative z-20 space-y-10">
        <Card className="bg-white border-none shadow-2xl overflow-hidden">
          <CardContent className="p-0">
            <div className="flex flex-col md:flex-row">
              <div className="bg-primary-light/50 p-8 md:w-1/3 flex flex-col justify-center items-center text-center border-b md:border-b-0 md:border-r border-primary/10">
                <div className="w-16 h-16 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20 mb-4">
                  <Info size={32} />
                </div>
                <h3 className="text-xl font-bold text-primary mb-2">Hemat & Praktis</h3>
                <p className="text-sm text-text-secondary font-medium">
                  Bayar otomatis setiap sesi dengan diskon khusus member rutin.
                </p>
              </div>
              <div className="p-8 md:w-2/3 flex items-center">
                <div className="space-y-4">
                  <p className="text-lg font-bold text-text-primary flex items-center gap-2">
                    <ShieldCheck className="text-success" size={24} />
                    Jaminan Konsistensi Pelayanan
                  </p>
                  <p className="text-text-secondary leading-relaxed font-medium">
                    Dengan Jadwal Rutin, helper favorit Anda akan secara otomatis ter-book untuk sesi berikutnya. Anda tidak perlu khawatir kehabisan kuota atau helper yang sudah cocok tidak tersedia.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {schedules.length > 0 ? (
          <div className="grid gap-8">
            {schedules.map((schedule) => (
              <motion.div
                key={schedule.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <Card className={cn(
                  "border-border/50 shadow-default transition-all duration-300 overflow-hidden group",
                  schedule.status === 'PAUSED' ? "bg-slate-50/50 grayscale-[0.3]" : "bg-white hover:shadow-xl hover:border-primary/20"
                )}>
                  <CardContent className="p-0">
                    <div className="p-6 lg:p-8 flex flex-col lg:flex-row gap-8 items-stretch">
                      <div className="flex-1 space-y-8">
                        <div className="flex items-center justify-between">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Calendar size={18} className="text-primary" />
                              <h3 className="text-2xl font-bold text-text-primary">
                                Setiap {schedule.days.join(', ')}
                              </h3>
                            </div>
                            <div className="flex items-center gap-3 px-3 py-1.5 bg-primary-light rounded-full w-fit">
                              <Clock size={16} className="text-primary" /> 
                              <span className="text-sm font-bold text-primary tracking-wide">
                                {schedule.timeStart} — {schedule.timeEnd} WIB
                              </span>
                            </div>
                          </div>
                          <div className="lg:hidden">
                            <Badge variant={schedule.status === 'ACTIVE' ? 'success' : 'secondary'} className="px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                              {schedule.status}
                            </Badge>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center pt-2">
                          <div className="flex items-center gap-4">
                            <div className="relative">
                              <Avatar src={schedule.helperAvatar} size="lg" className="ring-4 ring-primary-light" />
                              <div className="absolute -bottom-1 -right-1 bg-white p-1 rounded-full shadow-sm">
                                <ShieldCheck size={14} className="text-primary" />
                              </div>
                            </div>
                            <div className="space-y-0.5">
                              <p className="text-sm font-bold text-text-primary leading-tight">{schedule.helperName}</p>
                              <Badge variant="outline" className="text-[9px] font-extrabold uppercase tracking-[0.1em] px-2 py-0 border-primary/20 text-primary">
                                {schedule.helperTier} HELPER
                              </Badge>
                            </div>
                          </div>
                          
                          <div className="space-y-1.5 border-l-0 md:border-l border-border/50 md:pl-8">
                            <p className="text-[10px] text-text-muted uppercase font-bold tracking-widest flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary/40"></span>
                              Layanan
                            </p>
                            <p className="text-base font-bold text-text-primary">{schedule.serviceType}</p>
                          </div>

                          <div className="space-y-1.5 border-l-0 md:border-l border-border/50 md:pl-8">
                            <p className="text-[10px] text-text-muted uppercase font-bold tracking-widest flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-accent/40"></span>
                              Sesi Berikutnya
                            </p>
                            <p className="text-base font-bold text-primary">{schedule.nextSession}</p>
                          </div>
                        </div>
                      </div>

                      <div className="lg:w-56 flex flex-row lg:flex-col justify-between items-center lg:items-center gap-4 border-t lg:border-t-0 lg:border-l border-border/50 pt-6 lg:pt-0 lg:pl-8">
                        <div className="hidden lg:block text-center">
                          <Badge variant={schedule.status === 'ACTIVE' ? 'success' : 'secondary'} className="px-6 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-sm">
                            {schedule.status}
                          </Badge>
                        </div>
                        
                        <div className="flex flex-col gap-2.5 w-full">
                          <Button 
                            onClick={() => toggleStatus(schedule.id)}
                            variant={schedule.status === 'ACTIVE' ? 'secondary' : 'primary'}
                            className="w-full justify-center gap-2 h-11 rounded-xl shadow-sm font-bold text-sm"
                          >
                            {schedule.status === 'ACTIVE' ? <><Pause size={16} /> Jeda Jadwal</> : <><Play size={16} /> Aktifkan</>}
                          </Button>
                          
                          <div className="flex gap-2 w-full">
                            <Button 
                              variant="outline"
                              className="flex-1 h-11 rounded-xl border-border hover:bg-gray-50 transition-colors text-text-secondary gap-2"
                            >
                              <Edit2 size={16} />
                              <span className="text-xs font-bold">Edit</span>
                            </Button>
                            <Button 
                              variant="outline"
                              onClick={() => removeSchedule(schedule.id)}
                              className="h-11 w-11 rounded-xl border-error/20 text-error hover:bg-error/5 transition-colors p-0 flex items-center justify-center"
                            >
                              <Trash2 size={18} />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center space-y-8 bg-white rounded-card border border-dashed border-border/60">
            <div className="w-28 h-28 bg-primary-light rounded-3xl flex items-center justify-center text-primary rotate-3">
              <Calendar size={56} />
            </div>
            <div className="space-y-3">
              <h3 className="text-2xl font-bold text-text-primary">Belum ada jadwal rutin</h3>
              <p className="text-text-secondary max-w-sm mx-auto font-medium">
                Buat jadwal rutin pertamamu untuk pendampingan yang lebih terencana, konsisten, dan hemat biaya.
              </p>
            </div>
            <Button onClick={() => setIsModalOpen(true)} size="lg" className="rounded-pill px-10 shadow-lg shadow-primary/20">
              Buat Jadwal Pertama Anda
            </Button>
          </div>
        )}
      </div>

      {/* FAB for Mobile/Desktop */}
      <motion.button
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-8 right-8 h-14 bg-primary text-white rounded-pill shadow-3xl shadow-primary/30 flex items-center justify-center z-40 px-6 gap-3 group"
      >
        <div className="bg-white/20 p-1.5 rounded-full group-hover:rotate-90 transition-transform duration-300">
          <Plus size={20} className="text-white" />
        </div>
        <span className="font-bold text-sm tracking-wide">Tambah Jadwal Baru</span>
      </motion.button>


      {/* FAB for Mobile/Desktop */}
      <motion.button
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-8 right-8 h-14 bg-primary text-white rounded-pill shadow-3xl shadow-primary/30 flex items-center justify-center z-40 px-6 gap-3 group"
      >
        <div className="bg-white/20 p-1.5 rounded-full group-hover:rotate-90 transition-transform duration-300">
          <Plus size={20} className="text-white" />
        </div>
        <span className="font-bold text-sm tracking-wide">Tambah Jadwal Baru</span>
      </motion.button>


      <RecurringBookingModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={() => {
          // In real app, we would refetch
          console.log('Successfully created recurring booking')
        }}
      />
    </div>
  )
}

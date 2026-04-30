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
    <div className="space-y-8 pb-20 lg:pb-0">
      <div className="space-y-1">
        <h1 className="text-3xl font-display font-bold text-text-primary">Jadwal Pendampingan Rutin</h1>
        <p className="text-text-secondary">Set sekali, helper siap setiap minggunya.</p>
      </div>

      <Card className="bg-primary-light/20 border-primary/10">
        <CardContent className="p-4 flex gap-4">
          <div className="shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center">
            <Info size={20} />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-bold text-primary">Keuntungan Jadwal Rutin</p>
            <p className="text-xs text-text-secondary leading-relaxed">
              Anda tidak perlu booking ulang setiap kali butuh pendampingan. Helper favorit Anda akan secara otomatis ter-book untuk sesi berikutnya. Pembayaran juga otomatis dan lebih hemat!
            </p>
          </div>
        </CardContent>
      </Card>

      {schedules.length > 0 ? (
        <div className="grid gap-6">
          {schedules.map((schedule) => (
            <motion.div
              key={schedule.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className={cn(
                "border-none shadow-sm transition-all overflow-hidden",
                schedule.status === 'PAUSED' ? "opacity-70 grayscale-[0.5]" : "hover:shadow-md"
              )}>
                <CardContent className="p-0">
                  <div className="p-6 lg:p-8 flex flex-col lg:flex-row gap-8">
                    <div className="flex-1 space-y-6">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h3 className="text-xl font-bold flex items-center gap-2">
                            Setiap {schedule.days.join(', ')}
                          </h3>
                          <p className="text-sm text-text-secondary flex items-center gap-2 font-mono">
                            <Clock size={14} className="text-primary" /> {schedule.timeStart} — {schedule.timeEnd} WIB
                          </p>
                        </div>
                        <div className="lg:hidden">
                          <Badge variant={schedule.status === 'ACTIVE' ? 'success' : 'secondary'}>
                            {schedule.status}
                          </Badge>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-6">
                        <div className="flex items-center gap-3">
                          <Avatar src={schedule.helperAvatar} size="md" />
                          <div>
                            <p className="text-sm font-bold">{schedule.helperName}</p>
                            <p className="text-[10px] text-text-muted flex items-center gap-1">
                              <ShieldCheck size={10} /> {schedule.helperTier} HELPER
                            </p>
                          </div>
                        </div>
                        <div className="h-8 w-px bg-border hidden sm:block"></div>
                        <div className="space-y-1">
                          <p className="text-[10px] text-text-muted uppercase font-bold tracking-widest">Layanan</p>
                          <p className="text-sm font-semibold">{schedule.serviceType}</p>
                        </div>
                        <div className="h-8 w-px bg-border hidden sm:block"></div>
                        <div className="space-y-1">
                          <p className="text-[10px] text-text-muted uppercase font-bold tracking-widest">Sesi Berikutnya</p>
                          <p className="text-sm font-semibold text-primary">{schedule.nextSession}</p>
                        </div>
                      </div>
                    </div>

                    <div className="lg:w-48 flex flex-row lg:flex-col justify-between items-center lg:items-end gap-4 border-t lg:border-t-0 lg:border-l border-border/50 pt-6 lg:pt-0 lg:pl-8">
                      <div className="hidden lg:block">
                        <Badge variant={schedule.status === 'ACTIVE' ? 'success' : 'secondary'} className="mb-4">
                          {schedule.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3 w-full">
                        <button 
                          onClick={() => toggleStatus(schedule.id)}
                          className={cn(
                            "flex-1 h-10 rounded-sm flex items-center justify-center gap-2 text-xs font-bold transition-colors",
                            schedule.status === 'ACTIVE' 
                              ? "bg-gray-100 text-text-secondary hover:bg-gray-200" 
                              : "bg-primary text-white hover:bg-primary-hover"
                          )}
                        >
                          {schedule.status === 'ACTIVE' ? <><Pause size={14} /> Jeda</> : <><Play size={14} /> Aktifkan</>}
                        </button>
                        <button 
                          className="h-10 w-10 flex items-center justify-center rounded-sm border border-border hover:bg-gray-50 transition-colors text-text-secondary"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button 
                          onClick={() => removeSchedule(schedule.id)}
                          className="h-10 w-10 flex items-center justify-center rounded-sm border border-error/20 text-error hover:bg-error/5 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
          <div className="w-24 h-24 bg-primary-light rounded-full flex items-center justify-center text-primary">
            <Calendar size={48} />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold">Belum ada jadwal rutin</h3>
            <p className="text-text-secondary max-w-xs mx-auto">
              Buat jadwal rutin pertamamu untuk pendampingan yang lebih terencana dan hemat.
            </p>
          </div>
          <Button onClick={() => setIsModalOpen(true)}>Buat Jadwal Sekarang</Button>
        </div>
      )}

      {/* FAB for Mobile/Desktop */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-8 right-8 w-14 h-14 bg-primary text-white rounded-full shadow-2xl flex items-center justify-center z-40 lg:w-auto lg:px-6 lg:rounded-pill lg:gap-2"
      >
        <Plus size={24} />
        <span className="hidden lg:inline font-bold">Tambah Jadwal Baru</span>
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

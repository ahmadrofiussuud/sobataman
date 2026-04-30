import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  X, 
  Calendar, 
  Clock, 
  Search, 
  MapPin, 
  CreditCard, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft,
  Star,
  ShieldCheck,
  Bell
} from 'lucide-react'
import { Button } from './ui/Button'
import { Input } from './ui/Input'
import { Badge } from './ui/Badge'
import { Avatar } from './ui/Avatar'
import { Card, CardContent } from './ui/Card'
import { cn } from '../lib/utils'

interface RecurringBookingModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

const DAYS = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu']

export const RecurringBookingModal: React.FC<RecurringBookingModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [step, setStep] = useState(1)
  const [selectedDays, setSelectedDays] = useState<string[]>([])
  const [selectedHelper, setSelectedHelper] = useState<string | null>(null)
  const [isSuccess, setIsSuccess] = useState(false)

  const toggleDay = (day: string) => {
    setSelectedDays(prev => 
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    )
  }

  const nextStep = () => setStep(s => s + 1)
  const prevStep = () => setStep(s => s - 1)

  const handleFinish = () => {
    setIsSuccess(true)
    setTimeout(() => {
      onSuccess()
      onClose()
      setIsSuccess(false)
      setStep(1)
    }, 3000)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />
      
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        className="relative w-full max-w-2xl bg-surface rounded-card shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="p-6 border-b border-border flex items-center justify-between bg-white sticky top-0 z-10">
          <div>
            <h3 className="text-xl font-display font-bold">Buat Jadwal Rutin</h3>
            <p className="text-xs text-text-secondary">Langkah {step} dari 4</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="h-1 w-full bg-gray-100">
          <motion.div 
            initial={{ width: '0%' }}
            animate={{ width: `${(step / 4) * 100}%` }}
            className="h-full bg-primary"
          />
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="space-y-4">
                  <label className="text-sm font-bold text-text-primary uppercase tracking-wider">Pilih Hari</label>
                  <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                    {DAYS.map(day => {
                      const isSelected = selectedDays.includes(day)
                      return (
                        <button
                          key={day}
                          onClick={() => toggleDay(day)}
                          className={cn(
                            "h-12 rounded-sm border text-xs font-bold transition-all flex flex-col items-center justify-center gap-1",
                            isSelected ? "bg-primary text-white border-primary shadow-md" : "bg-white text-text-secondary border-border hover:border-primary/50"
                          )}
                        >
                          {day.substring(0, 3)}
                          {isSelected && <div className="h-1 w-1 bg-white rounded-full" />}
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <Input type="time" label="Jam Mulai" defaultValue="08:00" />
                  <Input type="time" label="Jam Selesai" defaultValue="12:00" />
                </div>

                <div className="p-4 bg-primary-light/30 rounded-md border border-primary/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Clock size={20} className="text-primary" />
                    <p className="text-sm font-bold text-primary">Durasi Sesi</p>
                  </div>
                  <p className="text-lg font-mono font-bold text-primary">4 Jam</p>
                </div>

                <Input type="date" label="Mulai Berlaku Dari" defaultValue="2026-05-01" />
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="relative">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" size={20} />
                  <Input placeholder="Cari helper favorit..." className="pl-11" />
                </div>

                <div className="space-y-4">
                  <label className="text-xs font-bold text-text-muted uppercase tracking-widest">Helper Tersedia</label>
                  {[
                    { id: '1', name: 'Ahmad Fauzi', rating: 4.9, price: 65000, spec: 'Certified', avatar: 'https://i.pravatar.cc/150?u=1' },
                    { id: '2', name: 'Siti Rahma', rating: 4.7, price: 45000, spec: 'Basic', avatar: 'https://i.pravatar.cc/150?u=2' }
                  ].map(helper => (
                    <button
                      key={helper.id}
                      onClick={() => setSelectedHelper(helper.id)}
                      className={cn(
                        "w-full flex items-center justify-between p-4 rounded-md border-2 transition-all",
                        selectedHelper === helper.id ? "border-primary bg-primary-light/30" : "border-border hover:border-primary/50"
                      )}
                    >
                      <div className="flex items-center gap-4">
                        <Avatar src={helper.avatar} fallback={helper.name[0]} />
                        <div className="text-left">
                          <p className="font-bold text-sm">{helper.name}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[10px] font-bold text-accent flex items-center gap-0.5">
                              <Star size={10} fill="currentColor" /> {helper.rating}
                            </span>
                            <Badge variant={helper.spec === 'Certified' ? 'accent' : 'primary'} className="text-[8px] py-0">{helper.spec}</Badge>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-mono font-bold text-primary">Rp {helper.price.toLocaleString('id-ID')}</p>
                        <p className="text-[10px] text-text-muted">per jam</p>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold">Jenis Layanan</label>
                  <select className="w-full px-4 py-2.5 rounded-sm border-1.5 border-border bg-surface focus:border-primary outline-none">
                    <option>Pendampingan Mobilitas</option>
                    <option>Latihan Fisik / Fisioterapi</option>
                    <option>Pendampingan Belajar</option>
                    <option>Bantu Aktivitas Harian</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-semibold">Lokasi Pertemuan Rutin</label>
                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                    <Input placeholder="Alamat rumah atau lokasi tetap..." className="pl-11" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-semibold">Catatan Rutin untuk Helper</label>
                  <textarea 
                    className="w-full p-4 rounded-sm border border-border bg-background focus:ring-1 focus:ring-primary outline-none text-sm h-32 resize-none"
                    placeholder="Apa yang harus dilakukan helper di setiap sesi?"
                  ></textarea>
                </div>

                <div className="p-4 bg-accent-light/50 rounded-md border border-accent/20 flex justify-between items-center">
                  <div>
                    <p className="text-xs font-bold text-accent uppercase tracking-wider">Estimasi Per Bulan</p>
                    <p className="text-xs text-text-secondary">(8 sesi x 4 jam)</p>
                  </div>
                  <p className="text-2xl font-mono font-bold text-primary">Rp 2.080.000</p>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <Card className="bg-primary text-white border-none shadow-lg">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <p className="text-xs opacity-70 font-bold uppercase tracking-widest">Ringkasan Jadwal</p>
                        <h4 className="text-xl font-display font-bold">Setiap Senin & Rabu</h4>
                        <p className="text-sm text-primary-light">Pukul 08:00 — 12:00 WIB</p>
                      </div>
                      <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                        <Calendar size={24} />
                      </div>
                    </div>
                    <div className="flex items-center gap-3 pt-2 border-t border-white/10">
                      <Avatar src="https://i.pravatar.cc/150?u=1" size="sm" />
                      <p className="text-sm font-bold">Helper: Ahmad Fauzi</p>
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-4">
                  <label className="text-xs font-bold text-text-muted uppercase tracking-widest">Metode Pembayaran</label>
                  <button className="w-full flex items-center justify-between p-4 rounded-md border border-primary bg-primary-light/10">
                    <div className="flex items-center gap-3">
                      <CreditCard size={20} className="text-primary" />
                      <span className="text-sm font-bold">AmanPay Saldo</span>
                    </div>
                    <span className="text-sm font-mono font-bold text-primary">Rp 742.500</span>
                  </button>
                </div>

                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-50 cursor-pointer transition-colors">
                    <input type="checkbox" className="w-5 h-5 rounded border-border text-primary focus:ring-primary" defaultChecked />
                    <div className="flex-1">
                      <p className="text-sm font-bold">Bayar Otomatis per Sesi</p>
                      <p className="text-xs text-text-muted">Saldo dipotong otomatis saat sesi selesai</p>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-50 cursor-pointer transition-colors">
                    <input type="checkbox" className="w-5 h-5 rounded border-border text-primary focus:ring-primary" defaultChecked />
                    <div className="flex-1 flex items-center gap-2">
                      <Bell size={14} className="text-primary" />
                      <p className="text-sm font-bold">Notifikasi ke Email Keluarga</p>
                    </div>
                  </label>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="p-6 bg-surface border-t border-border flex gap-4">
          {step > 1 && (
            <Button variant="outline" className="flex-1 h-12" onClick={prevStep}>
              <ChevronLeft size={20} /> Kembali
            </Button>
          )}
          {step < 4 ? (
            <Button 
              className="flex-1 h-12 font-bold" 
              onClick={nextStep}
              disabled={step === 1 && selectedDays.length === 0}
            >
              Lanjut <ChevronRight size={20} />
            </Button>
          ) : (
            <Button className="flex-1 h-12 font-bold" onClick={handleFinish}>
              Aktifkan Jadwal Rutin
            </Button>
          )}
        </div>

        {/* Success Overlay */}
        <AnimatePresence>
          {isSuccess && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 z-50 bg-primary flex flex-col items-center justify-center text-white p-10 text-center"
            >
              <motion.div
                initial={{ scale: 0.5, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-primary mb-6"
              >
                <CheckCircle2 size={48} />
              </motion.div>
              <h2 className="text-3xl font-display font-bold mb-2">Jadwal Rutin Berhasil Dibuat!</h2>
              <p className="text-primary-light max-w-xs mx-auto">
                Helper akan mengonfirmasi jadwal Anda dalam maksimal 2 jam kedepan.
              </p>
              
              {/* Confetti simulation dots */}
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    y: [0, Math.random() * 200 - 100],
                    x: [0, Math.random() * 200 - 100],
                    opacity: [1, 0]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute w-2 h-2 rounded-full bg-accent"
                  style={{ top: '40%', left: '50%' }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

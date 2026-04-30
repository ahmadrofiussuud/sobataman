import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  User, 
  Target, 
  FileText, 
  BookOpen, 
  CheckCircle2, 
  Camera, 
  Upload, 
  PlayCircle, 
  Lock, 
  ChevronRight, 
  ChevronLeft,
  X,
  ShieldCheck,
  Smartphone,
  Info
} from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { Badge } from '../../components/ui/Badge'
import { Avatar } from '../../components/ui/Avatar'
import { Card, CardContent } from '../../components/ui/Card'
import { cn } from '../../lib/utils'

const STEPS = [
  { id: 1, label: 'Data Diri', icon: User },
  { id: 2, label: 'Spesialisasi', icon: Target },
  { id: 3, label: 'Dokumen', icon: FileText },
  { id: 4, label: 'Pelatihan', icon: BookOpen },
  { id: 5, label: 'Selesai', icon: CheckCircle2 },
]

const SPECIALIZATIONS = [
  { id: 'blind', title: 'Tunanetra', desc: 'Pendampingan mobilitas, baca dokumen, navigasi' },
  { id: 'deaf', title: 'Tunarungu', desc: 'Komunikasi BISINDO, fasilitasi rapat' },
  { id: 'physical', title: 'Tunadaksa', desc: 'Bantuan mobilitas fisik, kursi roda' },
  { id: 'cognitive', title: 'ADHD/Kognitif', desc: 'Pendampingan aktivitas, pengingat jadwal' },
  { id: 'general', title: 'Semua Umum', desc: 'Pendampingan umum untuk lansia & disabilitas ringan' },
]

const MODULES = [
  { id: 1, title: 'Memahami Disabilitas', dur: '30 menit', status: 'COMPLETED' },
  { id: 2, title: 'Etika Pendampingan', dur: '30 menit', status: 'IN_PROGRESS' },
  { id: 3, title: 'Komunikasi Inklusif', dur: '30 menit', status: 'PENDING' },
  { id: 4, title: 'Keselamatan & Prosedur', dur: '30 menit', status: 'PENDING' },
]

export default function HelperOnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedSpecs, setSelectedSpecs] = useState<string[]>([])
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)

  const nextStep = () => setCurrentStep(s => Math.min(s + 1, 5))
  const prevStep = () => setCurrentStep(s => Math.max(s - 1, 1))

  const toggleSpec = (id: string) => {
    setSelectedSpecs(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-20">
      {/* PROGRESS INDICATOR */}
      <div className="relative pt-12">
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-100 -translate-y-1/2"></div>
        <div className="relative flex justify-between">
          {STEPS.map((step) => {
            const Icon = step.icon
            const isCompleted = currentStep > step.id
            const isActive = currentStep === step.id
            return (
              <div key={step.id} className="flex flex-col items-center gap-3 relative z-10">
                <div className={cn(
                  "h-12 w-12 rounded-full flex items-center justify-center border-4 transition-all duration-500",
                  isCompleted ? "bg-primary border-primary text-white" : 
                  isActive ? "bg-white border-primary text-primary" : "bg-white border-gray-100 text-text-muted"
                )}>
                  {isCompleted ? <CheckCircle2 size={24} /> : <Icon size={24} />}
                </div>
                <p className={cn(
                  "text-[10px] font-bold uppercase tracking-widest",
                  isActive ? "text-primary" : "text-text-muted"
                )}>
                  {step.label}
                </p>
              </div>
            )
          })}
        </div>
      </div>

      <div className="bg-surface rounded-card border border-border shadow-sm overflow-hidden min-h-[500px] flex flex-col">
        <div className="flex-1 p-8 lg:p-12">
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="space-y-2 text-center">
                  <h2 className="text-2xl font-display font-bold">Lengkapi Data Diri Kamu</h2>
                  <p className="text-text-secondary">Informasi ini akan membantu klien mengenal kamu lebih baik.</p>
                </div>

                <div className="flex flex-col items-center gap-4">
                  <div className="relative">
                    <Avatar size="xl" className="h-32 w-32 border-4 border-primary-light" />
                    <button className="absolute bottom-0 right-0 p-2 bg-primary text-white rounded-full border-4 border-white hover:scale-110 transition-transform">
                      <Camera size={20} />
                    </button>
                  </div>
                  <p className="text-xs text-text-muted font-bold uppercase">Unggah Foto Profil</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <Input label="Nama Lengkap" placeholder="Masukkan nama sesuai KTP" />
                  <Input label="Tanggal Lahir" type="date" />
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold">Jenis Kelamin</label>
                    <div className="flex gap-4">
                      {['Pria', 'Wanita'].map(g => (
                        <label key={g} className="flex-1 flex items-center gap-2 p-3 border border-border rounded-sm cursor-pointer hover:bg-gray-50 transition-colors">
                          <input type="radio" name="gender" className="text-primary focus:ring-primary" />
                          <span className="text-sm font-medium">{g}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold">Nomor Handphone (WhatsApp)</label>
                    <div className="flex gap-2">
                      <Input placeholder="08xxxx" className="flex-1" />
                      <Button variant="outline" className="text-xs h-12">Verifikasi</Button>
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <Input label="Alamat Lengkap" placeholder="Jl. Nama Jalan, No. Rumah, RT/RW..." />
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="space-y-2 text-center">
                  <h2 className="text-2xl font-display font-bold">Pilih Spesialisasi Kamu</h2>
                  <p className="text-text-secondary">Untuk siapa kamu siap mendampingi?</p>
                </div>

                <div className="grid gap-4">
                  {SPECIALIZATIONS.map(spec => (
                    <button
                      key={spec.id}
                      onClick={() => toggleSpec(spec.id)}
                      className={cn(
                        "w-full flex items-center justify-between p-6 rounded-md border-2 transition-all text-left",
                        selectedSpecs.includes(spec.id) ? "border-primary bg-primary-light/10" : "border-border bg-white hover:border-primary/50"
                      )}
                    >
                      <div className="space-y-1">
                        <p className="font-bold">{spec.title}</p>
                        <p className="text-xs text-text-secondary">{spec.desc}</p>
                      </div>
                      <div className={cn(
                        "h-6 w-6 rounded-full border-2 flex items-center justify-center transition-colors",
                        selectedSpecs.includes(spec.id) ? "border-primary bg-primary" : "border-border"
                      )}>
                        {selectedSpecs.includes(spec.id) && <CheckCircle2 size={16} className="text-white" />}
                      </div>
                    </button>
                  ))}
                </div>

                {selectedSpecs.length > 0 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                    <label className="text-sm font-bold text-text-primary uppercase tracking-widest">Ceritakan Pengalamanmu</label>
                    <textarea 
                      className="w-full p-4 rounded-sm border border-border bg-background focus:ring-1 focus:ring-primary outline-none text-sm h-32 resize-none"
                      placeholder="Jelaskan secara singkat pengalaman kamu mendampingi jenis disabilitas yang dipilih..."
                    ></textarea>
                  </motion.div>
                )}
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="space-y-2 text-center">
                  <h2 className="text-2xl font-display font-bold">Verifikasi Dokumen</h2>
                  <p className="text-text-secondary">Kami membutuhkan dokumen ini untuk proses verifikasi keamanan.</p>
                </div>

                <div className="space-y-6">
                  <div className="space-y-3">
                    <label className="text-sm font-bold uppercase tracking-widest text-text-muted">Upload KTP (Wajib)</label>
                    <div className="h-48 border-2 border-dashed border-border rounded-md bg-gray-50 flex flex-col items-center justify-center gap-4 hover:bg-gray-100 transition-colors cursor-pointer group">
                      <div className="p-4 bg-white rounded-full shadow-sm group-hover:scale-110 transition-transform">
                        <Upload size={32} className="text-primary" />
                      </div>
                      <p className="text-xs text-text-secondary font-bold">Klik untuk unggah atau seret file ke sini</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-bold uppercase tracking-widest text-text-muted">Upload Sertifikat Lainnya (Opsional)</label>
                    <button className="w-full p-4 border border-border rounded-sm flex items-center justify-center gap-2 text-sm font-bold text-primary hover:bg-primary-light/20 transition-colors">
                      <PlusIcon size={20} /> Tambah Sertifikat
                    </button>
                  </div>

                  <div className="p-4 bg-primary-light/20 rounded-md border border-primary/10 flex items-start gap-3">
                    <ShieldCheck size={20} className="text-primary shrink-0 mt-0.5" />
                    <p className="text-xs text-text-secondary leading-relaxed">
                      Privasi data Anda adalah prioritas kami. Dokumen akan diverifikasi dalam waktu <span className="font-bold text-text-primary">1x24 jam</span> dan tidak akan disebarluaskan.
                    </p>
                  </div>

                  <label className="flex items-center gap-3 p-4 hover:bg-gray-50 rounded-md cursor-pointer group transition-colors">
                    <input type="checkbox" className="w-5 h-5 rounded border-border text-primary focus:ring-primary" />
                    <span className="text-sm font-medium">Saya menyatakan data yang saya berikan adalah benar dan valid.</span>
                  </label>
                </div>
              </motion.div>
            )}

            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="space-y-2 text-center">
                  <h2 className="text-2xl font-display font-bold">Pelatihan Kepekaan</h2>
                  <p className="text-text-secondary">Wajib diselesaikan untuk menjadi Helper Terverifikasi.</p>
                </div>

                <div className="bg-primary/5 p-6 rounded-md border border-primary/10 space-y-4">
                  <div className="flex justify-between items-end">
                    <p className="text-xs font-bold text-primary uppercase">Progress Pelatihan</p>
                    <p className="text-sm font-bold text-primary">25% Selesai</p>
                  </div>
                  <div className="h-2 w-full bg-primary-light rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-1/4"></div>
                  </div>
                </div>

                <div className="space-y-4">
                  {MODULES.map(module => (
                    <Card key={module.id} className={cn(
                      "border-border/50",
                      module.status === 'COMPLETED' ? "bg-success/5 border-success/20" : ""
                    )}>
                      <CardContent className="p-4 lg:p-6 flex items-center justify-between gap-6">
                        <div className="flex items-center gap-4">
                          <div className={cn(
                            "h-12 w-20 rounded bg-gray-200 flex items-center justify-center shrink-0 relative overflow-hidden",
                            module.status === 'COMPLETED' && "bg-success/20"
                          )}>
                            {module.status === 'COMPLETED' ? (
                              <CheckCircle2 size={24} className="text-success" />
                            ) : (
                              <PlayCircle size={24} className="text-primary" />
                            )}
                          </div>
                          <div>
                            <p className="font-bold text-sm">{module.title}</p>
                            <p className="text-[10px] text-text-muted font-bold uppercase">{module.dur}</p>
                          </div>
                        </div>
                        {module.status === 'COMPLETED' ? (
                          <Badge variant="success">LULUS</Badge>
                        ) : module.status === 'IN_PROGRESS' ? (
                          <Button size="sm" onClick={() => setIsVideoModalOpen(true)}>Lanjutkan</Button>
                        ) : (
                          <Button size="sm" variant="outline" onClick={() => setIsVideoModalOpen(true)}>Mulai</Button>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </motion.div>
            )}

            {currentStep === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-8 text-center py-12"
              >
                <div className="w-24 h-24 bg-success rounded-full flex items-center justify-center text-white mx-auto shadow-xl shadow-success/20">
                  <CheckCircle2 size={48} strokeWidth={3} />
                </div>
                <div className="space-y-2">
                  <h2 className="text-3xl font-display font-bold">Selamat! Onboarding Selesai</h2>
                  <p className="text-text-secondary">Profil kamu sedang dalam tahap peninjauan tim kami.</p>
                </div>
                
                <div className="max-w-md mx-auto bg-gray-50 p-6 rounded-md space-y-4 text-left">
                  <p className="text-xs font-bold text-text-muted uppercase tracking-widest">Checklist Akhir</p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm font-medium">
                      <CheckCircle2 size={18} className="text-success" /> Data Diri Terlengkapi
                    </div>
                    <div className="flex items-center gap-3 text-sm font-medium">
                      <CheckCircle2 size={18} className="text-success" /> Dokumen Berhasil Diunggah
                    </div>
                    <div className="flex items-center gap-3 text-sm font-medium">
                      <CheckCircle2 size={18} className="text-success" /> Pelatihan Kepekaan Lulus
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-accent-light/50 rounded-md border border-accent/20 max-w-md mx-auto">
                  <p className="text-xs text-accent font-bold">
                    Kamu akan mendapatkan notifikasi status verifikasi dalam 24 jam ke depan.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="p-8 border-t border-border bg-gray-50 flex justify-between items-center">
          {currentStep > 1 && currentStep < 5 && (
            <Button variant="ghost" onClick={prevStep} className="gap-2">
              <ChevronLeft size={20} /> Sebelumnya
            </Button>
          )}
          <div className="flex-1"></div>
          {currentStep < 4 ? (
            <Button onClick={nextStep} className="gap-2 px-8 font-bold">
              Selanjutnya <ChevronRight size={20} />
            </Button>
          ) : currentStep === 4 ? (
            <Button disabled={MODULES.some(m => m.status !== 'COMPLETED')} onClick={nextStep} className="gap-2 px-8 font-bold">
              Konfirmasi Selesai <ChevronRight size={20} />
            </Button>
          ) : (
            <Button className="px-12 font-bold" onClick={() => window.location.href = '/helper'}>
              Buka Dashboard
            </Button>
          )}
        </div>
      </div>

      {/* VIDEO PLAYER MODAL SIMULATION */}
      <AnimatePresence>
        {isVideoModalOpen && (
          <div className="fixed inset-0 z-[130] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsVideoModalOpen(false)} className="absolute inset-0 bg-black/90" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden border border-white/10 flex flex-col">
              <div className="p-4 flex justify-between items-center bg-black/50 absolute top-0 left-0 right-0 z-10">
                <h3 className="text-white font-bold text-sm">Modul 2: Etika Pendampingan</h3>
                <button onClick={() => setIsVideoModalOpen(false)} className="text-white hover:bg-white/10 p-2 rounded-full"><X size={24} /></button>
              </div>
              <div className="flex-1 flex items-center justify-center bg-gray-900">
                <PlayCircle size={64} className="text-white opacity-40" />
              </div>
              <div className="p-4 bg-black/50">
                <div className="h-1 w-full bg-white/20 rounded-full mb-4">
                  <div className="h-full bg-primary w-1/3"></div>
                </div>
                <div className="flex justify-between text-[10px] text-white/50 font-bold">
                  <span>10:24 / 30:00</span>
                  <div className="flex gap-4">
                    <span>CAPTION</span>
                    <span>QUALITY</span>
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

function PlusIcon({ size }: { size: number }) {
  return <Upload size={size} />
}

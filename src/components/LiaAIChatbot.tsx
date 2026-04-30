import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Sparkles, 
  X, 
  Minimize2, 
  Send, 
  User, 
  MapPin, 
  Calendar, 
  Clock, 
  ArrowRight,
  ShieldCheck,
  Star,
  Info,
  Mail,
  ChevronRight
} from 'lucide-react'
import { Button } from './ui/Button'
import { Badge } from './ui/Badge'
import { Avatar } from './ui/Avatar'
import { Card, CardContent } from './ui/Card'
import { cn } from '../lib/utils'

export const LiaAIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [step, setStep] = useState(0)
  const [messages, setMessages] = useState<any[]>([])
  const [email, setEmail] = useState('')

  const welcomeMessage = {
    role: 'lia',
    text: "Halo! Saya LIA, asisten AI SobatAman. Saya bisa membantumu menemukan helper yang paling cocok. Ceritakan, kamu butuh bantuan untuk apa? 😊"
  }

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([welcomeMessage])
    }
  }, [isOpen])

  const handleNextStep = (answer: string) => {
    const userMsg = { role: 'user', text: answer }
    let liaResponse = ''
    
    if (step === 0) liaResponse = "Untuk siapa pendamping ini?"
    else if (step === 1) liaResponse = "Apa jenis disabilitasnya?"
    else if (step === 2) liaResponse = "Kapan kamu butuhnya?"
    else liaResponse = "Oke, saya temukan 3 helper yang cocok untukmu!"

    setMessages([...messages, userMsg, { role: 'lia', text: liaResponse }])
    setStep(step + 1)
  }

  return (
    <>
      {/* FAB TRIGGER */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-24 right-6 lg:bottom-8 lg:right-8 z-[100] flex items-center gap-2 px-6 py-4 bg-primary text-white rounded-pill shadow-2xl shadow-primary/30 group transition-all",
          isOpen && "opacity-0 pointer-events-none"
        )}
      >
        <div className="relative">
          <Sparkles size={24} className="group-hover:rotate-12 transition-transform" />
          <motion.div 
            animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -top-1 -right-1 h-3 w-3 bg-accent rounded-full border-2 border-primary"
          />
        </div>
        <span className="font-bold tracking-wide">Tanya LIA</span>
        <Badge className="bg-white/20 text-[8px] border-none ml-1">AI</Badge>
      </motion.button>

      {/* CHAT INTERFACE */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[110] bg-black/20 backdrop-blur-[2px]"
            />
            <motion.div
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              className="fixed bottom-0 right-0 left-0 lg:left-auto lg:right-8 lg:bottom-8 w-full lg:w-[420px] h-[75vh] lg:h-[600px] bg-surface z-[120] rounded-t-card lg:rounded-card shadow-3xl flex flex-col overflow-hidden border border-border"
            >
              {/* Header */}
              <div className="p-4 bg-primary text-white flex items-center justify-between shadow-lg relative z-20">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center border border-white/20">
                    <Sparkles size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-sm">LIA — Asisten SobatAman</h3>
                    <div className="flex items-center gap-1.5 text-[10px] opacity-80">
                      <div className="h-1.5 w-1.5 bg-success rounded-full animate-pulse"></div>
                      Online · AI Assistant
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                    <Minimize2 size={18} />
                  </button>
                  <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-6 bg-gray-50/50">
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn(
                      "flex gap-3",
                      msg.role === 'user' ? "flex-row-reverse" : "flex-row"
                    )}
                  >
                    <div className="shrink-0 pt-1">
                      {msg.role === 'lia' ? (
                        <div className="h-8 w-8 rounded-full bg-primary-light flex items-center justify-center text-primary border border-primary/20">
                          <Sparkles size={14} />
                        </div>
                      ) : (
                        <Avatar size="sm" fallback="U" className="bg-gray-200" />
                      )}
                    </div>
                    <div className={cn(
                      "max-w-[85%] p-3 lg:p-4 rounded-card text-sm shadow-sm",
                      msg.role === 'lia' ? "bg-white text-text-primary rounded-tl-none border border-border" : "bg-primary text-white rounded-tr-none"
                    )}>
                      {msg.text}
                      
                      {/* RECOMMENDATION RESULT MINI CARDS */}
                      {i === messages.length - 1 && msg.text.includes('temukan 3 helper') && (
                        <div className="mt-4 space-y-3">
                          {[1, 2, 3].map(h => (
                            <div key={h} className="bg-gray-50 rounded-md border border-border p-3 flex items-center gap-3 hover:border-primary transition-colors cursor-pointer">
                              <Avatar size="sm" fallback="H" />
                              <div className="flex-1 min-w-0">
                                <p className="font-bold text-xs">Helper #{h}</p>
                                <div className="flex items-center gap-1 text-[9px] text-text-muted">
                                  <Star size={10} className="text-accent" fill="currentColor" /> 4.9 · <ShieldCheck size={10} /> Certified
                                </div>
                              </div>
                              <ChevronRight size={14} className="text-text-muted" />
                            </div>
                          ))}
                          <Button size="sm" className="w-full h-8 text-[10px] font-bold uppercase tracking-wider">
                            Lihat Semua Hasil
                          </Button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}

                {/* Quick Replies / Choices */}
                {step < 4 && (
                  <div className="flex flex-wrap gap-2 pt-2 justify-center">
                    {step === 0 && (
                      ['Cari pendamping tunanetra', 'Butuh interpreter BISINDO', 'Pendamping kampus rutin', 'Bantuan darurat'].map(opt => (
                        <button key={opt} onClick={() => handleNextStep(opt)} className="px-3 py-1.5 rounded-pill border border-primary text-primary text-[10px] font-bold hover:bg-primary hover:text-white transition-all bg-white">
                          {opt}
                        </button>
                      ))
                    )}
                    {step === 1 && (
                      ['Untuk saya sendiri', 'Untuk anggota keluarga'].map(opt => (
                        <button key={opt} onClick={() => handleNextStep(opt)} className="px-3 py-1.5 rounded-pill border border-primary text-primary text-[10px] font-bold hover:bg-primary hover:text-white transition-all bg-white">
                          {opt}
                        </button>
                      ))
                    )}
                  </div>
                )}
              </div>

              {/* Input Area (Mockup) */}
              <div className="p-4 bg-white border-t border-border flex gap-2">
                <input 
                  disabled
                  placeholder="Ketik balasan..." 
                  className="flex-1 bg-gray-50 border border-border rounded-sm px-4 py-2 text-sm outline-none cursor-not-allowed"
                />
                <button disabled className="p-2 bg-gray-100 text-text-muted rounded-md"><Send size={20} /></button>
              </div>

              {/* COMING SOON OVERLAY */}
              <div className="absolute inset-x-0 bottom-0 top-16 z-30 bg-white/60 backdrop-blur-[6px] flex flex-col items-center justify-center p-8 text-center space-y-6">
                <div className="w-16 h-16 bg-accent/20 text-accent rounded-full flex items-center justify-center">
                  <Sparkles size={32} />
                </div>
                <div className="space-y-2">
                  <h4 className="text-xl font-display font-bold text-text-primary">LIA Sedang Dalam Pengembangan</h4>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    Kami sedang menyempurnakan asisten cerdas ini untuk memberikan rekomendasi helper yang lebih akurat.
                  </p>
                </div>
                
                <div className="w-full space-y-3">
                  <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Dapatkan Akses Awal</p>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
                      <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Masukkan emailmu"
                        className="w-full pl-9 pr-4 py-2.5 rounded-sm border border-border bg-white text-xs outline-none focus:border-primary"
                      />
                    </div>
                    <Button size="sm" className="px-4">Beritahu Saya</Button>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 p-2 px-4 bg-primary/10 rounded-pill border border-primary/10">
                  <Info size={12} className="text-primary" />
                  <span className="text-[9px] font-bold text-primary uppercase">Fase 2 Launching Juni 2026</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

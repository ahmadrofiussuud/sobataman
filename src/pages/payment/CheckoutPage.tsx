import React, { useState } from 'react'
import { 
  ChevronLeft, 
  Lock, 
  ShieldCheck, 
  Info, 
  CreditCard, 
  Plus, 
  Tag, 
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  Loader2,
  ChevronRight
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'
import { Avatar } from '../../components/ui/Avatar'
import { Card, CardContent } from '../../components/ui/Card'
import { Input } from '../../components/ui/Input'
import { cn } from '../../lib/utils'

export default function CheckoutPage() {
  const navigate = useNavigate()
  const [selectedMethod, setSelectedMethod] = useState('AmanPay')
  const [promoCode, setPromoCode] = useState('')
  const [isPromoApplied, setIsPromoApplied] = useState(false)
  const [isPaying, setIsPaying] = useState(false)
  const [agreed, setAgreed] = useState(false)

  const handlePayment = () => {
    setIsPaying(true)
    setTimeout(() => {
      navigate('/payment/success')
    }, 2000)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* HEADER */}
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <ChevronLeft size={24} />
          </button>
          <div>
            <h1 className="text-2xl font-display font-bold text-text-primary">Konfirmasi Booking</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[10px] font-bold text-primary">DETAIL</span>
              <ChevronRight size={10} className="text-text-muted" />
              <span className="text-[10px] font-bold text-primary">BAYAR</span>
              <ChevronRight size={10} className="text-text-muted" />
              <span className="text-[10px] font-bold text-text-muted uppercase">KONFIRMASI</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* BOOKING SUMMARY */}
          <section className="space-y-4">
            <h2 className="text-lg font-bold">Ringkasan Pendampingan</h2>
            <Card className="border-border/50">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="flex items-center gap-4 flex-1">
                    <Avatar src="https://i.pravatar.cc/150?u=1" size="xl" className="h-16 w-16" />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <p className="font-bold">Ahmad Fauzi</p>
                        <Badge variant="accent" className="text-[8px] py-0">CERTIFIED</Badge>
                      </div>
                      <p className="text-xs text-text-secondary">Pendampingan Mobilitas Pagi</p>
                    </div>
                  </div>
                  <div className="h-px sm:h-auto sm:w-px bg-border my-2 sm:my-0"></div>
                  <div className="flex-1 grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest flex items-center gap-1.5">
                        <Calendar size={10} /> Tanggal
                      </p>
                      <p className="text-xs font-bold">Kamis, 30 Apr 2026</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest flex items-center gap-1.5">
                        <Clock size={10} /> Waktu
                      </p>
                      <p className="text-xs font-bold">08:00 — 12:00 (4 jam)</p>
                    </div>
                    <div className="col-span-2 space-y-1">
                      <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest flex items-center gap-1.5">
                        <MapPin size={10} /> Lokasi
                      </p>
                      <p className="text-xs font-bold truncate">Taman Krida Budaya, Malang</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* METODE PEMBAYARAN */}
          <section className="space-y-4">
            <h2 className="text-lg font-bold">Pilih Metode Pembayaran</h2>
            <div className="grid gap-3">
              {[
                { id: 'AmanPay', name: 'AmanPay Saldo', logo: '💳', detail: 'Saldo: Rp 742.500' },
                { id: 'gopay', name: 'GoPay', logo: '📱' },
                { id: 'transfer', name: 'Transfer Bank (VA)', logo: '🏦' }
              ].map(method => (
                <button
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id)}
                  className={cn(
                    "w-full flex items-center justify-between p-4 rounded-md border-2 transition-all",
                    selectedMethod === method.id ? "border-primary bg-primary-light/10" : "border-border bg-white hover:border-primary/30"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gray-100 rounded-md flex items-center justify-center text-xl">
                      {method.logo}
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-sm">{method.name}</p>
                      {method.detail && <p className="text-[10px] text-primary font-bold">{method.detail}</p>}
                    </div>
                  </div>
                  <div className={cn(
                    "h-5 w-5 rounded-full border-2 flex items-center justify-center transition-colors",
                    selectedMethod === method.id ? "border-primary bg-primary" : "border-border"
                  )}>
                    {selectedMethod === method.id && <div className="h-2 w-2 bg-white rounded-full" />}
                  </div>
                </button>
              ))}
              <button className="w-full flex items-center gap-4 p-4 rounded-md border border-dashed border-border text-text-secondary hover:bg-gray-50 transition-colors">
                <div className="w-10 h-10 rounded-md border border-dashed border-border flex items-center justify-center">
                  <Plus size={20} />
                </div>
                <span className="text-sm font-bold">Tambah Metode Baru</span>
              </button>
            </div>
          </section>
        </div>

        <div className="space-y-8">
          {/* PRICE BREAKDOWN */}
          <Card className="border-none shadow-xl bg-surface sticky top-6">
            <CardContent className="p-6 space-y-6">
              <h3 className="font-bold text-lg">Rincian Pembayaran</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Tarif Helper (Rp 65.000 × 4)</span>
                  <span className="font-mono font-bold">Rp 260.000</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Biaya Layanan (10%)</span>
                  <span className="font-mono font-bold">Rp 26.000</span>
                </div>
                {isPromoApplied && (
                  <div className="flex justify-between text-sm text-success font-bold">
                    <span>Promo "HEMATIBU"</span>
                    <span className="font-mono">- Rp 20.000</span>
                  </div>
                )}
                <hr className="border-border/50" />
                <div className="flex justify-between items-end">
                  <span className="text-sm font-bold">Total Bayar</span>
                  <span className="text-3xl font-mono font-bold text-primary">
                    Rp {((isPromoApplied ? 266000 : 286000)).toLocaleString('id-ID')}
                  </span>
                </div>
              </div>

              {/* ESCROW INFO */}
              <div className="p-4 bg-blue-50 rounded-md border border-blue-100 space-y-2">
                <div className="flex items-center gap-2 text-blue-700 font-bold text-xs uppercase tracking-wider">
                  <Lock size={14} /> Dijamin Escrow SobatAman
                </div>
                <p className="text-[10px] text-blue-600 leading-normal">
                  Dana Anda akan ditahan secara aman dan hanya akan diteruskan ke Helper setelah sesi selesai dikonfirmasi oleh Anda.
                </p>
              </div>

              {/* PROMO CODE */}
              <div className="space-y-2">
                <div className="relative">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
                  <input 
                    type="text" 
                    placeholder="Kode promo..."
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="w-full pl-10 pr-24 py-2.5 rounded-sm border border-border bg-background outline-none text-sm focus:border-primary transition-all"
                  />
                  <button 
                    onClick={() => {
                      if (promoCode.toUpperCase() === 'HEMATIBU') {
                        setIsPromoApplied(true)
                      }
                    }}
                    className="absolute right-1 top-1 bottom-1 px-4 bg-primary-light text-primary text-[10px] font-bold rounded-sm hover:bg-primary-light/80 transition-colors"
                  >
                    TERAPKAN
                  </button>
                </div>
                {isPromoApplied && (
                  <p className="text-[10px] text-success font-bold flex items-center gap-1">
                    <CheckCircle2 size={12} /> Kode promo berhasil diterapkan!
                  </p>
                )}
              </div>

              <div className="space-y-4 pt-4 border-t border-border/50">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded border-border text-primary focus:ring-primary" 
                  />
                  <p className="text-xs text-text-secondary leading-normal group-hover:text-text-primary transition-colors">
                    Saya setuju dengan <span className="text-primary font-bold hover:underline">Syarat & Ketentuan</span> layanan pendampingan SobatAman.
                  </p>
                </label>

                <Button 
                  onClick={handlePayment}
                  disabled={isPaying || !agreed}
                  className="w-full h-14 text-lg font-bold shadow-lg shadow-primary/20"
                >
                  {isPaying ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="animate-spin" size={20} /> Memproses...
                    </div>
                  ) : (
                    `Bayar Rp ${((isPromoApplied ? 266000 : 286000)).toLocaleString('id-ID')}`
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

import React, { useState } from 'react'
import { 
  Star, 
  MapPin, 
  ShieldCheck, 
  Play, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  MessageSquare, 
  ChevronRight,
  Share2,
  MoreVertical,
  X,
  Info
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'
import { Avatar } from '../../components/ui/Avatar'
import { Card, CardContent } from '../../components/ui/Card'
import { Input } from '../../components/ui/Input'
import { cn } from '../../lib/utils'

export default function HelperProfilePage() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
  const [selectedDuration, setSelectedDuration] = useState(2)
  const pricePerHour = 65000

  return (
    <div className="relative pb-24 lg:pb-0">
      {/* SECTION 1: HERO PROFIL */}
      <div className="relative">
        <div className="h-48 lg:h-64 w-full bg-gradient-to-r from-primary to-primary-hover rounded-b-card lg:rounded-card relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute top-4 right-4 flex gap-2">
            <button className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-colors">
              <Share2 size={20} />
            </button>
            <button className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-colors">
              <MoreVertical size={20} />
            </button>
          </div>
        </div>

        <div className="container-custom relative px-4 lg:px-8 -mt-16 lg:-mt-20">
          <Card className="border-none shadow-lg overflow-visible">
            <CardContent className="p-6 lg:p-10">
              <div className="flex flex-col lg:flex-row gap-8">
                <div className="relative shrink-0 mx-auto lg:mx-0">
                  <Avatar 
                    src="https://i.pravatar.cc/150?u=1" 
                    fallback="AF" 
                    className="h-32 w-32 lg:h-40 lg:w-40 border-4 border-white shadow-md"
                  />
                  <div className="absolute bottom-2 right-2 p-2 bg-accent rounded-full border-4 border-white shadow-sm">
                    <ShieldCheck size={24} className="text-white" />
                  </div>
                </div>

                <div className="flex-1 space-y-4 text-center lg:text-left">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
                      <h1 className="text-3xl lg:text-4xl font-display font-bold text-text-primary">Ahmad Fauzi</h1>
                      <Badge variant="accent" className="gap-1.5 py-1 px-3">
                        <ShieldCheck size={14} /> CERTIFIED HELPER
                      </Badge>
                    </div>
                    <div className="flex items-center justify-center lg:justify-start gap-2 text-text-secondary">
                      <MapPin size={18} className="text-primary" />
                      <span>Lowokwaru, Malang · 1.2 km dari kamu</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap justify-center lg:justify-start gap-2">
                    {['Tunadaksa', 'Lansia', 'Mobilitas', 'Fisioterapi'].map(spec => (
                      <Badge key={spec} variant="primary" className="bg-primary-light text-primary border-none font-bold uppercase text-[10px]">
                        {spec}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-center lg:justify-start gap-4">
                    <div className="flex items-center gap-1.5">
                      <Star size={24} className="text-accent" fill="currentColor" />
                      <span className="text-2xl font-bold">4.9</span>
                      <span className="text-text-secondary">(124 ulasan)</span>
                    </div>
                    <div className="h-6 w-px bg-border"></div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-success animate-pulse"></div>
                      <span className="text-success font-bold">Tersedia sekarang</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <Button 
                      size="lg" 
                      className="flex-1 h-14 text-lg font-bold shadow-lg shadow-primary/20"
                      onClick={() => setIsBookingModalOpen(true)}
                    >
                      Booking Sekarang
                    </Button>
                    <Button variant="secondary" size="lg" className="flex-1 h-14 text-lg font-bold gap-2">
                      <MessageSquare size={20} /> Kirim Pesan
                    </Button>
                  </div>
                </div>

                <div className="lg:w-64 pt-6 lg:pt-0 border-t lg:border-t-0 lg:border-l border-border/50 lg:pl-8 text-center lg:text-right">
                  <p className="text-xs font-bold text-text-muted uppercase tracking-widest mb-1">Mulai Dari</p>
                  <p className="text-3xl font-mono font-bold text-primary">Rp 65.000<span className="text-sm font-normal text-text-secondary">/jam</span></p>
                  <p className="text-sm text-text-secondary mt-2">Hingga Rp 85.000/jam tergantung kompleksitas layanan.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="container-custom py-12 px-4 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* LEFT COLUMN: ABOUT & VIDEO */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* SECTION 2: VIDEO INTRO */}
            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-display font-bold">Kenalan dulu dengan Fauzi</h2>
                  <p className="text-text-secondary">Video perkenalan berdurasi 60 detik</p>
                </div>
                <Badge variant="outline" className="bg-white border-border">VIDEO</Badge>
              </div>
              <div className="relative aspect-video rounded-card overflow-hidden group cursor-pointer border border-border shadow-md">
                <img 
                  src="/images/video-thumb.png" 
                  alt="Video Thumbnail" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-primary shadow-2xl group-hover:scale-110 transition-transform">
                    <Play size={32} fill="currentColor" className="ml-1" />
                  </div>
                </div>
              </div>
              <blockquote className="bg-primary-light/30 border-l-4 border-primary p-6 rounded-r-md italic text-lg text-text-primary">
                "Bagi saya, mendampingi adalah tentang membangun jembatan kepercayaan agar setiap orang bisa menikmati dunianya tanpa batasan."
              </blockquote>
            </section>

            {/* SECTION 3: TENTANG HELPER */}
            <section className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-2xl font-display font-bold">Tentang Fauzi</h2>
                <p className="text-text-secondary leading-relaxed max-w-2xl">
                  Halo! Saya Fauzi, lulusan Fisioterapi yang berfokus pada pendampingan disabilitas fisik. 
                  Saya memiliki pengalaman lebih dari 3 tahun mendampingi klien dengan berbagai kebutuhan 
                  khusus, mulai dari mobilitas harian hingga latihan fisik rutin.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="font-bold text-lg flex items-center gap-2">
                    <CheckCircle2 size={20} className="text-primary" /> Keahlian Spesifik
                  </h3>
                  <ul className="space-y-3">
                    {['Bantu mobilitas kursi roda', 'Latihan fisik pasca stroke', 'Pendampingan ke tempat umum', 'Navigasi transportasi publik'].map(skill => (
                      <li key={skill} className="flex items-center gap-3 text-sm text-text-secondary">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary" /> {skill}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-4">
                  <h3 className="font-bold text-lg flex items-center gap-2">
                    <CheckCircle2 size={20} className="text-primary" /> Bahasa
                  </h3>
                  <div className="flex gap-2">
                    <Badge variant="outline">Indonesia (Native)</Badge>
                    <Badge variant="outline">Jawa (Lancar)</Badge>
                    <Badge variant="outline">Inggris (Dasar)</Badge>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 4: SERTIFIKASI & VERIFIKASI */}
            <section className="space-y-6">
              <h2 className="text-2xl font-display font-bold">Sertifikasi & Verifikasi</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { title: "KTP Terverifikasi", date: "Januari 2024" },
                  { title: "Pelatihan Kepekaan Disabilitas", date: "Maret 2024" },
                  { title: "Background Check Selesai", date: "Februari 2024" },
                  { title: "Certified Helper — SobatAman", date: "Maret 2024" }
                ].map((cert, i) => (
                  <Card key={i} className="border-border/50 hover:bg-primary-light/10 transition-colors cursor-default">
                    <CardContent className="p-4 flex items-center gap-4">
                      <div className="shrink-0 w-10 h-10 rounded-full bg-success/10 text-success flex items-center justify-center">
                        <ShieldCheck size={20} />
                      </div>
                      <div>
                        <p className="font-bold text-sm">{cert.title}</p>
                        <p className="text-xs text-text-muted">{cert.date}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* SECTION 6: ULASAN KLIEN */}
            <section className="space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-display font-bold">Ulasan Klien</h2>
                <button className="text-primary font-bold text-sm hover:underline">Lihat Semua</button>
              </div>

              <div className="grid md:grid-cols-3 gap-8 p-6 bg-surface rounded-card border border-border">
                <div className="text-center space-y-2">
                  <p className="text-5xl font-display font-bold">4.9</p>
                  <div className="flex justify-center text-accent">
                    {[1, 2, 3, 4, 5].map(s => <Star key={s} size={16} fill="currentColor" />)}
                  </div>
                  <p className="text-sm text-text-secondary">124 Ulasan</p>
                </div>
                <div className="md:col-span-2 space-y-2">
                  {[5, 4, 3, 2, 1].map(stars => (
                    <div key={stars} className="flex items-center gap-3">
                      <span className="text-xs font-bold w-4">{stars}</span>
                      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-accent" 
                          style={{ width: `${stars === 5 ? 85 : (stars === 4 ? 12 : 3)}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-text-muted w-10">{stars === 5 ? 102 : (stars === 4 ? 15 : 7)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                {[
                  { name: "S***i", date: "2 hari yang lalu", rating: 5, text: "Fauzi sangat profesional dan membantu ayah saya dengan penuh kesabaran. Sangat direkomendasikan untuk pendampingan pasca stroke.", service: "Latihan Fisik" },
                  { name: "A***n", date: "1 minggu yang lalu", rating: 5, text: "Sangat terbantu untuk pendampingan ke rumah sakit. Fauzi tahu prosedur navigasi kursi roda dengan baik.", service: "Pendampingan RS" }
                ].map((review, i) => (
                  <Card key={i} className="border-none shadow-sm">
                    <CardContent className="p-6 space-y-4">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                          <Avatar fallback={review.name[0]} className="h-10 w-10" />
                          <div>
                            <p className="font-bold">{review.name}</p>
                            <p className="text-xs text-text-muted">{review.date}</p>
                          </div>
                        </div>
                        <div className="flex text-accent">
                          {[1, 2, 3, 4, 5].map(s => <Star key={s} size={14} fill={s <= review.rating ? "currentColor" : "none"} />)}
                        </div>
                      </div>
                      <p className="text-text-primary">{review.text}</p>
                      <Badge variant="outline" className="text-[10px] uppercase font-bold">{review.service}</Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN: STATS & SCHEDULE */}
          <div className="space-y-8">
            {/* SECTION 5: REKAM SESI */}
            <Card className="bg-primary text-white border-none shadow-lg">
              <CardContent className="p-6">
                <h3 className="font-bold mb-6 text-primary-light uppercase text-xs tracking-widest">Rekam Sesi</h3>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="space-y-1">
                    <p className="text-2xl font-mono font-bold">127</p>
                    <p className="text-[10px] opacity-80 uppercase">Total Sesi</p>
                  </div>
                  <div className="space-y-1 border-x border-white/10">
                    <p className="text-2xl font-mono font-bold">125</p>
                    <p className="text-[10px] opacity-80 uppercase">Berhasil</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-2xl font-mono font-bold">98%</p>
                    <p className="text-[10px] opacity-80 uppercase">Puas</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* SECTION 7: JADWAL TERSEDIA */}
            <Card className="border-border shadow-sm">
              <CardContent className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold">Jadwal Tersedia</h3>
                  <button className="text-primary text-xs font-bold hover:underline">Lihat Detail</button>
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-7 gap-1">
                    {['Sn', 'Sl', 'Rb', 'Km', 'Jm', 'Sb', 'Mg'].map((day, i) => (
                      <div key={day} className="text-center">
                        <p className="text-[10px] text-text-muted mb-1 font-bold">{day}</p>
                        <div className={cn(
                          "h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold mx-auto",
                          i === 2 ? "bg-primary text-white" : "text-text-primary"
                        )}>
                          {29 + i}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3 pt-4">
                    <p className="text-xs font-bold text-text-muted uppercase">Pilih Waktu (Rabu, 29 April)</p>
                    <div className="grid grid-cols-2 gap-2">
                      {['08:00 - 10:00', '10:00 - 12:00', '13:00 - 15:00', '15:00 - 17:00'].map((time, i) => (
                        <button 
                          key={time} 
                          className={cn(
                            "py-2.5 rounded-sm border text-xs font-bold transition-all",
                            i < 2 ? "border-primary-light bg-primary-light/50 text-primary" : "border-border text-text-secondary hover:border-primary/50"
                          )}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-md border border-blue-100">
                  <Info size={16} className="text-blue-500 shrink-0 mt-0.5" />
                  <p className="text-[10px] text-blue-700 leading-normal">
                    Waktu yang tampil adalah waktu lokal Helper. Pastikan Anda telah menyesuaikan jadwal.
                  </p>
                </div>

                <Button className="w-full" onClick={() => setIsBookingModalOpen(true)}>
                  Mulai Booking
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* STICKY BOTTOM BAR (MOBILE) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-surface border-t border-border p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-0.5">
            <p className="text-[10px] font-bold text-text-muted uppercase">Mulai Dari</p>
            <p className="text-lg font-mono font-bold text-primary">Rp 65.000<span className="text-xs font-normal">/jam</span></p>
          </div>
          <Button className="flex-1 h-12 text-base font-bold shadow-lg" onClick={() => setIsBookingModalOpen(true)}>
            Booking Sekarang
          </Button>
        </div>
      </div>

      {/* BOOKING MODAL */}
      <AnimatePresence>
        {isBookingModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsBookingModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg bg-surface rounded-card shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-border flex items-center justify-between">
                <h3 className="text-xl font-display font-bold">Booking Pendampingan</h3>
                <button onClick={() => setIsBookingModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
                  <X size={20} />
                </button>
              </div>

              <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
                <div className="flex items-center gap-4 p-4 bg-primary-light/20 rounded-md">
                  <Avatar src="https://i.pravatar.cc/150?u=1" fallback="AF" />
                  <div>
                    <p className="font-bold">Ahmad Fauzi</p>
                    <p className="text-xs text-text-secondary">Certified Helper · Rp 65.000/jam</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Input type="date" label="Tanggal" defaultValue="2026-04-29" />
                  <Input type="time" label="Waktu Mulai" defaultValue="09:00" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold">Durasi Pendampingan</label>
                  <div className="grid grid-cols-4 gap-2">
                    {[1, 2, 3, 4].map(h => (
                      <button
                        key={h}
                        onClick={() => setSelectedDuration(h)}
                        className={cn(
                          "py-2.5 rounded-sm border text-sm font-bold transition-all",
                          selectedDuration === h ? "bg-primary text-white border-primary" : "bg-white text-text-secondary border-border hover:border-primary/50"
                        )}
                      >
                        {h} Jam
                      </button>
                    ))}
                  </div>
                </div>

                <Input label="Lokasi Pertemuan" placeholder="Alamat lengkap atau nama tempat..." />

                <div className="space-y-2">
                  <label className="text-sm font-semibold">Catatan Khusus (Opsional)</label>
                  <textarea 
                    className="w-full p-4 rounded-sm border border-border bg-background focus:ring-1 focus:ring-primary outline-none text-sm h-24 resize-none"
                    placeholder="Contoh: Tolong bawa masker tambahan, saya pakai kursi roda..."
                  ></textarea>
                </div>

                <div className="p-4 bg-gray-50 rounded-md space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary">Biaya Pendampingan ({selectedDuration} Jam)</span>
                    <span className="font-mono font-bold">Rp {(pricePerHour * selectedDuration).toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary">Biaya Layanan</span>
                    <span className="font-mono font-bold">Rp 5.000</span>
                  </div>
                  <hr className="border-border/50" />
                  <div className="flex justify-between text-base font-bold">
                    <span>Total Estimasi</span>
                    <span className="text-primary font-mono">Rp {(pricePerHour * selectedDuration + 5000).toLocaleString('id-ID')}</span>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-surface border-t border-border">
                <Button className="w-full h-12 text-lg font-bold">Lanjut ke Pembayaran</Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

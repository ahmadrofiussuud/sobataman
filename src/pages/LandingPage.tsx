import React from 'react'
import { motion } from 'framer-motion'
import { 
  Search, 
  ShieldCheck, 
  Wallet, 
  Bot, 
  LayoutDashboard, 
  BookOpen, 
  CalendarClock, 
  Star,
  ArrowRight,
  Globe,
  MessageCircle,
  Camera,
  Briefcase,
  CheckCircle2
} from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Card, CardContent } from '../components/ui/Card'
import { Avatar } from '../components/ui/Avatar'
import { Badge } from '../components/ui/Badge'
import { Link } from 'react-router-dom'
import { LiaAIChatbot } from '../components/LiaAIChatbot'

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
}

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.2
    }
  }
}

export default function LandingPage() {
  return (
    <div className="bg-background">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-surface/80 backdrop-blur-md border-b border-border h-16">
        <div className="container-custom h-full flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-sm bg-primary flex items-center justify-center">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <span className="font-display text-xl font-bold text-primary">SobatAman</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <a href="#home" className="text-sm font-medium text-text-primary hover:text-primary">Beranda</a>
            <a href="#how-it-works" className="text-sm font-medium text-text-primary hover:text-primary">Cara Kerja</a>
            <a href="#features" className="text-sm font-medium text-text-primary hover:text-primary">Fitur</a>
            <a href="#about" className="text-sm font-medium text-text-primary hover:text-primary">Tentang</a>
          </div>

          <div className="flex items-center gap-3">
            <Button size="sm" asChild>
              <Link to="/auth/login">Masuk Dashboard</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.section 
        id="home" 
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={stagger}
        className="relative pt-32 pb-20 lg:pt-56 lg:pb-40 overflow-hidden"
      >
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/hero.png" 
            alt="Caregiver helping person with disability"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background/90 to-primary-light/40"></div>
        </div>

        <div className="container-custom relative z-10 px-6 sm:px-10 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-10">
              <motion.h1 
                variants={fadeIn}
                className="text-5xl lg:text-7xl font-display font-bold leading-tight text-text-primary"
              >
                Setiap Langkah <br />
                <span className="text-primary italic">Berarti Lebih</span>
              </motion.h1>
              <motion.p 
                variants={fadeIn}
                className="text-xl text-text-secondary max-w-lg leading-relaxed"
              >
                SobatAman menghubungkan keluarga dengan pendamping terverifikasi untuk menciptakan kemandirian tanpa batas. On-demand, aman, dan penuh kasih.
              </motion.p>
              <motion.div 
                variants={fadeIn}
                className="flex flex-col sm:flex-row gap-5"
              >
                <Button size="lg" asChild className="h-14 px-10 gap-3 rounded-pill text-lg shadow-xl shadow-primary/20 hover:scale-105 transition-transform">
                  <Link to="/auth/login">Masuk Sekarang <ArrowRight size={22} /></Link>
                </Button>
              </motion.div>
            </div>
 
            <motion.div 
              variants={fadeIn}
              className="relative hidden lg:block"
            >
              <div className="absolute -inset-10 bg-primary/10 blur-[100px] rounded-full"></div>
              <div className="relative z-10 p-4 bg-white/40 backdrop-blur-xl rounded-[40px] border border-white/50 shadow-2xl overflow-hidden group">
                <img 
                  src="/images/mockup.png" 
                  alt="Helping hand" 
                  className="w-full h-[500px] object-cover rounded-[32px] transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Stats Bar */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-primary py-12 text-white"
      >
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <p className="text-4xl font-mono font-bold">23 Juta+</p>
              <p className="text-primary-light/80 text-sm font-bold uppercase tracking-widest">Disabilitas di Indonesia</p>
            </div>
            <div className="space-y-2 border-y md:border-y-0 md:border-x border-white/10 py-8 md:py-0">
              <p className="text-4xl font-mono font-bold">500+</p>
              <p className="text-primary-light/80 text-sm font-bold uppercase tracking-widest">Helper Terverifikasi</p>
            </div>
            <div className="space-y-2">
              <p className="text-4xl font-mono font-bold">100%</p>
              <p className="text-primary-light/80 text-sm font-bold uppercase tracking-widest">Aman & Terpercaya</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Problems Section */}
      <motion.section 
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={stagger}
        className="py-24 bg-surface"
      >
        <div className="container-custom text-center space-y-16">
          <motion.div 
            variants={fadeIn}
            className="space-y-4"
          >
            <Badge variant="accent">Tantangan</Badge>
            <h2 className="text-3xl lg:text-4xl font-display font-bold">Masalah yang Selama Ini Tidak Ada Solusinya</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Search, title: "Pendamping Sulit Dicari", desc: "Mencari pendamping yang cocok dan tersedia secara mendadak seringkali memakan waktu berjam-jam." },
              { icon: ShieldCheck, title: "Tidak Ada Jaminan Keamanan", desc: "Kekhawatiran akan latar belakang pendamping menjadi penghambat utama bagi keluarga." },
              { icon: Wallet, title: "Biaya Tidak Transparan", desc: "Sistem pembayaran yang tidak jelas seringkali merugikan kedua belah pihak." }
            ].map((problem, i) => (
              <motion.div
                key={i}
                variants={fadeIn}
              >
                <Card className="h-full hover:border-accent/50 hover:shadow-lg transition-all group">
                  <CardContent className="pt-6 text-center space-y-4">
                    <div className="w-16 h-16 bg-accent-light rounded-full flex items-center justify-center mx-auto text-accent group-hover:scale-110 transition-transform">
                      <problem.icon size={32} />
                    </div>
                    <h3 className="text-xl font-bold">{problem.title}</h3>
                    <p className="text-text-secondary text-sm leading-relaxed">{problem.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* How it Works Section */}
      <motion.section 
        id="how-it-works" 
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={stagger}
        className="py-24 bg-background overflow-hidden"
      >
        <div className="container-custom text-center space-y-16 relative">
          <motion.div 
            variants={fadeIn}
            className="space-y-4"
          >
            <Badge variant="primary">Langkah Mudah</Badge>
            <h2 className="text-3xl lg:text-4xl font-display font-bold">Semudah 3 Langkah</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connector Line (Desktop) */}
            <div className="hidden md:block absolute top-24 left-1/4 right-1/4 h-0.5 bg-dashed border-t-2 border-dashed border-primary/20 -z-10"></div>
            
            {[
              { step: "1", title: "Ceritakan Kebutuhanmu", desc: "AI chatbot kami akan membantu mengidentifikasi kebutuhan spesifik pendampingan Anda." },
              { step: "2", title: "Pilih Helper Terverifikasi", desc: "Lihat profil lengkap, video intro, dan badge spesialisasi helper yang sudah melalui background check." },
              { step: "3", title: "Mulai Perjalanan", desc: "Pantau real-time tracking dan terima laporan otomatis langsung ke WhatsApp keluarga." }
            ].map((step, i) => (
              <motion.div 
                key={i}
                variants={fadeIn}
                className="space-y-6"
              >
                <div className="w-20 h-20 bg-primary text-white rounded-full flex items-center justify-center mx-auto text-3xl font-mono font-bold shadow-lg ring-8 ring-primary/10">
                  {step.step}
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">{step.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed max-w-xs mx-auto">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-surface">
        <div className="container-custom space-y-16">
          <div className="text-center space-y-4">
            <Badge variant="success">Fitur Unggulan</Badge>
            <h2 className="text-3xl lg:text-4xl font-display font-bold">Lebih dari Sekadar Marketplace</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              { icon: LayoutDashboard, title: "Family Dashboard", desc: "Satu dashboard terpusat untuk memantau lokasi, durasi, dan kondisi klien secara real-time." },
              { icon: BookOpen, title: "Helper Journal", desc: "Laporan sesi otomatis setiap akhir pendampingan untuk memantau progres dan catatan penting." },
              { icon: CalendarClock, title: "Recurring Booking", desc: "Jadwalkan pendampingan rutin mingguan atau bulanan tanpa perlu booking ulang setiap hari." },
              { icon: CheckCircle2, title: "Verified Badge", desc: "Setiap helper memiliki spesialisasi terverifikasi (Autisme, Lansia, Disabilitas Fisik, dll)." }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="flex gap-6 p-8 hover:bg-primary-light/20 transition-colors border-none shadow-sm">
                  <div className="shrink-0 w-16 h-16 bg-white rounded-md shadow-sm border border-border flex items-center justify-center text-primary">
                    <feature.icon size={32} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold">{feature.title}</h3>
                    <p className="text-text-secondary text-sm leading-relaxed">{feature.desc}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-background">
        <div className="container-custom space-y-16">
          <div className="text-center space-y-4">
            <Badge variant="primary">Testimoni</Badge>
            <h2 className="text-3xl lg:text-4xl font-display font-bold">Cerita Nyata dari Keluarga yang Sudah Merasakan</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Siti Aminah", role: "Ibu dari Anak Autis", text: "SobatAman sangat membantu saya mencari pendamping saat saya harus bekerja. Helpernya sangat sabar dan laporannya lengkap.", img: "/images/user-1.png" },
              { name: "Andi Wijaya", role: "Anak dari Lansia", text: "Fitur tracking real-time memberikan ketenangan pikiran. Saya tahu ayah saya sedang berada di mana dan didampingi siapa.", img: "/images/user-2.png" },
              { name: "Rina Kartika", role: "Penyandang Tuna Daksa", text: "Sekarang saya lebih mandiri. Bisa pergi ke mana saja dengan pendamping yang sudah paham kebutuhan spesifik saya.", img: "/images/user-3.png" }
            ].map((testi, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
              >
                <Card className="h-full border-none shadow-md">
                  <CardContent className="pt-8 space-y-6">
                    <div className="flex gap-1 text-accent">
                      {[1, 2, 3, 4, 5].map((s) => <Star key={s} size={16} fill="currentColor" />)}
                    </div>
                    <p className="italic text-text-primary">"{testi.text}"</p>
                    <div className="flex items-center gap-4">
                      <Avatar src={testi.img} fallback={testi.name[0]} />
                      <div>
                        <p className="font-bold">{testi.name}</p>
                        <p className="text-xs text-text-secondary">{testi.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20">
        <div className="container-custom">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-primary rounded-card p-8 lg:p-16 text-center text-white space-y-8 relative overflow-hidden"
          >
            <div className="relative z-10 space-y-6">
              <h2 className="text-3xl lg:text-5xl font-display font-bold leading-tight">Siap Memulai <br /> Perjalanan Baru?</h2>
              <p className="text-primary-light/80 text-base lg:text-lg max-w-2xl mx-auto">
                Bergabunglah dengan ribuan keluarga lainnya yang telah menemukan solusi pendampingan terpercaya.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button size="lg" asChild className="bg-white text-primary border-white hover:bg-primary-light hover:text-primary px-10 h-16 text-lg font-bold">
                  <Link to="/auth/login">Masuk Sekarang</Link>
                </Button>
              </div>
            </div>
            
            {/* Decorative background */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 lg:w-96 h-64 lg:h-96 bg-white/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-48 lg:w-64 h-48 lg:h-64 bg-accent/20 rounded-full blur-3xl"></div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-surface pt-20 pb-10 border-t border-border">
        <div className="container-custom space-y-16">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12">
            <div className="col-span-2 space-y-6">
              <Link to="/" className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-sm bg-primary flex items-center justify-center">
                  <span className="text-white font-bold text-xl">S</span>
                </div>
                <span className="font-display text-xl font-bold text-primary">SobatAman</span>
              </Link>
              <p className="text-text-secondary text-sm max-w-xs leading-relaxed">
                Platform marketplace on-demand terpercaya untuk jasa pendampingan penyandang disabilitas di Indonesia.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-background flex items-center justify-center text-text-secondary hover:bg-primary hover:text-white transition-colors">
                  <Globe size={20} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-background flex items-center justify-center text-text-secondary hover:bg-primary hover:text-white transition-colors">
                  <MessageCircle size={20} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-background flex items-center justify-center text-text-secondary hover:bg-primary hover:text-white transition-colors">
                  <Camera size={20} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-background flex items-center justify-center text-text-secondary hover:bg-primary hover:text-white transition-colors">
                  <Briefcase size={20} />
                </a>
              </div>
            </div>

            <div className="space-y-6">
              <h4 className="font-bold text-text-primary">Layanan</h4>
              <ul className="space-y-4 text-sm text-text-secondary">
                <li><Link to="/auth/login" className="hover:text-primary">Cari Helper</Link></li>
                <li><Link to="/auth/login" className="hover:text-primary">Masuk Dashboard</Link></li>
                <li><a href="#" className="hover:text-primary">Layanan Korporat</a></li>
                <li><a href="#" className="hover:text-primary">Spesialisasi</a></li>
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="font-bold text-text-primary">Perusahaan</h4>
              <ul className="space-y-4 text-sm text-text-secondary">
                <li><a href="#" className="hover:text-primary">Tentang Kami</a></li>
                <li><a href="#" className="hover:text-primary">Karir</a></li>
                <li><a href="#" className="hover:text-primary">Kontak</a></li>
                <li><a href="#" className="hover:text-primary">Blog</a></li>
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="font-bold text-text-primary">Dukungan</h4>
              <ul className="space-y-4 text-sm text-text-secondary">
                <li><a href="#" className="hover:text-primary">Pusat Bantuan</a></li>
                <li><a href="#" className="hover:text-primary">Kebijakan Privasi</a></li>
                <li><a href="#" className="hover:text-primary">Syarat & Ketentuan</a></li>
                <li><a href="#" className="hover:text-primary">FAQ</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-10 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-text-muted">
              © 2026 SobatAman. All rights reserved.
            </p>
            <p className="text-sm text-text-muted">
              Dibuat dengan ❤️ untuk Indonesia Inklusif.
            </p>
          </div>
        </div>
      </footer>
      <LiaAIChatbot />
    </div>
  )
}

import React, { useState, useEffect } from 'react'
import { 
  Search, 
  Filter, 
  ChevronDown, 
  X, 
  SlidersHorizontal, 
  Star, 
  MapPin,
  CalendarCheck,
  TrendingUp,
  LayoutGrid
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { Badge } from '../../components/ui/Badge'
import { HelperCard, HelperCardSkeleton } from '../../components/HelperCard'
import type { Helper } from '../../components/HelperCard'
import { cn } from '../../lib/utils'

const MOCK_HELPERS: Helper[] = [
  {
    id: '1',
    name: 'Ahmad Fauzi',
    city: 'Malang',
    avatar: 'https://i.pravatar.cc/150?u=1',
    tier: 'CERTIFIED',
    specializations: ['Tunadaksa', 'Lansia', 'Fisioterapi'],
    rating: 4.9,
    reviews: 124,
    price: 65000,
    isAvailable: true,
    distance: 1.2
  },
  {
    id: '2',
    name: 'Siti Rahma',
    city: 'Malang',
    avatar: 'https://i.pravatar.cc/150?u=2',
    tier: 'BASIC',
    specializations: ['Autisme', 'ADHD', 'Kognitif'],
    rating: 4.7,
    reviews: 45,
    price: 45000,
    isAvailable: true,
    distance: 2.5
  },
  {
    id: '3',
    name: 'Budi Hartono',
    city: 'Batu',
    avatar: 'https://i.pravatar.cc/150?u=3',
    tier: 'CERTIFIED',
    specializations: ['Tunanetra', 'Mobilitas', 'Braille'],
    rating: 4.8,
    reviews: 89,
    price: 75000,
    isAvailable: false,
    availableAt: 'besok, 09:00',
    distance: 4.8
  },
  {
    id: '4',
    name: 'Dewi Lestari',
    city: 'Malang',
    avatar: 'https://i.pravatar.cc/150?u=4',
    tier: 'BASIC',
    specializations: ['Tunarungu', 'Bahasa Isyarat'],
    rating: 4.6,
    reviews: 28,
    price: 40000,
    isAvailable: true,
    distance: 0.8
  },
  {
    id: '5',
    name: 'Rizky Pratama',
    city: 'Malang',
    avatar: 'https://i.pravatar.cc/150?u=5',
    tier: 'CERTIFIED',
    specializations: ['Down Syndrome', 'Terapi Wicara'],
    rating: 5.0,
    reviews: 12,
    price: 85000,
    isAvailable: true,
    distance: 3.1
  },
  {
    id: '6',
    name: 'Indah Permata',
    city: 'Malang',
    avatar: 'https://i.pravatar.cc/150?u=6',
    tier: 'BASIC',
    specializations: ['Stroke', 'Pendampingan RS'],
    rating: 4.5,
    reviews: 34,
    price: 50000,
    isAvailable: false,
    availableAt: 'hari ini, 17:00',
    distance: 1.9
  }
]

const FilterSection = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <div className="py-6 border-b border-border last:border-0">
    <h4 className="text-sm font-bold text-text-primary mb-4 uppercase tracking-wider">{title}</h4>
    <div className="space-y-3">
      {children}
    </div>
  </div>
)

export default function HelperListPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => setIsLoading(false), 1200)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section - Provides contrast for transparent navbar */}
      <section className="relative bg-[#0F172A] pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[120px] translate-y-1/2"></div>
        
        <div className="container-custom relative z-10 px-6 lg:px-12 text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <Badge variant="outline" className="bg-white/10 border-white/20 text-white backdrop-blur-md px-4 py-1.5 text-xs font-black uppercase tracking-widest">
              Direktori Helper SobatAman
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold text-white tracking-tight">
              Temukan Partner <span className="text-primary-light">Pendamping Terbaik</span>
            </h1>
            <p className="text-lg text-white/60 max-w-2xl mx-auto font-medium">
              Helper profesional kami siap mendampingi perjalanan kemandirian dan kebahagiaan anggota keluarga Anda dengan penuh kasih.
            </p>
          </motion.div>

          {/* Integrated Search Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-3xl mx-auto"
          >
            <div className="bg-white/10 backdrop-blur-xl p-2 rounded-2xl border border-white/20 shadow-2xl">
              <div className="flex flex-col md:flex-row gap-2">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={20} />
                  <input 
                    type="text"
                    placeholder="Cari berdasarkan nama, keahlian, atau lokasi..."
                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:bg-white/10 focus:border-primary-light outline-none transition-all"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button className="md:w-32 h-auto py-4 rounded-xl shadow-lg shadow-primary/30 font-bold">
                  Cari
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container-custom px-6 lg:px-12 py-12 flex flex-col lg:flex-row gap-10">
        {/* Sidebar Filter (Desktop) */}
        <aside className="hidden lg:block w-[300px] shrink-0 space-y-6">
          <div className="sticky top-28 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-display font-bold flex items-center gap-3">
                <SlidersHorizontal size={22} className="text-primary" /> Filter Pencarian
              </h3>
              <button className="text-xs font-black text-primary uppercase tracking-widest hover:underline">Reset</button>
            </div>

            <div className="bg-white border border-border rounded-3xl p-8 shadow-xl shadow-gray-100/50 space-y-2">
              <FilterSection title="Spesialisasi">
                {['Semua', 'Tunanetra', 'Tunarungu', 'Tunadaksa', 'ADHD', 'Kognitif', 'Lansia'].map(item => (
                  <label key={item} className="flex items-center gap-3 cursor-pointer group py-0.5">
                    <input type="checkbox" className="w-5 h-5 rounded-lg border-border text-primary focus:ring-primary transition-all cursor-pointer" defaultChecked={item === 'Semua'} />
                    <span className="text-sm font-bold text-text-secondary group-hover:text-text-primary transition-colors">{item}</span>
                  </label>
                ))}
              </FilterSection>

              <FilterSection title="Tier Helper">
                {['Semua', 'Basic Helper', 'Certified Helper'].map(item => (
                  <label key={item} className="flex items-center gap-3 cursor-pointer group py-0.5">
                    <input type="radio" name="tier" className="w-5 h-5 border-border text-primary focus:ring-primary transition-all cursor-pointer" defaultChecked={item === 'Semua'} />
                    <span className="text-sm font-bold text-text-secondary group-hover:text-text-primary transition-colors">{item}</span>
                  </label>
                ))}
              </FilterSection>

              <FilterSection title="Rating Minimum">
                {[5, 4, 3].map(stars => (
                  <label key={stars} className="flex items-center gap-3 cursor-pointer group py-0.5">
                    <input type="radio" name="rating" className="w-5 h-5 border-border text-primary focus:ring-primary transition-all cursor-pointer" />
                    <div className="flex items-center gap-1.5">
                      <div className="flex text-accent">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} size={14} fill={i < stars ? "currentColor" : "none"} className={i < stars ? "" : "text-gray-200"} />
                        ))}
                      </div>
                      <span className="text-xs font-black text-text-secondary"> {stars}.0+</span>
                    </div>
                  </label>
                ))}
              </FilterSection>

              <div className="pt-6">
                <Button className="w-full rounded-2xl h-12 font-bold shadow-lg shadow-primary/20">Terapkan Filter</Button>
              </div>
            </div>
            
            {/* Promo Card */}
            <div className="bg-primary rounded-3xl p-6 text-white overflow-hidden relative group cursor-pointer shadow-xl shadow-primary/20 transition-transform hover:-translate-y-1">
              <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-2 opacity-80">PROMO MEI</p>
              <h4 className="font-bold text-lg leading-tight mb-4">Diskon 20% untuk Booking Pertama!</h4>
              <button className="bg-white text-primary text-xs font-bold px-4 py-2 rounded-xl">Gunakan Sekarang</button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 space-y-8">
          {/* Results Summary */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-2xl font-display font-extrabold text-text-primary tracking-tight">
                {isLoading ? "Mencari helper..." : `${MOCK_HELPERS.length} Helper Terbaik`}
              </h2>
              {!isLoading && (
                <div className="flex items-center gap-2">
                  <div className="h-5 w-px bg-border mx-1" />
                  <Badge variant="primary" className="bg-primary-light/30 text-primary border-primary/10 rounded-lg px-3 py-1 text-xs font-bold gap-2">
                    Malang <X size={14} className="cursor-pointer hover:scale-110 transition-transform" />
                  </Badge>
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex bg-gray-100 p-1 rounded-xl">
                <button className="p-2 rounded-lg bg-white shadow-sm text-primary"><LayoutGrid size={18} /></button>
                <button className="p-2 rounded-lg text-text-muted hover:text-text-primary"><TrendingUp size={18} /></button>
              </div>
              <Button variant="outline" className="rounded-xl border-border px-4 py-2 font-bold flex gap-2">
                Terbaru <ChevronDown size={18} />
              </Button>
              <Button 
                variant="outline" 
                className="lg:hidden shrink-0 rounded-xl border-border"
                onClick={() => setIsFilterOpen(true)}
              >
                <Filter size={20} />
              </Button>
            </div>
          </div>


        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, i) => <HelperCardSkeleton key={i} />)
          ) : (
            MOCK_HELPERS.map((helper) => (
              <HelperCard 
                key={helper.id} 
                helper={helper} 
                onBooking={(id) => console.log('Booking helper:', id)}
              />
            ))
          )}
        </div>

        {/* Empty State Mockup */}
        {!isLoading && MOCK_HELPERS.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 space-y-4 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center text-text-muted mb-4">
              <Search size={48} />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-bold">Tidak ada helper yang cocok</h3>
              <p className="text-text-secondary max-w-xs">Coba hapus beberapa filter atau gunakan kata kunci pencarian yang berbeda.</p>
            </div>
            <Button variant="outline" className="mt-4">Reset Filter</Button>
          </div>
        )}

        {/* Pagination Placeholder */}
        {!isLoading && MOCK_HELPERS.length > 0 && (
          <div className="flex justify-center pt-8 pb-12">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>Sebelumnya</Button>
              <div className="flex gap-1">
                <button className="w-8 h-8 rounded bg-primary text-white font-bold text-sm">1</button>
                <button className="w-8 h-8 rounded hover:bg-gray-100 text-text-primary font-bold text-sm">2</button>
                <button className="w-8 h-8 rounded hover:bg-gray-100 text-text-primary font-bold text-sm">3</button>
              </div>
              <Button variant="outline" size="sm">Selanjutnya</Button>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Filter Drawer Overlay */}
      <AnimatePresence>
        {isFilterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFilterOpen(false)}
              className="fixed inset-0 z-[60] bg-black/50 lg:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 z-[70] w-full max-w-sm bg-surface p-6 shadow-2xl lg:hidden flex flex-col"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-display font-bold">Filter Pencarian</h3>
                <button onClick={() => setIsFilterOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
                  <X size={24} />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto pr-2 divide-y divide-border/50">
                {/* Same filter content as desktop */}
                <FilterSection title="Spesialisasi">
                  {['Semua', 'Tunanetra', 'Tunarungu', 'Tunadaksa', 'ADHD', 'Kognitif'].map(item => (
                    <label key={item} className="flex items-center gap-3 cursor-pointer py-1">
                      <input type="checkbox" className="w-5 h-5 rounded border-border text-primary focus:ring-primary" defaultChecked={item === 'Semua'} />
                      <span className="text-base text-text-secondary">{item}</span>
                    </label>
                  ))}
                </FilterSection>
                {/* ... other sections abbreviated for mobile ... */}
              </div>

              <div className="pt-6 grid grid-cols-2 gap-4">
                <Button variant="outline" onClick={() => setIsFilterOpen(false)}>Reset</Button>
                <Button onClick={() => setIsFilterOpen(false)}>Terapkan</Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
    </div>
  )
}

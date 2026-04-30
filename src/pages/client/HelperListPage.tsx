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
    <div className="flex flex-col lg:flex-row gap-8 min-h-screen">
      {/* Sidebar Filter (Desktop) */}
      <aside className="hidden lg:block w-[260px] shrink-0 space-y-6">
        <div className="sticky top-24">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-display font-bold flex items-center gap-2">
              <SlidersHorizontal size={20} className="text-primary" /> Filter Pencarian
            </h3>
            <button className="text-xs font-bold text-primary hover:underline">Reset</button>
          </div>

          <div className="bg-surface border border-border rounded-card px-6 divide-y divide-border/50">
            <FilterSection title="Spesialisasi">
              {['Semua', 'Tunanetra', 'Tunarungu', 'Tunadaksa', 'ADHD', 'Kognitif', 'Lansia'].map(item => (
                <label key={item} className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" className="w-4 h-4 rounded border-border text-primary focus:ring-primary" defaultChecked={item === 'Semua'} />
                  <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors">{item}</span>
                </label>
              ))}
            </FilterSection>

            <FilterSection title="Tier Helper">
              {['Semua', 'Basic Helper', 'Certified Helper'].map(item => (
                <label key={item} className="flex items-center gap-3 cursor-pointer group">
                  <input type="radio" name="tier" className="w-4 h-4 border-border text-primary focus:ring-primary" defaultChecked={item === 'Semua'} />
                  <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors">{item}</span>
                </label>
              ))}
            </FilterSection>

            <FilterSection title="Rating Minimum">
              {[5, 4, 3].map(stars => (
                <label key={stars} className="flex items-center gap-3 cursor-pointer group">
                  <input type="radio" name="rating" className="w-4 h-4 border-border text-primary focus:ring-primary" />
                  <div className="flex items-center gap-1">
                    <div className="flex text-accent">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={14} fill={i < stars ? "currentColor" : "none"} className={i < stars ? "" : "text-gray-200"} />
                      ))}
                    </div>
                    <span className="text-xs font-bold text-text-secondary"> ke atas</span>
                  </div>
                </label>
              ))}
            </FilterSection>

            <FilterSection title="Ketersediaan">
              <label className="flex items-center justify-between cursor-pointer group">
                <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors">Tersedia sekarang</span>
                <input type="checkbox" className="w-4 h-4 rounded border-border text-primary focus:ring-primary" />
              </label>
              <label className="flex items-center justify-between cursor-pointer group">
                <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors">Bisa recurring</span>
                <input type="checkbox" className="w-4 h-4 rounded border-border text-primary focus:ring-primary" />
              </label>
            </FilterSection>

            <FilterSection title="Jarak">
              {['< 2 km', '< 5 km', '< 10 km', 'Semua'].map(item => (
                <label key={item} className="flex items-center gap-3 cursor-pointer group">
                  <input type="radio" name="distance" className="w-4 h-4 border-border text-primary focus:ring-primary" defaultChecked={item === 'Semua'} />
                  <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors">{item}</span>
                </label>
              ))}
            </FilterSection>

            <div className="py-6">
              <Button className="w-full">Terapkan Filter</Button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 space-y-6">
        {/* Search & Sort Bar */}
        <div className="bg-surface p-4 rounded-card border border-border shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={20} />
              <input 
                type="text"
                placeholder="Cari helper berdasarkan nama atau keahlian..."
                className="w-full pl-12 pr-4 py-3 rounded-sm border-1.5 border-border bg-background focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="md:w-48 justify-between gap-2 border-1.5">
                Sort: Terbaru <ChevronDown size={18} />
              </Button>
              <Button 
                variant="outline" 
                className="lg:hidden shrink-0 border-1.5"
                onClick={() => setIsFilterOpen(true)}
              >
                <Filter size={20} />
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <p className="text-sm font-bold text-text-primary">{MOCK_HELPERS.length} helper ditemukan</p>
              <div className="h-4 w-px bg-border mx-1" />
              <div className="flex flex-wrap gap-2">
                <Badge variant="primary" className="gap-1 pr-1.5">
                  Malang <X size={12} className="cursor-pointer" />
                </Badge>
                {searchQuery && (
                  <Badge variant="accent" className="gap-1 pr-1.5">
                    "{searchQuery}" <X size={12} className="cursor-pointer" onClick={() => setSearchQuery('')} />
                  </Badge>
                )}
              </div>
            </div>
            <div className="hidden sm:flex gap-1">
              <button className="p-2 rounded hover:bg-gray-100 text-primary"><LayoutGrid size={18} /></button>
              <button className="p-2 rounded hover:bg-gray-100 text-text-muted"><TrendingUp size={18} /></button>
            </div>
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
  )
}

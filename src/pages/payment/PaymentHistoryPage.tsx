import React, { useState } from 'react'
import { 
  Search, 
  Download, 
  ChevronRight, 
  Filter,
  TrendingUp,
  Calendar,
  Wallet,
  CheckCircle2,
  Clock,
  RotateCcw
} from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'
import { Avatar } from '../../components/ui/Avatar'
import { Card, CardContent } from '../../components/ui/Card'
import { cn } from '../../lib/utils'

export default function PaymentHistoryPage() {
  const [activeFilter, setActiveFilter] = useState('Semua')

  const transactions = [
    { id: '1', helper: 'Ahmad Fauzi', date: '29 Apr 2026', amount: 266000, status: 'BERHASIL', method: 'AmanPay' },
    { id: '2', helper: 'Siti Rahma', date: '25 Apr 2026', amount: 180000, status: 'BERHASIL', method: 'GoPay' },
    { id: '3', helper: 'Budi Hartono', date: '20 Apr 2026', amount: 320000, status: 'REFUNDED', method: 'AmanPay' },
    { id: '4', helper: 'Dewi Lestari', date: '18 Apr 2026', amount: 150000, status: 'PENDING', method: 'Transfer' },
  ]

  return (
    <div className="container-custom px-6 lg:px-12 pt-24 md:pt-36 space-y-10 pb-12">
      <div className="space-y-2">
        <h1 className="text-4xl font-display font-bold text-text-primary tracking-tight">Riwayat Transaksi</h1>
        <p className="text-text-secondary text-lg">Pantau seluruh pengeluaran pendampingan Anda dengan transparan.</p>
      </div>

      {/* SUMMARY STATS */}
      <div className="grid sm:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-primary to-primary-dark text-white border-none shadow-xl shadow-primary/20 relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all"></div>
          <CardContent className="p-8 space-y-3 relative z-10">
            <p className="text-xs opacity-80 font-bold uppercase tracking-[0.2em]">Total Bulan Ini</p>
            <p className="text-4xl font-mono font-bold tracking-tighter">Rp 446.000</p>
            <div className="flex items-center gap-1.5 text-xs text-white/90 bg-white/10 w-fit px-2 py-1 rounded-sm font-bold">
              <TrendingUp size={14} /> 12% dari bulan lalu
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/60 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-8 space-y-3">
            <p className="text-xs text-text-muted font-bold uppercase tracking-[0.2em]">Jumlah Sesi</p>
            <p className="text-4xl font-mono font-bold text-text-primary tracking-tighter">8 Sesi</p>
            <div className="flex items-center gap-2 text-xs text-text-secondary">
              <Calendar size={14} className="text-primary" /> Terakhir: 2 hari yang lalu
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/60 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-8 space-y-3">
            <p className="text-xs text-text-muted font-bold uppercase tracking-[0.2em]">Saldo AmanPay</p>
            <p className="text-4xl font-mono font-bold text-text-primary tracking-tighter">Rp 742.500</p>
            <Button variant="link" size="sm" className="h-auto p-0 text-primary font-bold hover:no-underline flex items-center gap-1 group">
              Top Up Sekarang <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* FILTER BAR */}
      <div className="flex flex-col sm:flex-row gap-6 items-center justify-between bg-surface p-4 rounded-xl border border-border shadow-sm">
        <div className="flex gap-2 overflow-x-auto pb-1 w-full sm:w-auto scrollbar-hide">
          {['Semua', 'Berhasil', 'Menunggu', 'Refunded'].map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={cn(
                "px-6 py-2.5 rounded-pill text-sm font-bold transition-all whitespace-nowrap",
                activeFilter === f ? "bg-primary text-white shadow-md shadow-primary/20" : "bg-white border border-border text-text-secondary hover:bg-gray-50"
              )}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
            <input 
              type="text" 
              placeholder="Cari nama helper atau transaksi..."
              className="w-full pl-11 pr-5 py-3 rounded-md border border-border bg-background text-sm outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all"
            />
          </div>
          <button className="p-3 border border-border rounded-md bg-white hover:bg-gray-50 transition-all text-text-secondary shadow-sm">
            <Filter size={22} />
          </button>
        </div>
      </div>

      {/* LIST TRANSAKSI */}
      <div className="space-y-6">
        {transactions.map((tx) => (
          <motion.div
            key={tx.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4 }}
            className="group"
          >
            <Card className="border-border/60 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 overflow-hidden">
              <CardContent className="p-0">
                <div className="flex flex-col sm:flex-row items-stretch">
                  <div className="flex items-center gap-6 p-6 flex-1 bg-white">
                    <Avatar fallback={tx.helper[0]} size="lg" className="h-16 w-16 bg-primary-light text-primary font-bold shadow-inner" />
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center gap-3">
                        <p className="font-bold text-lg text-text-primary truncate">{tx.helper}</p>
                        <Badge 
                          variant={tx.status === 'BERHASIL' ? 'success' : (tx.status === 'PENDING' ? 'warning' : 'secondary')}
                          className="px-3 py-0.5 rounded-pill text-[10px] font-bold"
                        >
                          {tx.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-text-secondary">
                        <span className="flex items-center gap-1.5"><Calendar size={14} className="text-primary/60" /> {tx.date}</span>
                        <span className="flex items-center gap-1.5"><Wallet size={14} className="text-primary/60" /> {tx.method}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between sm:justify-end gap-10 p-6 bg-gray-50/50 sm:min-w-[300px] border-t sm:border-t-0 sm:border-l border-border">
                    <div className="text-left sm:text-right space-y-1">
                      <p className={cn(
                        "text-2xl font-mono font-bold tracking-tighter",
                        tx.status === 'REFUNDED' ? "text-text-muted/50 line-through" : "text-text-primary"
                      )}>
                        Rp {tx.amount.toLocaleString('id-ID')}
                      </p>
                      {tx.status === 'REFUNDED' && (
                        <div className="flex items-center gap-1 text-success font-bold text-[10px] uppercase tracking-wider justify-end">
                          <RotateCcw size={12} /> Dana Dikembalikan
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button className="p-3 text-text-secondary hover:bg-white hover:text-primary hover:shadow-sm rounded-md transition-all" title="Download Invoice">
                        <Download size={20} />
                      </button>
                      <button className="p-3 bg-primary/5 text-primary hover:bg-primary hover:text-white rounded-md transition-all">
                        <ChevronRight size={22} />
                      </button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center pt-4">
        <Button variant="ghost" className="text-xs font-bold text-primary">Tampilkan Lebih Banyak</Button>
      </div>
    </div>
  )
}

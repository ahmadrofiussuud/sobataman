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
    <div className="space-y-8">
      <div className="space-y-1">
        <h1 className="text-3xl font-display font-bold text-text-primary">Riwayat Transaksi</h1>
        <p className="text-text-secondary">Pantau seluruh pengeluaran pendampingan Anda.</p>
      </div>

      {/* SUMMARY STATS */}
      <div className="grid sm:grid-cols-3 gap-6">
        <Card className="bg-primary text-white border-none shadow-lg">
          <CardContent className="p-6 space-y-2">
            <p className="text-xs opacity-70 font-bold uppercase tracking-widest">Total Bulan Ini</p>
            <p className="text-3xl font-mono font-bold">Rp 446.000</p>
            <div className="flex items-center gap-1.5 text-[10px] text-primary-light font-bold">
              <TrendingUp size={12} /> 12% dari bulan lalu
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-6 space-y-2">
            <p className="text-xs text-text-muted font-bold uppercase tracking-widest">Jumlah Sesi</p>
            <p className="text-3xl font-mono font-bold text-text-primary">8 Sesi</p>
            <p className="text-[10px] text-text-secondary">Terakhir: 2 hari yang lalu</p>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-6 space-y-2">
            <p className="text-xs text-text-muted font-bold uppercase tracking-widest">Saldo AmanPay</p>
            <p className="text-3xl font-mono font-bold text-text-primary">Rp 742.500</p>
            <Button variant="ghost" size="sm" className="h-6 text-[10px] p-0 text-primary hover:bg-transparent">Top Up Sekarang</Button>
          </CardContent>
        </Card>
      </div>

      {/* FILTER BAR */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex gap-2 overflow-x-auto pb-1 w-full sm:w-auto scrollbar-hide">
          {['Semua', 'Berhasil', 'Menunggu', 'Refunded'].map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={cn(
                "px-4 py-2 rounded-pill text-xs font-bold transition-all whitespace-nowrap",
                activeFilter === f ? "bg-primary text-white" : "bg-white border border-border text-text-secondary hover:bg-gray-50"
              )}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
            <input 
              type="text" 
              placeholder="Cari transaksi..."
              className="w-full pl-9 pr-4 py-2 rounded-sm border border-border bg-white text-xs outline-none focus:border-primary"
            />
          </div>
          <button className="p-2 border border-border rounded-sm hover:bg-gray-50 transition-colors">
            <Filter size={20} className="text-text-secondary" />
          </button>
        </div>
      </div>

      {/* LIST TRANSAKSI */}
      <div className="space-y-4">
        {transactions.map((tx) => (
          <motion.div
            key={tx.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Card className="border-border/50 hover:shadow-md transition-all">
              <CardContent className="p-4 lg:p-6">
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <div className="flex items-center gap-4 flex-1 w-full">
                    <Avatar fallback={tx.helper[0]} size="lg" className="bg-primary-light text-primary font-bold" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-bold text-sm truncate">{tx.helper}</p>
                        <Badge 
                          variant={tx.status === 'BERHASIL' ? 'success' : (tx.status === 'PENDING' ? 'warning' : 'secondary')}
                          className="text-[8px] py-0"
                        >
                          {tx.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-text-secondary flex items-center gap-1.5">
                        <Calendar size={12} /> {tx.date} · {tx.method}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between sm:justify-end gap-8 w-full sm:w-auto border-t sm:border-t-0 pt-4 sm:pt-0">
                    <div className="text-left sm:text-right">
                      <p className={cn(
                        "text-lg font-mono font-bold",
                        tx.status === 'REFUNDED' ? "text-text-muted line-through" : "text-text-primary"
                      )}>
                        Rp {tx.amount.toLocaleString('id-ID')}
                      </p>
                      {tx.status === 'REFUNDED' && <p className="text-[10px] text-success font-bold">Dana Dikembalikan</p>}
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 text-text-secondary hover:bg-gray-100 rounded-sm transition-colors" title="Download Invoice">
                        <Download size={18} />
                      </button>
                      <button className="p-2 text-primary hover:bg-primary-light rounded-sm transition-colors">
                        <ChevronRight size={18} />
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

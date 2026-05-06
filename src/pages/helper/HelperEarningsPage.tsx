import React from 'react'
import { 
  Wallet, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Calendar,
  Download,
  Filter,
  CheckCircle2,
  Clock,
  ChevronRight
} from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '../../components/ui/Button'
import { Card, CardContent } from '../../components/ui/Card'
import { cn } from '../../lib/utils'

const MOCK_TRANSACTIONS = [
  { id: '1', client: 'Bambang Wijaya', amount: 195000, date: 'Hari Ini, 16:30', status: 'COMPLETED', type: 'INCOME' },
  { id: '2', client: 'Withdrawal to BCA', amount: -1450000, date: '4 Mei 2024', status: 'COMPLETED', type: 'WITHDRAWAL' },
  { id: '3', client: 'Siti Aminah', amount: 150000, date: '3 Mei 2024', status: 'COMPLETED', type: 'INCOME' },
  { id: '4', client: 'Rudi Hermawan', amount: 225000, date: '2 Mei 2024', status: 'COMPLETED', type: 'INCOME' },
  { id: '5', client: 'Withdrawal to OVO', amount: -500000, date: '30 Apr 2024', status: 'COMPLETED', type: 'WITHDRAWAL' },
]

export default function HelperEarningsPage() {
  return (
    <div className="space-y-10 pb-12">
      {/* Header & Balance */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-8">
        <div className="space-y-1">
          <h1 className="text-3xl font-display font-bold text-text-primary">Dompet Saya</h1>
          <p className="text-text-secondary">Kelola pendapatan dan penarikan dana Anda.</p>
        </div>
        
        <div className="bg-primary p-1 rounded-[2.5rem] flex items-center shadow-2xl shadow-primary/30 w-full md:w-auto">
          <div className="px-8 py-4 text-white">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-70 mb-1">Total Saldo</p>
            <p className="text-3xl font-display font-extrabold tracking-tight">Rp 950.000</p>
          </div>
          <button className="bg-white text-primary h-16 px-8 rounded-[2rem] font-black uppercase text-xs tracking-widest hover:scale-95 transition-transform">
            Tarik Dana
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Pendapatan Bulan Ini', value: 'Rp 4.250.000', icon: TrendingUp, color: 'text-success', bg: 'bg-success/5' },
          { label: 'Sesi Selesai', value: '28 Sesi', icon: CheckCircle2, color: 'text-primary', bg: 'bg-primary/5' },
          { label: 'Rata-rata Pendapatan', value: 'Rp 152rb/hari', icon: Calendar, color: 'text-accent', bg: 'bg-accent/5' },
        ].map((stat, i) => (
          <Card key={i} className="border-border/50">
            <CardContent className="p-6 flex items-center gap-4">
              <div className={cn("p-4 rounded-2xl", stat.bg, stat.color)}>
                <stat.icon size={24} />
              </div>
              <div>
                <p className="text-xs font-bold text-text-muted uppercase tracking-wider mb-1">{stat.label}</p>
                <p className="text-xl font-display font-extrabold text-text-primary">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Earnings Chart Placeholder */}
        <Card className="lg:col-span-2 border-border/50">
          <CardContent className="p-8 space-y-8">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-display font-bold">Ringkasan Mingguan</h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="rounded-xl h-9 text-[10px] font-black uppercase">Minggu Ini</Button>
                <Button variant="outline" size="sm" className="rounded-xl h-9 text-[10px] font-black uppercase">Mei 2024</Button>
              </div>
            </div>
            
            <div className="flex items-end gap-3 h-64 px-4 pt-10">
              {[35, 50, 25, 80, 45, 95, 60, 40, 75, 55].map((h, i) => (
                <div key={i} className="flex-1 bg-gray-50 rounded-t-xl relative group cursor-pointer">
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    className="absolute bottom-0 left-0 right-0 bg-primary/20 group-hover:bg-primary transition-all duration-300 rounded-t-xl"
                  />
                  {/* Tooltip on hover */}
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-text-primary text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                    Rp 250.000
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between text-[10px] font-bold text-text-muted uppercase tracking-widest px-4">
              <span>Sen</span><span>Sel</span><span>Rab</span><span>Kam</span><span>Jum</span><span>Sab</span><span>Min</span>
            </div>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-display font-bold">Riwayat</h3>
            <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
              <Download size={20} className="text-text-muted" />
            </button>
          </div>
          
          <div className="space-y-3">
            {MOCK_TRANSACTIONS.map((tx) => (
              <div key={tx.id} className="p-4 bg-white rounded-2xl border border-border flex items-center justify-between hover:border-primary/20 transition-colors group cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "p-2.5 rounded-xl",
                    tx.type === 'INCOME' ? "bg-success/10 text-success" : "bg-error/10 text-error"
                  )}>
                    {tx.type === 'INCOME' ? <ArrowDownLeft size={18} /> : <ArrowUpRight size={18} />}
                  </div>
                  <div>
                    <p className="font-bold text-sm text-text-primary group-hover:text-primary transition-colors">{tx.client}</p>
                    <p className="text-[10px] text-text-muted font-medium">{tx.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={cn(
                    "font-display font-bold",
                    tx.type === 'INCOME' ? "text-text-primary" : "text-error"
                  )}>
                    {tx.type === 'INCOME' ? '+' : ''}Rp {Math.abs(tx.amount).toLocaleString('id-ID')}
                  </p>
                  <p className="text-[10px] text-success font-black tracking-widest uppercase">Berhasil</p>
                </div>
              </div>
            ))}
          </div>
          
          <Button variant="outline" className="w-full rounded-2xl h-12 font-bold gap-2">
            Lihat Semua Riwayat <ChevronRight size={18} />
          </Button>
        </div>
      </div>
    </div>
  )
}

import React, { useState } from 'react'
import { 
  Calendar, 
  Clock, 
  MapPin, 
  ChevronRight, 
  Filter, 
  Search,
  CheckCircle2,
  AlertCircle
} from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'
import { Card, CardContent } from '../../components/ui/Card'
import { Avatar } from '../../components/ui/Avatar'
import { cn } from '../../lib/utils'

const MOCK_SCHEDULE = [
  {
    id: '1',
    clientName: 'Bambang Wijaya',
    type: 'Tunadaksa',
    date: 'Hari Ini',
    time: '13:00 - 16:00',
    location: 'Jl. Soekarno Hatta No. 12, Malang',
    status: 'UPCOMING',
    avatar: 'https://i.pravatar.cc/150?u=10'
  },
  {
    id: '2',
    clientName: 'Siti Aminah',
    type: 'Lansia',
    date: 'Besok',
    time: '09:00 - 12:00',
    location: 'Jl. Borobudur No. 45, Malang',
    status: 'CONFIRMED',
    avatar: 'https://i.pravatar.cc/150?u=11'
  },
  {
    id: '3',
    clientName: 'Rudi Hermawan',
    type: 'Autisme',
    date: '8 Mei 2024',
    time: '14:00 - 17:00',
    location: 'Perum Permata Jingga Blok A, Malang',
    status: 'CONFIRMED',
    avatar: 'https://i.pravatar.cc/150?u=12'
  },
  {
    id: '4',
    clientName: 'Ibu Ratna',
    type: 'Stroke Recovery',
    date: 'Kemarin',
    time: '08:00 - 11:00',
    location: 'Jl. Ijen No. 100, Malang',
    status: 'FINISHED',
    avatar: 'https://i.pravatar.cc/150?u=13'
  }
]

export default function HelperSchedulePage() {
  const [activeTab, setActiveTab] = useState('upcoming')

  const filteredSchedule = MOCK_SCHEDULE.filter(item => {
    if (activeTab === 'upcoming') return item.status !== 'FINISHED'
    if (activeTab === 'finished') return item.status === 'FINISHED'
    return true
  })

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-text-primary">Jadwal Pendampingan</h1>
          <p className="text-text-secondary">Kelola waktu dan sesi pendampingan Anda dengan efisien.</p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <Button variant="outline" className="flex-1 md:flex-none gap-2 rounded-xl">
            <Filter size={18} /> Filter
          </Button>
          <Button className="flex-1 md:flex-none gap-2 rounded-xl shadow-lg shadow-primary/20">
            <Calendar size={18} /> Atur Libur
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 p-1 bg-gray-100 rounded-2xl w-full max-w-md">
        {['upcoming', 'finished', 'cancelled'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all",
              activeTab === tab 
                ? "bg-white text-primary shadow-sm" 
                : "text-text-secondary hover:text-text-primary"
            )}
          >
            {tab === 'upcoming' ? 'Mendatang' : tab === 'finished' ? 'Selesai' : 'Dibatalkan'}
          </button>
        ))}
      </div>

      {/* Schedule List */}
      <div className="grid gap-6">
        {filteredSchedule.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="border-border/50 hover:shadow-xl hover:shadow-gray-100 transition-all group">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                  {/* Left: Date/Time Info */}
                  <div className={cn(
                    "w-full md:w-48 p-6 flex flex-col justify-center items-center text-center border-b md:border-b-0 md:border-r border-border/50",
                    item.status === 'UPCOMING' ? "bg-primary-light/10" : "bg-gray-50/50"
                  )}>
                    <p className="text-sm font-black text-primary uppercase tracking-tighter mb-1">{item.date}</p>
                    <p className="text-xl font-display font-extrabold text-text-primary">{item.time.split(' - ')[0]}</p>
                    <p className="text-xs text-text-muted font-bold">sampai {item.time.split(' - ')[1]}</p>
                  </div>

                  {/* Middle: Content */}
                  <div className="flex-1 p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <Avatar src={item.avatar} fallback={item.clientName[0]} size="lg" className="border-2 border-white shadow-md" />
                        {item.status === 'UPCOMING' && (
                          <div className="absolute -top-1 -right-1 h-5 w-5 bg-primary text-white rounded-full flex items-center justify-center border-2 border-white">
                            <Clock size={10} />
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-lg text-text-primary">{item.clientName}</h3>
                          <Badge variant="outline" className="text-[9px] font-black uppercase border-primary/20 text-primary px-1.5 py-0">
                            {item.type}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-text-secondary">
                          <span className="flex items-center gap-1.5 font-medium">
                            <MapPin size={14} className="text-text-muted" /> {item.location.split(',')[0]}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex gap-2 w-full md:w-auto">
                      {item.status === 'UPCOMING' ? (
                        <>
                          <Button variant="outline" className="flex-1 md:flex-none rounded-xl font-bold h-11">
                            Detail
                          </Button>
                          <Button className="flex-1 md:flex-none rounded-xl font-bold h-11 px-8 shadow-lg shadow-primary/20">
                            Mulai Sesi
                          </Button>
                        </>
                      ) : item.status === 'FINISHED' ? (
                        <div className="flex items-center gap-2 text-success font-bold text-sm bg-success/5 px-4 py-2 rounded-xl border border-success/10">
                          <CheckCircle2 size={16} /> Selesai
                        </div>
                      ) : (
                        <Button variant="outline" className="w-full md:w-auto rounded-xl font-bold h-11 px-8">
                          Lihat Detail
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
        
        {filteredSchedule.length === 0 && (
          <div className="py-20 text-center space-y-4">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-text-muted">
              <Calendar size={40} />
            </div>
            <div>
              <p className="text-lg font-bold text-text-primary">Tidak ada jadwal</p>
              <p className="text-text-secondary">Anda belum memiliki jadwal untuk kategori ini.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

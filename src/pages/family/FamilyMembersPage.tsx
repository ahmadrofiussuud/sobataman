import React from 'react'
import { motion } from 'framer-motion'
import { 
  Users, 
  Plus, 
  Heart, 
  Activity, 
  Calendar, 
  ChevronRight,
  MoreVertical,
  ShieldCheck,
  Brain
} from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { Card, CardContent } from '../../components/ui/Card'
import { Avatar } from '../../components/ui/Avatar'
import { Badge } from '../../components/ui/Badge'

export default function FamilyMembersPage() {
  const members = [
    {
      id: '1',
      name: 'Bambang Wijaya',
      role: 'Anak',
      age: '14 Tahun',
      condition: 'Autisme & ADHD',
      sessions: '12 Sesi/Bulan',
      status: 'Active Session',
      image: 'https://i.pravatar.cc/150?u=bambang'
    },
    {
      id: '2',
      name: 'Oma Kartika',
      role: 'Ibu',
      age: '72 Tahun',
      condition: 'Mobilitas Terbatas',
      sessions: '8 Sesi/Bulan',
      status: 'Idle',
      image: 'https://i.pravatar.cc/150?u=oma'
    }
  ]

  return (
    <div className="container-custom px-4 lg:px-12 pt-28 md:pt-36 pb-20 space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-display font-bold text-text-primary">Anggota Keluarga</h1>
          <p className="text-text-secondary text-sm">Kelola profil dan kebutuhan pendampingan anggota keluarga Anda.</p>
        </div>
        <Button className="rounded-pill px-8 h-12 gap-2 shadow-lg shadow-primary/20">
          <Plus size={20} /> Tambah Anggota
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {members.map((member, i) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="border-border/50 hover:border-primary/20 hover:shadow-xl transition-all duration-300 overflow-hidden group">
              <CardContent className="p-0">
                <div className="p-6 md:p-8 space-y-6">
                  <div className="flex justify-between items-start">
                    <div className="flex gap-4 md:gap-6 items-center">
                      <div className="relative">
                        <Avatar src={member.image} fallback={member.name[0]} size="xl" className="h-20 w-20 md:h-24 md:w-24 border-2 border-primary-light" />
                        {member.status === 'Active Session' && (
                          <div className="absolute -bottom-1 -right-1 h-5 w-5 bg-success rounded-full border-4 border-white animate-pulse" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-xl md:text-2xl font-display font-bold text-text-primary">{member.name}</h3>
                          <Badge variant="secondary" className="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-sm">
                            {member.role}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-text-muted font-bold uppercase tracking-tighter">
                          <span>{member.age}</span>
                          <span>·</span>
                          <span className="text-primary">{member.condition}</span>
                        </div>
                      </div>
                    </div>
                    <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                      <MoreVertical size={20} className="text-text-muted" />
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border/50">
                    <div className="space-y-1 text-center md:text-left">
                      <p className="text-[9px] font-black uppercase tracking-widest text-text-muted">Kesehatan</p>
                      <div className="flex items-center justify-center md:justify-start gap-1.5 text-success">
                        <Activity size={14} />
                        <span className="font-bold text-sm">Stabil</span>
                      </div>
                    </div>
                    <div className="space-y-1 text-center md:text-left">
                      <p className="text-[9px] font-black uppercase tracking-widest text-text-muted">Jadwal</p>
                      <div className="flex items-center justify-center md:justify-start gap-1.5 text-primary">
                        <Calendar size={14} />
                        <span className="font-bold text-sm">Besok</span>
                      </div>
                    </div>
                    <div className="space-y-1 text-center md:text-left">
                      <p className="text-[9px] font-black uppercase tracking-widest text-text-muted">AI Insight</p>
                      <div className="flex items-center justify-center md:justify-start gap-1.5 text-accent">
                        <Brain size={14} />
                        <span className="font-bold text-sm">Positif</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button variant="outline" className="flex-1 rounded-xl font-bold text-xs uppercase tracking-widest h-11 border-primary/20 text-primary hover:bg-primary-light">
                      Detail Profil
                    </Button>
                    <Button className="flex-1 rounded-xl font-bold text-xs uppercase tracking-widest h-11 shadow-md shadow-primary/10">
                      Booking Baru
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}

        {/* ADD MEMBER CARD */}
        <button className="h-full min-h-[250px] rounded-card border-2 border-dashed border-border/60 flex flex-col items-center justify-center gap-4 hover:border-primary/40 hover:bg-primary-light/10 transition-all group">
          <div className="h-16 w-16 rounded-full bg-gray-50 flex items-center justify-center text-text-muted group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all">
            <Plus size={32} />
          </div>
          <div className="text-center">
            <p className="font-display font-bold text-text-primary">Tambah Anggota</p>
            <p className="text-xs text-text-muted">Lengkapi profil kesehatan anggota baru</p>
          </div>
        </button>
      </div>
    </div>
  )
}

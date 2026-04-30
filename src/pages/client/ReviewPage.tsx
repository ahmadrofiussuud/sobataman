import React, { useState } from 'react'
import { 
  Star, 
  Clock, 
  Edit2, 
  CheckCircle2, 
  MessageSquare, 
  Filter, 
  ChevronRight,
  Calendar,
  AlertCircle
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'
import { Avatar } from '../../components/ui/Avatar'
import { Card, CardContent } from '../../components/ui/Card'
import { RatingModal } from '../../components/RatingModal'
import { cn } from '../../lib/utils'

export default function ReviewPage() {
  const [activeTab, setActiveTab] = useState('Semua')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedHelper, setSelectedHelper] = useState({ name: '', avatar: '' })

  const reviews = [
    { id: '1', helper: 'Ahmad Fauzi', avatar: 'https://i.pravatar.cc/150?u=1', date: '29 Apr 2026', rating: 5, text: 'Sangat profesional dan sabar mendampingi Ayah.', status: 'REVIEWED', tags: ['Ramah', 'Profesional'] },
    { id: '2', helper: 'Siti Rahma', avatar: 'https://i.pravatar.cc/150?u=2', date: '25 Apr 2026', rating: 0, text: '', status: 'PENDING', tags: [] },
    { id: '3', helper: 'Budi Hartono', avatar: 'https://i.pravatar.cc/150?u=3', date: '20 Apr 2026', rating: 4, text: 'Tepat waktu dan komunikatif.', status: 'REVIEWED', tags: ['Tepat Waktu'] },
  ]

  const openRating = (name: string, avatar: string) => {
    setSelectedHelper({ name, avatar })
    setIsModalOpen(true)
  }

  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <h1 className="text-3xl font-display font-bold text-text-primary">Ulasan Pendampingan</h1>
        <p className="text-text-secondary">Bagikan pengalamanmu untuk membantu meningkatkan kualitas layanan.</p>
      </div>

      {/* TABS & FILTERS */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between border-b border-border pb-4">
        <div className="flex gap-6">
          {['Semua', 'Belum Direview'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "relative pb-4 text-sm font-bold transition-colors",
                activeTab === tab ? "text-primary" : "text-text-muted hover:text-text-secondary"
              )}
            >
              {tab}
              {activeTab === tab && (
                <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-full" />
              )}
            </button>
          ))}
        </div>
        <button className="p-2 border border-border rounded-sm hover:bg-gray-50 transition-colors">
          <Filter size={18} className="text-text-secondary" />
        </button>
      </div>

      {/* LIST REVIEWS */}
      <div className="space-y-6">
        <AnimatePresence mode="popLayout">
          {reviews
            .filter(r => activeTab === 'Semua' || (activeTab === 'Belum Direview' && r.status === 'PENDING'))
            .map((review) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <Card className={cn(
                  "border-border/50 overflow-hidden",
                  review.status === 'PENDING' && "border-accent/30 bg-accent-light/10"
                )}>
                  <CardContent className="p-6 space-y-6">
                    <div className="flex flex-col sm:flex-row items-center gap-6">
                      <div className="flex items-center gap-4 flex-1">
                        <Avatar src={review.avatar} fallback={review.helper[0]} size="lg" />
                        <div>
                          <p className="font-bold text-lg">{review.helper}</p>
                          <p className="text-xs text-text-secondary flex items-center gap-1.5">
                            <Calendar size={12} /> {review.date}
                          </p>
                        </div>
                      </div>

                      <div className="w-full sm:w-auto">
                        {review.status === 'PENDING' ? (
                          <Button 
                            className="w-full sm:w-auto gap-2 bg-accent hover:bg-accent-hover"
                            onClick={() => openRating(review.helper, review.avatar)}
                          >
                            <Star size={18} /> Beri Ulasan
                          </Button>
                        ) : (
                          <div className="flex flex-col items-end gap-2">
                            <div className="flex text-accent">
                              {[1, 2, 3, 4, 5].map(s => (
                                <Star key={s} size={16} fill={s <= review.rating ? "currentColor" : "none"} />
                              ))}
                            </div>
                            <button className="text-[10px] font-bold text-primary flex items-center gap-1 hover:underline">
                              <Edit2 size={12} /> Edit Ulasan (Tersedia 12j)
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {review.status === 'REVIEWED' && (
                      <div className="space-y-4">
                        <div className="flex flex-wrap gap-2">
                          {review.tags.map(tag => (
                            <Badge key={tag} variant="primary" className="bg-primary-light text-primary border-none text-[10px] uppercase font-bold">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <p className="text-sm text-text-primary leading-relaxed italic">
                          "{review.text}"
                        </p>
                      </div>
                    )}

                    {review.status === 'PENDING' && (
                      <div className="flex items-start gap-3 p-4 bg-accent-light/50 rounded-md border border-accent/20">
                        <AlertCircle size={18} className="text-accent shrink-0 mt-0.5" />
                        <p className="text-xs text-accent leading-relaxed font-medium">
                          Bagikan ulasanmu untuk sesi ini untuk membantu {review.helper} dan pengguna SobatAman lainnya.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
        </AnimatePresence>
      </div>

      <RatingModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        helperName={selectedHelper.name}
        helperAvatar={selectedHelper.avatar}
      />
    </div>
  )
}

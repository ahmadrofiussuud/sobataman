import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Star, 
  X, 
  Mic, 
  CheckCircle2, 
  Volume2, 
  Trash2, 
  Play, 
  Square,
  ChevronRight
} from 'lucide-react'
import { Button } from './ui/Button'
import { Avatar } from './ui/Avatar'
import { cn } from '../lib/utils'

interface RatingModalProps {
  isOpen: boolean
  onClose: () => void
  helperName: string
  helperAvatar?: string
}

const RATING_LABELS = [
  'Mengecewakan',
  'Kurang',
  'Cukup',
  'Bagus',
  'Luar Biasa!'
]

const TAGS_POSITIVE = ['Ramah', 'Tepat Waktu', 'Sangat Membantu', 'Profesional', 'Akan Booking Lagi']
const TAGS_NEGATIVE = ['Terlambat', 'Komunikasi Kurang', 'Tidak Sesuai Ekspektasi', 'Lainnya']

export const RatingModal: React.FC<RatingModalProps> = ({ isOpen, onClose, helperName, helperAvatar }) => {
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [reviewText, setReviewText] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : (prev.length < 3 ? [...prev, tag] : prev)
    )
  }

  const handleSubmit = () => {
    setIsSuccess(true)
    setTimeout(() => {
      onClose()
      setIsSuccess(false)
      setRating(0)
      setSelectedTags([])
      setReviewText('')
    }, 2500)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        className="relative w-full max-w-lg bg-surface rounded-card shadow-2xl overflow-hidden flex flex-col"
      >
        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.div
              key="rating-form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-6 lg:p-8 space-y-8"
            >
              {/* Header */}
              <div className="text-center space-y-4">
                <Avatar src={helperAvatar} fallback={helperName[0]} size="xl" className="mx-auto h-20 w-20 border-4 border-primary-light" />
                <div className="space-y-1">
                  <h3 className="text-xl font-display font-bold">Bagaimana sesi tadi bersama {helperName}?</h3>
                  <p className="text-sm text-text-secondary">Ulasanmu sangat membantu helper meningkatkan kualitas layanan.</p>
                </div>
              </div>

              {/* Stars */}
              <div className="space-y-4">
                <div className="flex justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <motion.button
                      key={s}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onMouseEnter={() => setHoverRating(s)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(s)}
                      className={cn(
                        "transition-colors",
                        (hoverRating || rating) >= s ? "text-accent" : "text-gray-200"
                      )}
                    >
                      <Star size={56} fill={(hoverRating || rating) >= s ? "currentColor" : "none"} strokeWidth={1.5} />
                    </motion.button>
                  ))}
                </div>
                <div className="h-6 flex justify-center">
                  <AnimatePresence mode="wait">
                    {(hoverRating || rating) > 0 && (
                      <motion.p
                        key={hoverRating || rating}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="text-sm font-bold text-accent uppercase tracking-widest"
                      >
                        {RATING_LABELS[(hoverRating || rating) - 1]}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Tags & Comment */}
              <AnimatePresence>
                {rating > 0 && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    className="space-y-6 overflow-hidden pt-2"
                  >
                    <div className="space-y-3">
                      <p className="text-xs font-bold text-text-muted uppercase tracking-widest text-center">Pilih Keunggulan (Maks. 3)</p>
                      <div className="flex flex-wrap justify-center gap-2">
                        {(rating >= 4 ? TAGS_POSITIVE : TAGS_NEGATIVE).map(tag => (
                          <button
                            key={tag}
                            onClick={() => toggleTag(tag)}
                            className={cn(
                              "px-4 py-1.5 rounded-pill text-xs font-semibold border transition-all",
                              selectedTags.includes(tag)
                                ? "bg-primary text-white border-primary shadow-md"
                                : "bg-white text-text-secondary border-border hover:border-primary/50"
                            )}
                          >
                            {tag}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center px-1">
                        <label className="text-xs font-bold text-text-muted uppercase">Catatan Tambahan</label>
                        <span className="text-[10px] text-text-muted">{reviewText.length}/300</span>
                      </div>
                      <div className="relative">
                        <textarea
                          maxLength={300}
                          value={reviewText}
                          onChange={(e) => setReviewText(e.target.value)}
                          placeholder="Ceritakan pengalamanmu (opsional)..."
                          className="w-full p-4 rounded-sm border border-border bg-background focus:ring-1 focus:ring-primary outline-none text-sm h-32 resize-none transition-all"
                        />
                        <button
                          type="button"
                          onMouseDown={() => setIsRecording(true)}
                          onMouseUp={() => {
                            setIsRecording(false)
                            setReviewText("Fauzi sangat profesional dan tepat waktu. Terima kasih!")
                          }}
                          className={cn(
                            "absolute right-3 bottom-3 p-3 rounded-full shadow-lg transition-all",
                            isRecording ? "bg-error text-white scale-110" : "bg-primary text-white hover:bg-primary-hover"
                          )}
                        >
                          {isRecording ? <Square size={20} /> : <Mic size={20} />}
                        </button>
                      </div>
                      {isRecording && (
                        <p className="text-[10px] text-error font-bold text-center animate-pulse">Sedang merekam ulasan suara...</p>
                      )}
                    </div>

                    <Button 
                      className="w-full h-14 text-lg font-bold gap-2"
                      onClick={handleSubmit}
                    >
                      Kirim Ulasan <CheckCircle2 size={20} />
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              key="success-message"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-12 text-center space-y-6"
            >
              <div className="w-24 h-24 bg-success rounded-full flex items-center justify-center text-white mx-auto shadow-xl shadow-success/20">
                <CheckCircle2 size={48} strokeWidth={3} />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-display font-bold">Terima Kasih!</h3>
                <p className="text-text-secondary">Ulasanmu telah terkirim dan sangat berarti bagi {helperName}.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

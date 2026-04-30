import React from 'react'
import { Star, MapPin, Clock, ShieldCheck, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from './ui/Button'
import { Badge } from './ui/Badge'
import { Avatar } from './ui/Avatar'
import { Card, CardContent } from './ui/Card'
import { cn } from '../lib/utils'

export interface Helper {
  id: string
  name: string
  city: string
  avatar: string
  tier: 'BASIC' | 'CERTIFIED'
  specializations: string[]
  rating: number
  reviews: number
  price: number
  isAvailable: boolean
  availableAt?: string
  distance: number
}

interface HelperCardProps {
  helper: Helper
  onBooking?: (id: string) => void
  onViewProfile?: (id: string) => void
}

export const HelperCard: React.FC<HelperCardProps> = ({ helper, onBooking, onViewProfile }) => {
  const navigate = useNavigate()

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="h-full group overflow-hidden border-border/50 hover:shadow-lg transition-all">
        <CardContent className="p-0">
          <div className="p-5 space-y-4">
            {/* Header: Avatar & Tier */}
            <div className="flex justify-between items-start">
              <div className="relative">
                <Avatar 
                  src={helper.avatar} 
                  fallback={helper.name[0]} 
                  size="xl" 
                  className="border-2 border-primary-light"
                />
                <div className={cn(
                  "absolute -bottom-1 -right-1 p-1 rounded-full border-2 border-surface shadow-sm",
                  helper.tier === 'CERTIFIED' ? "bg-accent" : "bg-primary"
                )}>
                  <ShieldCheck size={14} className="text-white" />
                </div>
              </div>
              <Badge variant={helper.tier === 'CERTIFIED' ? 'accent' : 'primary'} className="uppercase tracking-wider text-[10px]">
                {helper.tier} HELPER
              </Badge>
            </div>

            {/* Info */}
            <div className="space-y-1">
              <Link to={`/dashboard/helpers/${helper.id}`} className="block">
                <h3 className="font-display font-bold text-lg text-text-primary group-hover:text-primary transition-colors">
                  {helper.name}
                </h3>
              </Link>
              <div className="flex items-center gap-1.5 text-text-secondary text-sm">
                <MapPin size={14} className="text-primary" />
                <span>{helper.city} · {helper.distance}km dari kamu</span>
              </div>
            </div>

            {/* Rating & Reviews */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 text-accent font-bold">
                <Star size={16} fill="currentColor" />
                <span>{helper.rating}</span>
              </div>
              <span className="text-text-muted text-sm">({helper.reviews} ulasan)</span>
            </div>

            {/* Specializations */}
            <div className="flex flex-wrap gap-1.5">
              {helper.specializations.slice(0, 3).map((spec) => (
                <Badge key={spec} variant="outline" className="text-[10px] font-bold">
                  {spec}
                </Badge>
              ))}
              {helper.specializations.length > 3 && (
                <span className="text-[10px] text-text-muted font-bold self-center">
                  +{helper.specializations.length - 3} lagi
                </span>
              )}
            </div>

            <hr className="border-border/50" />

            {/* Price & Status */}
            <div className="flex justify-between items-end">
              <div className="space-y-1">
                <p className="text-xs text-text-muted font-bold uppercase tracking-wide">Mulai Dari</p>
                <p className="text-lg font-mono font-bold text-primary">
                  Rp {helper.price.toLocaleString('id-ID')}<span className="text-sm font-normal text-text-secondary">/jam</span>
                </p>
              </div>
              <div className="text-right space-y-1">
                <div className="flex items-center gap-1.5 justify-end">
                  <div className={cn("h-2 w-2 rounded-full", helper.isAvailable ? "bg-success animate-pulse" : "bg-text-muted")} />
                  <span className={cn("text-xs font-bold", helper.isAvailable ? "text-success" : "text-text-muted")}>
                    {helper.isAvailable ? "Tersedia sekarang" : `Tersedia ${helper.availableAt}`}
                  </span>
                </div>
                <p className="text-[10px] text-text-muted">Min. booking 2 jam</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex border-t border-border">
            <button 
              onClick={() => navigate(`/dashboard/helpers/${helper.id}`)}
              className="flex-1 py-3 px-4 text-sm font-bold text-text-secondary hover:bg-gray-50 transition-colors border-r border-border"
            >
              Lihat Profil
            </button>
            <button 
              onClick={() => onBooking?.(helper.id)}
              className="flex-1 py-3 px-4 text-sm font-bold text-white bg-primary hover:bg-primary-hover transition-colors flex items-center justify-center gap-2"
            >
              Booking <ArrowRight size={16} />
            </button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export const HelperCardSkeleton = () => (
  <div className="rounded-card border border-border bg-surface overflow-hidden">
    <div className="p-5 space-y-4 animate-pulse">
      <div className="flex justify-between items-start">
        <div className="h-16 w-16 bg-gray-200 rounded-full" />
        <div className="h-6 w-20 bg-gray-200 rounded-pill" />
      </div>
      <div className="space-y-2">
        <div className="h-6 w-3/4 bg-gray-200 rounded" />
        <div className="h-4 w-1/2 bg-gray-100 rounded" />
      </div>
      <div className="flex gap-2">
        <div className="h-5 w-16 bg-gray-100 rounded-pill" />
        <div className="h-5 w-16 bg-gray-100 rounded-pill" />
      </div>
      <hr className="border-border/50" />
      <div className="flex justify-between items-end">
        <div className="space-y-2">
          <div className="h-3 w-12 bg-gray-100 rounded" />
          <div className="h-6 w-24 bg-gray-200 rounded" />
        </div>
        <div className="h-4 w-20 bg-gray-100 rounded" />
      </div>
    </div>
    <div className="flex h-12 bg-gray-50">
      <div className="flex-1 border-r border-border" />
      <div className="flex-1" />
    </div>
  </div>
)

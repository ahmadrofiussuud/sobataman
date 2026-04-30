import React from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { Check, User, Users, HeartHandshake } from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { useAuthStore } from '../../store/useAuthStore'
import type { UserRole } from '../../store/useAuthStore'
import { cn } from '../../lib/utils'

const roles: { id: UserRole; title: string; desc: string; icon: any }[] = [
  {
    id: 'KLIEN',
    title: 'KLIEN',
    desc: 'Saya mencari pendamping untuk aktivitas harian saya.',
    icon: User,
  },
  {
    id: 'HELPER',
    title: 'HELPER',
    desc: 'Saya ingin memberikan jasa pendampingan terverifikasi.',
    icon: HeartHandshake,
  },
  {
    id: 'KELUARGA',
    title: 'KELUARGA',
    desc: 'Saya mendaftarkan dan memantau sesi untuk anggota keluarga.',
    icon: Users,
  },
]

export default function RegisterRolePage() {
  const { selectedRole, setRole } = useAuthStore()
  const navigate = useNavigate()

  return (
    <div className="space-y-8">
      <div className="text-center lg:text-left space-y-2">
        <h2 className="text-3xl font-display font-bold text-text-primary">Daftar sebagai?</h2>
        <p className="text-text-secondary">Pilih peran Anda untuk memulai pengalaman di SobatAman</p>
      </div>

      <div className="grid gap-4">
        {roles.map((role) => {
          const Icon = role.icon
          const isSelected = selectedRole === role.id
          
          return (
            <button
              key={role.id}
              onClick={() => setRole(role.id)}
              className={cn(
                "relative flex items-start gap-4 p-5 rounded-md border-2 text-left transition-all duration-200",
                isSelected 
                  ? "border-primary bg-primary-light shadow-sm" 
                  : "border-border bg-white hover:border-primary/50 hover:bg-gray-50"
              )}
            >
              <div className={cn(
                "shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-colors",
                isSelected ? "bg-primary text-white" : "bg-gray-100 text-text-secondary"
              )}>
                <Icon size={24} />
              </div>
              <div className="space-y-1 pr-8">
                <p className={cn(
                  "font-bold transition-colors",
                  isSelected ? "text-primary" : "text-text-primary"
                )}>
                  {role.title}
                </p>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {role.desc}
                </p>
              </div>
              {isSelected && (
                <div className="absolute top-4 right-4 text-primary">
                  <Check size={20} className="stroke-[3]" />
                </div>
              )}
            </button>
          )
        })}
      </div>

      <Button
        className="w-full h-12 text-lg font-bold"
        disabled={!selectedRole}
        onClick={() => navigate('/auth/register/form')}
      >
        Lanjut Ke Pendaftaran
      </Button>

      <p className="text-center text-sm text-text-secondary">
        Sudah punya akun?{' '}
        <Link to="/auth/login" className="text-primary font-bold hover:underline">
          Masuk di sini
        </Link>
      </p>
    </div>
  )
}

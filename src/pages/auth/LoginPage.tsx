import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Mail, Lock, LogIn, User, Users } from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { supabase } from '../../lib/supabase'
import { cn } from '../../lib/utils'

const loginSchema = z.object({
  email: z.string().email('Format email tidak valid'),
  password: z.string().min(8, 'Password minimal 8 karakter'),
})

type LoginFormValues = z.infer<typeof loginSchema>

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true)
    try {
      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      })

      if (error) throw error

      console.log('Login successful:', authData)
      navigate('/dashboard')
    } catch (error: any) {
      console.error('Login error:', error.message)
      alert('Gagal Masuk: ' + (error.message === 'Invalid login credentials' ? 'Email atau Password salah' : error.message))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-10 py-8">
      <div className="text-center space-y-4">
        <div className="mx-auto h-16 w-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-2">
          <LogIn size={32} />
        </div>
        <h2 className="text-3xl font-display font-bold text-text-primary">Selamat Datang</h2>
        <p className="text-text-secondary">Pilih peran Anda untuk masuk ke dashboard</p>
      </div>

      <div className="grid gap-6">
        <Button 
          type="button"
          className="h-28 border-primary/20 hover:bg-primary-light flex flex-col gap-3 py-6 rounded-card shadow-xl shadow-primary/5 hover:scale-[1.02] transition-all bg-white text-text-primary border"
          onClick={() => navigate('/dashboard')}
        >
          <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
            <User size={24} />
          </div>
          <div className="text-center">
            <span className="block text-xs text-primary font-black uppercase tracking-widest">Akses Keluarga</span>
            <span className="text-xl font-display font-bold">Masuk sebagai Keluarga</span>
          </div>
        </Button>

        <Button 
          type="button"
          className="h-28 border-accent/20 hover:bg-accent/5 flex flex-col gap-3 py-6 rounded-card shadow-xl shadow-accent/5 hover:scale-[1.02] transition-all bg-white text-text-primary border"
          onClick={() => navigate('/helper')}
        >
          <div className="h-10 w-10 bg-accent/10 rounded-full flex items-center justify-center text-accent">
            <Users size={24} />
          </div>
          <div className="text-center">
            <span className="block text-xs text-accent font-black uppercase tracking-widest">Akses Mitra</span>
            <span className="text-xl font-display font-bold">Masuk sebagai Helper</span>
          </div>
        </Button>
      </div>

      <div className="text-center pt-8 space-y-4">
        <p className="text-sm text-text-secondary">
          Belum punya akun?{' '}
          <Link to="/auth/register/role" className="text-primary font-bold hover:underline">
            Daftar di sini
          </Link>
        </p>
        <p className="text-[10px] text-text-muted font-medium">
          © 2026 SobatAman. Pendampingan Keluarga Terpercaya.
        </p>
      </div>
    </div>
  )
}

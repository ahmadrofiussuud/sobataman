import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Mail, Lock, LogIn } from 'lucide-react'
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
    <div className="space-y-8">
      <div className="text-center lg:text-left space-y-2">
        <h2 className="text-3xl font-display font-bold text-text-primary">Selamat Datang Kembali</h2>
        <p className="text-text-secondary">Masuk ke akun SobatAman Anda</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="space-y-1">
          <label className="text-sm font-semibold text-text-primary block">Email</label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
            <Input
              {...register('email')}
              placeholder="nama@email.com"
              className="pl-11"
              error={errors.email?.message}
            />
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <label className="text-sm font-semibold text-text-primary block">Kata Sandi</label>
            <Link to="/auth/forgot-password" title="Lupa Kata Sandi?" className="text-xs text-primary font-bold hover:underline">
              Lupa Kata Sandi?
            </Link>
          </div>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
            <Input
              {...register('password')}
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              className="pl-11 pr-11"
              error={errors.password?.message}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full h-12 text-lg font-bold"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Sedang Masuk...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              Masuk <LogIn size={20} />
            </div>
          )}
        </Button>

        <div className="relative py-4">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border"></span>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-text-muted font-bold">Atau Akses Cepat (Demo)</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button 
            type="button"
            variant="outline" 
            className="h-14 border-primary/20 hover:bg-primary-light flex flex-col gap-1 py-2"
            onClick={() => navigate('/dashboard')}
          >
            <span className="text-xs text-primary font-bold">LOGIN SEBAGAI</span>
            <span className="text-sm font-display font-bold">Keluarga (User)</span>
          </Button>
          <Button 
            type="button"
            variant="outline" 
            className="h-14 border-accent/20 hover:bg-accent/5 flex flex-col gap-1 py-2"
            onClick={() => navigate('/helper')}
          >
            <span className="text-xs text-accent font-bold">LOGIN SEBAGAI</span>
            <span className="text-sm font-display font-bold">Helper (Pendamping)</span>
          </Button>
        </div>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border"></span>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-text-muted">Atau masuk dengan</span>
        </div>
      </div>

      <button
        type="button"
        className="w-full flex items-center justify-center gap-3 h-12 rounded-sm border border-border bg-white hover:bg-gray-50 transition-colors font-semibold text-text-primary"
      >
        <svg width="20" height="20" viewBox="0 0 24 24">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
        </svg>
        Masuk dengan Google
      </button>

      <p className="text-center text-sm text-text-secondary">
        Belum punya akun?{' '}
        <Link to="/auth/register/role" className="text-primary font-bold hover:underline">
          Daftar di sini
        </Link>
      </p>
    </div>
  )
}

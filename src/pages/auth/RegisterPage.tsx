import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Link, useNavigate, Navigate } from 'react-router-dom'
import { ChevronLeft, Upload, CheckCircle2, Circle } from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { useAuthStore } from '../../store/useAuthStore'
import { cn } from '../../lib/utils'

// Common schema
const baseSchema = z.object({
  fullName: z.string().min(3, 'Nama minimal 3 karakter'),
  email: z.string().email('Format email tidak valid'),
  phone: z.string().min(10, 'Nomor HP minimal 10 digit'),
  password: z.string().min(8, 'Password minimal 8 karakter'),
  confirmPassword: z.string(),
  terms: z.literal(true),
  city: z.string().optional(),
  specialization: z.array(z.string()).optional(),
  disabilityType: z.string().optional(),
  clientName: z.string().optional(),
  clientDisabilityType: z.string().optional(),
  relationship: z.string().optional(),
})

const refinePassword = (schema: any) => schema.refine((data: any) => data.password === data.confirmPassword, {
  message: "Kata sandi tidak cocok",
  path: ["confirmPassword"],
})

// Role specific schemas
const klienSchema = refinePassword(baseSchema.extend({
  disabilityType: z.string().min(1, 'Pilih jenis disabilitas'),
}))

const helperSchema = refinePassword(baseSchema.extend({
  specialization: z.array(z.string()).min(1, 'Pilih minimal 1 spesialisasi'),
}))

const keluargaSchema = refinePassword(baseSchema.extend({
  clientName: z.string().min(3, 'Nama klien minimal 3 karakter'),
  clientDisabilityType: z.string().min(1, 'Pilih jenis disabilitas klien'),
  relationship: z.string().min(1, 'Pilih hubungan dengan klien'),
}))

export default function RegisterPage() {
  const { selectedRole } = useAuthStore()
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  if (!selectedRole) return <Navigate to="/auth/register/role" replace />

  const getSchema = () => {
    switch (selectedRole) {
      case 'KLIEN': return klienSchema
      case 'HELPER': return helperSchema
      case 'KELUARGA': return keluargaSchema
      default: return baseSchema
    }
  }

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<any>({
    resolver: zodResolver(getSchema()),
    defaultValues: {
      city: 'Malang',
      specialization: [],
    }
  })

  const onSubmit = async (data: any) => {
    setIsLoading(true)
    console.log('Registration data:', { role: selectedRole, ...data })
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsLoading(false)
    // Redirect to success or verification
    alert('Pendaftaran berhasil! Silakan cek email Anda untuk verifikasi.')
    navigate('/auth/login')
  }

  const password = watch('password')
  const getPasswordStrength = () => {
    if (!password) return 0
    let strength = 0
    if (password.length >= 8) strength += 25
    if (/[A-Z]/.test(password)) strength += 25
    if (/[0-9]/.test(password)) strength += 25
    if (/[^A-Za-z0-9]/.test(password)) strength += 25
    return strength
  }

  const strength = getPasswordStrength()

  return (
    <div className="space-y-8">
      {/* Progress & Header */}
      <div className="space-y-6">
        <button 
          onClick={() => navigate('/auth/register/role')}
          className="flex items-center gap-2 text-text-secondary hover:text-primary transition-colors text-sm font-semibold"
        >
          <ChevronLeft size={16} /> Kembali
        </button>

        <div className="flex items-center justify-between px-4">
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xs">1</div>
            <span className="text-[10px] font-bold uppercase text-primary">Role</span>
          </div>
          <div className="flex-1 h-px bg-primary mx-2 mt-4"></div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xs">2</div>
            <span className="text-[10px] font-bold uppercase text-primary">Data</span>
          </div>
          <div className="flex-1 h-px bg-border mx-2 mt-4"></div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gray-100 text-text-muted flex items-center justify-center font-bold text-xs">3</div>
            <span className="text-[10px] font-bold uppercase text-text-muted">Verifikasi</span>
          </div>
        </div>

        <div className="text-center lg:text-left">
          <h2 className="text-2xl font-display font-bold text-text-primary">Lengkapi Data Anda</h2>
          <p className="text-text-secondary text-sm">Daftar sebagai <span className="font-bold text-primary">{selectedRole}</span></p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5">
        <Input {...register('fullName')} label="Nama Lengkap" placeholder="Masukkan nama sesuai KTP" error={errors.fullName?.message as string} />
        
        <div className="grid sm:grid-cols-2 gap-4">
          <Input {...register('email')} label="Email" placeholder="nama@email.com" error={errors.email?.message as string} />
          <Input {...register('phone')} label="No. Handphone" placeholder="0812xxxx" error={errors.phone?.message as string} />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <Input 
              {...register('password')} 
              label="Kata Sandi" 
              type="password" 
              placeholder="••••••••" 
              error={errors.password?.message as string} 
            />
            {password && (
              <div className="space-y-1.5 pt-1">
                <div className="flex gap-1 h-1">
                  {[1, 2, 3, 4].map((i) => (
                    <div 
                      key={i} 
                      className={cn(
                        "flex-1 rounded-full transition-colors",
                        strength >= i * 25 ? (strength > 75 ? "bg-success" : (strength > 50 ? "bg-warning" : "bg-error")) : "bg-gray-200"
                      )}
                    />
                  ))}
                </div>
                <p className="text-[10px] font-bold text-text-muted uppercase">
                  {strength > 75 ? "Sangat Kuat" : (strength > 50 ? "Kuat" : "Lemah")}
                </p>
              </div>
            )}
          </div>
          <Input 
            {...register('confirmPassword')} 
            label="Konfirmasi Kata Sandi" 
            type="password" 
            placeholder="••••••••" 
            error={errors.confirmPassword?.message as string} 
          />
        </div>

        {/* Role Specific Fields */}
        {selectedRole === 'KLIEN' && (
          <div className="space-y-1.5">
            <label className="text-sm font-semibold">Jenis Disabilitas</label>
            <select 
              {...register('disabilityType')}
              className="w-full px-4 py-2.5 rounded-sm border-1.5 border-border bg-surface focus:border-primary outline-none transition-all"
            >
              <option value="">Pilih Jenis</option>
              <option value="Tunanetra">Tunanetra</option>
              <option value="Tunarungu">Tunarungu</option>
              <option value="Tunadaksa">Tunadaksa</option>
              <option value="Kognitif">Kognitif</option>
              <option value="Lainnya">Lainnya</option>
            </select>
            {errors.disabilityType && <p className="text-xs text-error font-medium">{errors.disabilityType.message as string}</p>}
          </div>
        )}

        {selectedRole === 'HELPER' && (
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-text-primary">Spesialisasi</label>
              <div className="flex flex-wrap gap-2">
                {['Tunanetra', 'Tunarungu', 'Tunadaksa', 'ADHD', 'Autisme', 'Lansia'].map((spec) => {
                  const currentSpecs = watch('specialization') || []
                  const isSelected = currentSpecs.includes(spec)
                  return (
                    <button
                      key={spec}
                      type="button"
                      onClick={() => {
                        const next = isSelected 
                          ? currentSpecs.filter((s: string) => s !== spec)
                          : [...currentSpecs, spec]
                        setValue('specialization', next)
                      }}
                      className={cn(
                        "px-3 py-1.5 rounded-pill border text-xs font-bold transition-all",
                        isSelected ? "bg-primary text-white border-primary" : "bg-white text-text-secondary border-border hover:border-primary/50"
                      )}
                    >
                      {spec}
                    </button>
                  )
                })}
              </div>
              {errors.specialization && <p className="text-xs text-error font-medium">{errors.specialization.message as string}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold">Upload KTP</label>
              <div className="border-2 border-dashed border-border rounded-md p-6 flex flex-col items-center justify-center gap-2 hover:bg-gray-50 transition-colors cursor-pointer group">
                <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <Upload size={20} />
                </div>
                <div className="text-center">
                  <p className="text-sm font-bold">Klik atau seret file ke sini</p>
                  <p className="text-xs text-text-muted">PNG, JPG up to 5MB</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedRole === 'KELUARGA' && (
          <div className="grid gap-5 p-4 bg-primary-light/30 rounded-md border border-primary/10">
            <h4 className="text-sm font-bold text-primary uppercase tracking-wider">Data Klien (Anggota Keluarga)</h4>
            <Input {...register('clientName')} label="Nama Klien" placeholder="Nama lengkap klien" error={errors.clientName?.message as string} />
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold">Jenis Disabilitas Klien</label>
                <select {...register('clientDisabilityType')} className="w-full px-4 py-2.5 rounded-sm border-1.5 border-border bg-surface focus:border-primary outline-none">
                  <option value="">Pilih Jenis</option>
                  <option value="Tunanetra">Tunanetra</option>
                  <option value="Tunarungu">Tunarungu</option>
                  <option value="Tunadaksa">Tunadaksa</option>
                  <option value="Kognitif">Kognitif</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold">Hubungan</label>
                <select {...register('relationship')} className="w-full px-4 py-2.5 rounded-sm border-1.5 border-border bg-surface focus:border-primary outline-none">
                  <option value="">Pilih Hubungan</option>
                  <option value="Orang Tua">Orang Tua</option>
                  <option value="Saudara">Saudara</option>
                  <option value="Wali">Wali</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-start gap-2 pt-2">
          <input 
            type="checkbox" 
            {...register('terms')}
            className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-primary"
          />
          <label className="text-xs text-text-secondary leading-normal">
            Saya menyetujui <Link to="/terms" className="text-primary font-bold">Syarat & Ketentuan</Link> serta <Link to="/privacy" className="text-primary font-bold">Kebijakan Privasi</Link> SobatAman.
          </label>
        </div>
        {errors.terms && <p className="text-xs text-error font-medium">{errors.terms.message as string}</p>}

        <Button
          type="submit"
          className="w-full h-12 text-lg font-bold mt-4"
          disabled={isLoading}
        >
          {isLoading ? "Memproses..." : "Daftar Akun"}
        </Button>
      </form>
    </div>
  )
}

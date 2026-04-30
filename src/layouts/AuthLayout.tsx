import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function AuthLayout() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left side: Visual/Marketing */}
      <div className="hidden lg:flex flex-col justify-between bg-primary p-12 text-white relative overflow-hidden">
        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-2 mb-12">
            <div className="h-10 w-10 rounded-sm bg-white flex items-center justify-center">
              <span className="text-primary font-bold text-2xl">S</span>
            </div>
            <span className="font-display text-2xl font-bold">SobatAman</span>
          </Link>

          <div className="space-y-6">
            <h1 className="text-5xl font-display font-bold leading-tight">
              Batasan Terhapus. <br />
              <span className="text-accent">Mulai Perjalanan</span> <br />
              Anda Sekarang.
            </h1>
            <p className="text-primary-light text-lg max-w-md">
              Platform marketplace on-demand terpercaya untuk jasa pendampingan penyandang disabilitas di Indonesia. Kami menghubungkan kepedulian dengan kebutuhan.
            </p>
          </div>
        </div>

        <div className="relative z-10 flex items-center gap-4">
          <div className="flex -space-x-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-10 w-10 rounded-full border-2 border-primary bg-primary-light flex items-center justify-center text-primary text-xs font-bold">
                {String.fromCharCode(64 + i)}
              </div>
            ))}
          </div>
          <p className="text-sm text-primary-light">
            Bergabung dengan <span className="text-white font-bold">2,000+</span> pengguna lainnya.
          </p>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] rounded-full bg-white/5 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full bg-accent/10 blur-3xl"></div>
      </div>

      {/* Right side: Form */}
      <div className="flex flex-col items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex justify-center mb-8">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-sm bg-primary flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="font-display text-xl font-bold text-primary">SobatAman</span>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Outlet />
          </motion.div>
        </div>
      </div>
    </div>
  )
}

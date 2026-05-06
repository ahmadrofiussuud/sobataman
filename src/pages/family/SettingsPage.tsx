import React from 'react'
import { 
  Bell, 
  Lock, 
  Smartphone, 
  Globe, 
  ShieldCheck, 
  Eye, 
  HelpCircle,
  ChevronRight,
  ToggleLeft as Toggle
} from 'lucide-react'
import { Card, CardContent } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'

export default function SettingsPage() {
  const settings = [
    {
      group: 'Preferensi Aplikasi',
      items: [
        { icon: Bell, label: 'Notifikasi Push', value: 'Aktif', toggle: true },
        { icon: Smartphone, label: 'Mode Gelap', value: 'Sistem', toggle: true },
        { icon: Globe, label: 'Bahasa', value: 'Bahasa Indonesia' },
      ]
    },
    {
      group: 'Privasi & Data',
      items: [
        { icon: ShieldCheck, label: 'Izin Lokasi', value: 'Hanya saat aplikasi dibuka', toggle: true },
        { icon: Eye, label: 'Visibilitas Profil', value: 'Publik' },
        { icon: Lock, label: 'Enkripsi Data', value: 'Aktif' },
      ]
    },
    {
      group: 'Lainnya',
      items: [
        { icon: HelpCircle, label: 'Pusat Bantuan', value: '' },
      ]
    }
  ]

  return (
    <div className="container-custom px-4 lg:px-12 pt-28 md:pt-36 pb-20 space-y-8">
      <div className="space-y-1">
        <h1 className="text-3xl font-display font-bold text-text-primary">Pengaturan</h1>
        <p className="text-text-secondary text-sm">Sesuaikan pengalaman aplikasi SobatAman Anda.</p>
      </div>

      <div className="max-w-3xl space-y-8">
        {settings.map((group, idx) => (
          <div key={idx} className="space-y-4">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-text-muted px-2">{group.group}</h3>
            <Card className="border-border/50 overflow-hidden">
              <CardContent className="p-0 divide-y divide-border/50">
                {group.items.map((item, i) => (
                  <div key={i} className="p-4 md:p-6 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer group">
                    <div className="flex items-center gap-4">
                      <div className="p-2.5 rounded-lg bg-primary-light/50 text-primary">
                        <item.icon size={20} />
                      </div>
                      <span className="font-bold text-text-primary">{item.label}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      {item.value && (
                        <span className="text-xs font-bold text-text-secondary group-hover:text-primary transition-colors">{item.value}</span>
                      )}
                      {item.toggle ? (
                        <div className="w-12 h-6 bg-primary rounded-full p-1 flex justify-end transition-all">
                          <div className="w-4 h-4 bg-white rounded-full shadow-sm" />
                        </div>
                      ) : (
                        <ChevronRight size={18} className="text-text-muted group-hover:translate-x-1 transition-transform" />
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        ))}

        <div className="pt-4 text-center">
          <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest">SobatAman v0.9.4-beta (2026)</p>
        </div>
      </div>
    </div>
  )
}

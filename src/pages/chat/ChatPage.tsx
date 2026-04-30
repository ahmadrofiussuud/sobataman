import React, { useState, useRef, useEffect } from 'react'
import { 
  Search, 
  MoreVertical, 
  Phone, 
  Video, 
  Paperclip, 
  Mic, 
  Send, 
  Smile, 
  ChevronLeft,
  Volume2,
  Eye,
  AlertCircle,
  Calendar,
  CheckCheck,
  Circle,
  Info,
  X,
  MessageSquare
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'
import { Avatar } from '../../components/ui/Avatar'
import { Card, CardContent } from '../../components/ui/Card'
import { cn } from '../../lib/utils'

interface Message {
  id: string
  senderId: string
  text: string
  timestamp: string
  type: 'text' | 'image' | 'voice' | 'system' | 'booking'
  status?: 'sent' | 'delivered' | 'read'
  transcript?: string
}

interface Conversation {
  id: string
  name: string
  avatar: string
  role: 'Helper' | 'Klien' | 'Keluarga'
  lastMessage: string
  timestamp: string
  unreadCount: number
  isOnline: boolean
}

const MOCK_CONVERSATIONS: Conversation[] = [
  { id: '1', name: 'Ahmad Fauzi', role: 'Helper', lastMessage: 'Halo Bu, saya sudah di lokasi.', timestamp: '09:41', unreadCount: 2, isOnline: true, avatar: 'https://i.pravatar.cc/150?u=1' },
  { id: '2', name: 'Siti Rahma', role: 'Helper', lastMessage: 'Terima kasih atas laporannya.', timestamp: 'Kemarin', unreadCount: 0, isOnline: false, avatar: 'https://i.pravatar.cc/150?u=2' },
  { id: '3', name: 'Budi Wijaya', role: 'Keluarga', lastMessage: 'Bagaimana kondisi Bambang?', timestamp: '2 hari lalu', unreadCount: 0, isOnline: true, avatar: 'https://i.pravatar.cc/150?u=3' }
]

const MOCK_MESSAGES: Message[] = [
  { id: '1', senderId: 'user', text: 'Halo Fauzi, apa sudah sampai?', timestamp: '08:00', type: 'text', status: 'read' },
  { id: '2', senderId: '1', text: 'Halo Bu Sari, saya sudah di depan Taman Krida Budaya.', timestamp: '08:02', type: 'text' },
  { id: '3', senderId: 'system', text: 'Sesi Pendampingan Dimulai', timestamp: '08:05', type: 'system' },
  { id: '4', senderId: '1', text: '', timestamp: '08:15', type: 'image' },
  { id: '5', senderId: '1', text: 'Bambang sedang pemanasan sebentar sebelum jalan.', timestamp: '08:16', type: 'text' },
  { id: '6', senderId: 'user', text: 'Baik, tolong dipantau ya Fauzi.', timestamp: '08:20', type: 'text', status: 'read' },
  { id: '7', senderId: '1', text: 'Sesi berjalan lancar, ini rekaman suara Bambang.', timestamp: '09:00', type: 'voice', transcript: "Halo Ibu! Aku hari ini semangat banget latihannya." },
  { id: '8', senderId: 'system', text: 'Booking Sesi Berikutnya?', timestamp: '09:10', type: 'booking' }
]

export default function ChatPage() {
  const [activeConvId, setActiveConvId] = useState<string | null>('1')
  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES)
  const [inputText, setInputText] = useState('')
  const [accessibilityMode, setAccessibilityMode] = useState(false)
  const [isMobileList, setIsMobileList] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (!inputText.trim()) return
    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: 'user',
      text: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'text',
      status: 'sent'
    }
    setMessages([...messages, newMessage])
    setInputText('')
  }

  const activeConv = MOCK_CONVERSATIONS.find(c => c.id === activeConvId)

  return (
    <div className="flex h-[calc(100vh-140px)] bg-surface rounded-card border border-border shadow-sm overflow-hidden">
      {/* CONVERSATION LIST */}
      <aside className={cn(
        "w-full lg:w-[320px] border-r border-border flex flex-col transition-all",
        !isMobileList && "hidden lg:flex"
      )}>
        <div className="p-4 space-y-4 border-b border-border">
          <h2 className="text-xl font-display font-bold">Pesan</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
            <input 
              type="text" 
              placeholder="Cari percakapan..." 
              className="w-full pl-10 pr-4 py-2 rounded-sm border border-border bg-background focus:ring-1 focus:ring-primary outline-none text-sm"
            />
          </div>
          <div className="flex gap-2">
            {['Semua', 'Aktif', 'Arsip'].map(tab => (
              <button key={tab} className={cn(
                "px-3 py-1 rounded-pill text-xs font-bold transition-colors",
                tab === 'Semua' ? "bg-primary text-white" : "bg-gray-100 text-text-secondary hover:bg-gray-200"
              )}>
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-border/50">
          {MOCK_CONVERSATIONS.map((conv) => (
            <button
              key={conv.id}
              onClick={() => {
                setActiveConvId(conv.id)
                setIsMobileList(false)
              }}
              className={cn(
                "w-full p-4 flex gap-3 hover:bg-gray-50 transition-colors text-left",
                activeConvId === conv.id && "bg-primary-light/30"
              )}
            >
              <div className="relative shrink-0">
                <Avatar src={conv.avatar} fallback={conv.name[0]} />
                {conv.isOnline && (
                  <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-success rounded-full border-2 border-surface"></div>
                )}
              </div>
              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-sm truncate">{conv.name}</p>
                    <Badge variant="outline" className="text-[8px] py-0">{conv.role}</Badge>
                  </div>
                  <span className="text-[10px] text-text-muted">{conv.timestamp}</span>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-xs text-text-secondary truncate">{conv.lastMessage}</p>
                  {conv.unreadCount > 0 && (
                    <span className="bg-error text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                      {conv.unreadCount}
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </aside>

      {/* CHAT WINDOW */}
      <main className={cn(
        "flex-1 flex flex-col bg-background relative",
        isMobileList && "hidden lg:flex"
      )}>
        {activeConv ? (
          <>
            {/* Header */}
            <header className="h-16 bg-surface border-b border-border flex items-center justify-between px-4 lg:px-6 sticky top-0 z-10">
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setIsMobileList(true)}
                  className="lg:hidden p-2 -ml-2 text-text-secondary hover:bg-gray-100 rounded-full"
                >
                  <ChevronLeft size={24} />
                </button>
                <div className="relative">
                  <Avatar src={activeConv.avatar} fallback={activeConv.name[0]} />
                  {activeConv.isOnline && (
                    <div className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 bg-success rounded-full border-2 border-surface"></div>
                  )}
                </div>
                <div>
                  <p className="font-bold text-sm">{activeConv.name}</p>
                  <p className="text-[10px] text-success font-bold uppercase tracking-wider">Online</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setAccessibilityMode(!accessibilityMode)}
                  className={cn(
                    "flex items-center gap-2 px-3 py-1.5 rounded-pill text-[10px] font-bold transition-all",
                    accessibilityMode ? "bg-accent text-white" : "bg-gray-100 text-text-secondary"
                  )}
                >
                  <Eye size={14} /> {accessibilityMode ? "AKSESIBILITAS AKTIF" : "MODE AKSESIBILITAS"}
                </button>
                <div className="h-6 w-px bg-border mx-2"></div>
                <button className="p-2 text-text-secondary hover:bg-gray-100 rounded-full transition-colors hidden sm:block">
                  <Video size={20} />
                </button>
                <button className="p-2 text-error hover:bg-error/5 rounded-full transition-colors">
                  <AlertCircle size={20} />
                </button>
              </div>
            </header>

            {/* Messages Area */}
            <div className={cn(
              "flex-1 overflow-y-auto p-4 lg:p-6 space-y-6",
              accessibilityMode ? "text-lg" : "text-sm"
            )}>
              {messages.map((msg, i) => {
                const isUser = msg.senderId === 'user'
                const isSystem = msg.type === 'system'
                const isBooking = msg.type === 'booking'

                if (isSystem) {
                  return (
                    <div key={msg.id} className="flex justify-center">
                      <span className="bg-gray-100 text-text-secondary text-[10px] font-bold px-3 py-1 rounded-pill uppercase tracking-widest">
                        {msg.text}
                      </span>
                    </div>
                  )
                }

                if (isBooking) {
                  return (
                    <div key={msg.id} className="flex justify-center">
                      <Card className="max-w-xs border-primary bg-primary-light/20">
                        <CardContent className="p-4 text-center space-y-3">
                          <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center mx-auto">
                            <Calendar size={20} />
                          </div>
                          <p className="font-bold text-sm">Booking Sesi Berikutnya dengan {activeConv.name}?</p>
                          <Button size="sm" className="w-full">Booking Sekarang</Button>
                        </CardContent>
                      </Card>
                    </div>
                  )
                }

                return (
                  <div key={msg.id} className={cn("flex flex-col", isUser ? "items-end" : "items-start")}>
                    <div className={cn(
                      "max-w-[75%] space-y-1",
                      isUser ? "items-end" : "items-start"
                    )}>
                      <div className="flex items-end gap-2">
                        {!isUser && accessibilityMode && (
                          <button className="p-2 bg-primary-light text-primary rounded-full mb-1 hover:scale-110 transition-transform">
                            <Volume2 size={16} />
                          </button>
                        )}
                        <div className={cn(
                          "px-4 py-2.5 rounded-card relative group",
                          isUser ? "bg-primary text-white rounded-tr-none" : "bg-white border border-border rounded-tl-none",
                          accessibilityMode && "p-4 text-lg font-medium"
                        )}>
                          {msg.type === 'image' ? (
                            <div className="space-y-2">
                              <img 
                                src="https://images.unsplash.com/photo-1531050171602-32867146014b?auto=format&fit=crop&q=80&w=400" 
                                alt="Shared" 
                                className="rounded-md w-full h-auto cursor-pointer"
                              />
                              <p className="text-xs opacity-80">Foto terkirim</p>
                            </div>
                          ) : msg.type === 'voice' ? (
                            <div className="space-y-3 min-w-[200px]">
                              <div className="flex items-center gap-3">
                                <button className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center">
                                  <Send size={14} className="rotate-90" />
                                </button>
                                <div className="flex-1 h-1 bg-gray-200 rounded-full relative">
                                  <div className="absolute inset-0 w-1/3 bg-primary rounded-full"></div>
                                </div>
                                <span className="text-[10px]">0:12</span>
                              </div>
                              <div className="p-2 bg-black/5 rounded text-[10px] italic">
                                " {msg.transcript} "
                              </div>
                            </div>
                          ) : (
                            msg.text
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 px-1">
                        <span className="text-[9px] text-text-muted font-bold">{msg.timestamp}</span>
                        {isUser && <CheckCheck size={12} className={cn(msg.status === 'read' ? "text-primary" : "text-text-muted")} />}
                      </div>
                    </div>
                  </div>
                )
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <div className="p-4 bg-surface border-t border-border">
              <div className="flex items-end gap-2 max-w-4xl mx-auto">
                <div className="flex gap-1 pb-1">
                  <button className="p-2 text-text-secondary hover:bg-gray-100 rounded-full transition-colors">
                    <Paperclip size={20} />
                  </button>
                  <button className="p-2 text-text-secondary hover:bg-gray-100 rounded-full transition-colors hidden sm:block">
                    <Smile size={20} />
                  </button>
                </div>
                
                <div className="flex-1 relative">
                  <textarea 
                    rows={1}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault()
                        handleSendMessage()
                      }
                    }}
                    placeholder={accessibilityMode ? "KETIK PESAN DI SINI..." : "Tulis pesan..."}
                    className={cn(
                      "w-full pl-4 pr-12 py-3 rounded-md border border-border bg-background focus:ring-1 focus:ring-primary outline-none text-sm resize-none transition-all",
                      accessibilityMode && "text-lg py-4 border-2 border-primary"
                    )}
                  />
                  <button className="absolute right-2 bottom-2 p-2 text-primary hover:bg-primary-light rounded-full transition-colors">
                    <Mic size={20} />
                  </button>
                </div>

                <button 
                  onClick={handleSendMessage}
                  disabled={!inputText.trim()}
                  className={cn(
                    "p-3 rounded-md transition-all flex items-center justify-center",
                    inputText.trim() ? "bg-primary text-white shadow-lg" : "bg-gray-100 text-text-muted"
                  )}
                >
                  <Send size={24} />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-12 text-center space-y-4">
            <div className="w-20 h-20 bg-primary-light rounded-full flex items-center justify-center text-primary mb-2">
              <MessageSquare size={40} />
            </div>
            <h3 className="text-xl font-bold">Pilih Percakapan</h3>
            <p className="text-text-secondary max-w-xs">
              Mulai kirim pesan ke helper atau klien Anda untuk koordinasi pendampingan.
            </p>
          </div>
        )}
      </main>

      {/* SOS CONFIRMATION MODAL */}
      {/* ... abbreviated but mentioned in plan ... */}
    </div>
  )
}

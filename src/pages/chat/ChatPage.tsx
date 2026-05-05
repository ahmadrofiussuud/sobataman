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
  MessageSquare,
  Image as ImageIcon
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
    <div className="h-screen pt-28 lg:pt-32 pb-6 px-4 lg:px-8 space-y-4">
      <div className="h-full flex bg-white rounded-card border border-border shadow-2xl overflow-hidden relative">
        {/* CONVERSATION LIST */}
        <aside className={cn(
          "w-full lg:w-[360px] border-r border-border flex flex-col transition-all bg-gray-50/30",
          !isMobileList && "hidden lg:flex"
        )}>
          <div className="p-6 space-y-6 border-b border-border bg-white">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-display font-extrabold text-text-primary tracking-tight">Pesan</h2>
              <div className="h-8 w-8 bg-primary-light text-primary rounded-full flex items-center justify-center">
                <MessageSquare size={18} />
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary transition-colors" size={18} />
                <input 
                  type="text" 
                  placeholder="Cari percakapan..." 
                  className="w-full pl-12 pr-5 py-3 rounded-xl border border-border bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm transition-all shadow-sm"
                />
              </div>
              
              <div className="flex gap-2 p-1 bg-gray-100 rounded-xl">
                {['Semua', 'Aktif', 'Arsip'].map(tab => (
                  <button key={tab} className={cn(
                    "flex-1 py-2 rounded-lg text-xs font-bold transition-all",
                    tab === 'Semua' 
                      ? "bg-white text-primary shadow-sm" 
                      : "text-text-secondary hover:text-text-primary"
                  )}>
                    {tab}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-2 py-4 space-y-1">
            {MOCK_CONVERSATIONS.map((conv) => (
              <button
                key={conv.id}
                onClick={() => {
                  setActiveConvId(conv.id)
                  setIsMobileList(false)
                }}
                className={cn(
                  "w-full p-4 flex gap-4 rounded-2xl transition-all duration-200 text-left group",
                  activeConvId === conv.id 
                    ? "bg-white shadow-lg border-primary/10 border" 
                    : "hover:bg-white/50 border border-transparent"
                )}
              >
                <div className="relative shrink-0">
                  <Avatar src={conv.avatar} fallback={conv.name[0]} size="md" className="ring-2 ring-white shadow-sm" />
                  {conv.isOnline && (
                    <div className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 bg-success rounded-full border-2 border-white shadow-sm"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0 space-y-1.5">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <p className="font-extrabold text-sm text-text-primary truncate">{conv.name}</p>
                      <Badge variant="outline" className="text-[8px] font-black uppercase tracking-widest px-1.5 py-0 border-primary/20 text-primary bg-primary/5">
                        {conv.role}
                      </Badge>
                    </div>
                    <span className="text-[10px] text-text-muted font-bold">{conv.timestamp}</span>
                  </div>
                  <div className="flex justify-between items-center gap-2">
                    <p className={cn(
                      "text-xs truncate flex-1",
                      conv.unreadCount > 0 ? "text-text-primary font-bold" : "text-text-secondary font-medium"
                    )}>
                      {conv.lastMessage}
                    </p>
                    {conv.unreadCount > 0 && (
                      <span className="bg-primary text-white text-[10px] font-black h-5 w-5 rounded-full flex items-center justify-center shadow-lg shadow-primary/30">
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
          "flex-1 flex flex-col bg-white relative",
          isMobileList && "hidden lg:flex"
        )}>
          {activeConv ? (
            <>
              {/* Header */}
              <header className="h-20 bg-white/80 backdrop-blur-md border-b border-border flex items-center justify-between px-6 sticky top-0 z-10">
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => setIsMobileList(true)}
                    className="lg:hidden p-2.5 -ml-2 text-text-secondary hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <div className="relative">
                    <Avatar src={activeConv.avatar} fallback={activeConv.name[0]} size="md" className="ring-2 ring-primary-light" />
                    {activeConv.isOnline && (
                      <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-success rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div>
                    <p className="font-extrabold text-base text-text-primary tracking-tight">{activeConv.name}</p>
                    <div className="flex items-center gap-1.5">
                      <div className="h-1.5 w-1.5 bg-success rounded-full animate-pulse"></div>
                      <p className="text-[10px] text-success font-black uppercase tracking-widest">Aktif Sekarang</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setAccessibilityMode(!accessibilityMode)}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-sm",
                      accessibilityMode 
                        ? "bg-accent text-white shadow-accent/20" 
                        : "bg-gray-100 text-text-secondary hover:bg-gray-200"
                    )}
                  >
                    <Eye size={14} /> {accessibilityMode ? "Aksesibilitas Aktif" : "Mode Aksesibilitas"}
                  </button>
                  <div className="h-8 w-px bg-border mx-1"></div>
                  <div className="flex gap-1">
                    <button className="p-3 text-text-secondary hover:bg-gray-100 hover:text-primary rounded-xl transition-all hidden sm:block">
                      <Video size={20} />
                    </button>
                    <button className="p-3 text-error bg-error/5 hover:bg-error/10 rounded-xl transition-all">
                      <AlertCircle size={20} />
                    </button>
                  </div>
                </div>
              </header>

              {/* Messages Area */}
              <div className={cn(
                "flex-1 overflow-y-auto p-6 space-y-8 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-fixed",
                accessibilityMode ? "text-xl" : "text-sm"
              )}>
                {messages.map((msg, i) => {
                  const isUser = msg.senderId === 'user'
                  const isSystem = msg.type === 'system'
                  const isBooking = msg.type === 'booking'

                  if (isSystem) {
                    return (
                      <div key={msg.id} className="flex justify-center py-2">
                        <span className="bg-white/80 backdrop-blur-sm border border-border text-text-secondary text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-sm">
                          {msg.text}
                        </span>
                      </div>
                    )
                  }

                  if (isBooking) {
                    return (
                      <div key={msg.id} className="flex justify-center py-4">
                        <Card className="max-w-xs border-2 border-primary/20 bg-white shadow-2xl overflow-hidden rounded-2xl">
                          <div className="bg-primary-light p-4 text-center">
                            <div className="w-12 h-12 bg-primary text-white rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-primary/20 rotate-3">
                              <Calendar size={24} />
                            </div>
                          </div>
                          <CardContent className="p-6 text-center space-y-4">
                            <p className="font-extrabold text-sm text-text-primary leading-relaxed">
                              Sukai sesi pendampingan ini? <br />
                              <span className="text-primary">Booking sesi berikutnya dengan {activeConv.name}</span>
                            </p>
                            <Button className="w-full rounded-xl font-bold">Booking Sekarang</Button>
                          </CardContent>
                        </Card>
                      </div>
                    )
                  }

                  return (
                    <motion.div 
                      key={msg.id} 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={cn("flex flex-col", isUser ? "items-end" : "items-start")}
                    >
                      <div className={cn(
                        "max-w-[80%] lg:max-w-[70%] space-y-1.5",
                        isUser ? "items-end" : "items-start"
                      )}>
                        <div className="flex items-end gap-3">
                          {!isUser && accessibilityMode && (
                            <button className="p-3 bg-primary text-white rounded-2xl mb-1 shadow-lg shadow-primary/20 hover:scale-110 transition-transform">
                              <Volume2 size={20} />
                            </button>
                          )}
                          <div className={cn(
                            "px-5 py-3.5 rounded-[24px] shadow-sm relative group transition-all duration-300",
                            isUser 
                              ? "bg-primary text-white rounded-tr-none shadow-primary/10 hover:shadow-primary/20" 
                              : "bg-white border border-border rounded-tl-none hover:border-primary/20",
                            accessibilityMode && "p-6 text-xl font-bold leading-relaxed"
                          )}>
                            {msg.type === 'image' ? (
                              <div className="space-y-3">
                                <div className="rounded-xl overflow-hidden shadow-lg">
                                  <img 
                                    src="https://images.unsplash.com/photo-1531050171602-32867146014b?auto=format&fit=crop&q=80&w=600" 
                                    alt="Shared" 
                                    className="w-full h-auto hover:scale-105 transition-transform duration-500"
                                  />
                                </div>
                                <div className="flex items-center gap-2 opacity-80">
                                  <ImageIcon size={14} />
                                  <p className="text-[10px] font-bold uppercase tracking-widest">Foto Dokumentasi</p>
                                </div>
                              </div>
                            ) : msg.type === 'voice' ? (
                              <div className="space-y-4 min-w-[240px] p-1">
                                <div className="flex items-center gap-4">
                                  <button className="w-10 h-10 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20">
                                    <Send size={18} className="rotate-90" />
                                  </button>
                                  <div className="flex-1 space-y-2">
                                    <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                      <motion.div 
                                        initial={{ width: 0 }}
                                        animate={{ width: '40%' }}
                                        className="h-full bg-primary"
                                      />
                                    </div>
                                    <div className="flex justify-between text-[8px] font-black uppercase tracking-widest opacity-60">
                                      <span>0:12</span>
                                      <span>VOICE MESSAGE</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="p-3 bg-primary/5 rounded-xl border border-primary/10 text-xs italic font-medium leading-relaxed">
                                  <span className="text-primary text-lg mr-1 font-serif">"</span>
                                  {msg.transcript}
                                  <span className="text-primary text-lg ml-1 font-serif">"</span>
                                </div>
                              </div>
                            ) : (
                              <p className="leading-relaxed font-medium">{msg.text}</p>
                            )}
                          </div>
                        </div>
                        <div className={cn("flex items-center gap-2 px-2", isUser && "justify-end")}>
                          <span className="text-[10px] text-text-muted font-bold tracking-tight">{msg.timestamp}</span>
                          {isUser && (
                            <CheckCheck 
                              size={14} 
                              className={cn(msg.status === 'read' ? "text-primary" : "text-text-muted")} 
                            />
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Bar */}
              <div className="p-6 bg-white border-t border-border">
                <div className="flex items-end gap-3 max-w-5xl mx-auto bg-gray-50 p-2 rounded-[28px] border border-border focus-within:bg-white focus-within:shadow-2xl focus-within:border-primary/20 transition-all duration-300">
                  <div className="flex gap-1">
                    <button className="p-3 text-text-secondary hover:bg-white hover:text-primary rounded-full transition-all">
                      <Paperclip size={22} />
                    </button>
                    <button className="p-3 text-text-secondary hover:bg-white hover:text-primary rounded-full transition-all hidden sm:block">
                      <Smile size={22} />
                    </button>
                  </div>
                  
                  <div className="flex-1 relative pb-1">
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
                        "w-full bg-transparent py-3 pr-12 outline-none text-sm resize-none transition-all placeholder:text-text-muted placeholder:font-medium",
                        accessibilityMode && "text-lg py-4 placeholder:text-lg"
                      )}
                      style={{ height: 'auto', minHeight: '44px' }}
                    />
                    <button className="absolute right-2 top-1.5 p-2.5 text-primary bg-primary/5 hover:bg-primary/10 rounded-2xl transition-all">
                      <Mic size={20} />
                    </button>
                  </div>

                  <button 
                    onClick={handleSendMessage}
                    disabled={!inputText.trim()}
                    className={cn(
                      "p-4 rounded-2xl transition-all duration-300 flex items-center justify-center shadow-lg",
                      inputText.trim() 
                        ? "bg-primary text-white shadow-primary/30 scale-100" 
                        : "bg-gray-200 text-text-muted scale-95 opacity-50 cursor-not-allowed"
                    )}
                  >
                    <Send size={24} />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-12 text-center space-y-6">
              <div className="w-24 h-24 bg-primary-light rounded-[32px] flex items-center justify-center text-primary shadow-xl shadow-primary/10 rotate-6">
                <MessageSquare size={48} />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-display font-extrabold text-text-primary tracking-tight">Pilih Percakapan</h3>
                <p className="text-text-secondary max-w-sm font-medium">
                  Mulai kirim pesan ke helper atau keluarga Anda untuk koordinasi pendampingan yang lebih lancar.
                </p>
              </div>
              <Button variant="outline" className="rounded-pill px-8 font-bold">Mulai Percakapan Baru</Button>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

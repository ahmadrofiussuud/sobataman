import { GoogleGenerativeAI } from '@google/generative-ai'

const apiKey = import.meta.env.VITE_GEMINI_API_KEY

if (!apiKey) {
  console.warn('Gemini API Key missing. Check your .env file.')
}

const genAI = new GoogleGenerativeAI(apiKey || 'placeholder-key')

// Default model to use
export const geminiModel = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

/**
 * Analyze helper journal using Gemini
 */
export async function analyzeJournal(journalContent: string) {
  if (!apiKey) return "Integrasi AI belum siap. Harap masukkan API Key di .env"

  try {
    const prompt = `
      Anda adalah asisten AI untuk SobatAman, platform pendampingan disabilitas.
      Tugas Anda adalah menganalisis laporan (jurnal) dari Helper berikut dan memberikan ringkasan singkat, peduli, dan informatif untuk keluarga klien.
      
      JURNAL HELPER:
      "${journalContent}"
      
      BERIKAN OUTPUT DALAM FORMAT JSON BERIKUT:
      {
        "summary": "Ringkasan 1-2 kalimat yang menenangkan keluarga",
        "key_points": ["Poin penting 1", "Poin penting 2"],
        "sentiment": "Sangat Baik/Baik/Cukup/Perlu Perhatian"
      }
    `
    
    const result = await geminiModel.generateContent(prompt)
    const response = await result.response
    const text = response.text()
    
    // Clean JSON from markdown if needed
    const jsonStr = text.replace(/```json|```/g, '').trim()
    return JSON.parse(jsonStr)
  } catch (error) {
    console.error('Gemini Analysis Error:', error)
    return {
      summary: "Terjadi kesalahan saat menganalisis laporan.",
      key_points: ["Gagal memproses data"],
      sentiment: "Unknown"
    }
  }
}

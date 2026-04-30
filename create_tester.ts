import { supabase } from './src/lib/supabase'

async function createTester() {
  const email = 'tester@sobataman.com'
  const password = 'password123'

  console.log(`Creating tester account: ${email}...`)
  
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) {
    console.error('Error creating tester:', error.message)
  } else {
    console.log('Tester account created successfully!')
    console.log('Email:', email)
    console.log('Password:', password)
    console.log('NOTE: Jika email konfirmasi aktif di Supabase, Anda perlu mengklik link di email (atau matikan "Confirm Email" di settings dashboard Supabase).')
  }
}

createTester()

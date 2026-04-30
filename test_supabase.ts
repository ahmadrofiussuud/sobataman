import { supabase } from './src/lib/supabase'

async function testConnection() {
  console.log('Testing Supabase Connection...')
  const { data, error } = await supabase.from('test').select('*').limit(1)
  if (error) {
    console.error('Connection Error:', error.message)
    if (error.message.includes('relation "test" does not exist')) {
      console.log('Supabase connection working! (Test table not found, which is expected if you havent created it)')
    }
  } else {
    console.log('Connection Successful! Data:', data)
  }
}

testConnection()

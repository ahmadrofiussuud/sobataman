const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');

// Manually parse .env
const env = fs.readFileSync('.env', 'utf8');
const lines = env.split('\n');
const config = {};
lines.forEach(line => {
  const [key, value] = line.split('=');
  if (key && value) config[key.trim()] = value.trim();
});

const supabaseUrl = config.VITE_SUPABASE_URL;
const supabaseAnonKey = config.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function createTester() {
  const email = 'tester123@gmail.com';
  const password = 'password123';

  console.log(`Creating tester account: ${email}...`);
  
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    console.error('Error:', error.message);
  } else {
    console.log('SUCCESS!');
    console.log('Email:', email);
    console.log('Password:', password);
  }
}

createTester();

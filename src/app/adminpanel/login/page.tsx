'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (username === 'iadmin' && password === 'HI#pH7*F(hIYC)HXjwl!tJi8P') {
      localStorage.setItem('adminAuth', 'true');
      router.push('/adminpanel');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f7f7f7]">
      <div className="bg-white p-8 rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.1)] w-full max-w-sm mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-[#1a1a1a] mb-2">Admin Panel</h1>
          <p className="text-[#666] text-sm">Enter your credentials to continue</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-4">
          {error && (
            <div className="bg-red-50 text-[#e53935] p-3 rounded text-sm text-center">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border border-[#ddd] rounded focus:outline-none focus:border-[#666] transition-colors text-center"
              required
            />
          </div>

          <div className="space-y-2">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-[#ddd] rounded focus:outline-none focus:border-[#666] transition-colors text-center"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#1a1a1a] text-white p-2 rounded hover:bg-[#333] transition-colors mt-6"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
} 
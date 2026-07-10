import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError(authError.message === 'Invalid login credentials' 
        ? 'Email atau password salah! Silakan periksa kembali.' 
        : authError.message
      );
      setLoading(false);
    } else {
      // Jika berhasil login, arahkan admin langsung ke dashboard utama
      navigate('/admin/dashboard');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 rounded-2xl bg-white p-8 shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-[#03045E]">
            Login Admin Farida
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Masuk untuk mengelola listing properti cloud
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          {error && (
            <div className="rounded-md bg-red-50 p-4 text-sm text-red-700 font-medium">
              {error}
            </div>
          )}
          
          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Resmi</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-[#0077D6] focus:outline-none focus:ring-1 focus:ring-[#0077D6] sm:text-sm"
                placeholder="nama@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-[#0077D6] focus:outline-none focus:ring-1 focus:ring-[#0077D6] sm:text-sm"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative flex w-full justify-center rounded-lg bg-[#0077D6] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#03045E] focus:outline-none focus:ring-2 focus:ring-[#0077D6] focus:ring-offset-2 disabled:opacity-50 transition-colors"
            >
              {loading ? 'Memvalidasi Sesi...' : 'Masuk Dashboard'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;

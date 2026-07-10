import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { User } from '@supabase/supabase-js';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // 1. Cek sesi login yang aktif saat ini saat komponen dimuat
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    };

    checkUser();

    // 2. Dengarkan perubahan status auth secara realtime (login/logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#0077D6] border-t-transparent mx-auto"></div>
          <p className="mt-4 text-sm font-medium text-gray-500">Memverifikasi akses admin...</p>
        </div>
      </div>
    );
  }

  // Jika tidak ada user terautentikasi, alihkan paksa ke halaman login admin
  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  // Jika sudah login, izinkan akses masuk ke halaman dashboard admin
  return <>{children}</>;
};

export default ProtectedRoute;

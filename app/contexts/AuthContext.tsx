"use client";

import { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';

type UserType = 'user' | 'company' | null;

// /api/me response (minimum needed fields + tolerant index signature)
export interface MeUser {
  id: number;
  name: string;
  email: string;

  nationality: string | null;
  date_of_birth: string | null;
  gender: number | null;
  last_name: string | null;
  mobile: string | null;
  city_id: number | null;
  country_id: number | null;
  resume_headline: string | null;
  email_verified_at: string | null;
  role: string | null; // e.g. "company" | "user" | ...
  plan: any;
  balance: any;
  plan_end: string | null;
  status_id: number | null;
  created_at: string | null;
  updated_at: string | null;
  last_login: string | null;
  avatar: string | null;
  phone: string | null;
  marital_status: string | null;
  children: string | null;
  jobseeker_email: string | null;
  visibility: string | null;
  jobseeker_status: string | null;
  provider_id: string | null;
  provider: number | null;
  desired_salary_type: string | null;
  desired_salary_min: number | null;
  desired_salary_max: number | null;
  desired_salary_fixed: number | null;
  desired_currency: string | null;
  address: string | null;

  [key: string]: any;
}

interface AuthState {
  userType: UserType;
  token: string | null;
  me: MeUser | null;
}

interface AuthContextType {
  isLoggedIn: boolean;
  user: AuthState;
  loginLegacy: (userType: Exclude<UserType, null>) => void;
  loginWithApi: (email: string, password: string) => Promise<void>;
  refreshMe: (tokenOverride?: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<AuthState>({ userType: null, token: null, me: null });

  useEffect(() => {
    // LocalStorage-dan token/me bərpası
    const stored = localStorage.getItem('auth');
    if (!stored) return;
    try {
      const parsed: AuthState = JSON.parse(stored);
      // Token varsa (API login) və ya legacy userType saxlanıbsa, sessiyanı bərpa et
      if (parsed?.token || parsed?.userType) {
        setUser({
          userType: parsed.userType ?? null,
          token: parsed.token,
          me: parsed.me ?? null,
        });
        setIsLoggedIn(true);
      }
    } catch {
      // ignore
    }
  }, []);

  const persist = (next: AuthState) => {
    localStorage.setItem('auth', JSON.stringify(next));
  };

  const refreshMe = useCallback(async (tokenOverride?: string) => {
    // token yoxdursa, /me çağırma
    const token = tokenOverride ?? user.token;
    if (!token) return;

    const res = await fetch('/api/bff/api/me', {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    });

    if (!res.ok) {
      // token expired ola bilər
      throw new Error(`ME request failed (${res.status})`);
    }

    const data: any = await res.json();
    const me: MeUser = {
      id: Number(data?.id ?? 0),
      name: data?.name ?? '',
      email: data?.email ?? '',

      nationality: data?.nationality ?? null,
      date_of_birth: data?.date_of_birth ?? null,
      gender: typeof data?.gender === 'number' ? data.gender : (data?.gender ?? null),
      last_name: data?.last_name ?? null,
      mobile: data?.mobile ?? null,
      city_id: typeof data?.city_id === 'number' ? data.city_id : (data?.city_id ?? null),
      country_id: typeof data?.country_id === 'number' ? data.country_id : (data?.country_id ?? null),
      resume_headline: data?.resume_headline ?? null,
      email_verified_at: data?.email_verified_at ?? null,
      role: data?.role ?? null,
      plan: data?.plan ?? null,
      balance: data?.balance ?? null,
      plan_end: data?.plan_end ?? null,
      status_id: typeof data?.status_id === 'number' ? data.status_id : (data?.status_id ?? null),
      created_at: data?.created_at ?? null,
      updated_at: data?.updated_at ?? null,
      last_login: data?.last_login ?? null,
      avatar: data?.avatar ?? null,
      phone: data?.phone ?? null,
      marital_status: data?.marital_status ?? null,
      children: data?.children ?? null,
      jobseeker_email: data?.jobseeker_email ?? null,
      visibility: data?.visibility ?? null,
      jobseeker_status: data?.jobseeker_status ?? null,
      provider_id: data?.provider_id ?? null,
      provider: typeof data?.provider === 'number' ? data.provider : (data?.provider ?? null),
      desired_salary_type: data?.desired_salary_type ?? null,
      desired_salary_min: typeof data?.desired_salary_min === 'number' ? data.desired_salary_min : (data?.desired_salary_min ?? null),
      desired_salary_max: typeof data?.desired_salary_max === 'number' ? data.desired_salary_max : (data?.desired_salary_max ?? null),
      desired_salary_fixed: typeof data?.desired_salary_fixed === 'number' ? data.desired_salary_fixed : (data?.desired_salary_fixed ?? null),
      desired_currency: data?.desired_currency ?? null,
      address: data?.address ?? null,
    };

    setUser(prev => {
      const derivedUserType: UserType = me.role === 'company' ? 'company' : 'user';
      const next: AuthState = { ...prev, userType: derivedUserType, me };
      persist(next);
      return next;
    });
  }, [user.token]);

  const loginWithApi = useCallback(async (email: string, password: string) => {
    const res = await fetch('/api/bff/api/login', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      let msg = `Login failed (${res.status})`;
      try {
        const err = await res.json();
        msg = err?.message ?? msg;
      } catch {
        // ignore
      }
      throw new Error(msg);
    }

    const data: { token: string; user?: { id: number; name: string; email: string; role?: string } } = await res.json();
    const token = data.token;
    const me: MeUser | null = data.user
      ? {
          // minimal placeholder; real /me ilə yenilənəcək
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          nationality: null,
          date_of_birth: null,
          gender: null,
          last_name: null,
          mobile: null,
          city_id: null,
          country_id: null,
          resume_headline: null,
          email_verified_at: null,
          role: data.user.role ?? null,
          plan: null,
          balance: null,
          plan_end: null,
          status_id: null,
          created_at: null,
          updated_at: null,
          last_login: null,
          avatar: null,
          phone: null,
          marital_status: null,
          children: null,
          jobseeker_email: null,
          visibility: null,
          jobseeker_status: null,
          provider_id: null,
          provider: null,
          desired_salary_type: null,
          desired_salary_min: null,
          desired_salary_max: null,
          desired_salary_fixed: null,
          desired_currency: null,
          address: null,
        }
      : null;

    // userType: /me gələn kimi düzələcək, amma user object-də role varsa onu da götürə bilərik
    const derivedUserType: UserType = data.user?.role === 'company' ? 'company' : 'user';

    const next: AuthState = {
      userType: derivedUserType,
      token,
      me,
    };
    setUser(next);
    persist(next);
    setIsLoggedIn(true);

    // /me daha detallı info verirsə, yenilə
    try {
      await refreshMe(token);
    } catch {
      // ignore
    }
  }, [refreshMe]);

  // Əgər token var amma me boşdursa (refresh/restore zamanı), /me çağır
  useEffect(() => {
    if (user.token && !user.me) {
      refreshMe(user.token).catch(() => {
        // ignore
      });
    }
  }, [user.token, user.me, refreshMe]);

  // Legacy (hardcoded) login: hazırkı UI axınını pozmamaq üçün saxlanılır
  const loginLegacy = (userType: Exclude<UserType, null>) => {
    const next: AuthState = { userType, token: null, me: null };
    setUser(next);
    persist(next);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem('auth');
    setUser({ userType: null, token: null, me: null });
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, loginLegacy, loginWithApi, refreshMe, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

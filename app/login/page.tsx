"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';
import { signIn } from 'next-auth/react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { loginLegacy, loginWithApi } = useAuth();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      // Real API login
      await loginWithApi(email, password);
      router.push('/dashboard/profile/settings');
    } catch (e: any) {
      // Legacy fallback (mövcud test istifadəçiləri üçün)
      if (email === 'admin@azerforum.com' && password === 'admin123') {
        loginLegacy('company');
        router.push('/dashboard/jobs');
        return;
      }
      if (email === 'user@example.com' && password === 'password123') {
        loginLegacy('user');
        router.push('/dashboard/profile/settings');
        return;
      }

      alert(e?.message ?? 'E-poçt və ya parol yanlışdır.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <style>
        {`
          #titlebar h2 {
            font-size: 30px;
            line-height: 40px;
            margin: 1px 0 3px 0;
            max-width: 474px;
          }
          button.facebook-login:hover a{
            color: white !important;
          }
          button.google-login:hover a{
            color: white !important;
          }
          .social-login-buttons .linkedin:hover {
            background-color: #0072b1;
            color: #fff;
          }
          .social-login-buttons .linkedin {
            border-color: #0072b1;
            color: #0072b1;
          }
        `}
      </style>
      <div id="titlebar" className="gradient">
        <div className="container">
          <div className="row">
            <div className="col-xl-6 offset-xl-3">
              <h2 className="text-center">Daxil ol</h2>
              <nav id="breadcrumbs" className="dark d-none">
                <ul>
                  <li><Link href="/">Baş səhifə</Link></li>
                  <li>Daxil ol</li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-xl-5 offset-xl-3">
            <div className="login-register-page" style={{ maxWidth: '474px' }}>
              {/* Welcome Text */}
              <div className="welcome-text">
                <h3>Səni saytımızda görmək xoşdur.</h3>
                <span>Hesabın yoxdur? <Link href="/register">Qeydiyyatdan keç!</Link></span>
              </div>

              {/* Form */}
              <form method="post" id="login-form" onSubmit={handleSubmit}>
                <div className="input-with-icon-left">
                  <i className="icon-material-baseline-mail-outline"></i>
                  <input 
                    type="text" 
                    className="input-text with-border" 
                    name="email" 
                    id="email" 
                    placeholder="e-poçt ünvanı" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                    autoComplete="email" 
                    autoFocus 
                  />
                </div>

                <div className="input-with-icon-left">
                  <i className="icon-material-outline-lock"></i>
                  <input 
                    type="password" 
                    className="input-text with-border" 
                    name="password" 
                    id="password" 
                    placeholder="parol" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                  />
                </div>
                <Link href="/password/reset" className="forgot-password">Parolun yaddan çıxıb?</Link>
                
                {/* Button */}
                <button
                  className="button loginButton full-width button-sliding-icon ripple-effect margin-top-10"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Gözləyin...' : 'Daxil ol'} <i className="icon-material-outline-arrow-right-alt"></i>
                </button>
              </form>

              {/* Social Login */}
              <div className="social-login-separator"><span>və ya</span></div>
              <div id="google-signin-button"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="margin-top-70"></div>
    </>
  );
};

const LoginPageWrapper = () => {
  const router = useRouter();

  const handleGoogleSignIn = async (response: any) => {
    const res = await signIn('credentials', {
      credential: response.credential,
      redirect: false,
    });

    if (res?.ok) {
      router.push('/'); // Uğurlu girişdən sonra yönləndirmə
    } else {
      // Xəta baş verdikdə
      console.error("Sign in failed:", res);
    }
  };

  useEffect(() => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
        callback: handleGoogleSignIn,
      });
      window.google.accounts.id.renderButton(
        document.getElementById("google-signin-button"),
        { theme: "outline", size: "large", type: 'standard', text: 'signin_with' }
      );
    }
  }, []);

  return <LoginPage />;
}

// Add this to your global types if it doesn't exist
declare global {
  interface Window {
    google: any;
  }
}

export default LoginPageWrapper;

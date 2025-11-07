"use client";
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (email === 'admin@azerforum.com' && password === 'admin123') {
      login('company');
      router.push('/dashboard/jobs');
    } else if (email === 'user@example.com' && password === 'password123') {
      login('user');
      router.push('/dashboard/profile/settings');
    } else {
      alert('E-poçt və ya parol yanlışdır.');
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
                <button className="button loginButton full-width button-sliding-icon ripple-effect margin-top-10" type="submit">
                  Daxil ol <i className="icon-material-outline-arrow-right-alt"></i>
                </button>
              </form>

            </div>
          </div>
        </div>
      </div>
      <div className="margin-top-70"></div>
    </>
  );
};

export default LoginPage;
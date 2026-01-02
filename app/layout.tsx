import Script from 'next/script';
import type { Metadata } from 'next';
import Header from './components/Header';
import Footer from './components/Footer';
import { AuthProvider } from './contexts/AuthContext';
import NextAuthProvider from './components/NextAuthProvider';
import StoreProvider from './StoreProvider';
import "./globals.css";
import "../public/css/pages/posts.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
const metadataBase = new URL(siteUrl);

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: 'Busy.az',
    template: '%s | Busy.az',
  },
  description: 'Busy.az — iş elanları, şirkətlər, peşələr və blog məzmunu üçün platforma.',
  openGraph: {
    type: 'website',
    url: metadataBase,
    siteName: 'Busy.az',
    title: 'Busy.az',
    description: 'İş elanları, şirkət məlumatları və faydalı məzmunla dolu karyera platforması.',
    images: [{ url: new URL('/og/default.png', metadataBase).toString() }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Busy.az',
    description: 'İş elanları, şirkətlər və karyera məzmunu platforması.',
    images: [new URL('/og/default.png', metadataBase).toString()],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="az" suppressHydrationWarning={true}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <link rel="apple-touch-icon" sizes="180x180" href="/storage/favicon/apple-touch-icon.png?v211" />
        <link rel="icon" type="image/png" sizes="32x32" href="/storage/favicon/favicon-32x32.png?v121" />
        <link rel="icon" type="image/png" sizes="16x16" href="/storage/favicon/favicon-16x16.png?v211" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="stylesheet" href="/css/bootstrap-grid.css" />
        <link rel="stylesheet" href="/css/bootstrap.css" />
        <link rel="stylesheet" href="/css/icons.css" />
        <link rel="stylesheet" href="/css/style.css" />
        <link rel="stylesheet" href="/css/colors/blue.css" />
        <link rel="stylesheet" href="/css/bootstrap-select.min.css" />
        <link rel="stylesheet" href="/css/pages/index.css" />
        <link rel="stylesheet" href="/css/custom.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css" />
        <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />
        <link rel="stylesheet" href="/css/dropify.css" />
      </head>
      <body>
        {/* Wrapper */}
        <StoreProvider>
          <NextAuthProvider>
            <AuthProvider>
              {/*
                NOTE: `overflowY: hidden` blocks vertical scrolling on many pages (especially mobile)
                and often causes “responsivlik” problemləri (content gizlənir, scroll olmur).
              */}
              <div id="wrapper">
                <Header />
                
                {children}

                <Footer />
              </div>
            </AuthProvider>
          </NextAuthProvider>
        </StoreProvider>
        {/* Wrapper / End */}

        
        {/* Scripts */}
        <Script src="/js/jquery-3.4.1.min.js" strategy="beforeInteractive" />
        <Script src="/js/jquery-migrate-3.1.0.min.js" strategy="beforeInteractive" />
        <Script id="jquery-fix" strategy="afterInteractive">
          {`
            if (typeof window.jQuery !== 'undefined') {
              window.$ = window.jQuery;
            }
          `}
        </Script>
        <Script src="/js/mmenu.min.js" strategy="lazyOnload" />
        <Script src="/js/tippy.all.min.js" strategy="lazyOnload" />
        <Script src="/js/simplebar.min.js" strategy="lazyOnload" />
        <Script src="/js/bootstrap-slider.min.js" strategy="lazyOnload" />
        <Script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.bundle.min.js" strategy="afterInteractive" />
        <Script src="/js/snackbar.js" strategy="lazyOnload" />
        <Script src="/js/clipboard.min.js" strategy="lazyOnload" />
        <Script src="/js/counterup.min.js" strategy="lazyOnload" />
        <Script src="/js/magnific-popup.min.js" strategy="lazyOnload" />
        <Script src="/js/slick.min.js" strategy="lazyOnload" />
        <Script src="/js/custom.js?v=1.1.71" strategy="lazyOnload" />
        <Script src="/js/bootstrap-select.min.js" strategy="beforeInteractive" />
        <Script src="https://cdn.jsdelivr.net/npm/lozad/dist/lozad.min.js" strategy="lazyOnload" />
        <Script id="lozad-init" strategy="lazyOnload">
          {`
            const observer = lozad();
            observer.observe();
          `}
        </Script>
        <Script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js" strategy="lazyOnload" />
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/Dropify/0.2.2/js/dropify.min.js" strategy="lazyOnload" />
        <Script src="https://accounts.google.com/gsi/client" strategy="beforeInteractive" />
      </body>
    </html>
  );
}

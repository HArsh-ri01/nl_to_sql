import './globals.css';
import Script from 'next/script';

export const metadata = {
  title: "Ask Cricket",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-BS7BNJV6QY"
        />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-BS7BNJV6QY');
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  );
}

import './globals.css';


export const metadata = {
  title: "Ask Cricket",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

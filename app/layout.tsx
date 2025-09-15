import '@/styles/globals.css';
import { Inter } from 'next/font/google';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import DemoBadge from '@/components/DemoBadge';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'iWatt.club - El club de la energía inteligente',
  description: 'Únete a la comunidad de energía inteligente y optimiza tu consumo mientras contribuyes a un futuro más sostenible.',
  keywords: 'energía, IoT, sostenibilidad, consumo inteligente, eficiencia energética',
  authors: [{ name: 'iWatt.club Team' }],
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${inter.className} min-h-screen bg-gray-50`}>
        <div className="flex flex-col min-h-screen">
          <Nav />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
        <DemoBadge />
      </body>
    </html>
  );
}
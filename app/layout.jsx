import '../styles/globals.css';
import { Pacifico } from 'next/font/google';

// Initialize the Pacifico font
const pacifico = Pacifico({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-pacifico',
});

export const metadata = {
    title: {
        template: '%s | Vibe',
        default: 'VIBE - AI-Marketing Newsletter'
    },
    icons: {
        icon: '/favicon.svg'
    }
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" className={`${pacifico.variable}`}>
            <body className="antialiased text-white bg-[#030303]">
                <div className="flex flex-col min-h-screen">
                    <main className="grow">{children}</main>
                </div>
            </body>
        </html>
    );
}

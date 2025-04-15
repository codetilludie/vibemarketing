import '../styles/globals.css';

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
        <html lang="en">
            <body className="antialiased text-white bg-[#030303]">
                <div className="flex flex-col min-h-screen">
                    <main className="grow">{children}</main>
                </div>
            </body>
        </html>
    );
}

'use client';
import { useEffect } from 'react';

export default function Home() {
  // Newsletter Form Logic
  useEffect(() => {
    const form = document.getElementById('newsletter-form');
    const emailInput = document.getElementById('email-input');
    const submitButton = document.getElementById('submit-button');
    const buttonText = document.getElementById('button-text');
    const buttonSuccess = document.getElementById('button-success');

    if (form && emailInput && submitButton && buttonText && buttonSuccess) {
      const handleSubmit = (e) => {
        e.preventDefault(); // Prevent actual form submission

        if (form.checkValidity()) { // Basic HTML5 validation
          // Disable button and show success state
          submitButton.disabled = true;
          buttonText.classList.add('hidden');
          buttonSuccess.classList.remove('hidden');
          buttonSuccess.classList.add('flex'); // Make sure flex is applied

          // Simulate sending data (replace with actual API call if needed)
          console.log('Subscribing email:', emailInput.value);

          // Reset form after 3 seconds
          setTimeout(() => {
            emailInput.value = ''; // Clear input
            submitButton.disabled = false;
            buttonText.classList.remove('hidden');
            buttonSuccess.classList.add('hidden');
            buttonSuccess.classList.remove('flex');
          }, 3000);
        }
      };

      form.addEventListener('submit', handleSubmit);
      
      // Cleanup
      return () => {
        form.removeEventListener('submit', handleSubmit);
      };
    }
  }, []);
  
  return (
    <>
      <div className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.05] via-transparent to-rose-500/[0.05] blur-3xl"></div>

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="shape-initial"
            style={{
              left: '-5%', top: '15%',
              '--delay': '0.3s',
              '--initial-rotate': '-10deg',
              '--final-rotate': '5deg',
              '--shape-size': '250px',
              '--float-rotate': '-4deg',
            }}>
            <div className="shape-float-inner">
              <div className="geometric-shape shape-circle" style={{'--shape-gradient': 'linear-gradient(to right, rgba(139, 92, 246, 0.15), transparent)'}}></div>
            </div>
          </div>
          <div
            className="shape-initial"
            style={{
              right: '0%', top: '65%',
              '--delay': '0.5s',
              '--initial-rotate': '30deg',
              '--final-rotate': '-10deg',
              '--shape-size': '180px',
              '--float-rotate': '5deg',
            }}>
            <div className="shape-float-inner">
              <div className="geometric-shape shape-square" style={{'--shape-gradient': 'linear-gradient(to left, rgba(244, 63, 94, 0.15), transparent)'}}></div>
            </div>
          </div>
          <div
            className="shape-initial"
            style={{
              left: '10%', bottom: '10%',
              '--delay': '0.4s',
              '--initial-rotate': '-20deg',
              '--final-rotate': '8deg',
              '--shape-size': '120px',
              '--float-rotate': '2deg',
            }}>
            <div className="shape-float-inner">
              <div className="geometric-shape shape-circle" style={{'--shape-gradient': 'linear-gradient(to top, rgba(167, 139, 250, 0.15), transparent)'}}></div>
            </div>
          </div>
          <div
            className="shape-initial"
            style={{
              right: '20%', top: '15%',
              '--delay': '0.6s',
              '--initial-rotate': '15deg',
              '--final-rotate': '-5deg',
              '--shape-size': '90px',
              '--float-rotate': '-6deg',
            }}>
            <div className="shape-float-inner">
              <div className="geometric-shape shape-square" style={{'--shape-gradient': 'linear-gradient(to bottom, rgba(251, 191, 36, 0.15), transparent)'}}></div>
            </div>
          </div>
          <div
            className="shape-initial"
            style={{
              left: '25%', top: '5%',
              '--delay': '0.7s',
              '--initial-rotate': '-40deg',
              '--final-rotate': '15deg',
              '--shape-size': '60px',
              '--float-rotate': '7deg',
            }}>
            <div className="shape-float-inner">
              <div className="geometric-shape shape-circle" style={{'--shape-gradient': 'linear-gradient(135deg, rgba(6, 182, 212, 0.15), transparent)'}}></div>
            </div>
          </div>
        </div>

        <div className="relative z-10 container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <div className="fade-up-element inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] mb-8 md:mb-12" style={{'--delay': '0.5s'}}>
              <img src="https://kokonutui.com/logo.svg" alt="Kokonut UI Logo" width="20" height="20" className="rounded-full" onError={(e) => { e.target.style.display='none'; e.target.parentElement.classList.add('gap-0');}} /> <span className="text-sm text-white/60 tracking-wide">Kokonut UI</span>
            </div>

            <div className="fade-up-element" style={{'--delay': '0.7s'}}>
              <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-6 md:mb-8 tracking-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80">Get the</span>
                <br />
                <span className="font-pacifico bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300">
                  VIBE
                </span>
              </h1>
            </div>

            <div className="fade-up-element" style={{'--delay': '0.9s'}}>
              <p className="text-base sm:text-lg md:text-xl text-white/40 mb-8 leading-relaxed font-light tracking-wide max-w-xl mx-auto px-4">
                Cutting-edge AI-Marketing. Wöchentlich. Exklusiv.
              </p>
            </div>

            <div className="fade-up-element" style={{'--delay': '1.1s'}}>
              <div className="max-w-md mx-auto">
                <form id="newsletter-form" className="relative">
                  <div className="flex gap-2 p-1.5 rounded-full bg-white/[0.03] border border-white/[0.08]">
                    <input
                      type="email"
                      id="email-input"
                      placeholder="Enter your email"
                      required
                      className="custom-input flex-grow bg-transparent border-0 text-white/80 placeholder:text-white/30 px-4 py-2 focus:ring-0 focus:outline-none"
                    />
                    <button
                      type="submit"
                      id="submit-button"
                      className="rounded-full px-4 py-2 bg-gradient-to-r from-indigo-500 to-rose-500 hover:from-indigo-600 hover:to-rose-600 text-white transition-all duration-300 ease-in-out disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      <span id="button-text">Subscribe</span>
                      <span id="button-success" className="hidden items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg>
                        Subscribed
                      </span>
                    </button>
                  </div>
                  <div className="mt-2 text-xs text-white/30 text-center">
                    Nur für innovative Marketer. Kein Grundlagen-Content. Jederzeit abbestellbar.
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#030303] via-[#030303]/80 to-transparent pointer-events-none"></div>
      </div>

      <section className="py-16 md:py-24 relative z-10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="fade-up-element text-center mb-12 md:mb-16" style={{'--delay': '0.2s'}}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300">
                Blog
              </span>
            </h2>
            <p className="text-lg text-white/50 max-w-2xl mx-auto">
              Latest news, insights, and thoughts on design and technology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <article className="fade-up-element blog-card rounded-lg overflow-hidden p-6" style={{'--delay': '0.4s'}}>
              <img src="https://placehold.co/600x400/1f2937/9ca3af?text=Blog+Post+1" alt="Blog Post 1 Thumbnail" className="w-full h-48 object-cover rounded-md mb-4" onError={(e) => e.src='https://placehold.co/600x400/111827/4b5563?text=Image+Not+Found'} />
              <h3 className="text-xl font-semibold mb-2 text-white/90">The Future of Web Animation</h3>
              <p className="text-white/60 text-sm mb-4 line-clamp-3">Explore the latest trends and techniques in web animation, from CSS transitions to advanced JavaScript libraries...</p>
              <a href="#" className="text-indigo-400 hover:text-indigo-300 text-sm font-medium">Read More &rarr;</a>
            </article>

            <article className="fade-up-element blog-card rounded-lg overflow-hidden p-6" style={{'--delay': '0.6s'}}>
              <img src="https://placehold.co/600x400/1f2937/9ca3af?text=Blog+Post+2" alt="Blog Post 2 Thumbnail" className="w-full h-48 object-cover rounded-md mb-4" onError={(e) => e.src='https://placehold.co/600x400/111827/4b5563?text=Image+Not+Found'} />
              <h3 className="text-xl font-semibold mb-2 text-white/90">Designing for Accessibility</h3>
              <p className="text-white/60 text-sm mb-4 line-clamp-3">Learn why accessibility matters and how to create inclusive digital experiences for everyone, covering WCAG guidelines...</p>
              <a href="#" className="text-indigo-400 hover:text-indigo-300 text-sm font-medium">Read More &rarr;</a>
            </article>

            <article className="fade-up-element blog-card rounded-lg overflow-hidden p-6" style={{'--delay': '0.8s'}}>
              <img src="https://placehold.co/600x400/1f2937/9ca3af?text=Blog+Post+3" alt="Blog Post 3 Thumbnail" className="w-full h-48 object-cover rounded-md mb-4" onError={(e) => e.src='https://placehold.co/600x400/111827/4b5563?text=Image+Not+Found'} />
              <h3 className="text-xl font-semibold mb-2 text-white/90">Mastering Dark Mode UI</h3>
              <p className="text-white/60 text-sm mb-4 line-clamp-3">Tips and best practices for designing effective and visually appealing dark mode interfaces that reduce eye strain...</p>
              <a href="#" className="text-indigo-400 hover:text-indigo-300 text-sm font-medium">Read More &rarr;</a>
            </article>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white/[0.02] border-t border-white/[0.05] relative z-10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="fade-up-element text-center mb-10 md:mb-12" style={{'--delay': '0.2s'}}>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-300 via-white/90 to-indigo-300">
                Connect With Us
              </span>
            </h2>
            <p className="text-lg text-white/50">Follow us on social media for updates and inspiration.</p>
          </div>

          <div className="fade-up-element flex justify-center items-center gap-6 md:gap-8" style={{'--delay': '0.4s'}}>
            <a href="#" title="Twitter" className="text-white/60 hover:text-white social-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="#" title="GitHub" className="text-white/60 hover:text-white social-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            </a>
            <a href="#" title="LinkedIn" className="text-white/60 hover:text-white social-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
            <a href="#" title="Dribbble" className="text-white/60 hover:text-white social-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12c6.627 0 12-5.373 12-12S18.627 0 12 0zm6.663 15.867c-1.167 2.97-4.045 5.018-7.345 5.093-.17-.004-.34-.01-.51-.024-3.14-.176-5.887-1.95-7.497-4.536-.303-.483-.43-1.038-.333-1.596.11-.63.497-1.17.99-1.528.54-.39.98-.99 1.174-1.65l.06-.21c.19-.66.62-1.25 1.16-1.64.54-.39 1.2-.6 1.88-.55l.22.015c.68.05 1.33.34 1.82.8.49.46.8 1.08.88 1.75l.02.19c.08.67-.1 1.35-.5 1.89-.4.54-.96.9-1.59.99l-.19.03c-.63.1-1.25-.06-1.78-.45-.53-.39-.88-.96-.96-1.6l-.02-.18c-.08-.64.1-1.28.5-1.76.4-.48 1.04-.78 1.68-.78.64 0 1.28.3 1.68.78.4.48.58 1.12.5 1.76l-.02.18c-.08.64-.43 1.21-.96 1.6-.53.39-1.15.55-1.78.45l-.19-.03c-.63-.1-1.19-.45-1.59-.99-.4-.54-.58-1.22-.5-1.89l.02-.19c.08-.67.39-1.29.88-1.75.49-.46 1.14-.75 1.82-.8l.22-.015c.68-.05 1.34.16 1.88.55.54.39.97.98 1.16 1.64l.06.21c.19.66.63 1.26 1.17 1.65.49.36.88.9 1 1.53.09.56-.03 1.11-.33 1.59-.24.37-.57.74-.96 1.06-.54.44-1.12.7-1.72.7-.6 0-1.18-.14-1.72-.4-.54-.26-1.03-.62-1.46-.96-.43-.44-.76-.95-1-1.52-.24-.57-.36-1.18-.36-1.8 0-.62.12-1.23.36-1.8.24-.57.57-1.08 1-1.52.43-.44.92-.8 1.46-1.06.54-.26 1.12-.4 1.72-.4.6 0 1.18.14 1.72.4.54.26 1.03.62 1.46.96.43.44.76.95 1 1.52.24.57.36 1.18.36 1.8 0 .62-.12 1.23-.36 1.8z"/></svg>
            </a>
          </div>
        </div>
      </section>

      <footer className="py-8 text-center text-white/40 text-sm relative z-10">
        <div className="container mx-auto px-4 md:px-6">
          &copy; 2025 Your Company Name. All rights reserved.
        </div>
      </footer>
    </>
  );
}

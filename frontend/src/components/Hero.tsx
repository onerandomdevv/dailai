import Link from 'next/link';
import Image from 'next/image';
import ThemeToggle from './ThemeToggle';
import CallButton from './CallButton';

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-blue-700 via-indigo-900 to-black dark:from-gray-900 dark:via-blue-950 dark:to-black text-white min-h-[90vh] flex flex-col justify-center items-center text-center px-4 overflow-hidden transition-colors duration-500">
      
      {/* Theme Toggle */}
      <div className="absolute top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Abstract Gradient Orbs */}
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-[100px] animate-pulse delay-700"></div>

        {/* Floating Icons */}
        <div className="absolute top-20 left-10 opacity-10 animate-float-slow">
           <Image src="/globe.svg" alt="Global" width={100} height={100} />
        </div>
        <div className="absolute bottom-20 right-10 opacity-10 animate-float-delayed">
           <Image src="/window.svg" alt="Tech" width={80} height={80} />
        </div>
        <div className="absolute top-1/2 left-10 opacity-5 animate-float-slower">
           <Image src="/file.svg" alt="Data" width={60} height={60} />
        </div>

        {/* Central Logo Background */}
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-[800px] h-[800px]">
                <Image 
                src="/logo.jpg" 
                alt="DialAI Pattern" 
                fill
                className="object-contain opacity-5 dark:opacity-10 blur-sm mix-blend-overlay"
                priority
                />
            </div>
        </div>
      </div>

      <div className="relative z-10 animate-fade-in-up flex flex-col items-center max-w-4xl">
        {/* Main Logo Badge */}
        <div className="mb-10 p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_0_50px_rgba(59,130,246,0.5)]">
          <div className="bg-white rounded-full p-4 overflow-hidden w-28 h-28 md:w-36 md:h-36 flex items-center justify-center shadow-inner">
             <Image 
              src="/logo.jpg" 
              alt="DialAI Logo" 
              width={140} 
              height={140} 
              className="object-contain hover:scale-110 transition-transform duration-500"
              priority
            />
          </div>
        </div>

        <h1 className="text-6xl md:text-8xl font-extrabold mb-6 tracking-tight drop-shadow-2xl text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200">
          DialAI
        </h1>
        
        <p className="text-2xl md:text-3xl mb-12 font-light text-blue-100/90 leading-relaxed drop-shadow-md">
          AI-powered USSD assistant for <span className="font-semibold text-white">Health</span>, <span className="font-semibold text-white">Translation</span> & <span className="font-semibold text-white">Guidance</span>.
          <br className="hidden md:block" />
          <span className="text-lg md:text-xl mt-4 block text-blue-200/80 uppercase tracking-widest">Bridging the digital divide</span>
        </p>

        <div className="flex gap-4 flex-col sm:flex-row">
            <CallButton />
            <Link 
            href="#demo" 
            className="bg-transparent border-2 border-white/30 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white/10 hover:border-white hover:scale-105 transform transition duration-300 backdrop-blur-sm"
            >
            Watch Demo
            </Link>
        </div>
      </div>
    </section>
  );
}

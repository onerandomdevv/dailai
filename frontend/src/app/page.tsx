import Hero from "@/components/Hero";
import About from "@/components/About";
import Flow from "@/components/Flow";
import Features from "@/components/Features";
import Manual from "@/components/Manual";
import Demo from "@/components/Demo";
import StatusIndicator from "@/components/StatusIndicator";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      <Hero />
      <About />
      <Flow />
      <Features />
      <Manual />
      <Demo />
      <StatusIndicator />
      
      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-black text-gray-400 py-8 text-center text-sm transition-colors duration-300">
        <p>&copy; {new Date().getFullYear()} DialAI. Built for Hackathon.</p>
        <div className="flex justify-center gap-4 mt-4 text-xs uppercase tracking-widest opacity-70">
            <span>Node.js</span>
            <span>•</span>
            <span>USSD</span>
             <span>•</span>
            <span>Gemini AI</span>
             <span>•</span>
            <span>Africa's Talking</span>
        </div>
      </footer>
    </main>
  );
}

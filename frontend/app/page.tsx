import Hero from './components/Hero'
import WhatIsDialAI from './components/WhatIsDialAI'
import HowItWorks from './components/HowItWorks'
import Features from './components/Features'
import Manual from './components/Manual'
import Demo from './components/Demo'
import TechStack from './components/TechStack'
import Footer from './components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* What is DialAI Section */}
      <WhatIsDialAI />

      {/* How DialAI Works Section */}
      <HowItWorks />

      {/* Features Section */}
      <Features />

      {/* How to Use Manual */}
      <Manual />

      {/* Demo Section */}
      <Demo />

      {/* Tech Stack */}
      <TechStack />

      {/* Footer */}
      <Footer />
    </main>
  )
}

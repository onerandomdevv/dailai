/**
 * Premium Hero Section with Glassmorphism and Animations
 */
import Image from 'next/image'

export default function Hero() {
    return (
        <section className="relative animated-gradient text-white py-32 px-6 overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-dialai-orange opacity-20 rounded-full blur-3xl float"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400 opacity-20 rounded-full blur-3xl float" style={{ animationDelay: '2s' }}></div>
            </div>

            <div className="max-w-6xl mx-auto text-center relative z-10">
                {/* Logo with glow effect */}
                <div className="flex items-center justify-center mb-8">
                    <div className="relative w-80 h-24 glow">
                        <Image
                            src="/logo.png"
                            alt="DialAI Logo"
                            fill
                            className="object-contain drop-shadow-2xl"
                            priority
                        />
                    </div>
                </div>

                {/* Glassmorphism card for tagline */}
                <div className="glass rounded-3xl p-8 mb-8 max-w-4xl mx-auto backdrop-blur-xl">
                    <p className="text-2xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-100 to-dialai-orange">
                        AI-powered USSD assistant for health, translation & guidance
                    </p>
                    <p className="text-lg md:text-xl opacity-90">
                        Bringing the power of AI to every phone in Africa — <span className="font-bold text-dialai-orange">no internet required</span>
                    </p>
                </div>

                {/* Premium CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                    <a
                        href="#how-it-works"
                        className="group relative bg-gradient-to-r from-dialai-orange to-dialai-orange-light px-10 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-all shadow-2xl overflow-hidden"
                    >
                        <span className="relative z-10">See How It Works</span>
                        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
                    </a>
                    <a
                        href="#demo"
                        className="glass-dark px-10 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-all border-2 border-white/30 hover:border-dialai-orange shadow-2xl"
                    >
                        View Live Demo
                    </a>
                </div>

                {/* Floating stats */}
                <div className="grid grid-cols-3 gap-6 mt-16 max-w-3xl mx-auto">
                    {[
                        { value: '0 MB', label: 'Data Required', icon: '📡' },
                        { value: '3', label: 'Access Channels', icon: '🔗' },
                        { value: '5+', label: 'Languages', icon: '🌍' },
                    ].map((stat, i) => (
                        <div key={i} className="glass rounded-2xl p-6 card-hover">
                            <div className="text-4xl mb-2">{stat.icon}</div>
                            <div className="text-3xl font-bold text-dialai-orange mb-1">{stat.value}</div>
                            <div className="text-sm opacity-90">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

/**
 * Premium Features Section with Animated Cards
 */
export default function Features() {
    const features = [
        {
            icon: '🏥',
            title: 'Health Assistant',
            description: 'Get safe, non-diagnostic health guidance. AI provides common-sense advice and encourages professional help when needed.',
            points: ['Symptom guidance', 'First aid tips', '24-hour follow-ups'],
            gradient: 'from-red-500 to-pink-500',
        },
        {
            icon: '🌐',
            title: 'Multi-Language Translator',
            description: 'Instant translation between English and African languages including Pidgin, Yoruba, Hausa, Swahili, and Zulu.',
            points: ['5 African languages', 'Voice & text support', 'Context-aware translation'],
            gradient: 'from-blue-500 to-cyan-500',
        },
        {
            icon: '📚',
            title: 'Guided Assistant',
            description: 'Step-by-step practical guidance on health tips, life hacks, and event planning — delivered in simple, encouraging language.',
            points: ['5-step instructions', 'No technical jargon', 'SMS-friendly format'],
            gradient: 'from-purple-500 to-pink-500',
        },
        {
            icon: '📞',
            title: 'Voice AI',
            description: 'Call and speak your question. Gemini listens to your audio and responds with calm, natural spoken advice.',
            points: ['Natural conversation', 'Audio processing', 'DTMF menu navigation'],
            gradient: 'from-orange-500 to-yellow-500',
        },
    ]

    return (
        <section id="features" className="py-24 px-6 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-dialai-blue opacity-5 rounded-full blur-3xl"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-dialai-blue to-dialai-orange">
                        Core Features
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-dialai-orange to-dialai-blue mx-auto rounded-full"></div>
                </div>

                {/* Premium Feature Cards Grid */}
                <div className="grid md:grid-cols-2 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="group relative">
                            {/* Glow effect */}
                            <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-all duration-500`}></div>

                            {/* Card */}
                            <div className="relative bg-white rounded-3xl p-8 shadow-2xl card-hover border border-gray-100 overflow-hidden">
                                {/* Background pattern */}
                                <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
                                    <div className={`w-full h-full bg-gradient-to-br ${feature.gradient} rounded-full blur-2xl`}></div>
                                </div>

                                {/* Content */}
                                <div className="relative z-10">
                                    {/* Icon with gradient background */}
                                    <div className={`inline-block p-4 rounded-2xl bg-gradient-to-r ${feature.gradient} mb-6 shadow-lg`}>
                                        <div className="text-5xl">{feature.icon}</div>
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-2xl font-bold mb-4 text-gray-900">{feature.title}</h3>

                                    {/* Description */}
                                    <p className="text-gray-600 mb-6 leading-relaxed text-lg">{feature.description}</p>

                                    {/* Feature Points */}
                                    <ul className="space-y-3">
                                        {feature.points.map((point, i) => (
                                            <li key={i} className="flex items-center gap-3">
                                                <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${feature.gradient} flex items-center justify-center flex-shrink-0`}>
                                                    <span className="text-white text-sm font-bold">✓</span>
                                                </div>
                                                <span className="text-gray-700 font-medium">{point}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

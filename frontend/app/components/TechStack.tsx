/**
 * Premium Tech Stack with Animated Icons
 */
export default function TechStack() {
    const technologies = [
        { icon: '⚙️', name: 'Node.js + Express', description: 'Lightweight backend', gradient: 'from-green-500 to-emerald-500' },
        { icon: '🤖', name: 'Google Gemini 2.0', description: 'AI reasoning & speech', gradient: 'from-blue-500 to-purple-500' },
        { icon: '📡', name: "Africa's Talking", description: 'USSD, Voice & SMS', gradient: 'from-orange-500 to-red-500' },
        { icon: '🛡️', name: 'Safety First', description: 'Rate limiting & guardrails', gradient: 'from-cyan-500 to-blue-500' },
    ]

    return (
        <section id="tech" className="py-24 px-6 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-dialai-blue opacity-5 rounded-full blur-3xl"></div>

            <div className="max-w-6xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-dialai-orange to-dialai-blue">
                        Built With
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-dialai-blue to-dialai-orange mx-auto rounded-full"></div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {technologies.map((tech, index) => (
                        <div key={index} className="group relative">
                            <div className={`absolute inset-0 bg-gradient-to-r ${tech.gradient} rounded-3xl blur-lg opacity-0 group-hover:opacity-30 transition-all duration-500`}></div>
                            <div className="relative bg-white rounded-3xl p-8 shadow-xl card-hover text-center border border-gray-100">
                                <div className={`inline-block p-4 rounded-2xl bg-gradient-to-r ${tech.gradient} mb-6 shadow-lg transform group-hover:scale-110 transition-transform`}>
                                    <div className="text-5xl">{tech.icon}</div>
                                </div>
                                <h4 className="font-bold text-xl mb-2 text-gray-900">{tech.name}</h4>
                                <p className="text-gray-600 font-medium">{tech.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

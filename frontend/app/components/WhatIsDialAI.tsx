/**
 * Premium What is DialAI Section with 3D Cards
 */
export default function WhatIsDialAI() {
    return (
        <section id="what-is" className="py-24 px-6 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-dialai-blue opacity-5 rounded-full blur-3xl"></div>

            <div className="max-w-6xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-dialai-blue to-dialai-orange">
                        What is DialAI?
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-dialai-orange to-dialai-blue mx-auto rounded-full"></div>
                </div>

                {/* 3D Problem & Solution Cards */}
                <div className="grid md:grid-cols-2 gap-8 mb-20">
                    {/* Problem Card */}
                    <div className="group relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 rounded-3xl blur opacity-25 group-hover:opacity-40 transition-opacity"></div>
                        <div className="relative bg-white border-l-4 border-red-500 p-10 rounded-3xl shadow-2xl card-hover">
                            <div className="text-6xl mb-4">🌍</div>
                            <h3 className="text-3xl font-bold mb-4 text-gray-900">The Problem</h3>
                            <p className="text-gray-700 text-lg leading-relaxed">
                                Over <span className="font-bold text-red-600">600 million people</span> in Africa lack reliable internet access,
                                but almost everyone has a mobile phone. For them, the AI revolution is out of reach.
                            </p>
                        </div>
                    </div>

                    {/* Solution Card */}
                    <div className="group relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-blue-500 rounded-3xl blur opacity-25 group-hover:opacity-40 transition-opacity"></div>
                        <div className="relative bg-white border-l-4 border-green-500 p-10 rounded-3xl shadow-2xl card-hover">
                            <div className="text-6xl mb-4">💡</div>
                            <h3 className="text-3xl font-bold mb-4 text-gray-900">Our Solution</h3>
                            <p className="text-gray-700 text-lg leading-relaxed">
                                DialAI bridges the digital divide by bringing <span className="font-bold text-dialai-blue">Google Gemini AI</span> to
                                any basic phone through USSD, Voice, and SMS — <span className="font-bold text-dialai-orange">zero data required</span>.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Animated Impact Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { number: '0', label: 'Data Required', gradient: 'from-blue-500 to-cyan-500', icon: '📡' },
                        { number: '3', label: 'Access Channels', gradient: 'from-purple-500 to-pink-500', icon: '🔗' },
                        { number: '5', label: 'African Languages', gradient: 'from-orange-500 to-red-500', icon: '🌍' },
                    ].map((stat, i) => (
                        <div key={i} className="relative group">
                            <div className={`absolute inset-0 bg-gradient-to-r ${stat.gradient} rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity`}></div>
                            <div className="relative bg-white rounded-2xl p-8 shadow-xl card-hover text-center">
                                <div className="text-5xl mb-3">{stat.icon}</div>
                                <div className={`text-6xl font-black mb-2 bg-clip-text text-transparent bg-gradient-to-r ${stat.gradient}`}>
                                    {stat.number}
                                </div>
                                <div className="text-gray-600 font-semibold text-lg">{stat.label}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

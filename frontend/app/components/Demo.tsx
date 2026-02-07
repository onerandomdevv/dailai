/**
 * Premium Demo Section with 3D Phone Mockups
 */
export default function Demo() {
    return (
        <section id="demo" className="py-24 px-6 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-dialai-orange opacity-10 rounded-full blur-3xl"></div>

            <div className="max-w-6xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-dialai-orange to-dialai-blue">
                        Live Demo
                    </h2>
                    <p className="text-2xl text-gray-600 font-medium">See DialAI in action</p>
                    <div className="w-24 h-1 bg-gradient-to-r from-dialai-blue to-dialai-orange mx-auto rounded-full mt-4"></div>
                </div>

                {/* 3D Phone Mockups */}
                <div className="grid md:grid-cols-2 gap-16 mb-16">
                    {/* USSD Menu */}
                    <div className="text-center group">
                        <h3 className="text-2xl font-bold mb-8 text-gray-900">USSD Menu</h3>
                        <div className="relative inline-block">
                            {/* Glow effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-dialai-blue to-dialai-orange rounded-[50px] blur-2xl opacity-30 group-hover:opacity-50 transition-opacity"></div>

                            {/* Phone frame */}
                            <div className="relative bg-gradient-to-b from-gray-800 to-gray-900 rounded-[50px] p-3 shadow-2xl transform group-hover:scale-105 transition-transform">
                                <div className="bg-white rounded-[40px] p-8 w-72 h-[500px] flex flex-col">
                                    {/* Status bar */}
                                    <div className="flex justify-between items-center mb-6 text-xs text-gray-400">
                                        <span>9:41</span>
                                        <div className="flex gap-1">
                                            <div className="w-4 h-4">📶</div>
                                            <div className="w-4 h-4">🔋</div>
                                        </div>
                                    </div>

                                    {/* USSD Content */}
                                    <div className="flex-1 flex items-center justify-center">
                                        <div className="font-mono text-left space-y-3 text-lg">
                                            <p className="font-bold text-2xl text-dialai-blue">DialAI</p>
                                            <p className="text-gray-700">1. Health</p>
                                            <p className="text-gray-700">2. Translator</p>
                                            <p className="text-gray-700">3. Guide</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* SMS Response */}
                    <div className="text-center group">
                        <h3 className="text-2xl font-bold mb-8 text-gray-900">Sample SMS Response</h3>
                        <div className="relative inline-block">
                            {/* Glow effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-dialai-orange to-dialai-blue rounded-[50px] blur-2xl opacity-30 group-hover:opacity-50 transition-opacity"></div>

                            {/* Phone frame */}
                            <div className="relative bg-gradient-to-b from-gray-800 to-gray-900 rounded-[50px] p-3 shadow-2xl transform group-hover:scale-105 transition-transform">
                                <div className="bg-white rounded-[40px] p-8 w-72 h-[500px] flex flex-col">
                                    {/* Status bar */}
                                    <div className="flex justify-between items-center mb-6 text-xs text-gray-400">
                                        <span>9:41</span>
                                        <div className="flex gap-1">
                                            <div className="w-4 h-4">📶</div>
                                            <div className="w-4 h-4">🔋</div>
                                        </div>
                                    </div>

                                    {/* SMS Bubble */}
                                    <div className="flex-1 flex items-center justify-center">
                                        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-6 text-sm text-left shadow-lg border border-gray-200">
                                            <p className="font-bold text-dialai-orange mb-3 text-base">💬 DialAI Health</p>
                                            <p className="text-gray-800 leading-relaxed">
                                                I am sorry to hear that you are dealing with a headache today. Since it feels mild, you might find some relief by drinking a large glass of water and resting in a quiet, dark room for a while.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Premium CTA */}
                <div className="relative group max-w-3xl mx-auto">
                    <div className="absolute inset-0 bg-gradient-to-r from-dialai-blue to-dialai-orange rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
                    <div className="relative bg-gradient-brand text-white rounded-3xl p-10 text-center shadow-2xl">
                        <p className="text-3xl font-bold mb-4">Try it yourself!</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-lg">
                            <div className="flex items-center gap-2">
                                <span>📱 Dial</span>
                                <code className="bg-white/20 px-4 py-2 rounded-lg font-mono font-bold">*347*157#</code>
                            </div>
                            <span className="hidden sm:inline">or</span>
                            <div className="flex items-center gap-2">
                                <span>📞 Call</span>
                                <code className="bg-white/20 px-4 py-2 rounded-lg font-mono font-bold">+2342017000885</code>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

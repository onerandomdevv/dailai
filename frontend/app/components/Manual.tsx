/**
 * Premium Manual Section with Gradient Cards
 */
export default function Manual() {
    return (
        <section id="manual" className="py-24 px-6 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
            <div className="absolute top-1/2 left-0 w-96 h-96 bg-dialai-orange opacity-5 rounded-full blur-3xl"></div>

            <div className="max-w-5xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-dialai-blue to-dialai-orange">
                        How to Use DialAI
                    </h2>
                    <p className="text-2xl text-gray-600 font-medium">A simple manual for anyone to get started</p>
                    <div className="w-24 h-1 bg-gradient-to-r from-dialai-orange to-dialai-blue mx-auto rounded-full mt-4"></div>
                </div>

                {/* USSD Option */}
                <div className="group relative mb-10">
                    <div className="absolute inset-0 bg-gradient-to-r from-dialai-orange to-dialai-blue rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity"></div>
                    <div className="relative bg-white rounded-3xl p-10 shadow-2xl border border-gray-100">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-16 h-16 bg-gradient-to-r from-dialai-orange to-dialai-orange-light rounded-2xl flex items-center justify-center text-3xl shadow-lg">
                                📱
                            </div>
                            <h3 className="text-3xl font-bold text-dialai-orange">Option 1: USSD (Text Menu)</h3>
                        </div>

                        <ol className="space-y-5">
                            {[
                                'Dial *347*157# on your phone',
                                'Select 1 for Health, 2 for Translator, or 3 for Guide',
                                'Type your question or symptom',
                                'Wait for the SMS response (usually within 5 seconds)',
                                'If you selected Health, you\'ll receive a follow-up SMS after 24 hours',
                            ].map((step, index) => (
                                <li key={index} className="flex gap-5 items-start group/item">
                                    <span className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-dialai-orange to-dialai-orange-light text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg group-hover/item:scale-110 transition-transform">
                                        {index + 1}
                                    </span>
                                    <span className="text-lg text-gray-700 pt-2 font-medium">{step}</span>
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>

                {/* Voice Option */}
                <div className="group relative mb-10">
                    <div className="absolute inset-0 bg-gradient-to-r from-dialai-blue to-dialai-blue-light rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity"></div>
                    <div className="relative bg-white rounded-3xl p-10 shadow-2xl border border-gray-100">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-16 h-16 bg-gradient-to-r from-dialai-blue to-dialai-blue-light rounded-2xl flex items-center justify-center text-3xl shadow-lg">
                                📞
                            </div>
                            <h3 className="text-3xl font-bold text-dialai-blue">Option 2: Voice Call (Spoken AI)</h3>
                        </div>

                        <ol className="space-y-5">
                            {[
                                'Call +2342017000885',
                                'Listen to the menu and press 1 for Health or 2 for Translation',
                                'After the beep, speak your question clearly',
                                'Listen to the AI\'s spoken response',
                                'The call will end automatically',
                            ].map((step, index) => (
                                <li key={index} className="flex gap-5 items-start group/item">
                                    <span className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-dialai-blue to-dialai-blue-light text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg group-hover/item:scale-110 transition-transform">
                                        {index + 1}
                                    </span>
                                    <span className="text-lg text-gray-700 pt-2 font-medium">{step}</span>
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>

                {/* Safety Note */}
                <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl blur-lg opacity-20 group-hover:opacity-30 transition-opacity"></div>
                    <div className="relative bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-500 p-8 rounded-2xl shadow-xl">
                        <h4 className="font-bold text-2xl mb-3 text-yellow-900 flex items-center gap-3">
                            <span className="text-3xl">⚠️</span> Important Safety Note
                        </h4>
                        <p className="text-yellow-900 text-lg leading-relaxed">
                            DialAI is <span className="font-bold">NOT a doctor</span>. It provides general guidance only.
                            For serious symptoms, always visit a healthcare professional.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

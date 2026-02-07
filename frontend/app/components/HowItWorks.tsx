/**
 * Premium How It Works with Timeline Design
 */
export default function HowItWorks() {
    const steps = [
        {
            number: 1,
            title: 'User Dials USSD Code',
            description: 'Dial *347*157# from any phone',
            icon: '📱',
            gradient: 'from-blue-500 to-cyan-500',
        },
        {
            number: 2,
            title: 'Select a Service',
            description: 'Choose from Health, Translation, or Guidance',
            icon: '📋',
            gradient: 'from-purple-500 to-pink-500',
        },
        {
            number: 3,
            title: 'AI Processes Request',
            description: 'Google Gemini analyzes the query with strict safety rules',
            icon: '🤖',
            gradient: 'from-orange-500 to-red-500',
        },
        {
            number: 4,
            title: 'Receive SMS Response',
            description: 'Get clear, actionable guidance via text message',
            icon: '💬',
            gradient: 'from-green-500 to-emerald-500',
        },
    ]

    return (
        <section id="how-it-works" className="py-24 px-6 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-dialai-orange opacity-5 rounded-full blur-3xl"></div>

            <div className="max-w-6xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-dialai-orange to-dialai-blue">
                        How DialAI Works
                    </h2>
                    <p className="text-2xl text-gray-600 font-medium">
                        A simple 4-step journey from question to answer
                    </p>
                    <div className="w-24 h-1 bg-gradient-to-r from-dialai-blue to-dialai-orange mx-auto rounded-full mt-4"></div>
                </div>

                {/* Premium Timeline */}
                <div className="space-y-16 max-w-4xl mx-auto">
                    {steps.map((step, index) => (
                        <div key={step.number} className="relative">
                            {/* Connecting line */}
                            {index < steps.length - 1 && (
                                <div className="absolute left-7 top-20 w-1 h-full bg-gradient-to-b from-dialai-orange to-dialai-blue opacity-30"></div>
                            )}

                            <div className="flex gap-8 items-start">
                                {/* Animated Step Number */}
                                <div className="relative flex-shrink-0">
                                    <div className={`absolute inset-0 bg-gradient-to-r ${step.gradient} rounded-full blur-lg opacity-50`}></div>
                                    <div className={`relative w-16 h-16 bg-gradient-to-r ${step.gradient} text-white rounded-full flex items-center justify-center text-2xl font-black shadow-2xl`}>
                                        {step.number}
                                    </div>
                                </div>

                                {/* Step Content Card */}
                                <div className="flex-1 group">
                                    <div className={`absolute inset-0 bg-gradient-to-r ${step.gradient} rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity`}></div>
                                    <div className="relative bg-white rounded-2xl p-8 shadow-xl card-hover border border-gray-100">
                                        <div className="flex items-start gap-4">
                                            <div className="text-5xl">{step.icon}</div>
                                            <div className="flex-1">
                                                <h3 className="text-2xl font-bold mb-2 text-gray-900">{step.title}</h3>
                                                <p className="text-gray-600 text-lg">{step.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

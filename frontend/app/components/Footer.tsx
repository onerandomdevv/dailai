/**
 * Premium Footer with Gradient Background
 */
export default function Footer() {
    return (
        <footer className="relative bg-gradient-to-r from-gray-900 via-dialai-blue to-gray-900 text-white py-16 px-6 overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-dialai-orange opacity-10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-dialai-blue-light opacity-10 rounded-full blur-3xl"></div>

            <div className="max-w-6xl mx-auto text-center relative z-10">
                <div className="mb-6">
                    <div className="inline-block px-6 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                        <p className="text-lg font-semibold">
                            &copy; 2026 <span className="text-dialai-orange font-bold">DialAI</span>
                        </p>
                    </div>
                </div>
                <p className="text-gray-300 text-lg mb-4">Built for Africa's Talking Hackathon</p>
                <p className="text-gray-400 italic text-xl font-light">
                    Bridging the digital divide, <span className="text-dialai-orange font-semibold">one call at a time</span>.
                </p>

                {/* Decorative line */}
                <div className="mt-8 w-48 h-1 bg-gradient-to-r from-transparent via-dialai-orange to-transparent mx-auto rounded-full"></div>
            </div>
        </footer>
    )
}

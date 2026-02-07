const features = [
   { title: 'Health Assistant', desc: 'AI-powered symptom checker via USSD & SMS.', icon: '🩺' },
  { title: 'Deep Translator', desc: 'Instant translation in 5+ languages.', icon: '🌍' },
  { title: 'Voice Interface', desc: 'Talk to DialAI directly via phone call.', icon: '📞' },
  { title: 'Practical Guides', desc: 'Step-by-step assistance for daily tasks.', icon: '💡' },
  { title: 'Offline Access', desc: 'Dial *347*157# - No internet needed.', icon: 'wc' },
];

export default function Features() {
  return (
    <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div key={idx} className="p-6 border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-2xl hover:bg-blue-50 dark:hover:bg-gray-700 transition duration-300 shadow-sm">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="font-bold text-xl mb-2 text-gray-800 dark:text-gray-100">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

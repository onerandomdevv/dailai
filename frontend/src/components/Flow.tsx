const steps = [
  { id: 1, title: 'Dial Code', desc: 'User dials *347*157#' },
  { id: 2, title: 'Select Service', desc: 'Health, Translator, or Guide' },
  { id: 3, title: 'AI Processing', desc: 'Gemini AI analyzes input' },
  { id: 4, title: 'Get SMS', desc: 'Receive instant advice/result' },
];

export default function Flow() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div key={step.id} className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-md text-center hover:shadow-xl transition relative">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4 shadow-lg">
                {step.id}
              </div>
              <h3 className="font-bold text-xl mb-2 text-gray-800 dark:text-gray-100">{step.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

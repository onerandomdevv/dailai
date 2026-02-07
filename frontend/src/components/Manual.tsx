const manualSteps = [
  {
    step: 1,
    action: 'Dial *347*157#',
    desc: 'Initiate the USSD session on your phone.',
  },
  {
    step: 2,
    action: 'Choose a Service',
    desc: 'Reply with:',
    options: [
      '1 for Health Assistant',
      '2 for Translator',
      '3 for Guided Assistant',
    ],
  },
  {
    step: 3,
    action: 'Interact',
    desc: 'Follow the prompts (e.g., enter symptoms or text to translate).',
  },
];

export default function Manual() {
  return (
    <section id="manual" className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">User Manual</h2>
        <div className="space-y-6">
          {manualSteps.map((item) => (
            <div key={item.step} className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-sm flex flex-col md:flex-row gap-6 items-start transition-colors duration-300">
              <div className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 font-bold w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                {item.step}
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-100">{item.action}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-2">{item.desc}</p>
                {item.options && (
                  <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 ml-4">
                    {item.options.map((opt, i) => (
                      <li key={i}>{opt}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

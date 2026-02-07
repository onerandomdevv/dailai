export default function About() {
  return (
    <section className="py-20 px-4 bg-white dark:bg-gray-800 text-center transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">What is DialAI?</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
          DialAI combines the simplicity of USSD with the power of Google Gemini AI.
          It provides life-saving information, language translation, and practical guidance to anyone with a basic phone—no internet required.
        </p>
      </div>
    </section>
  );
}

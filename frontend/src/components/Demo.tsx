export default function Demo() {
  return (
    <section className="py-20 bg-blue-900 dark:bg-black text-white overflow-hidden relative transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 relative z-10 text-center">
        <h2 className="text-3xl font-bold mb-12">See it in Action</h2>
        <div className="flex flex-col md:flex-row justify-center gap-8 items-center">
          {/* USSD Mockup */}
          <div className="bg-gray-800 border-4 border-gray-600 rounded-3xl p-4 w-64 h-96 shadow-2xl flex flex-col relative transform hover:scale-105 transition duration-300">
            <div className="bg-gray-700 h-6 w-1/2 mx-auto rounded-b-xl mb-4"></div>
            <div className="flex-1 bg-black font-mono text-green-400 p-4 text-sm rounded border border-gray-700">
              <p>CON DialAI</p>
              <p>1. Health</p>
              <p>2. Translator</p>
              <p>3. Guide</p>
              <div className="mt-4 border-b border-green-400 w-4 animate-pulse"></div>
            </div>
            <p className="text-center mt-4 text-gray-400 text-sm">USSD Menu</p>
          </div>

          {/* SMS Mockup */}
          <div className="bg-white border-4 border-gray-300 dark:border-gray-600 rounded-3xl p-4 w-64 h-96 shadow-2xl flex flex-col text-gray-800 relative transform hover:scale-105 transition duration-300">
             <div className="bg-gray-200 h-6 w-1/2 mx-auto rounded-b-xl mb-4"></div>
             <div className="flex-1 flex flex-col justify-end space-y-4 p-2 bg-gray-50 rounded border border-gray-100">
                <div className="bg-blue-100 p-3 rounded-lg rounded-bl-none self-start text-sm shadow-sm">
                  <p className="font-bold text-xs text-blue-800 mb-1">DialAI Health</p>
                  Drink water and rest. If headache persists, see a doctor.
                </div>
                <div className="bg-green-100 p-3 rounded-lg rounded-bl-none self-start text-sm shadow-sm">
                   <p className="font-bold text-xs text-green-800 mb-1">DialAI Translate</p>
                   Translation: Jambo, habari yako?
                </div>
             </div>
             <p className="text-center mt-4 text-gray-400 text-sm">SMS Response</p>
          </div>
        </div>
      </div>
    </section>
  );
}

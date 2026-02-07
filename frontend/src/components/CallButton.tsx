'use client';

import { useState } from 'react';
import { initiateCall } from '@/services/api';

export default function CallButton() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showInput, setShowInput] = useState(false);

  const handleCall = async () => {
    if (!phoneNumber) {
      setMessage('Please enter a phone number');
      return;
    }
    
    setLoading(true);
    setMessage(null);

    try {
      const result = await initiateCall(phoneNumber);
      if (result.success) {
        setMessage(`Calling ${phoneNumber}...`);
        setShowInput(false);
      } else {
        setMessage(result.error || 'Failed to initiate call');
      }
    } catch (error) {
      setMessage('An error occurred');
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(null), 5000);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {!showInput ? (
         <button 
          onClick={() => setShowInput(true)}
          className="bg-white text-blue-900 px-10 py-4 rounded-full font-bold text-lg hover:bg-blue-50 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transform transition duration-300 shadow-xl"
        >
          Call Me Now
        </button>
      ) : (
        <div className="flex flex-col gap-2 bg-white/10 p-4 rounded-xl backdrop-blur-md border border-white/20 animate-fade-in-up">
           <input 
            type="tel" 
            placeholder="+234..." 
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:outline-none focus:border-white"
          />
          <div className="flex gap-2">
            <button 
              onClick={handleCall}
              disabled={loading}
              className="flex-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-bold transition disabled:opacity-50"
            >
              {loading ? '...' : 'Call'}
            </button>
             <button 
              onClick={() => setShowInput(false)}
              className="px-4 py-2 rounded-lg bg-red-500/20 hover:bg-red-500/40 text-white transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
     
      {message && (
        <p className="text-sm font-medium text-white bg-black/50 px-3 py-1 rounded-full animate-fade-in">
          {message}
        </p>
      )}
    </div>
  );
}

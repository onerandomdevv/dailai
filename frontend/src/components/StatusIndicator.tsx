'use client';

import { useState, useEffect } from 'react';
import { checkHealth } from '@/services/api';

export default function StatusIndicator() {
  const [status, setStatus] = useState<{ status: string } | null>(null);

  useEffect(() => {
    const fetchStatus = async () => {
      const data = await checkHealth();
      setStatus(data);
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 30000); 

    return () => clearInterval(interval);
  }, []);

  if (!status) return null;

  return (
    <div className={`fixed bottom-4 right-4 z-50 px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-2 ${
      status.status === 'healthy' 
        ? 'bg-green-100 text-green-800 border border-green-200' 
        : 'bg-red-100 text-red-800 border border-red-200'
    }`}>
      <span className={`w-2 h-2 rounded-full ${
        status.status === 'healthy' ? 'bg-green-500 animate-pulse' : 'bg-red-500'
      }`}></span>
      {status.status === 'healthy' ? 'System Online' : 'System Offline'}
    </div>
  );
}

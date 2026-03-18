'use client';

import { useEffect } from 'react';

export function SchedulerProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Start the scheduler when the component mounts
    const startScheduler = async () => {
      try {
        console.log('Starting data collection scheduler...');
        const response = await fetch('/api/scheduler', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'start' })
        });
        
        if (response.ok) {
          const result = await response.json();
          console.log('Scheduler response:', result.message);
        }
      } catch (error) {
        console.error('Failed to start scheduler:', error);
      }
    };

    startScheduler();

    // Cleanup when component unmounts
    return () => {
      console.log('Cleaning up scheduler...');
      // Optionally stop the scheduler on unmount
      fetch('/api/scheduler', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'stop' })
      }).catch(console.error);
    };
  }, []);

  return <>{children}</>;
}

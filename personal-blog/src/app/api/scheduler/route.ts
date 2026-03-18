import { NextResponse } from 'next/server';
import { spawn } from 'child_process';
import path from 'path';

let schedulerInterval: NodeJS.Timeout | null = null;

// Global scheduler state
let isSchedulerRunning = false;

function runDataCollection() {
  const scriptPath = path.join(process.cwd(), 'pyScripts', 'run_data_collection.py');
  
  console.log('Running scheduled data collection...');
  
  const pythonProcess = spawn('python', [scriptPath], {
    cwd: path.join(process.cwd(), 'pyScripts'),
    stdio: 'pipe'
  });

  pythonProcess.stdout.on('data', (data) => {
    console.log(`[Data Collection] ${data.toString().trim()}`);
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`[Data Collection Error] ${data.toString().trim()}`);
  });

  pythonProcess.on('close', (code) => {
    if (code === 0) {
      console.log('[Data Collection] Completed successfully');
    } else {
      console.error(`[Data Collection] Failed with exit code ${code}`);
    }
  });

  pythonProcess.on('error', (error) => {
    console.error(`[Data Collection] Process error: ${error.message}`);
  });
}

function startDataCollectionScheduler() {
  if (isSchedulerRunning) {
    return { message: 'Scheduler already running' };
  }

  // Stop any existing scheduler
  if (schedulerInterval) {
    clearInterval(schedulerInterval);
  }

  // Schedule to run every day at midnight (12:00 AM)
  const scheduleNextRun = () => {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0); // Set to midnight
    
    const timeUntilMidnight = tomorrow.getTime() - now.getTime();
    
    console.log(`Next data collection scheduled for: ${tomorrow.toISOString()}`);
    
    setTimeout(() => {
      runDataCollection();
      // Set up recurring daily runs
      schedulerInterval = setInterval(runDataCollection, 24 * 60 * 60 * 1000); // Every 24 hours
      isSchedulerRunning = true;
    }, timeUntilMidnight);
  };

  scheduleNextRun();
  return { message: 'Scheduler started successfully' };
}

function stopDataCollectionScheduler() {
  if (schedulerInterval) {
    clearInterval(schedulerInterval);
    schedulerInterval = null;
    isSchedulerRunning = false;
    console.log('Data collection scheduler stopped');
    return { message: 'Scheduler stopped' };
  }
  return { message: 'Scheduler was not running' };
}

function triggerDataCollectionNow() {
  console.log('Manual data collection triggered');
  runDataCollection();
  return { message: 'Manual data collection triggered' };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action } = body;

    switch (action) {
      case 'start':
        return NextResponse.json(startDataCollectionScheduler());
      case 'stop':
        return NextResponse.json(stopDataCollectionScheduler());
      case 'trigger':
        return NextResponse.json(triggerDataCollectionNow());
      case 'status':
        return NextResponse.json({ isRunning: isSchedulerRunning });
      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    console.error('Scheduler API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ 
    isRunning: isSchedulerRunning,
    message: isSchedulerRunning ? 'Scheduler is running' : 'Scheduler is not running'
  });
}

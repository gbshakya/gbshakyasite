import { NextResponse } from 'next/server';
import { spawn } from 'child_process';
import path from 'path';

export async function POST() {
  return new Promise((resolve) => {
    const scriptPath = path.join(process.cwd(), 'pyScripts', 'run_data_collection.py');
    
    console.log('Starting data collection script...');
    
    // Spawn Python process
    const pythonProcess = spawn('python', [scriptPath], {
      cwd: path.join(process.cwd(), 'pyScripts'),
      stdio: 'pipe'
    });

    let stdout = '';
    let stderr = '';

    pythonProcess.stdout.on('data', (data) => {
      stdout += data.toString();
      console.log('Python stdout:', data.toString());
    });

    pythonProcess.stderr.on('data', (data) => {
      stderr += data.toString();
      console.error('Python stderr:', data.toString());
    });

    pythonProcess.on('close', (code) => {
      console.log(`Python process exited with code: ${code}`);
      
      if (code === 0) {
        resolve(NextResponse.json({
          success: true,
          message: 'Data collection completed successfully',
          output: stdout,
          timestamp: new Date().toISOString()
        }));
      } else {
        resolve(NextResponse.json({
          success: false,
          message: 'Data collection failed',
          error: stderr,
          output: stdout,
          timestamp: new Date().toISOString()
        }, { status: 500 }));
      }
    });

    pythonProcess.on('error', (error) => {
      console.error('Failed to start Python process:', error);
      resolve(NextResponse.json({
        success: false,
        message: 'Failed to start data collection',
        error: error.message,
        timestamp: new Date().toISOString()
      }, { status: 500 }));
    });

    // Set timeout for long-running processes (30 minutes)
    const timeout = setTimeout(() => {
      pythonProcess.kill('SIGTERM');
      resolve(NextResponse.json({
        success: false,
        message: 'Data collection timed out after 30 minutes',
        timestamp: new Date().toISOString()
      }, { status: 408 }));
    }, 30 * 60 * 1000);

    pythonProcess.on('close', () => {
      clearTimeout(timeout);
    });
  });
}

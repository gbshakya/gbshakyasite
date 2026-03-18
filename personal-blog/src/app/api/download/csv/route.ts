import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'public', 'merolagani_company_info.csv');
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: 'CSV file not found' },
        { status: 404 }
      );
    }

    // Read file stats
    const stats = fs.statSync(filePath);
    
    // Create file stream
    const fileBuffer = fs.readFileSync(filePath);
    
    // Get file modification time
    const lastModified = stats.mtime.toISOString();

    // Create response with proper headers for CSV download
    const response = new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename="merolagani_company_info.csv"',
        'Content-Length': fileBuffer.length.toString(),
        'Last-Modified': lastModified,
        'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
      },
    });

    return response;
  } catch (error) {
    console.error('Error serving CSV file:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

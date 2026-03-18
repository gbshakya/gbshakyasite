import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'public', 'merolagani_company_info.csv');
    
        
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { 
          error: 'Data file not available',
          headers: [],
          rows: [],
          lastUpdated: null,
          totalRows: 0
        },
        { status: 404 }
      );
    }

    // Read CSV file
    const csvContent = fs.readFileSync(filePath, 'utf-8');
    const lines = csvContent.split('\n').filter(line => line.trim());
    
    if (lines.length === 0) {
      return NextResponse.json(
        { 
          error: 'Empty data file',
          headers: [],
          rows: [],
          lastUpdated: null,
          totalRows: 0
        },
        { status: 200 }
      );
    }

    // Parse CSV
    const headers = lines[0].split(',').map(header => header.trim());
    const rows = lines.slice(1).map(line => {
      // This Regex splits by commas but ignores commas inside double quotes
    const values = line.match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g);
      console.log('line = ' + line);
      console.log('values = ' + JSON.stringify(values));

    return values ? values.map(value => value.replace(/"/g, '').trim()) : [];
    
    }).filter(row => row.length > 0 && row.some(cell => cell !== ''));

    

    // Get file modification time
    const stats = fs.statSync(filePath);
    const lastUpdated = stats.mtime.toISOString();

    return NextResponse.json({
      headers,
      rows,
      lastUpdated,
      totalRows: rows.length,
      error: null
    });

  } catch (error) {
    console.error('Error reading market data:', error);
    return NextResponse.json(
      { 
        error: 'Failed to read market data',
        headers: [],
        rows: [],
        lastUpdated: null,
        totalRows: 0
      },
      { status: 500 }
    );
  }
}

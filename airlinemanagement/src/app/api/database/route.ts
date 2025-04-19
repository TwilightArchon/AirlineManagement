import { NextResponse } from 'next/server';
import { query, testConnection } from '@/database/db';

// GET endpoint to test database connection
export async function GET() {
  try {
    const isConnected = await testConnection();
    
    if (isConnected) {
      return NextResponse.json({ status: 'success', message: 'Database connection successful' });
    } else {
      return NextResponse.json(
        { status: 'error', message: 'Database connection failed' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('API route error:', error);
    return NextResponse.json(
      { status: 'error', message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST endpoint to run a simple query
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { sql, params } = body;
    
    // Basic validation
    if (!sql) {
      return NextResponse.json(
        { status: 'error', message: 'SQL query is required' },
        { status: 400 }
      );
    }
    
    // Execute the query
    const results = await query(sql, params);
    
    return NextResponse.json({ status: 'success', data: results });
  } catch (error) {
    console.error('Query execution error:', error);
    return NextResponse.json(
      { status: 'error', message: 'Query execution failed' },
      { status: 500 }
    );
  }
} 
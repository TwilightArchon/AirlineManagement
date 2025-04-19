import { NextResponse } from 'next/server';
import { query } from '@/database/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { viewName } = body;
    
    // Basic validation
    if (!viewName) {
      return NextResponse.json(
        { status: 'error', message: 'View name is required' },
        { status: 400 }
      );
    }
    
    // Construct the query
    const sql = `SELECT * FROM ${viewName}`;
    
    // Execute the query
    const results = await query(sql);
    
    return NextResponse.json({ 
      status: 'success', 
      message: 'View queried successfully',
      data: results 
    });
  } catch (error) {
    console.error('View query error:', error);
    
    // Handle specific MySQL errors
    if (error instanceof Error) {
      const mysqlError = error as any;
      if (mysqlError.code) {
        return NextResponse.json(
          { 
            status: 'error', 
            message: `Database error: ${mysqlError.message}`,
            code: mysqlError.code 
          },
          { status: 500 }
        );
      }
    }
    
    return NextResponse.json(
      { status: 'error', message: 'Failed to query view' },
      { status: 500 }
    );
  }
} 
import { NextResponse } from 'next/server';
import { query } from '@/database/db';
import mysql from 'mysql2/promise';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { procedure, params } = body;
    
    // Basic validation
    if (!procedure) {
      return NextResponse.json(
        { status: 'error', message: 'Procedure name is required' },
        { status: 400 }
      );
    }
    
    // For stored procedures, we need to build the call with named parameters
    // Format for MySQL: CALL procedure_name(?, ?, ...);
    const paramNames = [];
    const paramValues = [];
    
    if (params && Object.keys(params).length > 0) {
      for (const [key, value] of Object.entries(params)) {
        paramNames.push(key);
        paramValues.push(value);
      }
    }
    
    // Log what we're about to execute
    console.log(`Executing: CALL ${procedure} with params:`, params);
    
    // For MySQL, we use ? placeholders and pass the values separately
    const placeholders = paramValues.map(() => '?').join(', ');
    const sql = `CALL ${procedure}(${placeholders})`;
    
    // Execute the stored procedure
    const results = await query(sql, paramValues);
    
    return NextResponse.json({ 
      status: 'success', 
      message: 'Procedure executed successfully',
      data: results 
    });
  } catch (error) {
    console.error('Stored procedure execution error:', error);
    
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
      { status: 'error', message: 'Failed to execute stored procedure' },
      { status: 500 }
    );
  }
} 
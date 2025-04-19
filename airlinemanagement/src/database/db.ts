import mysql from 'mysql2/promise';

// Database connection configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'flight_tracking',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

// Create a connection pool
const pool = mysql.createPool(dbConfig);

/**
 * Execute a SQL query with parameters
 * @param sql The SQL query to execute
 * @param params The parameters for the query
 * @returns A promise with the query results
 */
export async function query<T>(sql: string, params?: any[]): Promise<T> {
  try {
    const [results] = await pool.execute(sql, params);
    return results as T;
  } catch (error) {
    console.error('Database error:', error);
    throw error;
  }
}

/**
 * Test the database connection
 * @returns A promise that resolves if the connection is successful
 */
export async function testConnection(): Promise<boolean> {
  try {
    const [result] = await pool.execute('SELECT 1 as connection_test');
    return true;
  } catch (error) {
    console.error('Database connection error:', error);
    return false;
  }
}

export default {
  query,
  testConnection,
}; 
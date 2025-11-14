declare module "pg" {
    export interface QueryResultRow {
      [column: string]: any;
    }
  
    export interface QueryResult<T extends QueryResultRow = any> {
      rows: T[];
      rowCount: number;
      command: string;
    }
  
    export interface PoolConfig {
      host?: string;
      port?: number;
      user?: string;
      password?: string;
      database?: string;
      ssl?: any;
      max?: number;
      idleTimeoutMillis?: number;
      connectionTimeoutMillis?: number;
    }
  
    export class Pool {
      constructor(config?: PoolConfig);
      query<T extends QueryResultRow = any>(
        text: string,
        params?: any[]
      ): Promise<QueryResult<T>>;
      end(): Promise<void>;
    }
  }
  
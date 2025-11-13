import { Pool, PoolConfig, QueryResult, QueryResultRow } from "pg";
import { config } from "../config/env";
import { Database as DatabaseResult } from "../interfaces/database.interface";

class Database {
    private static instancePool: Pool;
    private pool!: Pool;

    constructor() { 
        if (!Database.instancePool) {
            console.log('---Iniciando conexão com banco de dados---');

            const poolConfig: PoolConfig = {
                host: config.db_host,
                port: Number(config.db_port),
                database: config.db_database,
                user: config.db_user,
                password: config.db_password,
                ssl: {
                    rejectUnauthorized: false
                },
                max: 2,
                idleTimeoutMillis: 5000,
                connectionTimeoutMillis: 2000
            };

            Database.instancePool = new Pool(poolConfig);

            Database.instancePool.on('connect', () => {
                console.log('Conexão com banco de dados estabelecida!');
            });

            Database.instancePool.on('error', (err: Error) => {
                console.error('Erro na conexão com banco de dados:', err.message);
            });
        }

        this.pool = Database.instancePool;
    }

    async query<T extends QueryResultRow = any>(sql: string, values?: any[]): Promise<DatabaseResult> {
        try {
            const result: QueryResult = await this.pool.query(sql, values);

            return {
                status: true,
                data: result.rows as T[]
            }
        } catch (error) {
            console.error('Erro ao executar a query:', (error as Error).message);
            return {
                status: false,
                data: [],
                error: error as Error
            }
        }
    }

    async end(): Promise<void> {
        console.log('Encerrando conexão com banco de dados...');
    }
}

const database = new Database();
export { database };

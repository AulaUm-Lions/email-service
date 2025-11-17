import pkg from "pg";
import { config } from "../config/env";
import { Database as DatabaseResult } from "../interfaces/database.interface";

const { Pool } = pkg;

class Database {
    private pool: InstanceType<typeof Pool>;

    constructor() {
        this.pool = new Pool({
            host: config.db_host,
            port: Number(config.db_port),
            database: config.db_database,
            user: config.db_user,
            password: config.db_password,
            ssl: {
                rejectUnauthorized: false
            },
            max: 20,
            idleTimeoutMillis: 30000
        });
    }

    async query(sql: string, values?: any[]): Promise<DatabaseResult> {
        try {
            const result = await this.pool.query(sql, values);
            return {
                status: true,
                data: result.rows
            };
        } catch (error) {
            return {
                status: false,
                data: [],
                error: error as Error
            };
        }
    }

    async end(): Promise<void> {
        await this.pool.end();
        console.log("Conexão com banco de dados encerrada!");
    }
}

const database = new Database();
export { database };

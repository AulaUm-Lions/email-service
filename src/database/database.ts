import { Pool, PoolConfig, QueryResult, QueryResultRow } from "pg";
import type { Client } from "pg"; // Solução final para o erro 'Client'
import { config } from "../config/env";
import { Database as DatabaseResult } from "../interfaces/database.interface";

class Database {
    private static instancePool: Pool;
    private pool: Pool;

    constructor() {
        if (!Database.instancePool) {
            console.log('---Iniciando conexão com banco de dados---');

            const poolConfig: PoolConfig = {
                host: config.db_host,
                port: Number(config.db_port),
                database: config.db_database,
                user: config.db_user,
                password: config.db_password,
                ssl: { rejectUnauthorized: false },
                max: 2,
                idleTimeoutMillis: 5000,
                connectionTimeoutMillis: 2000
            };

            Database.instancePool = new Pool(poolConfig);

            // 'on' agora deve ser reconhecido, pois 'Client' está tipado corretamente
            Database.instancePool.on("connect", (client: Client) => { 
                console.log("Conexão com banco de dados estabelecida!");
            });

            Database.instancePool.on("error", (err: Error, client: Client) => { 
                console.error("Erro na conexão com banco de dados:", err.message);
            });
        }

        this.pool = Database.instancePool;
    }
// ... (restante do código de query e end)
}

const database = new Database();
export { database };
import * as SQLite from 'expo-sqlite';

let db;

/**
 * INICIALIZAR BANCO DE DADOS
 * Inicializa o banco de dados SQLite 
 */
export async function initDB() {
    try {
        if (!db) {
            db = await SQLite.openDatabaseAsync('baseTeste2.db');

            await db.execAsync(`
                CREATE TABLE IF NOT EXISTS usuarios (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    nome TEXT NOT NULL,
                    email TEXT NOT NULL,
                    telefone TEXT NOT NULL
                );
            `);
        }
    } catch (error) {
        console.error('Erro ao inicializar banco:', error);
        throw error;
    }
}

/**
 * INSERIR USUÁRIO
 * Adiciona um novo usuário ao banco de dados
 */
export async function inserirUsuario(nome, email, telefone) {
    try {
        if (!db) await initDB();

        const result = await db.runAsync(
            'INSERT INTO usuarios (nome, email, telefone) VALUES (?, ?, ?);',
            [nome, email, telefone]
        );
        return result;
    } catch (error) {
        console.error('Erro ao inserir usuario:', error);
        throw error;
    }
}

/**
 * LISTAR USUÁRIOS
 * Retorna todos os usuários do banco de dados
 */
export async function listarUsuarios() {
    try {
        if (!db) await initDB();

        const result = await db.getAllAsync('SELECT * FROM usuarios;');
        return result;
    } catch (error) {
        console.error('Erro ao listar usuarios:', error);
        throw error;
    }
}

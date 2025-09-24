import * as SQLite from 'expo-sqlite';

let db;

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

            // Para bancos existentes sem o campo telefone, adiciona a coluna
            try {
                await db.execAsync(`
                    ALTER TABLE usuarios ADD COLUMN telefone TEXT;
                `);
            } catch (error) {
                // Ignora erro se a coluna já existir
                console.log('Coluna telefone já existe ou erro esperado:', error.message);
            }
        }
    } catch (error) {
        console.error('Erro ao inicializar banco:', error);
        throw error;
    }
}

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

export async function atualizarUsuario(id, nome, email, telefone) {
    try {
        if (!db) await initDB();

        const result = await db.runAsync(
            'UPDATE usuarios SET nome = ?, email = ?, telefone = ? WHERE id = ?;',
            [nome, email, telefone, id]
        );
        return result;
    } catch (error) {
        console.error('Erro ao atualizar usuario:', error);
        throw error;
    }
}

export async function deletarUsuario(id) {
    try {
        if (!db) await initDB();

        const result = await db.runAsync(
            'DELETE FROM usuarios WHERE id = ?;',
            [id]
        );
        return result;
    } catch (error) {
        console.error('Erro ao deletar usuario:', error);
        throw error;
    }
}

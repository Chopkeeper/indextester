export interface DbNewsArticle {
  id: string;
  title: string;
  content: string;
  created_at: string;
  image_base64?: string | null;
}

export interface ItaItem {
  id: string;
  year: number;
  title: string;
  pdfFile: string; // Base64 encoded PDF
  createdAt: string;
}

export interface User {
    id: string;
    passwordHash: string;
    createdAt: string;
}


// Add initSqlJs to the window object for TypeScript
declare global {
    interface Window {
        initSqlJs: (config: any) => Promise<any>;
    }
}

let db: any = null;
let dbInitializationPromise: Promise<any> | null = null;

const DB_KEY = 'klinik-sql-db';

// Helper to convert Uint8Array to Base64 string for localStorage
function toBase64(arr: Uint8Array): string {
    return btoa(String.fromCharCode.apply(null, Array.from(arr)));
}

// Helper to convert Base64 string back to Uint8Array
function fromBase64(base64: string): Uint8Array {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
}

// SHA-256 Hashing function
async function sha256(message: string): Promise<string> {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

const initializeDb = async () => {
    if (db) return db;
    
    try {
        const SQL = await window.initSqlJs({
            locateFile: file => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.3/${file}`
        });

        const savedDb = localStorage.getItem(DB_KEY);
        if (savedDb) {
            const dbData = fromBase64(savedDb);
            db = new SQL.Database(dbData);
        } else {
            db = new SQL.Database();
        }

        // Table Creation
        const tables = {
            news: "CREATE TABLE IF NOT EXISTS news (id TEXT PRIMARY KEY, title TEXT, content TEXT, image_base64 TEXT, created_at TEXT);",
            ita: "CREATE TABLE IF NOT EXISTS ita (id TEXT PRIMARY KEY, year INTEGER, title TEXT, pdfFile TEXT, createdAt TEXT);",
            users: "CREATE TABLE IF NOT EXISTS users (id TEXT PRIMARY KEY, passwordHash TEXT, createdAt TEXT);"
        };

        db.run(tables.news);
        db.run(tables.ita);
        db.run(tables.users);

        // Seed initial admin user if no users exist
        const userCountResult = db.exec("SELECT COUNT(*) FROM users");
        if (userCountResult[0].values[0][0] === 0) {
            const initialPassword = 'chopkeeper';
            const passwordHash = await sha256(initialPassword);
            db.run("INSERT INTO users VALUES (:id, :passwordHash, :createdAt)", {
                ':id': 'admin',
                ':passwordHash': passwordHash,
                ':createdAt': new Date().toISOString()
            });
        }
        
        await persistDb();

        return db;
    } catch (err) {
        console.error("Database initialization failed", err);
        throw err;
    }
};


const getDb = () => {
    if (!dbInitializationPromise) {
        dbInitializationPromise = initializeDb();
    }
    return dbInitializationPromise;
};


const persistDb = async () => {
    if (!db) return;
    const data = db.export();
    const base64Data = toBase64(data);
    localStorage.setItem(DB_KEY, base64Data);
};


// News Functions
export const getNews = async (limit?: number): Promise<DbNewsArticle[]> => {
    const db = await getDb();
    let sql = "SELECT * FROM news ORDER BY created_at DESC";
    if (limit) {
        sql += ` LIMIT ${limit}`;
    }
    const stmt = db.prepare(sql);
    const articles: DbNewsArticle[] = [];
    while (stmt.step()) {
        const row = stmt.getAsObject();
        articles.push(row as DbNewsArticle);
    }
    stmt.free();
    return articles;
};

export const addNews = async (title: string, content: string, image_base64: string | null): Promise<void> => {
    const db = await getDb();
    const newItem = {
        id: Date.now().toString(),
        title,
        content,
        image_base64,
        created_at: new Date().toISOString()
    };
    db.run("INSERT INTO news (id, title, content, image_base64, created_at) VALUES (:id, :title, :content, :image_base64, :created_at)", {
        ':id': newItem.id,
        ':title': newItem.title,
        ':content': newItem.content,
        ':image_base64': newItem.image_base64,
        ':created_at': newItem.created_at
    });
    await persistDb();
};

export const updateNews = async (id: string, title: string, content: string, image_base64: string | null): Promise<void> => {
    const db = await getDb();
    db.run("UPDATE news SET title = :title, content = :content, image_base64 = :image_base64 WHERE id = :id", {
        ':id': id,
        ':title': title,
        ':content': content,
        ':image_base64': image_base64
    });
    await persistDb();
};

export const deleteNews = async (id: string): Promise<void> => {
    const db = await getDb();
    db.run("DELETE FROM news WHERE id = :id", { ':id': id });
    await persistDb();
};


// ITA Functions
export const getItaItems = async (): Promise<ItaItem[]> => {
    const db = await getDb();
    const stmt = db.prepare("SELECT * FROM ita ORDER BY year DESC, createdAt DESC");
    const items: ItaItem[] = [];
    while (stmt.step()) {
        const row = stmt.getAsObject();
        items.push(row as ItaItem);
    }
    stmt.free();
    return items;
};

export const addItaItem = async (year: number, title: string, pdfFile: string): Promise<void> => {
    const db = await getDb();
    const newItem = {
        id: Date.now().toString(),
        year,
        title,
        pdfFile,
        createdAt: new Date().toISOString()
    };
    db.run("INSERT INTO ita (id, year, title, pdfFile, createdAt) VALUES (:id, :year, :title, :pdfFile, :createdAt)", {
        ':id': newItem.id,
        ':year': newItem.year,
        ':title': newItem.title,
        ':pdfFile': newItem.pdfFile,
        ':createdAt': newItem.createdAt
    });
    await persistDb();
};

export const updateItaItem = async (id: string, year: number, title: string, pdfFile: string): Promise<void> => {
    const db = await getDb();
    db.run("UPDATE ita SET year = :year, title = :title, pdfFile = :pdfFile WHERE id = :id", {
        ':id': id,
        ':year': year,
        ':title': title,
        ':pdfFile': pdfFile
    });
    await persistDb();
};

export const deleteItaItem = async (id: string): Promise<void> => {
    const db = await getDb();
    db.run("DELETE FROM ita WHERE id = :id", { ':id': id });
    await persistDb();
};

// User Functions
export const verifyUser = async (id: string, password_raw: string): Promise<boolean> => {
    const db = await getDb();
    const stmt = db.prepare("SELECT passwordHash FROM users WHERE id = :id");
    stmt.bind({ ':id': id });
    
    if (stmt.step()) {
        const { passwordHash } = stmt.getAsObject() as { passwordHash: string };
        stmt.free();
        const inputHash = await sha256(password_raw);
        return inputHash === passwordHash;
    }
    stmt.free();
    return false;
};

export const getUsers = async (): Promise<Pick<User, 'id' | 'createdAt'>[]> => {
    const db = await getDb();
    const stmt = db.prepare("SELECT id, createdAt FROM users ORDER BY createdAt ASC");
    const users: Pick<User, 'id' | 'createdAt'>[] = [];
    while (stmt.step()) {
        const row = stmt.getAsObject();
        users.push(row as Pick<User, 'id' | 'createdAt'>);
    }
    stmt.free();
    return users;
};

export const addUser = async (id: string, password_raw: string): Promise<void> => {
    const db = await getDb();
    const passwordHash = await sha256(password_raw);
    db.run("INSERT INTO users (id, passwordHash, createdAt) VALUES (:id, :passwordHash, :createdAt)", {
        ':id': id,
        ':passwordHash': passwordHash,
        ':createdAt': new Date().toISOString()
    });
    await persistDb();
};

export const deleteUser = async (id: string): Promise<void> => {
    const db = await getDb();
    db.run("DELETE FROM users WHERE id = :id", { ':id': id });
    await persistDb();
};
export interface NewsArticle {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

// Add initSqlJs to the window object for TypeScript
declare global {
    interface Window {
        initSqlJs: (config: any) => Promise<any>;
    }
}

let db: any = null;

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

const getDb = async () => {
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
            // Create table if the DB is new
            const createTableStmt = "CREATE TABLE news (id TEXT PRIMARY KEY, title TEXT, content TEXT, createdAt TEXT);";
            db.run(createTableStmt);
            persistDb();
        }
        return db;
    } catch (err) {
        console.error("Database initialization failed", err);
        throw err;
    }
};

const persistDb = async () => {
    if (!db) return;
    const data = db.export();
    const base64Data = toBase64(data);
    localStorage.setItem(DB_KEY, base64Data);
};

export const getArticles = async (): Promise<NewsArticle[]> => {
    const db = await getDb();
    const stmt = db.prepare("SELECT * FROM news ORDER BY createdAt DESC");
    const articles: NewsArticle[] = [];
    while (stmt.step()) {
        const row = stmt.getAsObject();
        articles.push(row as NewsArticle);
    }
    stmt.free();
    return articles;
};

export const addArticle = async (title: string, content: string): Promise<void> => {
    const db = await getDb();
    const newArticle = {
        id: Date.now().toString(),
        title,
        content,
        createdAt: new Date().toISOString()
    };
    db.run("INSERT INTO news VALUES (:id, :title, :content, :createdAt)", {
        ':id': newArticle.id,
        ':title': newArticle.title,
        ':content': newArticle.content,
        ':createdAt': newArticle.createdAt
    });
    await persistDb();
};

export const updateArticle = async (id: string, title: string, content: string): Promise<void> => {
    const db = await getDb();
    db.run("UPDATE news SET title = :title, content = :content WHERE id = :id", {
        ':id': id,
        ':title': title,
        ':content': content
    });
    await persistDb();
};

export const deleteArticle = async (id: string): Promise<void> => {
    const db = await getDb();
    db.run("DELETE FROM news WHERE id = :id", { ':id': id });
    await persistDb();
};

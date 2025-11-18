export interface NewsArticle {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

export interface ItaItem {
  id: string;
  year: number;
  title: string;
  pdfFile: string; // Base64 encoded PDF
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
    // btoa throws a 'InvalidCharacterError' if the input string contains characters outside of the Latin1 range.
    let E = '', r = new Uint8Array(arr), i = 0, C = r.length, S = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    for (; i < C; ) {
        let e = r[i++], n = i < C ? r[i++] : NaN, t = i < C ? r[i++] : NaN, s = e >> 2, o = (3 & e) << 4 | n >> 4, u = (15 & n) << 2 | t >> 6, a = 63 & t;
        isNaN(n) ? u = a = 64 : isNaN(t) && (a = 64), E += S.charAt(s) + S.charAt(o) + S.charAt(u) + S.charAt(a);
    }
    return E;
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
            // Create tables if the DB is new
            const createNewsTableStmt = "CREATE TABLE news (id TEXT PRIMARY KEY, title TEXT, content TEXT, createdAt TEXT);";
            db.run(createNewsTableStmt);
        }

        // Check for ITA table and create if not exists
        const checkItaTable = db.exec("SELECT name FROM sqlite_master WHERE type='table' AND name='ita';");
        if (checkItaTable.length === 0) {
          const createItaTableStmt = "CREATE TABLE ita (id TEXT PRIMARY KEY, year INTEGER, title TEXT, pdfFile TEXT, createdAt TEXT);";
          db.run(createItaTableStmt);
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
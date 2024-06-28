const { Pool } = require('pg');

class Database {
    constructor() {
        this.database = new Pool({
            user: 'postegres',     
            host: 'localhost',        
            database: 'auditorios_db',  
            password: 'postegres',     
            port: 5432,                
        });
    }
}

module.exports = Database;
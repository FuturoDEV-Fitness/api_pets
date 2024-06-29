const { Pool } = require('pg');

class Database {
    constructor() {
        this.database = new Pool({
            user: 'postgres',     
            host: 'localhost',        
            database: 'pets_bd',  
            password: 'postgres',     
            port: 5432,                
        });
    }
}

module.exports = Database;
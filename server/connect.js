var Pool = require('pg').Pool;
const fs = require('fs');

const config_obj = JSON.parse(fs.readFileSync("./config.txt",'utf8'));
// var dotenv = require('dotenv').config;
var pool = new Pool({
    user: config_obj.db_config.user,
    host: config_obj.db_config.host,
    database: config_obj.db_config.database,
    password: config_obj.db_config.password,
    port: config_obj.db_config.port,
});

module.exports = pool;
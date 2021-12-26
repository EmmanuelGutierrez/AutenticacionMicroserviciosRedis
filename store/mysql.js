const mysql = require('mysql');
const config = require('../config');

const debug = config.ENV === 'dev' ? ['ComQueryPacket', 'RowDataPacket'] : false;

const dbconf = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
    debug
};
//let con = mysql.createConnection(dbconf);

//Si quiero una coneccion constante
/* function handleCon() {
  con =mysql.createConnection(dbconf);
  con.connect((err)=>{
    if(err){
      console.log('[db err1]',err);
      //handleCon()
      setTimeout(handleCon,2000);
    }else{
      console.log('db connected');
    }
  });

  con.on('error',err=>{
    console.log('[db err2]',err);
    console.log('[db err code]',err.code);
    if (err.code === "ER_CON_COUNT_ERROR") {
      console.error("Database has to many connections");
    }
    if (err.code === "ECONNREFUSED") {
      console.error("Database connection was refused");
    }
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      console.error("Database connection was closed.");
      con.end();
      handleCon();
    }else {
      throw err;
    }
  })

  con.end();
};
handleCon(); */

async function list(table) {
    const con = mysql.createConnection(dbconf);
    con.connect(); //Si quiero establecer una coneccion solo al realizar llamadas
    return new Promise((resolve, reject) => {
        con.query(`SELECT * FROM ${table} `, (err, data) => {
            con.end(); //Si quiero establecer una coneccion solo al realizar llamadas
            if (err) {
                return reject(err);
            }
            resolve(data);
        })
    })
}

async function get(table, id) {
    const con = mysql.createConnection(dbconf);
    con.connect();
    return new Promise((resolve, reject) => {
        con.query(`SELECT * FROM ${table} where id="${id}" `, (err, data) => {
            con.end();
            if (err) {
                return reject(err);
            }
            resolve(data[0]);
        })
    })
}

async function insert(table, data) {
    const con = mysql.createConnection(dbconf);
    con.connect();
    return new Promise((resolve, reject) => {
        con.query(`INSERT INTO ${table} SET ? `, data, (err, result) => {
            con.end();
            if (err) {
                return reject(err);
            }
            resolve(result);
        })
    })
}

async function update(table, data) {
    const con = mysql.createConnection(dbconf);
    con.connect();
    return new Promise((resolve, reject) => {
        con.query(`UPDATE  ${table} SET ?  where id=?`, [data, data.id], (err, result) => {
            con.end();
            if (err) {
                return reject(err);
            }
            resolve(result);
        })
    })
}

function query(table, q, join) {
    const con = mysql.createConnection(dbconf);
    let joinQuery = '';
    if (join) {
        const key = Object.keys(join)[0];
        const val = join[key]; // De esta forma puedo recuperar el prime valor del objeto de join, sin importar su nombre
        joinQuery = `JOIN ${key} ON ${table}.${val} = ${key}.id`;
    }
    return new Promise((resolve, reject) => {
        con.query(`SELECT * FROM ${table} ${joinQuery} where ? `, q, (err, res) => {
            con.end();
            if (err) {
                return reject(err);
            }
            resolve(res[0] || null);
        })
    })
}

async function upsert(table, data) {
    let user;
    if (data.id) {
        user = await get(table, data.id);
    }
    if (user) {
        return update(table, data);
    }

    return insert(table, data)
}

module.exports = {
    list,
    get,
    upsert,
    query
}
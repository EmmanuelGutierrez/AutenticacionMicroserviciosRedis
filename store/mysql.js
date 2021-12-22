const mysql = require('mysql');
const config = require('../config');

const dbconf = {
  host:config.mysql.host,
  user:config.mysql.user,
  password:config.mysql.password,
  database:config.mysql.database,
};
let con =mysql.createConnection(dbconf);

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
  con.connect();//Si quiero establecer una coneccion solo al realizar llamadas
  return new Promise((resolve,reject)=>{
    con.query(`SELECT * FROM ${table} `,(err,data)=>{
      con.end();//Si quiero establecer una coneccion solo al realizar llamadas
      if(err){
        return reject(err); 
      }
      resolve(data);
    })
  })
}


module.exports={
  list
}

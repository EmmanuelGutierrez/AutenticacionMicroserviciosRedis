const db = {
  user: [
    {
      id: "1",
      name: 'manu'
    }
  ]
};

async function list(tabla){
  return db[tabla];
};

async function get(tabla,id){
  const col= await list(tabla);
  return col.filter(item=> item.id===id)[0]||{};
};

async function upsert(tabla,data){
 db[tabla].push(data);
};

async function remove(tabla,id){
  db[tabla]=db[tabla].filter(usuario=>
    usuario.id!=id
    );
  return true;
};

module.exports={list,get,upsert,remove}

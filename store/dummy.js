const db = {
  user: [
    {
      id: "1",
      name: 'manu'
    }
  ]
};

async function list(tabla) {
  return db[tabla] || [];
};

async function get(tabla, id) {
  const col = await list(tabla);
  return col.filter(item => item.id === id)[0] || {};
};

async function upsert(tabla, data) {
  if (!db[tabla]) {
    db[tabla] = [];
  }
  db[tabla].push(data);
};

async function remove(tabla, id) {
  db[tabla] = db[tabla].filter(usuario =>
    usuario.id != id
  );
  return true;
};

async function query(tabla, q) {
  const col = await list(tabla);
  const keys = Object.keys(q);
  const key = keys[0];

  return col.filter(item => item[key] === q[key])[0] || null;
}

module.exports = {
  list,
  get,
  upsert,
  remove,
  query
}

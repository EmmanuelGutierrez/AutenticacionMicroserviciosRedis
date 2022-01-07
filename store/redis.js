const redis = require("redis");
const { redis: redisConf } = require("../config");

const client = redis.createClient({
  url: `redis://${redisConf.user}:${redisConf.userPass}@${redisConf.host}:${redisConf.port}`,
});
client.on("error", (err) => {
  console.log(err);
});
client.on("connect", () => {
  console.log("conectado");
});
client.connect();

async function list(table) {
  try {
    const data = await client.get(table);
    return JSON.parse(data);
  } catch (error) {
    return error;
  }
}

async function get(table, id) {
  try {
    const allData = await list(table);
    let one = [];
    console.log(allData);
    if (allData) {
      one = allData.filter((d) => d.id == id);
    }
    return one[0];
  } catch (error) {
    return error;
  }
}

async function upsert(table, data) {
  let key = table;
  /* if (data && data.id) {
    key = key + "_" + data.id;
  } */
  await client.setEx(key, 10, JSON.stringify(data));
  return true;
}

module.exports = {
  list,
  get,
  upsert,
};

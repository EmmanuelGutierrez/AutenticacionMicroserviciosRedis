const express = require("express");

const config = require("../config");
const router = require("./routes");

const app = express();

app.use(express.json());

app.use("/", router);

app.listen(config.cacheService.port, () => {
  console.log(
    "Servicio de cache escuchando en puerto: ",
    config.cacheService.port
  );
});

import Express, { Router } from "express";
import dotenv from "dotenv";
import Color from "colors";
import LogRequest from "./Author/middleware/author.middleware";
import Routing from "./Author/routes/app.routes";

dotenv.config();
const app = Express();

app.use(Express.json());

//Registering router
app.use(Routing.authorRoutes);

//Starting express server
app.use(LogRequest.LogRequest); //Logging
app.listen(process.env.PORT, () => {
  console.log(
    `${Color.yellow(
      `[server] Express server started on http://localhost:${process.env.PORT}`
    )}`
  );
});
/*TODO:
3. Fix CORS
*/

import express from "express";
import { json, urlencoded } from "body-parser";
import db from "./utils/database";
import cors from "cors";
import routes from "./src/routes";

const app = express();
db.connection();
app.options("*", cors());
app.use(urlencoded({ extended: true }));
app.use(json());
//Define routes
app.use("/api/user/", routes.userRouter);
app.use("/api/category/", routes.categoryRouter);
app.use("/api/diary/", routes.diaryRouter);
app.use("/api/habit/", routes.habitRouter);
app.use("/api/habitTime/", routes.habitTimeRouter);
app.use("/api/record/", routes.recordRouter);
app.use("/api/routine/", routes.routineRouter);
app.use("/api/session/", routes.sessionRouter);
app.use((req, res, next) => {
  res.status(400).send(`Error: ${res.originUrl} not found. BAD ROUTE.`);
});
app.use((err, req, res, next) => {
  res.status(500).send(`Error: ${err}`);
  next();
});

export default app;

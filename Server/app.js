import express from "express";
import { json, urlencoded } from "body-parser";
import db from "./utils/database";
import cors from "cors";
import routes from "./src/routes";
import { authentication } from "./src/controls/fbOAuth";
const app = express();
db.connection();
app.use(cors({ credentials: true, origin: true }));
app.use(urlencoded({ extended: true }));
app.use(json());
app.use(
  "/user/",
  [authentication.isAuthenticated, authentication.isAdmin],
  routes.userRouter
);
app.use("/category/", authentication.isAuthenticated, routes.categoryRouter);
app.use("/diary/", authentication.isAuthenticated, routes.diaryRouter);
app.use("/habit/", authentication.isAuthenticated, routes.habitRouter);
app.use("/habitTime/", authentication.isAuthenticated, routes.habitTimeRouter);
app.use("/record/", authentication.isAuthenticated, routes.recordRouter);
app.use("/routine/", authentication.isAuthenticated, routes.routineRouter);
app.use(routes.loginRouter);
app.use((req, res, next) => {
  res.status(400).send(`Error: ${res.originUrl} not found. Bad route.`);
});
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send(`Internal server error: ${err}`);
  next();
});

export default app;

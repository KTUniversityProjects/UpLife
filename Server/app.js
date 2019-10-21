import express from "express";
import { json, urlencoded } from "body-parser";
import db from "./utils/database";
import cors from "cors";
import routes from "./src/routes";

const app = express();
db.connection();
app.use(cors({ credentials: true, origin: true }));
app.use(urlencoded({ extended: true }));
app.use(json());
//Define routes
//TODO:
//--> Add middleware to check HTTP header for the right accessToken.
//--> Check fbOAuth.js
//--> Setup client side with login and logout + headers for requests.
app.use("/user/", routes.userRouter);
app.use("/category/", routes.categoryRouter);
app.use("/diary/", routes.diaryRouter);
app.use("/habit/", routes.habitRouter);
app.use("/habitTime/", routes.habitTimeRouter);
app.use("/record/", routes.recordRouter);
app.use("/routine/", routes.routineRouter);
app.use("/session/", routes.sessionRouter);
app.use(routes.loginRouter);
app.use((req, res, next) => {
  res.status(400).send(`Error: ${res.originUrl} not found. Bad route.`);
});
app.use((err, req, res, next) => {
  res.status(500).send(`Internal server error: ${err}`);
  next();
});

export default app;

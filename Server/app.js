import express from "express";
import { json, urlencoded } from "body-parser";
import cors from "cors";

import userRouter from "./src/user/routes";
// // catch 400
// app.use((req, res, next) => {
//   res.status(400).send(`Error: ${res.originUrl} not found`);
//   next(err);
// });

// // catch 500
// app.use((err, req, res, next) => {
//   res.status(500).send(`Error: ${err}`);
//   next();
// });

//Routes here
const app = express();
app.use(userRouter);
app.use(cors);
app.use(urlencoded({ extended: true }));
app.use(json());
app.use("/api/user", userRouter);
export default app;

import express from "express";
import { json, urlencoded } from "body-parser";
import db from "./utils/database";
import cors from "cors";
import routes from "./src/routes";
import { userInsideController } from "./src/controls/user";

const https = require("https");
const app = express();
db.connection();
app.use(cors({ credentials: true, origin: true }));
app.use(urlencoded({ extended: true }));
app.use(json());

//refactor isadmin and isauthenticated. move to utils.
//add checks ifEsxist on queries for proepr status
function isAuthenticated(req, res, next) {
  let getToken = req.header("authorization");
  if (getToken) {
    getToken = getToken.split(" ")[1];
  }
  if (getToken) {
    https
      .get("https://graph.facebook.com/app?access_token=" + getToken, resp => {
        let data = "";
        resp.on("data", chunk => (data += chunk));
        resp.on("end", () => {
          if (data != "") {
            https
              .get(
                "https://graph.facebook.com/me?fields=id&access_token=" +
                  getToken,
                resp => {
                  let data = "";
                  resp.on("data", chunk => (data += chunk));
                  resp.on("end", () => {
                    req.user_id = data;
                    next();
                  });
                }
              )
              .on("error", err => {
                console.log(err);
                res.redirect("/");
              });
          } else {
            res.redirect("/");
          }
        });
      })
      .on("error", err => {
        throw new Error(err);
      });
  } else {
    res.status(404);
    //res.redirect("/");
    res.send("Unaouthorized");
  }
}

async function isAdmin(req, res, next) {
  const user = await userInsideController.getUser(JSON.parse(req.user_id).id);
  console.log(user.role_id);
  if (user[0].role_id == 2) {
    next();
  } else {
    res.status(404);
    //res.redirect("/");
    res.send("Unauthorized");
  }
}

app.use("/user/", [isAuthenticated, isAdmin], routes.userRouter);
app.use("/category/", isAuthenticated, routes.categoryRouter);
app.use("/diary/", isAuthenticated, routes.diaryRouter);
app.use("/habit/", isAuthenticated, routes.habitRouter);
app.use("/habitTime/", isAuthenticated, routes.habitTimeRouter);
app.use("/record/", isAuthenticated, routes.recordRouter);
app.use("/routine/", isAuthenticated, routes.routineRouter);
app.use(routes.loginRouter);
app.use((req, res, next) => {
  res.status(400).send(`Error: ${res.originUrl} not found. Bad route.`);
});
app.use((err, req, res, next) => {
  res.status(500).send(`Internal server error: ${err}`);
  next();
});

export default app;

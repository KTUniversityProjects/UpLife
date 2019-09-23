import app from "./app";
import db from "./utils/database";
const port = process.env.PORT || "3000";
app.listen(port, () => {
  console.log("Listening on ", port);
});

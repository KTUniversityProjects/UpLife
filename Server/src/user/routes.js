import { Router } from "express";
import controller from "./controller";
const router = Router();

//MAKE A GLOBAL ROUTER AND USE IT IN ALL SUBROUTERS. SAVES CODE.
//IMPORT ALL ROUTES TO A GLOBAL ROUTES.JS FILE.
//IMPROT ALL ROUTES IN APP.JS.
//TEST ALL CALLS, CHEKC IF ERRORS ARE PROVIDED FOR NON-EXISTING ROUTES
//VALIDATE MODEL DATA
router
  .route("/")
  .get(controller.get.bind(null, "user"))
  .post(controller.create)
  .put(controller.update)
  .delete(controller.remove);
// router
//   .route("/:id")
//   .get(controller.getOne)
//   .post(controller.createOne)
//   .put(controller.updateOne)
//   .delete(controller.deleteOne);
export default router;

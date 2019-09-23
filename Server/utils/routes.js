import { Router } from "express";
//TEST ALL CALLS, CHEKC IF ERRORS ARE PROVIDED FOR NON-EXISTING ROUTES

function createRouter(controller) {
  const router = Router();
  Object.keys(controller).forEach(key => {
    if (key === "getAll") router.route("/").get(controller[key]);
    if (key == "create") router.route("/").post(controller[key]);
    if (key == "get") router.route("/:id").get(controller[key]);
    if (key == "update") router.route("/:id").put(controller[key]);
    if (key == "remove") router.route("/:id").delete(controller[key]);
  });
  return router;
}

export default createRouter;

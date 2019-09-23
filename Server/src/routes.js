/*TODO:
1. Import all controllers
2. Create all routes
3. Export all routes
*/
import Routes from "../utils/routes";
import userController from "./user/controller";
import categoryController from "./category/controller";
import diaryController from "./diary/controller";
import habitController from "./habit/controller";
import habitTimeController from "./habitTime/controller";
import recordController from "./record/controller";
import routineController from "./routine/controller";
import sessionController from "./session/controller";
const routes = {
  userRouter: Routes(userController),
  categoryRouter: Routes(categoryController),
  diaryRouter: Routes(diaryController),
  habitRouter: Routes(habitController),
  habitTimeRouter: Routes(habitTimeController),
  recordRouter: Routes(recordController),
  routineRouter: Routes(routineController),
  sessionRouter: Routes(sessionController)
};

export default routes;

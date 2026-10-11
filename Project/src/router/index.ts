//combine all ur routes here

import {Router} from "express";
import { healthRouter } from "./health.routes";
import { authRouter } from "./auth.routes";
import { userTaskRouter } from "./user.task.route";
import { adminTaskRouter } from "./admin.task.route";
import { adminBannerRouter } from "./admin.banner.router";


export const apiRouter =  Router();
apiRouter.use(healthRouter);
apiRouter.use(authRouter);
apiRouter.use("/task",userTaskRouter);
apiRouter.use('/admin/task',adminTaskRouter);
apiRouter.use("/admin/banners/",adminBannerRouter)

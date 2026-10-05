import express from "express";
import { errorHandler } from "./middleware/errorHandler";
import { notFoundHandler } from "./middleware/notFound";
import cors from "cors";
import { apiRouter } from "./router";


export function createApp(){
    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({extended : true}));
    app.use(cors());

    app.use("/api",apiRouter);

    app.use(notFoundHandler);
    app.use(errorHandler);
    return app;
}
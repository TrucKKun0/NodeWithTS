import express from "express";
import { errorHandler } from "./middleware/errorHandler";
import { notFoundHandler } from "./middleware/notFound";


export function createApp(){
    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({extended : true}));
    app.use(notFoundHandler);
    app.use(errorHandler);
}
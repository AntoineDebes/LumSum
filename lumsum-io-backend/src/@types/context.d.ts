import { Request, Response } from "express";

interface IExpress {
    req: Request;
    res: Response;
}

interface IContext {
    req: Request;
    res: Response;
    currentUser: any;
}
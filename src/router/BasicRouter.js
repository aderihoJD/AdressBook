import {Router} from  "express";

export default ({contactRouter, controlRouter}) =>
    Router()
        .get('/hello', (req,res,next) => res.status(200).json("Hello"))
        .use('/contact', contactRouter)
        .use('/control', controlRouter);

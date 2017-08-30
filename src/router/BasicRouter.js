import {Router} from  "express";

export default ({contactRouter}) =>
    Router()
        .get('/hello', (req,res,next) => res.status(200).json("Hello"))
        .use('/contact', contactRouter);

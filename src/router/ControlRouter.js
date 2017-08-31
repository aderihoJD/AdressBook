import {Router} from "express";

export default ({controlController}) =>
    Router()
        .delete('/mongoDb', controlController.clearDb)

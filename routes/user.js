import { Router } from "express";
const userRouter = Router();

userRouter.get('/user/test',(req,res) => {
    res.send("Done!");
});


export default userRouter;
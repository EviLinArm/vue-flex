import { Router } from "express";

const router = Router();

router.get('/', (req, res) => {
    console.log(123)
    res.status(200).send({
        hello: 'world'
    })
})

export default router
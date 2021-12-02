import { Router } from 'express'
import { createUser, deleteUser, loginUser } from '../controllers/user'
import { verify } from '../middlewares'

const router = Router()

router.post('/login', loginUser)
router.post('/create', createUser)
router.delete('/:username', verify, deleteUser)

export default router
const express = require("express");
const router = express.Router();

const { validateBody, authenticate, upload } = require("../../middlewares")
const { schemas } = require("../../models/user")
const ctrl = require("../../controllers/auth")
const email = require("../../services/email")

router.post("/register", validateBody(schemas.registerSchema), ctrl.register)

router.get("/verify/:verificationCode", email.verifyEmail)

router.post("/verify", validateBody(schemas.emailSchema), email.resendVerifyEmail)

router.post("/login", validateBody(schemas.loginSchema), ctrl.login)

router.get("/current", authenticate, ctrl.current)

router.post("/logout", authenticate, ctrl.logout)

router.patch("/avatars", authenticate, upload.single("avatarURL"), ctrl.updateAvatar)

module.exports = router;
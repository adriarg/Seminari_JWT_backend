// src/routes/user_routes.ts
import express from 'express';
<<<<<<< HEAD
import { registerCtrl, loginCtrl, googleAuthCtrl, googleAuthCallback } from "../auth/auth_controller.js";
=======
import { registerCtrl, loginCtrl, googleAuthCtrl, googleAuthCallback, refreshTokenHandler } from "../auth/auth_controller.js";
>>>>>>> a34ea80 (Exercici Seminari JWT)

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     AuthRegister:
 *       type: object
 *       required:
 *         - name
 *         - password
 *         - email
 *       properties:
 *         name:
 *           type: string
 *           description: El nombre completo del usuario
 *         password:
 *           type: string
 *           description: La contraseña del usuario
 *         age:
 *           type: integer
 *           description: La edad del usuario
 *           default: 0
 *         email:
 *           type: string
 *           description: El correo electrónico del usuario
 *       example:
 *         name: Usuario Ejemplo
 *         password: contraseña123
 *         age: 30
 *         email: usuario@example.com
 *     AuthLogin:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: El email del usuario
 *         password:
 *           type: string
 *           description: La contraseña del usuario
 *       example:
 *         email: usuario@ejemplo.com
 *         password: contraseña123
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registra un nuevo usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthRegister'
 *     responses:
 *       200:
 *         description: Usuario registrado exitosamente
 *       400:
 *         description: Error en la solicitud
 */
router.post("/auth/register", registerCtrl);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Inicia sesión un usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthLogin'
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *       400:
 *         description: Error en la solicitud
 */
router.post("/auth/login", loginCtrl);
<<<<<<< HEAD
=======

/**
  * @swagger
  * /api/auth/refresh:
  *   post:
  *     summary: Refresca el access token utilizando el refresh token
  *     tags: [Auth]
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             type: object
  *             properties:
  *               refreshToken:
  *                 type: string
  *                 description: El refresh token del usuario
  *     responses:
  *       200:
  *         description: Access token refrescado exitosamente
  *       400:
  *         description: Refresh token inválido o faltante
  */
router.post("/auth/refresh", refreshTokenHandler);

>>>>>>> a34ea80 (Exercici Seminari JWT)
/**
 * @swagger
 * /api/auth/google:
 *   get:
 *     summary: Redirige al usuario a Google para autenticarse
 *     tags: [Auth]
 *     responses:
 *       302:
 *         description: Redirección a Google para autenticación
 */
router.get('/auth/google',googleAuthCtrl );

/**
 * @swagger
 * /api/auth/google/callback:
 *   get:
 *     summary: Callback de Google OAuth
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Autenticación exitosa, redirige al frontend con el token
 *       400:
 *         description: Error en la autenticación
 */
router.get('/auth/google/callback', googleAuthCallback);

export default router;

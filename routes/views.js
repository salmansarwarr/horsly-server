import express from "express";
import {
    getAllViews,
    getViewsByTokenId,
    addViews,
    getViewsByType,
} from "../controllers/views.js";

const router = express.Router();

// Routes
router.get("/", getAllViews);
router.get("/:tokenId", getViewsByTokenId);
router.post("/", addViews);
router.get("/type/:type", getViewsByType);

export default router;

/**
 * @swagger
 * /views:
 *   get:
 *     summary: Get all views
 *     responses:
 *       200:
 *         description: Returns an array of views
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Views'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */

/**
 * @swagger
 * /views/{tokenId}:
 *   get:
 *     summary: Get views by Token ID
 *     parameters:
 *       - in: path
 *         name: tokenId
 *         schema:
 *           type: string
 *         required: true
 *         description: Token ID for filtering views
 *     responses:
 *       200:
 *         description: Returns views for the given Token ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Views'
 *       404:
 *         description: Views not found for the given Token ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */

/**
 * @swagger
 * /views:
 *   post:
 *     summary: Add new views
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tokenId:
 *                 type: string
 *               type:
 *                 type: string
 *               views:
 *                 type: number
 *     responses:
 *       201:
 *         description: Views added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Views'
 *       400:
 *         description: Bad Request - tokenId, type, and views are required fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */

/**
 * @swagger
 * /views/type/{type}:
 *   get:
 *     summary: Get views by Type
 *     parameters:
 *       - in: path
 *         name: type
 *         schema:
 *           type: string
 *         required: true
 *         description: Type for filtering views
 *     responses:
 *       200:
 *         description: Returns views for the given Type
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Views'
 *       404:
 *         description: Views not found for the given Type
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Views:
 *       type: object
 *       properties:
 *         tokenId:
 *           type: string
 *         type:
 *           type: string
 *         views:
 *           type: number
 */

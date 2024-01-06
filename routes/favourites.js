import express from "express";
import {
    getAllFavourites,
    addFavourites,
    getFavouritesByTokenId,
    getFavouritesByType,
    isFavouritedByOwner,
    getFavouritesByOwner
} from "../controllers/favourites.js";

const router = express.Router();

// Routes
router.get("/", getAllFavourites);
router.get("/type/:type", getFavouritesByType);
router.get("/:tokenId", getFavouritesByTokenId);
router.post("/", addFavourites);
router.get('/byOwner/:ownerAddress', getFavouritesByOwner);
router.get("/:tokenId/:ownerAddress", isFavouritedByOwner);

export default router;

/**
 * @swagger
 * /favourites:
 *   get:
 *     summary: Get all favourites
 *     responses:
 *       200:
 *         description: Returns an array of favourites
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Favourites'
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
 * /favourites/{tokenId}:
 *   get:
 *     summary: Get favourites by Token ID
 *     parameters:
 *       - in: path
 *         name: tokenId
 *         schema:
 *           type: string
 *         required: true
 *         description: Token ID for filtering favourites
 *     responses:
 *       200:
 *         description: Returns favourites for the given Token ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Favourites'
 *       404:
 *         description: Favourites not found for the given Token ID
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
 * /favourites/type/{type}:
 *   get:
 *     summary: Get favourites by Type
 *     parameters:
 *       - in: path
 *         name: type
 *         schema:
 *           type: string
 *         required: true
 *         description: Type for filtering favourites
 *     responses:
 *       200:
 *         description: Returns favourites for the given Type
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Favourites'
 *       404:
 *         description: Favourites not found for the given Type
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
 * /favourites:
 *   post:
 *     summary: Add new favourites
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
 *               favourites:
 *                 type: number
 *     responses:
 *       201:
 *         description: Favourites added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Favourites'
 *       400:
 *         description: Bad Request - tokenId, type, and favourites are required fields
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
 *     Favourites:
 *       type: object
 *       properties:
 *         tokenId:
 *           type: string
 *         type:
 *           type: string
 *         favourites:
 *           type: number
 */


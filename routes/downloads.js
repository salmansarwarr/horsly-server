import express from "express";
import {
    deleteDownloadsByOwner,
    deleteDownloadsByTokenId,
    getAllDownloads,
    getDownloadsByOwner,
    getDownloadsByTokenId,
    insertDownload,
} from "../controllers/downloads.js";

const router = express.Router();

router.get("/", getAllDownloads);
router.get("/:ownerAddress", getDownloadsByOwner);
router.get("/:tokenId", getDownloadsByTokenId);
router.post("/", insertDownload);
router.delete("/deleteById/:tokenId", deleteDownloadsByTokenId);
router.delete("/deleteByAddress/:ownerAddress", deleteDownloadsByOwner);

export default router;

// ALCHEMY_API=vpEAMGP_rB7ZhU43ybQC6agpdVToaV5S


/**
 * @swagger
 * tags:
 *   name: Downloads
 *   description: API endpoints for managing download data
 */

/**
 * @swagger
 * /downloads:
 *   post:
 *     summary: Insert download data
 *     tags: [Downloads]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ownerAddress:
 *                 type: string
 *               tokenId:
 *                 type: string
 *               type:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Download data saved successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Download data saved successfully
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 */

/**
 * @swagger
 * /downloads:
 *   get:
 *     summary: Get all download data
 *     tags: [Downloads]
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Download'
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 */

/**
 * @swagger
 * /downloads/{ownerAddress}:
 *   get:
 *     summary: Get downloads by owner
 *     tags: [Downloads]
 *     parameters:
 *       - in: path
 *         name: ownerAddress
 *         required: true
 *         description: Owner's address
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Download'
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 *       '404':
 *         description: Not Found
 *         content:
 *           application/json:
 *             example:
 *               error: Error fetching items by owner
 */

/**
 * @swagger
 * /downloads/token/{tokenId}:
 *   get:
 *     summary: Get downloads by token ID
 *     tags: [Downloads]
 *     parameters:
 *       - in: path
 *         name: tokenId
 *         required: true
 *         description: Token ID
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Download'
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 *       '404':
 *         description: Not Found
 *         content:
 *           application/json:
 *             example:
 *               error: Error fetching items by token ID
 */

/**
 * @swagger
 * /downloads/type/{type}:
 *   get:
 *     summary: Get downloads by type
 *     tags: [Downloads]
 *     parameters:
 *       - in: path
 *         name: type
 *         required: true
 *         description: Download type
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Download'
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 *       '404':
 *         description: Not Found
 *         content:
 *           application/json:
 *             example:
 *               error: Error fetching items by Horse type
 */

/**
 * @swagger
 * /downloads/owner/{ownerAddress}:
 *   delete:
 *     summary: Delete downloads by owner
 *     tags: [Downloads]
 *     parameters:
 *       - in: path
 *         name: ownerAddress
 *         required: true
 *         description: Owner's address
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             example:
 *               message: Downloads deleted successfully for owner address
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 */

/**
 * @swagger
 * /downloads/token/{tokenId}:
 *   delete:
 *     summary: Delete downloads by token ID
 *     tags: [Downloads]
 *     parameters:
 *       - in: path
 *         name: tokenId
 *         required: true
 *         description: Token ID
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             example:
 *               message: Downloads deleted successfully for token ID
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 */

/**
 * @swagger
 * /downloads/type/{type}:
 *   delete:
 *     summary: Delete downloads by type
 *     tags: [Downloads]
 *     parameters:
 *       - in: path
 *         name: type
 *         required: true
 *         description: Download type
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             example:
 *               message: Downloads deleted successfully for token ID
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 */

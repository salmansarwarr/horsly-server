import express from "express";
import {
    deleteDownloadsByOwner,
    deleteDownloadsByTokenId,
    getAllDownloads,
    getDownloadsByOwner,
    getDownloadsByTokenId,
    deleteDownloadsByType,
    getDownloadsByTokenType,
    insertDownload,
} from "../controllers/downloads.js";
import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({
    region: "us-east-1",
    credentials: {
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey: process.env.SECRET,
    },
});

const router = express.Router();

router.get("/", getAllDownloads);
router.get("/getByOwner/:ownerAddress", getDownloadsByOwner);
router.get("/getById/:tokenId", getDownloadsByTokenId);
router.post("/", insertDownload);
router.delete("/deleteById/:tokenId", deleteDownloadsByTokenId);
router.delete("/deleteByOwner/:ownerAddress", deleteDownloadsByOwner);
router.get("/getByType/:type", getDownloadsByTokenType);
router.delete("/deleteByType/:type", deleteDownloadsByType);

export default router;

/**
 * @swagger
 * /downloads:
 *   post:
 *     summary: Insert a new download record
 *     description: Insert a new download record with signature verification.
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
 *               signature:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       201:
 *         description: Download data saved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 downloadUrl:
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
 * /downloads:
 *   get:
 *     summary: Get all download records
 *     responses:
 *       200:
 *         description: Returns an array of download records
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Downloads'
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
 * /downloads/{ownerAddress}:
 *   get:
 *     summary: Get all download records by owner address
 *     parameters:
 *       - in: path
 *         name: ownerAddress
 *         schema:
 *           type: string
 *         required: true
 *         description: Owner address for filtering downloads
 *     responses:
 *       200:
 *         description: Returns an array of download records filtered by owner address
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Downloads'
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
 * /downloads/{tokenId}:
 *   get:
 *     summary: Get all download records by token ID
 *     parameters:
 *       - in: path
 *         name: tokenId
 *         schema:
 *           type: string
 *         required: true
 *         description: Token ID for filtering downloads
 *     responses:
 *       200:
 *         description: Returns an array of download records filtered by token ID
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Downloads'
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
 * /downloads/type/{type}:
 *   get:
 *     summary: Get all download records by type
 *     parameters:
 *       - in: path
 *         name: type
 *         schema:
 *           type: string
 *         required: true
 *         description: Type for filtering downloads
 *     responses:
 *       200:
 *         description: Returns an array of download records filtered by type
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Downloads'
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
 * /downloads/{ownerAddress}:
 *   delete:
 *     summary: Delete all download records by owner address
 *     parameters:
 *       - in: path
 *         name: ownerAddress
 *         schema:
 *           type: string
 *         required: true
 *         description: Owner address for deleting downloads
 *     responses:
 *       200:
 *         description: Downloads deleted successfully for owner address
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
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
 * /downloads/{tokenId}:
 *   delete:
 *     summary: Delete all download records by token ID
 *     parameters:
 *       - in: path
 *         name: tokenId
 *         schema:
 *           type: string
 *         required: true
 *         description: Token ID for deleting downloads
 *     responses:
 *       200:
 *         description: Downloads deleted successfully for token ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
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
 * /downloads/type/{type}:
 *   delete:
 *     summary: Delete all download records by type
 *     parameters:
 *       - in: path
 *         name: type
 *         schema:
 *           type: string
 *         required: true
 *         description: Type for deleting downloads
 *     responses:
 *       200:
 *         description: Downloads deleted successfully for type
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
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
 *     Downloads:
 *       type: object
 *       properties:
 *         ownerAddress:
 *           type: string
 *         tokenId:
 *           type: string
 *         type:
 *           type: string
 *         downloadUrl:
 *           type: string
 */

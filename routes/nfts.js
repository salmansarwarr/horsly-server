import express from 'express';
import { getNftDetails, getOwnedNfts } from '../controllers/nfts.js';

const router = express.Router();

router.get('/owned/:contractAddress/:owner', getOwnedNfts);
router.get('/:contractAddress/:tokenId', getNftDetails);

export default router;

// ALCHEMY_API=vpEAMGP_rB7ZhU43ybQC6agpdVToaV5S

/**
 * @swagger
 * tags:
 *   name: NFTs
 *   description: Endpoints for managing NFTs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     NFT:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The unique identifier of the NFT.
 *         name:
 *           type: string
 *           description: The name of the NFT.
 *         description:
 *           type: string
 *           description: The description of the NFT.
 *         image:
 *           type: string
 *           description: The URL of the image representing the NFT.
 */

/**
 * @swagger
 * /nfts/owned/{contractAddress}/{owner}:
 *   get:
 *     summary: Get NFTs owned by a specific address
 *     tags: [NFTs]
 *     parameters:
 *       - in: path
 *         name: contractAddress
 *         required: true
 *         description: The contract address of the NFT.
 *         schema:
 *           type: string
 *       - in: path
 *         name: owner
 *         required: true
 *         description: The owner's address.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of NFTs owned by the specified address.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/download'
 *       400:
 *         description: Bad request or error retrieving NFTs.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 */

/**
 * @swagger
 * /nfts/{contractAddress}/{tokenId}:
 *   get:
 *     summary: Get details of a specific NFT
 *     tags: [NFTs]
 *     parameters:
 *       - in: path
 *         name: contractAddress
 *         required: true
 *         description: The contract address of the NFT.
 *         schema:
 *           type: string
 *       - in: path
 *         name: tokenId
 *         required: true
 *         description: The unique identifier of the NFT.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Details of the specified NFT.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/download'
 *       400:
 *         description: Bad request or error retrieving NFT details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 */

import express from 'express';
import { getNftDetails, getOwnedNfts } from '../controllers/nfts.js';

const router = express.Router();

router.get('/owned/:contractAddress/:owner', getOwnedNfts);
router.get('/:contractAddress/:tokenId', getNftDetails);

export default router;

// ALCHEMY_API=vpEAMGP_rB7ZhU43ybQC6agpdVToaV5S
import express from 'express';
import { getNftDetails, getOwnedNfts } from '../controllers/nfts.js';

const router = express.Router();

router.get('/owned', getOwnedNfts);
router.get('/:tokenId', getNftDetails);

export default router;
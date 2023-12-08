import express from 'express';
import { getNftDetails, getOwnedNfts } from '../controllers/nfts.js';

const router = express.Router();

router.post('/owned', getOwnedNfts);
router.post('/:tokenId', getNftDetails);

export default router;
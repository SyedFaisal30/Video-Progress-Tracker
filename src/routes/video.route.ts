import { Router } from 'express';
import { getVideos } from '../controllers/getvideos.controller';
import { getSingleVideo } from '../controllers/getone video.controller';

const router = Router();

router.get('/', getVideos);

router.get('/:id', getSingleVideo);    

export default router;

import { Router } from 'express';
import multer from 'multer';
import { uploadImageResponseSchema } from '@abou/contracts';
import { requireAdmin, requireAuth, requireCsrf } from '../../middleware/auth.js';
import { sensitiveRouteLimit } from '../../middleware/rate-limit.js';
import { appErrors } from '../../core/app-error.js';
import { UploadsService } from './uploads.service.js';

const service = new UploadsService();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024, files: 1 },
});

export const adminUploadsRouter = Router();
adminUploadsRouter.use(requireAuth, requireAdmin);

adminUploadsRouter.post(
  '/image',
  sensitiveRouteLimit(60),
  requireCsrf,
  upload.single('file'),
  async (request, response, next) => {
    try {
      if (!request.file || !service.isAllowedMimeType(request.file.mimetype)) {
        throw appErrors.invalidUpload();
      }
      const result = await service.uploadImage(request.file.buffer);
      response.status(201).json(uploadImageResponseSchema.parse({ secure_url: result.secure_url }));
    } catch (error) {
      next(error);
    }
  },
);

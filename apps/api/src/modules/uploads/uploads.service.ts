import type { UploadApiResponse } from 'cloudinary';
import { cloudinary } from '../../lib/cloudinary.js';
import { appErrors } from '../../core/app-error.js';

const ALLOWED_MIME_TYPES = new Set(['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml']);

export class UploadsService {
  isAllowedMimeType(mimetype: string) {
    return ALLOWED_MIME_TYPES.has(mimetype);
  }

  async uploadImage(buffer: Buffer): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { folder: 'abou-taleb/uploads', resource_type: 'image' },
          (error, result) => {
            if (error || !result) {
              reject(appErrors.uploadFailed());
              return;
            }
            resolve(result);
          },
        )
        .end(buffer);
    });
  }
}

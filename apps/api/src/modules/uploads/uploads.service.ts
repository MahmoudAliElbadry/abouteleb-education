import type { UploadApiResponse } from 'cloudinary';
import { cloudinary } from '../../lib/cloudinary.js';
import { appErrors } from '../../core/app-error.js';

const ALLOWED_MIME_TYPES = new Set(['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml']);

export class UploadsService {
  isAllowedMimeType(mimetype: string) {
    return ALLOWED_MIME_TYPES.has(mimetype);
  }

  async uploadImage(
    buffer: Buffer,
    options: { publicId?: string; folder?: string } = {},
  ): Promise<UploadApiResponse> {
    const uploadOptions = {
      folder: options.folder ?? 'abou-taleb/uploads',
      resource_type: 'image' as const,
      ...(options.publicId
        ? { public_id: options.publicId, overwrite: true, invalidate: true }
        : {}),
    };
    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(uploadOptions, (error, result) => {
          if (error || !result) {
            reject(appErrors.uploadFailed());
            return;
          }
          resolve(result);
        })
        .end(buffer);
    });
  }
}

import type { UploadImageResponse } from '@abou/contracts';
import { apiUpload } from '../auth/auth-client.js';

export async function uploadImage(file: File): Promise<UploadImageResponse> {
  const formData = new FormData();
  formData.append('file', file);
  return apiUpload<UploadImageResponse>('/admin/uploads/image', formData);
}

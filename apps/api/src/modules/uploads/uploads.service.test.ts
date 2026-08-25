import { describe, expect, it, vi, beforeEach } from 'vitest';

const uploadStreamMock = vi.fn();

vi.mock('cloudinary', () => ({
  v2: {
    config: vi.fn(),
    uploader: {
      upload_stream: (...args: unknown[]) => uploadStreamMock(...args),
    },
  },
}));

describe('UploadsService', () => {
  beforeEach(() => {
    uploadStreamMock.mockReset();
  });

  it('accepts known image mimetypes', async () => {
    const { UploadsService } = await import('./uploads.service.js');
    const service = new UploadsService();
    expect(service.isAllowedMimeType('image/png')).toBe(true);
    expect(service.isAllowedMimeType('image/jpeg')).toBe(true);
    expect(service.isAllowedMimeType('image/webp')).toBe(true);
    expect(service.isAllowedMimeType('image/svg+xml')).toBe(true);
    expect(service.isAllowedMimeType('application/pdf')).toBe(false);
  });

  it('resolves with the Cloudinary result on a successful upload', async () => {
    uploadStreamMock.mockImplementation((_options, callback) => ({
      end: () =>
        callback(null, { secure_url: 'https://res.cloudinary.com/demo/image/upload/test.png' }),
    }));
    const { UploadsService } = await import('./uploads.service.js');
    const service = new UploadsService();

    const result = await service.uploadImage(Buffer.from('fake-image-bytes'));

    expect(result.secure_url).toBe('https://res.cloudinary.com/demo/image/upload/test.png');
  });

  it('rejects with an AppError when Cloudinary fails', async () => {
    uploadStreamMock.mockImplementation((_options, callback) => ({
      end: () => callback(new Error('cloudinary is down'), undefined),
    }));
    const { UploadsService } = await import('./uploads.service.js');
    const service = new UploadsService();

    await expect(service.uploadImage(Buffer.from('fake-image-bytes'))).rejects.toMatchObject({
      code: 'UPLOAD_FAILED',
    });
  });
});

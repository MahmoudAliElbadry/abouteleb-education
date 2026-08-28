import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { ImageUploadField } from './ImageUploadField.js';
import { ApiError } from '../auth/auth-client.js';

const mocks = vi.hoisted(() => ({
  uploadImage: vi.fn(),
}));
vi.mock('./uploads-client.js', () => ({ uploadImage: mocks.uploadImage }));

function makeFile(name: string, type: string, sizeBytes = 100) {
  const file = new File([new Uint8Array(sizeBytes)], name, { type });
  return file;
}

describe('ImageUploadField', () => {
  afterEach(() => {
    cleanup();
    mocks.uploadImage.mockReset();
  });

  it('renders a placeholder when no value is set', () => {
    render(<ImageUploadField value={null} onChange={vi.fn()} label="Logo" />);
    expect(screen.getByText('Drop an image here, or browse files')).toBeInTheDocument();
  });

  it('renders a preview image when a value is set', () => {
    render(
      <ImageUploadField value="https://example.com/logo.png" onChange={vi.fn()} label="Logo" />,
    );
    expect(document.querySelector('.image-upload-preview')).toHaveAttribute(
      'src',
      'https://example.com/logo.png',
    );
  });

  it('uploads a valid file and calls onChange with the resulting URL', async () => {
    mocks.uploadImage.mockResolvedValue({ secure_url: 'https://res.cloudinary.com/demo/a.png' });
    const onChange = vi.fn();
    render(<ImageUploadField value={null} onChange={onChange} label="Logo" />);

    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    fireEvent.change(input, { target: { files: [makeFile('logo.png', 'image/png')] } });

    await waitFor(() =>
      expect(onChange).toHaveBeenCalledWith('https://res.cloudinary.com/demo/a.png'),
    );
  });

  it('reports when an upload starts and finishes', async () => {
    let resolveUpload: ((value: { secure_url: string }) => void) | undefined;
    mocks.uploadImage.mockImplementation(() => new Promise((resolve) => (resolveUpload = resolve)));
    const onUploadingChange = vi.fn();
    render(
      <ImageUploadField
        value={null}
        onChange={vi.fn()}
        onUploadingChange={onUploadingChange}
        label="Logo"
      />,
    );

    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    fireEvent.change(input, { target: { files: [makeFile('logo.png', 'image/png')] } });
    expect(onUploadingChange).toHaveBeenCalledWith(true);

    resolveUpload?.({ secure_url: 'https://res.cloudinary.com/demo/a.png' });
    await waitFor(() => expect(onUploadingChange).toHaveBeenCalledWith(false));
  });

  it('shows an error message when the upload fails', async () => {
    mocks.uploadImage.mockRejectedValue(new ApiError('UPLOAD_FAILED', 503, 'Upload failed'));
    render(<ImageUploadField value={null} onChange={vi.fn()} label="Logo" />);

    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    fireEvent.change(input, { target: { files: [makeFile('logo.png', 'image/png')] } });

    expect(await screen.findByRole('alert')).toHaveTextContent('Upload failed');
  });

  it('rejects an oversized file without calling the API', async () => {
    render(<ImageUploadField value={null} onChange={vi.fn()} label="Logo" />);

    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    fireEvent.change(input, {
      target: { files: [makeFile('logo.png', 'image/png', 6 * 1024 * 1024)] },
    });

    expect(await screen.findByRole('alert')).toHaveTextContent('5MB or smaller');
    expect(mocks.uploadImage).not.toHaveBeenCalled();
  });

  it('rejects a disallowed file type without calling the API', async () => {
    render(<ImageUploadField value={null} onChange={vi.fn()} label="Logo" />);

    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    fireEvent.change(input, { target: { files: [makeFile('doc.pdf', 'application/pdf')] } });

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Please choose a PNG, JPEG, WebP, or SVG image.',
    );
    expect(mocks.uploadImage).not.toHaveBeenCalled();
  });
});

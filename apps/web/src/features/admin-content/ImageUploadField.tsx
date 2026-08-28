import { useRef, useState, type ChangeEvent, type DragEvent } from 'react';
import { ApiError } from '../auth/auth-client.js';
import { uploadImage } from './uploads-client.js';

const ACCEPTED_TYPES = ['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml'];
const MAX_SIZE_BYTES = 5 * 1024 * 1024;

export function ImageUploadField({
  value,
  onChange,
  onUploadingChange,
  label,
  required,
}: {
  value: string | null;
  onChange: (url: string) => void;
  onUploadingChange?: (isUploading: boolean) => void;
  label: string;
  required?: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  async function handleFile(file: File) {
    setError('');
    if (!ACCEPTED_TYPES.includes(file.type)) {
      setError('Please choose a PNG, JPEG, WebP, or SVG image.');
      return;
    }
    if (file.size > MAX_SIZE_BYTES) {
      setError('Image must be 5MB or smaller.');
      return;
    }
    setIsUploading(true);
    onUploadingChange?.(true);
    try {
      const result = await uploadImage(file);
      onChange(result.secure_url);
    } catch (uploadError) {
      setError(uploadError instanceof ApiError ? uploadError.message : 'Unable to upload image.');
    } finally {
      setIsUploading(false);
      onUploadingChange?.(false);
    }
  }

  function onInputChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) void handleFile(file);
    event.target.value = '';
  }

  function onDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragOver(false);
    const file = event.dataTransfer.files?.[0];
    if (file) void handleFile(file);
  }

  return (
    <label className="image-upload-field">
      {required ? `${label} *` : label}
      <div
        className={`image-upload-dropzone${isDragOver ? ' is-drag-over' : ''}`}
        aria-busy={isUploading}
        onClick={() => inputRef.current?.click()}
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={onDrop}
      >
        {value ? (
          <img className="image-upload-preview" src={value} alt="" />
        ) : (
          <span className="image-upload-placeholder">
            {isUploading ? 'Uploading…' : 'Drop an image here, or browse files'}
          </span>
        )}
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPTED_TYPES.join(',')}
          onChange={onInputChange}
          disabled={isUploading}
          hidden
        />
      </div>
      {error ? (
        <p role="alert" className="form-error">
          {error}
        </p>
      ) : null}
    </label>
  );
}

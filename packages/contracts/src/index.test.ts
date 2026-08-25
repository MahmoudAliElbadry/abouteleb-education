import { describe, expect, it } from 'vitest';
import {
  healthResponseSchema,
  managedContactUpsertSchema,
  socialLinkCreateSchema,
  managedContentListQuerySchema,
  testimonialCreateSchema,
  testimonialUpdateSchema,
  universityCreateSchema,
  uploadImageResponseSchema,
} from './index.js';

describe('healthResponseSchema', () => {
  it('accepts the API health response shape', () => {
    expect(healthResponseSchema.parse({ status: 'ok', service: 'api' })).toEqual({
      status: 'ok',
      service: 'api',
    });
  });
});

describe('managed content contracts', () => {
  const university = {
    slug: 'istanbul-example',
    nameAr: 'جامعة تجريبية',
    nameEn: 'Example University',
    nameTr: 'Örnek Üniversitesi',
    city: 'Istanbul',
    imageUrl: 'https://aboutalebeducation.com/example.png',
  };

  it('accepts valid tri-locale university content and defaults', () => {
    expect(universityCreateSchema.parse(university)).toMatchObject({
      isPublished: false,
      sortOrder: 0,
    });
  });

  it('rejects insecure URLs and invalid slugs', () => {
    expect(() =>
      universityCreateSchema.parse({
        ...university,
        slug: 'Not Safe',
        imageUrl: 'http://example.com/a.png',
      }),
    ).toThrow();
  });

  it('rejects testimonial publication without confirmed consent', () => {
    expect(() =>
      testimonialCreateSchema.parse({
        clientNameAr: 'عميل',
        clientNameEn: 'Client',
        clientNameTr: 'Müşteri',
        quoteAr: 'رأي',
        quoteEn: 'Quote',
        quoteTr: 'Alıntı',
        isPublished: true,
      }),
    ).toThrow();
  });

  it('allows a consent-ful publish PATCH for service-level consent verification', () => {
    expect(testimonialUpdateSchema.parse({ isPublished: true })).toMatchObject({
      isPublished: true,
    });
    expect(
      testimonialUpdateSchema.parse({ isPublished: true, consentConfirmed: false }),
    ).toMatchObject({ isPublished: true, consentConfirmed: false });
  });

  it('parses only literal boolean list filters', () => {
    expect(managedContentListQuerySchema.parse({ isPublished: 'false' }).isPublished).toBe(false);
    expect(managedContentListQuerySchema.parse({ isPublished: 'true' }).isPublished).toBe(true);
    expect(() => managedContentListQuerySchema.parse({ isPublished: '1' })).toThrow();
    expect(() => managedContentListQuerySchema.parse({ isPublished: 'yes' })).toThrow();
  });

  it('allows only approved social icons and fixed contact keys', () => {
    expect(() =>
      socialLinkCreateSchema.parse({
        platform: 'x',
        labelAr: 'x',
        labelEn: 'x',
        labelTr: 'x',
        url: 'https://x.com/example',
        iconKey: 'unknown',
      }),
    ).toThrow();
    expect(() => managedContactUpsertSchema.parse({ key: 'arbitrary_key', value: 'x' })).toThrow();
  });
});

describe('uploadImageResponseSchema', () => {
  it('accepts an HTTPS secure_url', () => {
    expect(
      uploadImageResponseSchema.parse({ secure_url: 'https://res.cloudinary.com/demo/a.png' }),
    ).toEqual({ secure_url: 'https://res.cloudinary.com/demo/a.png' });
  });

  it('rejects a non-HTTPS URL', () => {
    expect(() =>
      uploadImageResponseSchema.parse({ secure_url: 'http://res.cloudinary.com/demo/a.png' }),
    ).toThrow();
  });

  it('rejects a missing secure_url', () => {
    expect(() => uploadImageResponseSchema.parse({})).toThrow();
  });
});

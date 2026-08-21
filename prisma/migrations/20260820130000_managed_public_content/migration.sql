CREATE TABLE "University" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "nameAr" TEXT NOT NULL,
    "nameEn" TEXT NOT NULL,
    "nameTr" TEXT NOT NULL,
    "summaryAr" TEXT NOT NULL,
    "summaryEn" TEXT NOT NULL,
    "summaryTr" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "websiteUrl" TEXT,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "archivedAt" TIMESTAMP(3),
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "University_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "University_slug_key" ON "University"("slug");
CREATE INDEX "University_isPublished_archivedAt_sortOrder_idx" ON "University"("isPublished", "archivedAt", "sortOrder");
CREATE INDEX "University_city_isPublished_idx" ON "University"("city", "isPublished");

CREATE TABLE "Testimonial" (
    "id" TEXT NOT NULL,
    "clientNameAr" TEXT NOT NULL,
    "clientNameEn" TEXT NOT NULL,
    "clientNameTr" TEXT NOT NULL,
    "quoteAr" TEXT NOT NULL,
    "quoteEn" TEXT NOT NULL,
    "quoteTr" TEXT NOT NULL,
    "imageUrl" TEXT,
    "consentConfirmed" BOOLEAN NOT NULL DEFAULT false,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "archivedAt" TIMESTAMP(3),
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Testimonial_pkey" PRIMARY KEY ("id")
);
CREATE INDEX "Testimonial_isPublished_archivedAt_sortOrder_idx" ON "Testimonial"("isPublished", "archivedAt", "sortOrder");

CREATE TABLE "SocialLink" (
    "id" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "labelAr" TEXT NOT NULL,
    "labelEn" TEXT NOT NULL,
    "labelTr" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "iconKey" TEXT NOT NULL,
    "isVisible" BOOLEAN NOT NULL DEFAULT true,
    "archivedAt" TIMESTAMP(3),
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "SocialLink_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "SocialLink_platform_url_key" ON "SocialLink"("platform", "url");
CREATE INDEX "SocialLink_isVisible_archivedAt_sortOrder_idx" ON "SocialLink"("isVisible", "archivedAt", "sortOrder");

CREATE TABLE "ManagedContent" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ManagedContent_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "ManagedContent_key_key" ON "ManagedContent"("key");

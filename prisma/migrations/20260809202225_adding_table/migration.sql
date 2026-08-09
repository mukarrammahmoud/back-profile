-- CreateTable
CREATE TABLE "admins" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password_hash" TEXT NOT NULL,
    "display_name" VARCHAR(100),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "admins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profile" (
    "id" SERIAL NOT NULL,
    "full_name" VARCHAR(100) NOT NULL,
    "title" VARCHAR(100),
    "titles" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "short_bio" VARCHAR(300),
    "bio" TEXT,
    "avatar_url" TEXT,
    "hero_image_url" TEXT,
    "cv_url" TEXT,
    "email" VARCHAR(255),
    "phone" VARCHAR(50),
    "location" VARCHAR(150),
    "availability" VARCHAR(100),
    "social_links" JSONB,
    "languages" JSONB,
    "stats" JSONB,
    "call_to_actions" JSONB,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "portfolio_settings" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "site_name" VARCHAR(120) NOT NULL DEFAULT 'My Portfolio',
    "site_description" TEXT,
    "logo_url" TEXT,
    "favicon_url" TEXT,
    "primary_color" VARCHAR(20) NOT NULL DEFAULT '#2563eb',
    "secondary_color" VARCHAR(20) NOT NULL DEFAULT '#0f172a',
    "theme" VARCHAR(20) NOT NULL DEFAULT 'system',
    "fonts" JSONB,
    "hero_background" JSONB,
    "section_config" JSONB,
    "seo" JSONB,
    "custom_domain" VARCHAR(255),
    "language" VARCHAR(10) NOT NULL DEFAULT 'en',
    "direction" VARCHAR(3) NOT NULL DEFAULT 'ltr',
    "custom" JSONB,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "portfolio_settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "projects" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "slug" VARCHAR(255),
    "description" TEXT,
    "image_url" TEXT,
    "gallery" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "technologies" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "demo_url" TEXT,
    "repo_url" TEXT,
    "is_featured" BOOLEAN NOT NULL DEFAULT false,
    "is_published" BOOLEAN NOT NULL DEFAULT true,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "skills" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "category" VARCHAR(50),
    "proficiency_level" INTEGER,
    "icon_url" TEXT,
    "is_visible" BOOLEAN NOT NULL DEFAULT true,
    "sort_order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "skills_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "history" (
    "id" SERIAL NOT NULL,
    "type" VARCHAR(20),
    "organization" VARCHAR(150) NOT NULL,
    "position_or_degree" VARCHAR(150),
    "description" TEXT,
    "location" VARCHAR(150),
    "organization_url" TEXT,
    "start_date" DATE,
    "end_date" DATE,
    "is_current" BOOLEAN NOT NULL DEFAULT false,
    "is_visible" BOOLEAN NOT NULL DEFAULT true,
    "sort_order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sections" (
    "id" SERIAL NOT NULL,
    "key" VARCHAR(80) NOT NULL,
    "title" VARCHAR(150) NOT NULL,
    "type" VARCHAR(50) NOT NULL,
    "content" JSONB NOT NULL,
    "is_visible" BOOLEAN NOT NULL DEFAULT true,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "media_assets" (
    "id" SERIAL NOT NULL,
    "filename" VARCHAR(255) NOT NULL,
    "original_name" VARCHAR(255) NOT NULL,
    "mime_type" VARCHAR(100) NOT NULL,
    "size" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "provider" VARCHAR(30) NOT NULL DEFAULT 'local',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "media_assets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contact_messages" (
    "id" SERIAL NOT NULL,
    "sender_name" VARCHAR(100) NOT NULL,
    "sender_email" VARCHAR(255) NOT NULL,
    "subject" VARCHAR(200),
    "message" TEXT NOT NULL,
    "is_read" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "contact_messages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "admins_email_key" ON "admins"("email");

-- CreateIndex
CREATE UNIQUE INDEX "projects_slug_key" ON "projects"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "sections_key_key" ON "sections"("key");

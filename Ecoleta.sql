DROP DATABASE IF EXISTS ecoleta;
CREATE DATABASE ecoleta;

CREATE TABLE "places" (
  "id" SERIAL PRIMARY KEY,
  "name" text NOT NULL,
  "image_url" text,
  "address" text NOT NULL,
  "complement" text,
  "state" text NOT NULL,
  "city" text NOT NULL,
  "items" text[] NOT NULL,
  "created_at" timestamp DEFAULT (now())
);


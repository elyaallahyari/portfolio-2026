CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE "RagChunk" (
    "id" SERIAL PRIMARY KEY,
    "sourceTitle" TEXT NOT NULL,
    "sourceHref" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "embedding" vector (1536) -- text-embedding-3-small. Ollama's nomic-embed-text is 768 — change here AND the schema if you switch.
);

-- HNSW index: prisma migrate cannot create pgvector indexes, hence raw SQL
CREATE INDEX "RagChunk_embedding_hnsw" ON "RagChunk" USING hnsw ("embedding" vector_cosine_ops);
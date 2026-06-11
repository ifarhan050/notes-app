CREATE DATABASE IF NOT EXISTS notes_app
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE notes_app;

CREATE TABLE IF NOT EXISTS notes (
  id         BIGINT       NOT NULL,
  title      VARCHAR(80)  NOT NULL DEFAULT '',
  body       TEXT         NOT NULL,
  created_at BIGINT       NOT NULL,
  updated_at BIGINT       NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS note_tags (
  id      INT AUTO_INCREMENT NOT NULL,
  note_id BIGINT      NOT NULL,
  tag     VARCHAR(100) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE  KEY uq_note_tag (note_id, tag),
  INDEX   idx_tag (tag),
  CONSTRAINT fk_note_tags_note
    FOREIGN KEY (note_id) REFERENCES notes (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

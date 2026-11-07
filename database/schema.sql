-- =====================================================================
-- EquoTEA · APAE Campina Grande — esquema do banco de dados (SQL padrão,
-- compatível com SQLite e PostgreSQL). Espelha js/dados.js.
-- Os dados iniciais são gerados por: node database/gerar-seed.mjs
-- =====================================================================

CREATE TABLE IF NOT EXISTS cavalos (
  id            INTEGER PRIMARY KEY,
  nome          TEXT,
  foto          TEXT,
  idade         TEXT,
  pelagem       TEXT,
  temperamento  TEXT,
  papel         TEXT              -- função na terapia
);

CREATE TABLE IF NOT EXISTS necessidades (
  id        TEXT PRIMARY KEY,     -- infra | montaria | veterinario
  rotulo    TEXT NOT NULL,
  titulo    TEXT NOT NULL,
  intro     TEXT,
  fecho     TEXT
);

CREATE TABLE IF NOT EXISTS necessidade_itens (
  id               INTEGER PRIMARY KEY,
  necessidade_id   TEXT NOT NULL REFERENCES necessidades(id),
  grupo            TEXT NOT NULL,
  item             TEXT NOT NULL,
  ordem            INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS parceiros (
  id             TEXT PRIMARY KEY, -- apadrinhe | alimentacao | empresa | veterinaria | instituicao
  titulo         TEXT NOT NULL,
  tag            TEXT,
  destaque       TEXT,
  intro          TEXT,
  lista_titulo   TEXT,
  publico_titulo TEXT,
  publico        TEXT,
  fecho          TEXT
);

CREATE TABLE IF NOT EXISTS parceiro_itens (
  id           INTEGER PRIMARY KEY,
  parceiro_id  TEXT NOT NULL REFERENCES parceiros(id),
  item         TEXT NOT NULL,
  ordem        INTEGER NOT NULL DEFAULT 0
);

-- Pessoas/empresas que se interessaram em apoiar (registro do contato)
CREATE TABLE IF NOT EXISTS contatos_apoio (
  id           INTEGER PRIMARY KEY,
  criado_em    TEXT NOT NULL,
  nome         TEXT NOT NULL,
  contato      TEXT NOT NULL,
  modalidade   TEXT REFERENCES parceiros(id),
  mensagem     TEXT
);

-- Depoimentos: publicar somente com autorização por escrito
CREATE TABLE IF NOT EXISTS depoimentos (
  id           INTEGER PRIMARY KEY,
  autor        TEXT NOT NULL,
  vinculo      TEXT,
  texto        TEXT,
  video        TEXT,
  autorizado   INTEGER NOT NULL DEFAULT 0 CHECK (autorizado IN (0,1)),
  publicado_em TEXT
);

-- Prestação de contas: entradas (doações) e saídas (aplicação dos recursos)
CREATE TABLE IF NOT EXISTS doacoes (
  id           INTEGER PRIMARY KEY,
  data         TEXT NOT NULL,
  tipo         TEXT NOT NULL CHECK (tipo IN ('Entrada','Saída')),
  descricao    TEXT NOT NULL,
  valor        NUMERIC(12,2) NOT NULL CHECK (valor >= 0),
  comprovante  TEXT
);

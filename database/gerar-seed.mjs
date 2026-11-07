// Gera database/seed.sql a partir de js/dados.js
// Uso (na pasta public_html):  node database/gerar-seed.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const ctx = { window: {} };
vm.runInNewContext(readFileSync(join(raiz, 'js', 'dados.js'), 'utf8'), ctx);
const db = ctx.window.EQUOTEA_DB;

const q = (v) => (v === undefined || v === null || v === '') ? 'NULL' : "'" + String(v).replace(/'/g, "''") + "'";
const out = ['-- Gerado automaticamente por gerar-seed.mjs — não editar à mão.', 'BEGIN;'];

db.cavalos.forEach(c => out.push(
  `INSERT INTO cavalos (id,nome,foto,idade,pelagem,temperamento,papel) VALUES (${c.id},${q(c.nome)},${q(c.foto)},${q(c.idade)},${q(c.pelagem)},${q(c.temperamento)},${q(c.papel)});`));

let nid = 1;
db.necessidades.forEach(n => {
  out.push(`INSERT INTO necessidades (id,rotulo,titulo,intro,fecho) VALUES (${q(n.id)},${q(n.rotulo)},${q(n.titulo)},${q(n.intro)},${q(n.fecho)});`);
  n.grupos.forEach(g => g.itens.forEach((it, i) => out.push(
    `INSERT INTO necessidade_itens (id,necessidade_id,grupo,item,ordem) VALUES (${nid++},${q(n.id)},${q(g.titulo)},${q(it)},${i});`)));
});

let pid = 1;
db.parceiros.forEach(p => {
  out.push(`INSERT INTO parceiros (id,titulo,tag,destaque,intro,lista_titulo,publico_titulo,publico,fecho) VALUES (${q(p.id)},${q(p.titulo)},${q(p.tag)},${q(p.destaque)},${q(p.intro)},${q(p.listaTitulo)},${q(p.publicoTitulo)},${q(p.publico)},${q(p.fecho)});`);
  p.itens.forEach((it, i) => out.push(
    `INSERT INTO parceiro_itens (id,parceiro_id,item,ordem) VALUES (${pid++},${q(p.id)},${q(it)},${i});`));
});

out.push('COMMIT;');
writeFileSync(join(raiz, 'database', 'seed.sql'), out.join('\n') + '\n');
console.log('seed.sql gerado com', out.length, 'linhas.');

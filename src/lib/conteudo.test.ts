import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { BENEFICIOS, CLIENTES, COMPARATIVO, I9, MENU, PLANOS, SOLUCOES } from "./conteudo";

const publico = join(process.cwd(), "public");

describe("conteúdo do site", () => {
  it("todo logo e selo listado existe em public/", () => {
    for (const l of [...CLIENTES.logos, ...I9.certificacoes]) {
      expect(existsSync(join(publico, l.arquivo)), l.arquivo).toBe(true);
    }
    for (const l of COMPARATIVO.linhas) for (const src of l.logos) expect(existsSync(join(publico, src)), src).toBe(true);
  });

  it("não há item vazio nas listas", () => {
    for (const c of SOLUCOES.itens) expect(c.titulo.trim() && c.texto.trim()).toBeTruthy();
    for (const b of BENEFICIOS.itens) expect(b.titulo.trim() && b.texto.trim()).toBeTruthy();
    for (const p of PLANOS.itens) expect(p.itens.length).toBeGreaterThan(0);
  });

  it("o menu tem os ids que as seções usam e nenhum repetido", () => {
    const ids = MENU.map((m) => m.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(ids).toContain("inicio");
    expect(ids).toContain("planos");
  });

  it("os planos não expõem valor", () => {
    for (const p of PLANOS.itens) for (const i of p.itens) expect(i).not.toMatch(/R\$\s?\d/);
  });
});

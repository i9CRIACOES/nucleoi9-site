import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import * as conteudo from "./conteudo";
import { AGENTES, AUTOMATICO, BENEFICIOS, CLIENTES, COMPARATIVO, I9, MENU, PLANOS, SOLUCOES } from "./conteudo";

const publico = join(process.cwd(), "public");

describe("conteúdo do site", () => {
  it("todo logo e selo listado existe em public/", () => {
    for (const l of [...CLIENTES.logos, ...I9.certificacoes]) {
      expect(existsSync(join(publico, l.arquivo)), l.arquivo).toBe(true);
    }
    for (const a of AGENTES.montar.agentes) expect(existsSync(join(publico, a.foto)), a.foto).toBe(true);
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

  it("no texto é sempre Agentes iA: nada de robô ou bot", () => {
    const textos: string[] = [];
    const junta = (v: unknown, chave = "") => {
      if (typeof v === "string") chave !== "icone" && textos.push(v);
      else if (Array.isArray(v)) v.forEach((x) => junta(x));
      else if (v && typeof v === "object") Object.entries(v).forEach(([k, x]) => junta(x, k));
    };
    junta(conteudo);
    for (const t of textos) {
      expect(t, t).not.toMatch(/\brob[ôo]s?\b/i);
      expect(t, t).not.toMatch(/\bbots?\b/i);
    }
  });

  it("textos novos sem travessão e sem promessa de resultado garantido", () => {
    const novos = JSON.stringify([AUTOMATICO, AGENTES.conversa, AGENTES.sub]);
    expect(novos).not.toMatch(/—|–/);
    expect(novos).not.toMatch(/garant/i);
  });

  it("na seção junta, o texto do agente é curto: uma frase e passos de uma linha", () => {
    expect(AUTOMATICO.sub.length).toBeLessThanOrEqual(150);
    expect(AUTOMATICO.sub.split(/[.!?]\s/).length).toBeLessThanOrEqual(2);
    for (const p of AUTOMATICO.passos) expect(p.texto.length, p.titulo).toBeLessThanOrEqual(80);
    expect(AUTOMATICO.fim.texto.length).toBeLessThanOrEqual(80);
  });

  it("a conversa do Agente iA termina com reunião marcada", () => {
    const m = AGENTES.conversa.mensagens;
    expect(m[0].de).toBe("cliente");
    expect(m[m.length - 1].de).toBe("ia");
    expect(m.some((x) => x.de === "qualifica")).toBe(true);
    expect(AGENTES.conversa.evento.selo).toBe("Marcado pelo Agente iA");
  });
});

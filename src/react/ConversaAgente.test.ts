import { describe, expect, it } from "vitest";
import { montarEtapas } from "./ConversaAgente";
import { AGENTES } from "../lib/conteudo";

describe("roteiro da conversa do Agente iA", () => {
  it("toda mensagem de pessoa vem depois de um digitando e o evento fecha", () => {
    const e = montarEtapas();
    e.forEach((x, k) => {
      if (x.tipo !== "msg") return;
      const de = AGENTES.conversa.mensagens[x.i].de;
      if (de === "qualifica") return;
      expect(e[k - 1]).toEqual({ tipo: "digitando", de });
    });
    expect(e[e.length - 1]).toEqual({ tipo: "evento" });
  });
});

import { describe, expect, it } from "vitest";
import { extrairSlug, urlDeEntrega, urlDoPainel } from "./handoff";

describe("extrairSlug", () => {
  it("aceita o slug puro, o endereço e a URL completa", () => {
    expect(extrairSlug("clinica")).toBe("clinica");
    expect(extrairSlug(" Clinica.nucleoi9.com.br ")).toBe("clinica");
    expect(extrairSlug("https://clinica-viva.nucleoi9.com.br/funil?x=1")).toBe("clinica-viva");
  });

  it("recusa o que não é conta de cliente", () => {
    expect(extrairSlug("")).toBeNull();
    expect(extrairSlug("nucleoi9.com.br")).toBeNull();
    expect(extrairSlug("dev.nucleoi9.com.br")).toBeNull();
    expect(extrairSlug("admin")).toBeNull();
    expect(extrairSlug("a b")).toBeNull();
    expect(extrairSlug("-x")).toBeNull();
  });
});

describe("urlDeEntrega", () => {
  it("põe os tokens no fragmento, nunca na query", () => {
    const u = urlDeEntrega("clinica", { access_token: "A.B.C", refresh_token: "r1", expires_in: 3600, expires_at: 1700000000 });
    expect(u.startsWith("https://clinica.nucleoi9.com.br/#")).toBe(true);
    expect(u).not.toContain("?");
    const frag = new URLSearchParams(u.split("#")[1]);
    expect(frag.get("access_token")).toBe("A.B.C");
    expect(frag.get("refresh_token")).toBe("r1");
    expect(frag.get("token_type")).toBe("bearer");
    expect(frag.get("expires_in")).toBe("3600");
  });

  it("urlDoPainel aponta para o subdomínio do cliente", () => {
    expect(urlDoPainel("acme")).toBe("https://acme.nucleoi9.com.br/");
  });
});

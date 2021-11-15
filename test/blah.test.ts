import { cwrap, ccall } from "../src";
interface WasmModule extends EmscriptenModule {
  cwrap: typeof cwrap;
  ccall: typeof ccall;
}
describe("blah", () => {
  it("works", () => {
    let wasmModul: WasmModule;
    const f1 = wasmModul.cwrap("test", "boolean", [
      "string",
      "string",
      "number",
    ] as const);
    const f2 = wasmModul.ccall(
      "test",
      "boolean",
      ["string", "string", "number"] as const,
      ["1", "2", 2]
    );
    const a = f1("1", "1", 1);
    expect(typeof f2).toBe("number");
    expect(typeof a).toBe("boolean");
  });
});

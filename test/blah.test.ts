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
    ]);
    const f2 = wasmModul.ccall(
      "test",
      "boolean",
      ["string", "string", "number"],
      ["1", "2", 2]
    );
    const a = f1("1", "1", 1);
    expect(typeof f2).toBe("number");
    expect(typeof a).toBe("boolean");
    const int_sqrt = cwrap("int_sqrt", null, ["number"]);
    int_sqrt(0);
    const int_sqrt_number = cwrap("int_sqrt", "number", ["number"]);
    int_sqrt_number(0)

    const f2 = wasmModul.cwrap("test", "boolean", [
      "pointer",
    ]);
    
    const r2 = f2(0)
    const r3 = f2(null)
  })
});

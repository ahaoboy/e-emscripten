import { cwrap, ccall } from "../src";
interface WasmModule extends EmscriptenModule {
  cwrap: typeof cwrap;
  ccall: typeof ccall;
}

describe("blah", () => {
  it("works", () => {
    let wasmModule: WasmModule;
    const f1 = wasmModule.cwrap("test", "boolean", [
      "string",
      "string",
      "number",
    ]);
    const f2 = wasmModule.ccall(
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
  });
});

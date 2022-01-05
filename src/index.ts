// https://emscripten.org/docs/porting/connecting_cpp_and_javascript/Interacting-with-code.html
type StringToType<R extends any> = R extends Emscripten.JSType
  ? {
      number: number;
      string: string;
      array: number[] | string[] | boolean[] | Uint8Array | Int8Array;
      boolean: boolean;
      null: null;
      pointer: number | null; // undefined ?
    }[R]
  : never;

type ArgsToType<T extends Array<Emscripten.JSType | null>> = Extract<
  {
    [P in keyof T]: StringToType<T[P]>;
  },
  any[]
>;

type ReturnToType<R extends Emscripten.JSType | null> = R extends null
  ? null
  : StringToType<Exclude<R, null>>;

export declare function cwrap<
  I extends Array<Emscripten.JSType | null> | [],
  R extends Emscripten.JSType | null
>(
  ident: string,
  returnType: R,
  argTypes: I,
  opts?: Emscripten.CCallOpts
): (...arg: ArgsToType<I>) => ReturnToType<R>;

export declare function ccall<
  I extends Array<Emscripten.JSType | null> | [],
  R extends Emscripten.JSType | null
>(
  ident: string,
  returnType: R,
  argTypes: I,
  args: ArgsToType<I>,
  opts?: Emscripten.CCallOpts
): ReturnToType<R>;

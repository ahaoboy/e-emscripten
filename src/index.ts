export type DataMap<R extends any> = R extends Emscripten.JSType
  ? {
      number: number;
      string: string;
      array: number;
      boolean: boolean;
    }[R]
  : never;

export type CvtArg<T extends readonly Emscripten.JSType[]> = Extract<
  {
    [P in keyof T]: DataMap<T[P]>;
  },
  any[]
>;

type CvtReturn<R extends Emscripten.JSType | null> = R extends null
  ? null
  : DataMap<Exclude<R, null>>;

export declare function cwrap<
  I extends readonly Emscripten.JSType[] | [],
  R extends Emscripten.JSType | null
>(
  ident: string,
  returnType: R,
  argTypes: I,
  opts?: Emscripten.CCallOpts
): (...arg: CvtArg<I>) => CvtReturn<R>;

export declare function ccall<
  I extends readonly Emscripten.JSType[] | [],
  R extends Emscripten.JSType | null
>(
  ident: string,
  returnType: R,
  argTypes: I,
  args: CvtArg<I>,
  opts?: Emscripten.CCallOpts
): CvtReturn<R>;

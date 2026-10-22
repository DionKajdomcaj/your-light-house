// Minimal stand-in for the slice of zod the search route uses.
type Parser<T> = { parse: (v: unknown) => T };

function stringParser(): Parser<string> & {
  optional: () => Parser<string | undefined> & { default: (d: string) => Parser<string> };
} {
  const base = {
    parse: (v: unknown) => (typeof v === "string" ? v : String(v ?? "")),
    optional: () => ({
      parse: (v: unknown) => (v == null ? undefined : String(v)),
      default: (d: string) => ({ parse: (v: unknown) => (v == null || v === "" ? d : String(v)) }),
    }),
  };
  return base as never;
}

export const z = {
  string: stringParser,
  object<S extends Record<string, { parse: (v: unknown) => unknown }>>(shape: S) {
    return {
      parse(v: unknown) {
        const input = (v ?? {}) as Record<string, unknown>;
        const out: Record<string, unknown> = {};
        for (const key of Object.keys(shape)) out[key] = shape[key].parse(input[key]);
        return out;
      },
    };
  },
};
export default z;

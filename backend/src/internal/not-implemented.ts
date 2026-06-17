/**
 * Marks a scaffold stub. Every module method in this skeleton routes through
 * here so that calling unbuilt behavior fails loudly and traceably (with the
 * relevant AC id) rather than silently returning a wrong-but-plausible value.
 *
 * The arrow stubs that use this take no parameters, so module signatures keep
 * descriptive parameter names (declared on the interface) without tripping
 * `noUnusedParameters`.
 */
export function notImplemented(ac: string): never {
  throw new Error(`Not implemented (${ac}). Lens is a scaffold; module logic is deferred to the impl phase.`);
}

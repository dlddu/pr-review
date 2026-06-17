import { contextModule } from './context/index.js';
import { gapDetectionModule } from './gap-detection/index.js';
import { knowledgeBaseModule } from './knowledge-base/index.js';
import { logicEngineModule } from './logic-engine/index.js';
import { metadataModule } from './metadata/index.js';
import { perspectivesModule } from './perspectives/index.js';
import { presentationModule } from './presentation/index.js';

/**
 * Lens backend composition root.
 *
 * The pipeline is one-way: input (metadata + context) → knowledge/perspectives
 * → logic engine → gap detection → presentation. Wiring it here documents the
 * dependency direction; the module bodies are stubs (scaffold), so this
 * entrypoint is a no-op that prints the assembled shape and exits cleanly.
 */
export const pipeline = {
  metadata: metadataModule,
  context: contextModule,
  perspectives: perspectivesModule,
  knowledgeBase: knowledgeBaseModule,
  logicEngine: logicEngineModule,
  gapDetection: gapDetectionModule,
  presentation: presentationModule,
} as const;

function main(): void {
  const stages = Object.keys(pipeline).join(' → ');
  console.log('Lens backend — scaffold (no feature logic yet).');
  console.log(`Pipeline assembled: ${stages}`);
  console.log('No-op entrypoint complete. See docs/prd/ for what each stage will do.');
}

main();

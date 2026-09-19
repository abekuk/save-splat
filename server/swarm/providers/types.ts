/* The provider seam.
 *
 * Everything that makes the swarm what it is — the prompts, the proposal contract, the
 * verifiers, the endpoint, the UI — is provider-agnostic. Only the call itself is not, so
 * that is all this interface covers. Swapping vendors is implementing one method.
 */
import type { AgentParam } from '../../../src/core/swarm/agents';

export interface ReasonerRequest {
  system: string;
  user: string;
  param: AgentParam;
}

export interface ReasonerResponse {
  /** unvalidated model output; the caller runs it through parseRawProposal */
  raw: unknown;
  usage: { input: number; output: number };
}

export class ProviderError extends Error {
  constructor(
    message: string,
    readonly retryable = false,
  ) {
    super(message);
    this.name = 'ProviderError';
  }
}

export interface Reasoner {
  readonly name: string;
  /** resolved lazily, because it may require asking the account what it can actually run */
  model(): Promise<string>;
  complete(req: ReasonerRequest): Promise<ReasonerResponse>;
}

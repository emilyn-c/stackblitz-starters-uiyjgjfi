import { InjectionToken } from '@angular/core';

/**
 * Knobs for the fake backend. Treat this as "the server" - you are not
 * expected to change anything in `ticket-api.ts` or this file to build the feature,
 * but feel free to tweak the values locally while testing.
 */
export interface TicketApiConfig {
  /** Every call waits a random time between min and max (ms). */
  minLatencyMs: number;
  maxLatencyMs: number;
  /** 0..1 - chance that any call fails with a 500. */
  failureRate: number;
  /** Status updates for these ticket ids ALWAYS fail with a 500. */
  alwaysFailStatusUpdateIds: string[];
}

export const TICKET_API_CONFIG = new InjectionToken<TicketApiConfig>('TICKET_API_CONFIG', {
  providedIn: 'root',
  factory: () => ({
    minLatencyMs: 150,
    maxLatencyMs: 1200,
    failureRate: 0,
    alwaysFailStatusUpdateIds: ['T-007'],
  }),
});

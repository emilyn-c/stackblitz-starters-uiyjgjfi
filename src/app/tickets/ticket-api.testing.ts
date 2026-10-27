import { Provider } from '@angular/core';
import { TICKET_API_CONFIG } from './ticket-api.config';

/** Instant, deterministic fake API for unit tests. */
export function provideInstantTicketApi(): Provider {
  return {
    provide: TICKET_API_CONFIG,
    useValue: {
      minLatencyMs: 0,
      maxLatencyMs: 0,
      failureRate: 0,
      alwaysFailStatusUpdateIds: ['T-007'],
    },
  };
}

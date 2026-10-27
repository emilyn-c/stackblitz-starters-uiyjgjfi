import { inject, Injectable } from '@angular/core';
import { TICKET_API_CONFIG } from './ticket-api.config';
import { createSeedTickets } from './ticket-seed';
import { Ticket, TicketQuery, TicketStatus } from './ticket.model';

export class ApiError extends Error {
  constructor(
    readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * Fake backend. Pretend this is a real HTTP API.
 *
 * - `list()` filters on the "server": `search` is a case-insensitive match on the title.
 * - Latency is random, so responses can arrive OUT OF ORDER.
 * - Searching for the text "boom" always makes `list()` fail with a 500.
 * - `updateStatus()` always fails for the ids in `alwaysFailStatusUpdateIds` (see config).
 * - Both methods honour an AbortSignal, like `fetch` does.
 */
@Injectable({ providedIn: 'root' })
export class TicketApi {
  private readonly config = inject(TICKET_API_CONFIG);
  private readonly db: Ticket[] = createSeedTickets();

  async list(query: TicketQuery = {}, signal?: AbortSignal): Promise<Ticket[]> {
    await this.simulateNetwork(signal);

    const search = (query.search ?? '').trim().toLowerCase();
    if (search === 'boom') {
      throw new ApiError(500, 'Internal server error');
    }
    this.maybeFail();

    return this.db
      .filter((t) => !search || t.title.toLowerCase().includes(search))
      .filter((t) => !query.status || t.status === query.status)
      .filter((t) => !query.priority || t.priority === query.priority)
      .map((t) => ({ ...t }));
  }

  async updateStatus(id: string, status: TicketStatus, signal?: AbortSignal): Promise<Ticket> {
    await this.simulateNetwork(signal);

    if (this.config.alwaysFailStatusUpdateIds.includes(id)) {
      throw new ApiError(500, `Could not update ${id}`);
    }
    this.maybeFail();

    const ticket = this.db.find((t) => t.id === id);
    if (!ticket) {
      throw new ApiError(404, `Ticket ${id} not found`);
    }
    ticket.status = status;
    ticket.updatedAt = new Date().toISOString();
    return { ...ticket };
  }

  private maybeFail(): void {
    if (Math.random() < this.config.failureRate) {
      throw new ApiError(500, 'Internal server error');
    }
  }

  private simulateNetwork(signal?: AbortSignal): Promise<void> {
    const { minLatencyMs, maxLatencyMs } = this.config;
    const ms = minLatencyMs + Math.random() * (maxLatencyMs - minLatencyMs);

    return new Promise<void>((resolve, reject) => {
      if (signal?.aborted) {
        reject(new DOMException('Aborted', 'AbortError'));
        return;
      }
      const onAbort = () => {
        clearTimeout(timer);
        reject(new DOMException('Aborted', 'AbortError'));
      };
      const timer = setTimeout(() => {
        signal?.removeEventListener('abort', onAbort);
        resolve();
      }, ms);
      signal?.addEventListener('abort', onAbort, { once: true });
    });
  }
}

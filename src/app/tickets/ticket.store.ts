import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { TicketApi } from './ticket-api';
import { Ticket } from './ticket.model';

interface TicketState {
  tickets: Ticket[];
  loading: boolean;
  error: string | null;
}

const initialState: TicketState = {
  tickets: [],
  loading: false,
  error: null,
};

export const TicketStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, api = inject(TicketApi)) => ({
    async loadAll(): Promise<void> {
      patchState(store, { loading: true, error: null });
      try {
        const tickets = await api.list({});
        patchState(store, { tickets, loading: false });
      } catch (err: any) {
        patchState(store, { error: err.message, loading: false });
      }
    },
  })),
);

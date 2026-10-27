import { TestBed } from '@angular/core/testing';
import { TicketApi } from './ticket-api';
import { provideInstantTicketApi } from './ticket-api.testing';
import { TicketStore } from './ticket.store';

describe('TicketStore', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideInstantTicketApi()] });
  });

  it('starts empty and not loading', () => {
    const store = TestBed.inject(TicketStore);
    expect(store.tickets()).toEqual([]);
    expect(store.loading()).toBe(false);
  });

  it('loads tickets', async () => {
    const store = TestBed.inject(TicketStore);
    await store.loadAll();
    expect(store.tickets()).toHaveLength(24);
    expect(store.loading()).toBe(false);
    expect(store.error()).toBeNull();
  });

  it('exposes the error message when loading fails', async () => {
    vi.spyOn(TestBed.inject(TicketApi), 'list').mockRejectedValue(new Error('Network down'));
    const store = TestBed.inject(TicketStore);
    await store.loadAll();
    expect(store.error()).toBe('Network down');
    expect(store.loading()).toBe(false);
  });
});

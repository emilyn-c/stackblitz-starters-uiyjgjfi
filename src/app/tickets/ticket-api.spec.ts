import { TestBed } from '@angular/core/testing';
import { ApiError, TicketApi } from './ticket-api';
import { provideInstantTicketApi } from './ticket-api.testing';

describe('TicketApi', () => {
  let api: TicketApi;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideInstantTicketApi()] });
    api = TestBed.inject(TicketApi);
  });

  it('returns all tickets when no filter is given', async () => {
    const tickets = await api.list();
    expect(tickets).toHaveLength(24);
  });

  it('filters by title, case-insensitively', async () => {
    const tickets = await api.list({ search: 'LOGIN' });
    expect(tickets.length).toBeGreaterThan(0);
    expect(tickets.every((t) => t.title.toLowerCase().includes('login'))).toBe(true);
  });

  it('combines status and priority filters', async () => {
    const tickets = await api.list({ status: 'open', priority: 'urgent' });
    expect(tickets.every((t) => t.status === 'open' && t.priority === 'urgent')).toBe(true);
  });

  it('fails with a 500 when searching for "boom"', async () => {
    await expect(api.list({ search: 'boom' })).rejects.toBeInstanceOf(ApiError);
  });

  it('rejects with AbortError when the signal is aborted', async () => {
    const controller = new AbortController();
    const promise = api.list({}, controller.signal);
    controller.abort();
    await expect(promise).rejects.toMatchObject({ name: 'AbortError' });
  });

  it('updates the status of a ticket', async () => {
    const updated = await api.updateStatus('T-001', 'resolved');
    expect(updated.status).toBe('resolved');
  });

  it('always fails for T-007', async () => {
    await expect(api.updateStatus('T-007', 'resolved')).rejects.toBeInstanceOf(ApiError);
  });
});

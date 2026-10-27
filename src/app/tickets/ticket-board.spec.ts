import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideInstantTicketApi } from './ticket-api.testing';
import { TicketBoard } from './ticket-board';

describe('TicketBoard', () => {
  let fixture: ComponentFixture<TicketBoard>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketBoard],
      providers: [provideInstantTicketApi()],
    }).compileComponents();

    fixture = TestBed.createComponent(TicketBoard);
    el = fixture.nativeElement as HTMLElement;
  });

  /** The store loads via a plain promise, so poll until the DOM catches up. */
  async function renderedRows(expected: number): Promise<NodeListOf<Element>> {
    await vi.waitFor(() => {
      fixture.detectChanges();
      expect(el.querySelectorAll('tbody tr')).toHaveLength(expected);
    });
    return el.querySelectorAll('tbody tr');
  }

  it('renders one row per ticket', async () => {
    const rows = await renderedRows(24);
    expect(rows[0].textContent).toContain('T-');
  });

  it('shows the ticket count in the summary', async () => {
    await renderedRows(24);
    expect(el.querySelector('.summary')?.textContent).toContain('24 tickets');
  });
});

import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { Ticket, TicketStatus } from './ticket.model';
import { TicketStore } from './ticket.store';

@Component({
  selector: 'app-ticket-board',
  templateUrl: './ticket-board.html',
  styleUrl: './ticket-board.css',
})
export class TicketBoard implements OnInit {
  protected readonly store = inject(TicketStore);

  protected readonly now = signal(Date.now());
  protected readonly ticketCount = signal(0);

  constructor() {
    // keep the "x min ago" labels fresh
    setInterval(() => this.now.set(Date.now()), 30_000);

    effect(() => {
      this.ticketCount.set(this.store.tickets().length);
    });
  }

  ngOnInit(): void {
    this.store.loadAll();
  }

  /** Newest first. */
  protected getSortedTickets(): Ticket[] {
    return this.store.tickets().sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  }

  protected countByStatus(status: TicketStatus): number {
    return this.store.tickets().filter((t) => t.status === status).length;
  }

  protected assigneeLabel(ticket: any): string {
    return ticket.assignee ?? 'Unassigned';
  }

  protected timeAgo(iso: string): string {
    const minutes = Math.max(0, Math.round((this.now() - new Date(iso).getTime()) / 60_000));
    if (minutes < 1) return 'just now';
    if (minutes < 60) return `${minutes} min ago`;
    const hours = Math.round(minutes / 60);
    if (hours < 24) return `${hours} h ago`;
    return `${Math.round(hours / 24)} d ago`;
  }
}

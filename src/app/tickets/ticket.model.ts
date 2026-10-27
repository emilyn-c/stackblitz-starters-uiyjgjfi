export const TICKET_STATUSES = ['open', 'in-progress', 'resolved'] as const;
export type TicketStatus = (typeof TICKET_STATUSES)[number];

export const TICKET_PRIORITIES = ['low', 'medium', 'high', 'urgent'] as const;
export type TicketPriority = (typeof TICKET_PRIORITIES)[number];

export interface Ticket {
  id: string;
  title: string;
  status: TicketStatus;
  priority: TicketPriority;
  /** `null` means unassigned. */
  assignee: string | null;
  /** ISO 8601 timestamp. */
  updatedAt: string;
}

/** Filters understood by the (fake) backend. All fields are optional. */
export interface TicketQuery {
  search?: string;
  status?: TicketStatus;
  priority?: TicketPriority;
}

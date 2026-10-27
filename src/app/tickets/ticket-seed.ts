import { Ticket } from './ticket.model';

const MIN = 60_000;

/** Builds seed data relative to `now` so "x minutes ago" always looks sensible. */
export function createSeedTickets(now = Date.now()): Ticket[] {
  const t = (
    n: number,
    title: string,
    status: Ticket['status'],
    priority: Ticket['priority'],
    assignee: string | null,
    minutesAgo: number,
  ): Ticket => ({
    id: `T-${String(n).padStart(3, '0')}`,
    title,
    status,
    priority,
    assignee,
    updatedAt: new Date(now - minutesAgo * MIN).toISOString(),
  });

  return [
    t(1, 'Login page returns 500 for SSO users', 'open', 'urgent', 'Ada Lovelace', 12),
    t(2, 'Password reset email arrives twice', 'in-progress', 'medium', 'Grace Hopper', 55),
    t(3, 'Export to CSV drops the last row', 'open', 'high', null, 130),
    t(4, 'Dark mode: table header unreadable', 'resolved', 'low', 'Linus Torvalds', 300),
    t(5, 'Invoice PDF shows wrong VAT number', 'in-progress', 'high', 'Margaret Hamilton', 420),
    t(6, 'Cannot change avatar on Safari', 'open', 'low', null, 610),
    t(7, 'Webhook retries never stop after 410 response', 'open', 'urgent', 'Ada Lovelace', 15),
    t(8, 'Search is slow with more than 10k records', 'in-progress', 'high', 'Grace Hopper', 700),
    t(9, 'Typo in onboarding checklist', 'resolved', 'low', 'Linus Torvalds', 1500),
    t(10, 'Two-factor login code expires too early', 'open', 'medium', 'Margaret Hamilton', 95),
    t(11, 'Notification bell shows stale count', 'open', 'medium', null, 240),
    t(12, 'API rate limit headers missing', 'in-progress', 'medium', 'Ada Lovelace', 880),
    t(13, 'Bulk delete leaves orphaned attachments', 'open', 'high', 'Grace Hopper', 33),
    t(14, 'Calendar shows wrong week start in Sweden', 'resolved', 'medium', 'Linus Torvalds', 2100),
    t(15, 'Login throttling locks out whole office IP', 'open', 'urgent', null, 8),
    t(16, 'Mobile menu overlaps cookie banner', 'resolved', 'low', 'Margaret Hamilton', 3000),
    t(17, 'CSV import accepts duplicate emails', 'in-progress', 'high', 'Grace Hopper', 160),
    t(18, 'Audit log missing entries for role changes', 'open', 'high', 'Ada Lovelace', 410),
    t(19, 'Dashboard chart flickers on resize', 'open', 'low', null, 1200),
    t(20, 'Timezone drift in scheduled reports', 'in-progress', 'medium', 'Linus Torvalds', 75),
    t(21, 'Keyboard focus lost after closing modal', 'open', 'medium', 'Margaret Hamilton', 505),
    t(22, 'Profile page 404 for users with spaces in name', 'resolved', 'high', 'Ada Lovelace', 4200),
    t(23, 'Slow cold start on report generation', 'open', 'medium', null, 22),
    t(24, 'Download link expires before upload finishes', 'in-progress', 'urgent', 'Grace Hopper', 5),
  ];
}

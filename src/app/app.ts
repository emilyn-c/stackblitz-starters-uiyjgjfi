import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `
    <div class="topbar">Ticket Board</div>
    <main><router-outlet /></main>
  `,
  styles: `
    .topbar {
      padding: 0.75rem 1.5rem;
      background: var(--brand);
      color: #fff;
      font-weight: 600;
    }
  `,
})
export class App {}

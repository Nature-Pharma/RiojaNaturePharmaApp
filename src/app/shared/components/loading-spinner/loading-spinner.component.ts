import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  template: `
    @if (visible) {
      <div class="spinner-overlay" [class.spinner-overlay--inline]="inline" role="status" aria-label="Cargando...">
        <mat-spinner [diameter]="diameter" [color]="'primary'"></mat-spinner>
        @if (message) {
          <p class="spinner-message">{{ message }}</p>
        }
      </div>
    }
  `,
  styles: [`
    @use 'styles/variables' as vars;

    .spinner-overlay {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: rgba(255, 255, 255, 0.8);
      z-index: 50;
      gap: vars.$np-spacing-md;

      &--inline {
        position: relative;
        min-height: 120px;
        background: transparent;
      }
    }

    .spinner-message {
      font-size: 14px;
      color: vars.$np-text-secondary;
      margin: 0;
    }
  `],
})
export class LoadingSpinnerComponent {
  @Input() visible = false;
  @Input() message?: string;
  @Input() inline  = false;
  @Input() diameter = 48;
}

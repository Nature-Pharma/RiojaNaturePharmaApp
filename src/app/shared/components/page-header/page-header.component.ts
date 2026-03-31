import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

export interface Breadcrumb {
  label: string;
  route?: string;
}

@Component({
  selector: 'app-page-header',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule, MatButtonModule, MatDividerModule],
  template: `
    <header class="page-header">
      <!-- Breadcrumbs -->
      @if (breadcrumbs?.length) {
        <nav class="page-header__breadcrumbs" aria-label="Ruta de navegación">
          @for (crumb of breadcrumbs; track crumb.label; let last = $last) {
            @if (crumb.route && !last) {
              <a [routerLink]="crumb.route" class="page-header__crumb page-header__crumb--link">
                {{ crumb.label }}
              </a>
            } @else {
              <span class="page-header__crumb" [class.page-header__crumb--active]="last">
                {{ crumb.label }}
              </span>
            }
            @if (!last) {
              <mat-icon class="page-header__separator">chevron_right</mat-icon>
            }
          }
        </nav>
      }

      <!-- Title row -->
      <div class="page-header__title-row">
        <div class="page-header__title-group">
          @if (icon) {
            <mat-icon class="page-header__icon">{{ icon }}</mat-icon>
          }
          <div>
            <h1 class="page-header__title">{{ title }}</h1>
            @if (subtitle) {
              <p class="page-header__subtitle">{{ subtitle }}</p>
            }
          </div>
        </div>

        <!-- Action buttons slot -->
        <div class="page-header__actions">
          <ng-content select="[pageActions]"></ng-content>
        </div>
      </div>

      <mat-divider class="page-header__divider"></mat-divider>
    </header>
  `,
  styles: [`
    @use 'styles/variables' as vars;
    @use 'styles/mixins' as mix;

    .page-header {
      padding: vars.$np-spacing-lg vars.$np-spacing-lg vars.$np-spacing-md;
      background-color: vars.$np-white;
      border-bottom: 1px solid vars.$np-border;

      @include mix.respond-to('xs') {
        padding: vars.$np-spacing-md vars.$np-spacing-sm vars.$np-spacing-sm;
      }
    }

    .page-header__breadcrumbs {
      display: flex;
      align-items: center;
      gap: 2px;
      margin-bottom: vars.$np-spacing-sm;
    }

    .page-header__crumb {
      font-size: 13px;
      color: vars.$np-text-secondary;

      &--link {
        color: vars.$np-primary;
        text-decoration: none;
        &:hover { text-decoration: underline; }
      }

      &--active { font-weight: 500; color: vars.$np-text-primary; }
    }

    .page-header__separator {
      font-size: 16px;
      width: 16px;
      height: 16px;
      color: vars.$np-text-disabled;
    }

    .page-header__title-row {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: vars.$np-spacing-md;

      @include mix.respond-to('xs') {
        flex-direction: column;
        gap: vars.$np-spacing-sm;
      }
    }

    .page-header__title-group {
      display: flex;
      align-items: center;
      gap: vars.$np-spacing-md;
    }

    .page-header__icon {
      font-size: 32px;
      width: 32px;
      height: 32px;
      color: vars.$np-primary;

      @include mix.respond-to('xs') {
        font-size: 24px;
        width: 24px;
        height: 24px;
      }
    }

    .page-header__title {
      margin: 0;
      font-size: 24px;
      font-weight: 700;
      color: vars.$np-text-primary;
      line-height: 1.2;

      @include mix.respond-to('xs') { font-size: 20px; }
    }

    .page-header__subtitle {
      margin: 4px 0 0;
      font-size: 14px;
      color: vars.$np-text-secondary;
    }

    .page-header__actions {
      display: flex;
      gap: vars.$np-spacing-sm;
      flex-wrap: wrap;
      align-items: center;
    }

    .page-header__divider {
      margin-top: vars.$np-spacing-md;
    }
  `],
})
export class PageHeaderComponent {
  @Input({ required: true }) title!: string;
  @Input() subtitle?: string;
  @Input() icon?: string;
  @Input() breadcrumbs?: Breadcrumb[];
}

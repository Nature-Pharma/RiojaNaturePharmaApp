import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

export interface ConfirmDialogData {
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  dangerous?: boolean;  // shows confirm button in red
}

// ============================================================
// ConfirmDialogComponent — reusable confirmation dialog
//
// Usage:
//   const ref = this.dialog.open(ConfirmDialogComponent, {
//     data: { title: '¿Eliminar?', message: 'Esta acción no se puede deshacer.', dangerous: true }
//   });
//   ref.afterClosed().subscribe(confirmed => { if (confirmed) { ... } });
// ============================================================
@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatIconModule],
  template: `
    <h2 mat-dialog-title class="dialog-title">
      <mat-icon [class.dangerous]="data.dangerous">
        {{ data.dangerous ? 'warning' : 'help_outline' }}
      </mat-icon>
      {{ data.title }}
    </h2>

    <mat-dialog-content>
      <p>{{ data.message }}</p>
    </mat-dialog-content>

    <mat-dialog-actions align="end">
      <button mat-button [mat-dialog-close]="false">
        {{ data.cancelLabel ?? 'Cancelar' }}
      </button>
      <button
        mat-flat-button
        [class.mat-warn]="data.dangerous"
        [mat-dialog-close]="true"
        cdkFocusInitial
      >
        {{ data.confirmLabel ?? 'Confirmar' }}
      </button>
    </mat-dialog-actions>
  `,
  styles: [`
    @use '../../../styles/variables' as vars;

    .dialog-title {
      display: flex;
      align-items: center;
      gap: vars.$np-spacing-sm;

      mat-icon {
        color: vars.$np-primary;
        &.dangerous { color: vars.$np-error; }
      }
    }

    mat-dialog-content p {
      font-size: 15px;
      color: vars.$np-text-secondary;
      margin: 0;
      line-height: 1.6;
    }

    .mat-warn {
      background-color: vars.$np-error !important;
      color: white !important;
    }
  `],
})
export class ConfirmDialogComponent {
  constructor(
    public readonly dialogRef: MatDialogRef<ConfirmDialogComponent, boolean>,
    @Inject(MAT_DIALOG_DATA) public readonly data: ConfirmDialogData
  ) {}
}

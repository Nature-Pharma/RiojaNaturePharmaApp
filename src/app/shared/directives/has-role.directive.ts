import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
  inject,
} from '@angular/core';
import { Role } from '../../core/auth/models/user.model';
import { AuthService } from '../../core/auth/services/auth.service';

// ============================================================
// HasRoleDirective — structural directive for role-based UI
//
// Usage:
//   <div *npHasRole="'admin'">Admin only content</div>
//   <div *npHasRole="['admin', 'user']">Multiple roles</div>
// ============================================================
@Directive({
  selector: '[npHasRole]',
  standalone: true,
})
export class HasRoleDirective implements OnInit {
  @Input({ required: true }) npHasRole!: Role | Role[];

  private readonly authService     = inject(AuthService);
  private readonly templateRef     = inject(TemplateRef<unknown>);
  private readonly viewContainerRef = inject(ViewContainerRef);

  ngOnInit(): void {
    this.updateView();
  }

  private updateView(): void {
    const roles = Array.isArray(this.npHasRole) ? this.npHasRole : [this.npHasRole];
    const hasAccess = this.authService.hasAnyRole(roles);

    this.viewContainerRef.clear();
    if (hasAccess) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    }
  }
}

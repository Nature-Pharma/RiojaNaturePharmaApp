import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatSidenavModule } from '@angular/material/sidenav';

import { NavbarComponent } from './navbar/navbar.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    NavbarComponent,
    SidenavComponent,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent implements OnInit, OnDestroy {
  private readonly breakpointObserver = inject(BreakpointObserver);
  private readonly destroy$ = new Subject<void>();

  readonly sidenavOpened    = signal(true);
  readonly sidenavMode      = signal<'side' | 'over'>('side');
  readonly sidenavCollapsed = signal(false);
  readonly isPhone          = signal(false);

  ngOnInit(): void {
    this.breakpointObserver
      .observe([
        Breakpoints.XSmall,          // < 600px  (phone)
        Breakpoints.Small,           // 600–959px (tablet portrait)
        '(min-width: 1920px)',        // TV / large screen
      ])
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        const isXSmall = result.breakpoints[Breakpoints.XSmall];
        const isSmall  = result.breakpoints[Breakpoints.Small];
        const isXLarge = result.breakpoints['(min-width: 1920px)'];

        if (isXSmall) {
          // Phone: overlay sidenav, hidden by default
          this.isPhone.set(true);
          this.sidenavMode.set('over');
          this.sidenavOpened.set(false);
          this.sidenavCollapsed.set(false);
        } else if (isSmall) {
          // Tablet: side sidenav, collapsed (icons only)
          this.isPhone.set(false);
          this.sidenavMode.set('side');
          this.sidenavOpened.set(true);
          this.sidenavCollapsed.set(true);
        } else if (isXLarge) {
          // TV: expanded, content with max-width
          this.isPhone.set(false);
          this.sidenavMode.set('side');
          this.sidenavOpened.set(true);
          this.sidenavCollapsed.set(false);
        } else {
          // Desktop (960–1919px): side, expanded
          this.isPhone.set(false);
          this.sidenavMode.set('side');
          this.sidenavOpened.set(true);
          this.sidenavCollapsed.set(false);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleSidenav(): void {
    if (this.isPhone()) {
      // Phone: toggle open/close overlay
      this.sidenavOpened.update(v => !v);
    } else {
      // Tablet/Desktop: toggle collapsed/expanded
      this.sidenavCollapsed.update(v => !v);
    }
  }
}

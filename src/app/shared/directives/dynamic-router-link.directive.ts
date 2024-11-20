import { Directive, HostListener, Input } from '@angular/core';
import { Router } from '@angular/router';

@Directive({
  selector: '[dynamicRouterLink]',
  standalone: true,
})
export class DynamicRouterLinkDirective {
  @Input('dynamicRouterLink') route: string = '';

  constructor(private router: Router) {}

  @HostListener('click', ['$event'])
  onClick(event: Event): void {
    event.preventDefault();
    if (this.route) {
      this.router.navigate([this.route]);
    }
  }
}

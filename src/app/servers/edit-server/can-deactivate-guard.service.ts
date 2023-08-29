import { Observable } from 'rxjs';

export interface CanComponentDeactivate {
  canDeactivate: () => boolean;
}

export class CanDeactivateGuard {
  canDeactivate(component: CanComponentDeactivate) {
    return component.canDeactivate();
  }
}

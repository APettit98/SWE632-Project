import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, GuardResult, MaybeAsync, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

export interface ComponentCanDeactivate {
  canDeactivate: () => boolean | Observable<boolean>;
}

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanDeactivate<ComponentCanDeactivate>{
  canDeactivate(component: ComponentCanDeactivate): boolean | Observable<boolean> {
      return component.canDeactivate()
        ? true
        : confirm('Warning: Leaving this page may erase any unsaved progress. Do you wish to continue?');
  }
}

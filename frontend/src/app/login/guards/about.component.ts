import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import {Observable} from "rxjs";
import {PeopleService} from "../services/people.service";
import {Injectable} from "@angular/core";

@Injectable()
export class AboutGuard implements CanActivate {
    constructor(private _router: Router,
                private _peopleService: PeopleService,) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        const isAdmin = localStorage.getItem('admin');
        if (!isAdmin) {
            this._router.navigate(['/']);
            return false;
        }
       return true
    }
}

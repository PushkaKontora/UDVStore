import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class PersonalActivityService
{
    private readonly _url: string = environment.api_address + '/profile/report_activity/';
    private readonly _options =
        {
            headers: new HttpHeaders({
                'Authorization': "Token " + localStorage.getItem('token')
            })
        };

    constructor(private _http: HttpClient) {}

    public sendActivity(body: FormData): Observable<any>
    {
        return this._http.post(this._url, body, this._options);
    }
}

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, map, Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})

export class AuthenticationService {

    private currentUserSubject: BehaviorSubject<ResponseUser>;
    public currentUser: Observable<ResponseUser>;
    baseUrl: string = "";

    constructor(
        private http: HttpClient
    ) {
        this.currentUserSubject = new BehaviorSubject<ResponseUser>(
            JSON.parse(localStorage.getItem('dashboardUser') || '{}')
        );
        this.currentUser = this.currentUserSubject.asObservable();
        this.baseUrl = environment.apiUrl;
    }

    public get currentUserValue(): ResponseUser {
        return this.currentUserSubject.value;
    }

    login(email: string, password: string): Observable<any> {
        var url = this.baseUrl + "api/v1/auth/autologin";
        var body = {
            email: email,
            password: password
        }
        return this.http.post(url, body)
            .pipe(
                map((loginData: any) => {
                    if (loginData) {
                        const responseBody = loginData;
                        const retailer: ResponseUser = {
                            token: responseBody.token,
                            tokenType: responseBody.tokenType,
                            isAuth: responseBody.isAuth,
                            status: responseBody.status
                        }
                        localStorage.setItem('dashboardUser', JSON.stringify(retailer));
                        this.currentUserSubject.next(retailer);
                        return responseBody;
                    }
                }),
                catchError(err => err)
            )
    }

}

export interface ResponseUser {
    token: string;
    tokenType: string;
    isAuth: boolean;
    status: string;
}
import { Injectable, signal } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from "@angular/common/http"
import { Router } from "@angular/router";
import { ILoginRequest, ILoginResponse } from "../types/login.interface";
import { IRegisterRequest } from "../types/register.interface";
import { Observable, catchError, tap } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    isAuthSignal = signal<boolean>(false);

    constructor(
        private readonly client: HttpClient,
        private readonly router: Router
    ) {
        this.isAuthSignal.set(localStorage.getItem('token') !== null)
    }

    login(loginData : ILoginRequest) {
        this.client.post<ILoginResponse>("http://localhost:5201/api/Authentication/Login", loginData, {
            withCredentials: true
        })
        .subscribe({
            next: (response) => {
                this.isAuthSignal.set(true)
                localStorage.setItem("token", response.accessToken)
                console.log(localStorage.getItem('token'))
                this.router.navigate(['/']) 
            }, 
            error: () => {}, 
            complete: () => {}
        })
    }

    register(registerData : IRegisterRequest) {
        console.log(registerData)
        this.client.post<ILoginResponse>("http://localhost:5201/api/Authentication/Registration", registerData)
        .subscribe((response) => {
            localStorage.setItem("token", response.accessToken)
            this.router.navigate(['/']);
        })
    }

    refresh() : Observable<any> {
        return this.client.post<ILoginResponse>("http://localhost:5201/api/Authentication/Refresh", {}, {withCredentials: true});
    }

    logout() {
        this.isAuthSignal.set(false)
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        });
        this.client.post("http://localhost:5201/api/Authentication/Logout", {}, {
            headers: headers,
            withCredentials: true})
            .subscribe((value)=>{
                console.log("Logout successfull")
            })
        localStorage.removeItem('token')
        this.router.navigate(['/login'])
    }
}
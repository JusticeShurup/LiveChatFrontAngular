import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, catchError, delay, of, retry, switchMap, tap } from "rxjs";
import { AuthService } from "../services/auth.service";
import { Inject, Injectable } from "@angular/core";
import { ILoginResponse } from "../types/login.interface";
import { LoadingController } from "@ionic/angular";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor (
        private readonly authService : AuthService = Inject(AuthService)
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const token = localStorage.getItem('token');
        if (token) {
            req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            })
        }

        return next.handle(req).pipe(
            catchError(err => this.handleAuthError(req, next, err)),
        )
    }

    private handleAuthError(req : HttpRequest<any>, next: HttpHandler, err : HttpErrorResponse) : Observable<any> {
        if (err && err.status == 401) {
            return this.authService.refresh().pipe(
                switchMap((res : ILoginResponse) => {
                    localStorage.setItem('token', res.accessToken)
                    return next.handle(req.clone({
                        setHeaders: {
                            "Authorization": `Bearer ${res.accessToken}`
                        }
                    }))
                })
            )
        }

        return next.handle(req.clone({
            setHeaders: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }))
    }

}
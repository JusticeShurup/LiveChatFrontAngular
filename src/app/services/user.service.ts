import { Injectable, signal } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from "@angular/common/http"
import { Router } from "@angular/router";
import { ILoginRequest, ILoginResponse } from "../types/login.interface";
import { IRegisterRequest } from "../types/register.interface";
import { Observable, catchError, tap } from "rxjs";
import { IUser } from "../types/user.interface";
import { FormGroup } from "@angular/forms";

@Injectable({
    providedIn: 'root',
})
export class UserService {
    usersSig = signal<IUser[]>([])

    constructor(
        private readonly client: HttpClient,
        private readonly router: Router
    ) {}

    updateUserProfile(userData : FormGroup) {
        this.client.put("http://localhost:5098/api/User/UpdateUserProfile", userData).subscribe((res)=> console.log(res));
    }

    getUser() : Observable<IUser> {
        return this.client.get<IUser>("http://localhost:5098/api/User/GetUser").pipe(tap((user : IUser) => {}));
    }

    getAllUsers()  {
        return this.client.get<IUser[]>("http://localhost:5098/api/User/GetAllUsers?Page=1&PageSize=10").subscribe((res: IUser[])=> {
            this.usersSig.set(res)
        })
    }
}
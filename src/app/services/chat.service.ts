import { Injectable, OnInit, signal } from "@angular/core";
import { HubConnection, HubConnectionBuilder, IHttpConnectionOptions } from "@microsoft/signalr";
import { IMessage } from "../types/message.interface";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class ChatService {
    public messagesSig = signal<IMessage[]>([]);
    public hubConnection : HubConnection | null;
    

    constructor(private readonly client : HttpClient) {
        this.hubConnection = null;
    }

    public startConnection() {
        return new Promise((resolve, reject) => {
            const options: IHttpConnectionOptions = {
                accessTokenFactory: () : string => {
                    return localStorage.getItem('token')!;
                }
            }
            
            this.hubConnection = new HubConnectionBuilder()
            .withUrl('http://localhost:5098/chat', options).build()
            
            this.client.get<IMessage[]>("http://localhost:5098/api/Message/GetAllMessages").subscribe((res) => {
                this.messagesSig.set(res);
                console.log(res)
            })

            this.hubConnection.on("MessageReceived", (message : IMessage) => {
                this.messagesSig.mutate((messages) => {
                    messages.push(message)
                })
            })

            this.hubConnection.start()
                .then(() => {
                    console.log("Connection successfull")
                    return resolve(true)
                })
                .catch((err : any) => {
                    console.log(`Error occured ${err}`)
                    reject(err);
                })
        })
    }

    public closeConnection() {
        return new Promise((resolve, reject) => {
            this.hubConnection?.stop()
                .then(() => {
                    console.log("Connection successfully disconnected")
                    return resolve(true)
                })
                .catch((err : any) => {
                    console.log(`Error occured ${err}`)
                    reject(err)
                })
        })
    }

    public sendMessage(text : string) {
        return new Promise((resolve, reject) => {
            this.hubConnection?.send("SendToOthers", text)
                .then(() => {
                    return resolve(true);
                })
                .catch((err : any) => {
                    console.log(`Error occured ${err}`)
                    reject(err)
                })
        })
    }
}
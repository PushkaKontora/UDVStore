import {Injectable} from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class MessagesService {
    public generateMessageWindow() {
        // TODO: for future
    }

    public show(id: string) {
        document.getElementById(id)!.style.visibility = 'visible';
    }

    public hide(id: string) {
        document.getElementById(id)!.style.visibility = 'hidden';
    }
}
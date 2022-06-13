import {Injectable} from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class ModalWorker {
    public openModal(modalName: string) {
        document.getElementById(modalName)!.style.display = 'block';
        document.body.style.overflow = "hidden";
        //document.body.classList.add('modalOpen');
    }

    public closeModal(modalName: string) {
        document.getElementById(modalName)!.style.display = 'none';
        document.body.style.overflow = "visible";
        //document.body.classList.remove('modalOpen');
    }
}

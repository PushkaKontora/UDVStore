import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'main-page-wrapper',
    templateUrl: './main-page-wrapper.component.html',
    styleUrls: ['./main-page-wrapper.component.scss']
})
export class MainPageWrapperComponent implements OnInit {
    public writePers: FormGroup = new FormGroup({})

    constructor(private _router: Router, private _route: ActivatedRoute) {
        _router.navigate(["/main-page/merch"]);
    }

    ngOnInit(): void {
        this.createForm();
    }

    public createGift(): void {
        this._router.navigate(['./merch/present'], {relativeTo: this._route})
    }

    public openModel() {
        document.getElementById('modal-1')!.style.display = 'block';
        document.body.style.overflow = "hidden";
        document.body.classList.add('modalOpen');
    }

    public closeModel() {
        document.getElementById('modal-1')!.style.display = 'none';
        document.body.style.overflow = "visible";
        document.body.classList.remove('modalOpen');
    }

    public onSubmit(){
        //ЗДЕСЬ ОТПРАВИТЬ ДАННЫЕ В БД
        this.closeModel();
        this.writePers.reset();
    }

    private createForm(): void {
        this.writePers = new FormGroup({
            employee: new FormControl('', [Validators.required]),
            coins: new FormControl('', [Validators.required]),
            comment: new FormControl('', [Validators.required]),
        });
    }
}

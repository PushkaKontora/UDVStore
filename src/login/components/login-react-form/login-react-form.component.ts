import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {PeopleService} from "../../people.service";

@Component({
    selector: 'app-login-react-form',
    templateUrl: './login-react-form.component.html',
    styleUrls: ['./login-react-form.component.scss']
})
export class LoginReactFormComponent implements OnInit {
    public login: FormGroup = new FormGroup({});
    @ViewChild('btn')
    btn!: ElementRef;

    @ViewChild('password')
    password!: ElementRef;


    constructor(private _http: HttpClient, private _router: Router, private _peopleService: PeopleService,
                private _renderer: Renderer2) {
        this._createForm();
    }

    ngOnInit() {
    }


    private _createForm() {
        this.login = new FormGroup({
            email: new FormControl(''),
            password: new FormControl(''),
        })
    }

    public onSubmit() {
        console.log('login-react.component отправил форму')
        // this._peopleService.GetUser(this.login);
    }

    public ngAfterViewInit() {
        this._peopleService.showPassword(this.btn.nativeElement, this.password.nativeElement);
    }
}

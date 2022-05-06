import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";

@Component({
    selector: 'personal-activity',
    templateUrl: './personal-activity.component.html',
    styleUrls: ['./personal-activity.component.scss']
})
export class PersonalActivityComponent implements OnInit {
    public inputControl: FormControl = new FormControl('', [Validators.required]);

    constructor() {
    }

    public ngOnInit(): void {
    }

    public sendRequest(): void {
        // const fileSelector = document.getElementById('file-selector');
        // if (fileSelector) {
        //     fileSelector.addEventListener('change', (event) => {
        //         const fileList = event.target.files;
        //         console.log(fileList);
        //     });
        // }
    }

}

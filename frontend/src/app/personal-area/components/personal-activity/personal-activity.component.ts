import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {FileManager} from "../../services/file-manager";
import {PersonalActivityService} from "../../services/personal-activity.service";
import {FilemanagerService} from "../../../services/filemanager.service";

@Component({
    selector: 'personal-activity',
    templateUrl: './personal-activity.component.html',
    styleUrls: ['./personal-activity.component.scss']
})
export class PersonalActivityComponent implements OnInit {
    public inputControl: FormControl = new FormControl('', [Validators.required]);

    public files: IterableIterator<string>

    constructor(public _fileManager: FileManager, private _service: PersonalActivityService) {}

    public ngOnInit()
    {
    }

    public onSubmit()
    {
        const formData = this._fileManager.getFormDataWithFiles(this.inputControl.value);
        this._service.sendActivity(formData).subscribe();
        this._fileManager.reset()

        this.inputControl.reset();
        this.openModel()
    }

    public onFilesSelected(event: any)
    {
        this._fileManager.addFiles(event.target.files);

        this.files = this._fileManager.getFileNames()

        console.log(this._fileManager.getFileNames())
    }

    public getFilename(path: string): string {
        return FilemanagerService.getFilename(path)
    }

    public removeFile(path: string) {
        this._fileManager.tryRemoveFile(path)
        this.files = this._fileManager.getFileNames()
        console.log(this._fileManager.getFileNames())
    }

    public handleClick(event: Event): void {
        event.stopPropagation();
    }

    public closeModel() {
        document.getElementById('success-message')!.style.display = 'none';
        document.body.style.overflow = "visible";
        document.body.classList.remove('modalOpen');
    }

    public openModel() {
        document.getElementById('success-message')!.style.display = 'block';
        document.body.style.overflow = "hidden";
        document.body.classList.add('modalOpen');
    }
}

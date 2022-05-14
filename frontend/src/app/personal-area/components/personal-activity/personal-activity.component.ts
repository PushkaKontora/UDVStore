import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {FileManager} from "../../services/file-manager";
import {PersonalActivityService} from "../../services/personal-activity.service";

@Component({
    selector: 'personal-activity',
    templateUrl: './personal-activity.component.html',
    styleUrls: ['./personal-activity.component.scss']
})
export class PersonalActivityComponent implements OnInit {
    public inputControl: FormControl = new FormControl('', [Validators.required]);

    constructor(private _fileManager: FileManager, private _service: PersonalActivityService) {}

    public ngOnInit()
    {
    }

    public onSubmit()
    {
        const formData = this._fileManager.getFormDataWithFiles(this.inputControl.value);
        this._service.sendActivity(formData).subscribe();
        this._fileManager.reset()

        // TODO: removing blanks

        this.inputControl.reset();
    }

    public onFilesSelected(event: any)
    {
        this._fileManager.addFiles(event.target.files);

        const files: IterableIterator<File> = this._fileManager.getFiles();

        // TODO: placing blanks from names of files
    }

    public onFileRemoved(event: any, name: string)
    {
        const isRemoved: boolean = this._fileManager.tryRemoveFile(name);

        // TODO: removing blank
    }
}

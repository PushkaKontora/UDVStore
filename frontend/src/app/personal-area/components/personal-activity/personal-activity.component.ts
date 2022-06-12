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

    @ViewChild('dropbox')
    dropbox!: any;

    constructor(public _fileManager: FileManager, private _service: PersonalActivityService) {}

    public ngOnInit()
    {
        this.dropbox.addEventListener("dragenter", this.dragenter, false);
        this.dropbox.addEventListener("dragover", this.dragover, false);
        this.dropbox.addEventListener("drop", this.drop, false);
    }

    private dragenter(e: any) {
        e.stopPropagation();
        e.preventDefault();
    }

    private dragover(e: any) {
        e.stopPropagation();
        e.preventDefault();
    }

    private drop(e: any) {
        e.stopPropagation();
        e.preventDefault();

        let dt = e.dataTransfer;
        let files = dt.files;

        this._fileManager.addFiles(files);
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

    public getFilename(path: string): string {
        return FilemanagerService.getFilename(path)
    }

    public removeFile(path: string) {
        this._fileManager.tryRemoveFile(path)
        console.log(this._fileManager.getFileNames())
    }
}

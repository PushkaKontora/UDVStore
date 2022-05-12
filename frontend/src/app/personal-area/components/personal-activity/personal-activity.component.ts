import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../../environments/environment";

@Component({
    selector: 'personal-activity',
    templateUrl: './personal-activity.component.html',
    styleUrls: ['./personal-activity.component.scss']
})
export class PersonalActivityComponent implements OnInit {
    public inputControl: FormControl = new FormControl('', [Validators.required]);

    private _chosenFiles: Map<string, File> = new Map<string, File>();

    private readonly url: string = environment.api_address + '/profile/report_activity/';
    private readonly options =
        {
            headers: new HttpHeaders({
                'Authorization': "Token " + localStorage.getItem('token')
            })
        }


    constructor(private _http: HttpClient) {}

    public ngOnInit()
    {
    }

    public onSubmit()
    {
        const formData = this.getFormDataWithFiles();

        this._http.post(this.url, formData, this.options).subscribe();

        this._chosenFiles.clear();
        this.inputControl.reset();
        // TODO: removing blanks
    }

    public onFilesSelected(event: any)
    {
        const files: IterableIterator<File> = this.updateFiles(event.target.files);

        // TODO: placing blanks from names of files
    }

    public onFileRemoved(event: any)
    {
        // this.tryRemoveFile(name)

        // TODO: removing blank
    }

    private updateFiles(files: FileList): IterableIterator<File>
    {
        for (let i = 0; i < files.length; i++)
        {
            const file: File = files[i];

            this._chosenFiles.set(file.name, file);
        }

        return this._chosenFiles.values();
    }

    private tryRemoveFile(name: string): boolean
    {
        return this._chosenFiles.delete(name);
    }

    private getFormDataWithFiles(): FormData
    {
        const formData = new FormData();

        formData.set('activity', this.inputControl.value);

        for (const file of this._chosenFiles.values())
            formData.set(file.name, file);

        return formData;
    }
}

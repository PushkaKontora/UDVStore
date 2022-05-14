import {Injectable} from "@angular/core";


@Injectable({
    providedIn: 'root'
})
export class FileManager
{
    private _files: Map<string, File> = new Map<string, File>();

    public addFiles(files: FileList): void
    {
        for (let i = 0; i < files.length; i++)
        {
            const file: File = files[i];

            this._files.set(file.name, file);
        }
    }

    public tryRemoveFile(name: string): boolean
    {
        return this._files.delete(name);
    }

    public getFormDataWithFiles(activity: string): FormData
    {
        const formData = new FormData();

        formData.set('activity', activity);

        for (const file of this._files.values())
            formData.set(file.name, file);

        return formData;
    }

    public getFiles(): IterableIterator<File>
    {
        return this._files.values();
    }

    public reset(): void
    {
        this._files.clear();
    }
}

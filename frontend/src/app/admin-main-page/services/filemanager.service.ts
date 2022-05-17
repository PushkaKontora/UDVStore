export class FilemanagerService {
    static getFilename(path: string): string {
        if (!path)
            return path
        let arr = path.split('/')
        return arr[arr.length-1]
    }
}
export class NoFilesFound extends Error {
    constructor() {
        super('No files found in directory.');
        this.name = 'NoFilesFound';
    }
}

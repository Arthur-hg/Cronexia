import { Dirent, readdirSync, readFileSync } from 'fs';
import { readdir, readFile } from 'node:fs/promises';

import { NoFilesFound } from '../errors.js';

export default class FileReader {
    async getFilesContentInFolderAsync(folder: string) {
        const files = await this.getFilesInFolderAsync(folder);
        const filteredFiles = this.filterFiles(files);

        return await this.getFilesContentAsync(folder, filteredFiles);
    }

    private async getFilesInFolderAsync(folder: string): Promise<Dirent[]> {
        let files: Dirent[];
        try {
            files = await readdir(folder, { withFileTypes: true });
        } catch (error) {
            // We can handle error in different way here. Most common will be `No such file or directory`.
            // And reraise another error, or a formated error.
            throw error;
        }

        if (!files.length) {
            throw NoFilesFound;
        }

        return files;
    }

    private filterFiles(files: Dirent[]): Dirent[] {
        const filteredFiles = files.filter(file => {
            const [, fileExt] = file.name.split('.');

            // There is currently no filter on PNG, which could be added if we wanted to keep only text file.
            return file.isFile() && fileExt !== 'json';
        });

        if (!filteredFiles.length) {
            throw NoFilesFound;
        }

        return filteredFiles;
    }

    private async getFilesContentAsync(folder: string, files: Dirent[]) {
        const data: {
            name: string;
            content: string;
        }[] = [];

        for (const file of files) {
            try {
                const content = await readFile(`${folder}/${file.name}`, { encoding: 'utf8' });
                data.push({
                    name: file.name,
                    content: content,
                });
            } catch (error) {
                console.error(`Fail reading content of ${file.name}`);
                continue;
            }
        }

        return data;
    }

    getFilesContentInFolderSync(folder: string) {
        const files = this.getFilesInFolderSync(folder);
        const filteredFiles = this.filterFiles(files);

        return this.getFilesContentSync(folder, filteredFiles);
    }

    private getFilesInFolderSync(folder: string): Dirent[] {
        let files: Dirent[];
        try {
            files = readdirSync(folder, { withFileTypes: true });
        } catch (error) {
            // We can handle error in different way here. Most common will be `No such file or directory`.
            // And reraise another error, or a formated error.
            throw error;
        }

        if (!files.length) {
            throw NoFilesFound;
        }

        return files;
    }

    private getFilesContentSync(folder: string, files: Dirent[]) {
        const data: {
            name: string;
            content: string;
        }[] = [];

        for (const file of files) {
            try {
                const content = readFileSync(`${folder}/${file.name}`, { encoding: 'utf8' });
                data.push({
                    name: file.name,
                    content: content,
                });
            } catch (error) {
                console.error(`Fail reading content of ${file.name}`);
                continue;
            }
        }

        return data;
    }
}

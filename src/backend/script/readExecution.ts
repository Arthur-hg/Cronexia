import FileReader from '../manager/fileReader.js';

const WRONG_FOLDER_NAME = 'any_wrong_folder_name';
const FOLDER_NAME = 'data';

const fileReader = new FileReader();

console.log('\nExecute sync script with a wrong folder name.');
try {
    fileReader.getFilesContentInFolderSync(WRONG_FOLDER_NAME);
} catch (error) {}

console.log('\nExecute async script with a correct folder name.');
const syncResults = fileReader.getFilesContentInFolderSync(FOLDER_NAME);
for (const result of syncResults) {
    console.log(`Name: ${result.name}\nResult : ${result.content}`);
}

// Note: L'execution sync et async grace à `node:fs/promises` est très similaire et ne demande pas l'utilisation de callback.
console.log('Execute async script with a wrong folder name.');
try {
    await fileReader.getFilesContentInFolderAsync(WRONG_FOLDER_NAME);
} catch (error) {}

console.log('\nExecute async script with a correct folder name.');
const asyncResults = await fileReader.getFilesContentInFolderAsync(FOLDER_NAME);
for (const result of asyncResults) {
    console.log(`Name: ${result.name}\nResult : ${result.content}`);
}

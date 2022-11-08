const RNFS = require('react-native-fs');

class FileSystem{
    readFilesAndDirectories(path=RNFS.MainBundlePath){

    }
}

const fileSystem = new FileSystem();
export default fileSystem;

// require the module
// var RNFS = require('react-native-fs');
//
// // get a list of files and directories in the main bundle
// RNFS.readDir(RNFS.MainBundlePath) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
//     .then((result) => {
//         console.log('GOT RESULT', result);
//
//         // stat the first file
//         return Promise.all([RNFS.stat(result[0].path), result[0].path]);
//     })
//     .then((statResult) => {
//         if (statResult[0].isFile()) {
//             // if we have a file, read it
//             return RNFS.readFile(statResult[1], 'utf8');
//         }
//
//         return 'no file';
//     })
//     .then((contents) => {
//         // log the file contents
//         console.log(contents);
//     })
//     .catch((err) => {
//         console.log(err.message, err.code);
//     });

//file creation
// create a path you want to write to
// :warning: on iOS, you cannot write into `RNFS.MainBundlePath`,
// but `RNFS.DocumentDirectoryPath` exists on both platforms and is writable
// var path = RNFS.DocumentDirectoryPath + '/test.txt';
//
// // write the file
// RNFS.writeFile(path, 'Lorem ipsum dolor sit amet', 'utf8')
//     .then((success) => {
//         console.log('FILE WRITTEN!');
//     })
//     .catch((err) => {
//         console.log(err.message);
//     });


//file deletion
// var path = RNFS.DocumentDirectoryPath + '/test.txt';
//
// return RNFS.unlink(path)
//     .then(() => {
//         console.log('FILE DELETED');
//     })
//     // `unlink` will throw an error, if the item to unlink does not exist
//     .catch((err) => {
//         console.log(err.message);
//     });
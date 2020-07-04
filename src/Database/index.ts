const Datastore = require('../../node_modules/nedb');
const path = require('../../node_modules/path');
import { remote, ipcRenderer } from 'electron';
const smalltalk = require('smalltalk');
const fse = require('fs-extra')
const move = require('../Common/move')
// let db: any = remote.getGlobal('MyDatabase');
// let MyDatabase = new Datastore({ filename: path.join(__dirname, "db.db"), autoload: true });


interface file {
    ownerName: String,
    fileName: String,
    filePath: String,
    fileDescription: String,
    fileTags: String[],
}

interface dataBaseInterface {

}

class Database {
    db: any;
    haveListen: boolean;
    repositoryNum: number;
    defaultRepository: any;
    defaultPath: any;

    constructor() {
        this.db = remote.getGlobal('MyDatabase');
        console.log(this.db);
        this.repositoryNum = 0;
        this.haveListen = false;
        this.db.find({ "repository-type": "main" }, (err: any, docs: any) => {
            if (docs.length == 0) {
                this.defaultRepository = null;
            }
            else {
                this.defaultRepository = docs[0];
            }
        });

        // this.db = remote.getGlobal('MyDatabase');
    }

    getRepositorys(): any {
        this.db.find({ "data-type": "repository" }, (err: any, docs: any) => {
            this.repositoryNum = docs.length;
            console.log(`[story] ${docs}`);
            console.log(docs);
            if (docs.length == 0) {
                return null;
            }
            else {
                return docs;
            }
        });
    }

    getDefaulRepository(callback: any): any {

        this.db.find({ "repository-type": "main" }, (err: any, docs: any) => {
            console.log(`[story] ${docs}`);
            console.log(docs)
            if (docs.length == 0) {
                return null;
            }
            else {
                return docs[0];
            }
        });
    }

    createRepository(): any {
        return new Promise(resolve => {
            ipcRenderer.send('open-file-dialog');
            if (!this.haveListen) {
                this.haveListen = !this.haveListen;

                ipcRenderer.on('selected-directory', (event: any, path: any) => {
                    this.defaultPath = path;
                    smalltalk
                        .prompt('Repository', 'You are Creating a Repository, Please enter repository name', "")
                        .then((repositoryName: String) => {
                            let dep = {
                                "data-type": "repository",
                                "repository-type": 'normal',
                                "repository-index": this.repositoryNum,
                                "repository-date": new Date(),
                                "repository-name": repositoryName,
                                "repository-path": this.defaultPath
                            };
                            this.db.insert(dep, (err: any, newDoc: any) => {
                                console.log(err);
                                if (this.repositoryNum === 0) {
                                    this.SetDefaultRepository(repositoryName);
                                }
                                resolve();
                            });
                        })
                        .catch(() => {
                            smalltalk
                                .alert('Error', 'fail to create repository!')
                                .then(() => {
                                    console.log('ok');
                                });
                        });
                })
            }
        });
    }

    SetDefaultRepository(name: String): any {
        this.db.find({ "repository-type": "main" }, (err: any, docs: any) => {
            console.log(`[story] ${docs}`);
            if (docs.length == 0) {
            }
            else {
                this.db.update({ "repository-type": 'main' }, { $set: { "repository-type": 'normal' } }, {}, function (err: any, numReplaced: any) {
                    console.log(err);
                })
            }
            this.db.update({ "repository-name": name }, { $set: { "repository-type": 'main' } }, {}, function (err: any, numReplaced: any) {
                console.log(err);
            })
        });
    }

    find(something: any) {
        return this.db.find(something);
    }

    insert(something: any) {
        this.db.insert(something);
        this.db.find({ "repository-type": "main" }, (err: any, docs: any) => {
            console.log(something);
            console.log(docs[0]["repository-path"])
            console.log(docs[0]["repository-path"] + `/${something["file-name"]}`)
            fse.move(something["file-path"], docs[0]["repository-path"] + `/${something["file-name"]}`, (err: any) => {
                console.log(err);
            })
        });
    }

    insertFile(ownerName: String, fileName: String, filePath: String, fileDescription: String, fileTags: String[]) {
        let newFile = {
            "owner-name": ownerName,
            "file-name": fileName,
            "file-path": filePath,
            "file-description": fileDescription,
            "file-tags": fileTags,
        };
        this.db.insert(newFile);
        this.db.find({ "repository-type": "main" }, (err: any, docs: any) => {
            fse.move(newFile["file-path"], docs[0]["repository-path"] + `/${newFile["file-name"]}`, (err: any) => {
                console.log(err);
            })
        });
    }

    findFile(toFind: any) {
        return new Promise((resolve, reject) => {
            this.db.find(toFind, (err: any, docs: any) => {
                if (err !== null) reject(err);
                else resolve(docs)
            });
        })
    }

    findFileByRepName(repositoryName: String) {
        return new Promise((resolve, reject) => {
            this.db.find({ "owner-name": repositoryName }, (err: any, docs: any) => {
                if (err !== null) reject(err);
                else resolve(docs)
            });
        })
    }

    findFileByTagsArray(tagsArr: String[], repName: String) {
        let findArgs: any[] = [];
        for (let tag of tagsArr) {
            // filter
            findArgs.push({ "file-tags": tag });
        }
        findArgs.push({ "owner-name": repName });


        return new Promise((resolve, reject) => {
            this.db.find({ $and: findArgs }, (err: any, docs: any) => {
                if (err !== null) reject(err);
                else resolve(docs)
            });
        })
    }

    findAllRepotory() {
        return new Promise((resolve, reject) => {
            this.db.find({ "data-type": "repository" }, (err: any, docs: any) => {
                if (err !== null) reject(err);
                else resolve(docs)
            });
        })
    }
}
export { Database };
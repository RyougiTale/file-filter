const Datastore = require('../../node_modules/nedb')
const path = require('../../node_modules/path')
import { remote } from 'electron'
const smalltalk = require('smalltalk');

// let db: any = remote.getGlobal('MyDatabase');
// let MyDatabase = new Datastore({ filename: path.join(__dirname, "db.db"), autoload: true });



class Database {
    db: any;
    depositoryNum: number;
    defaultDepository: any;

    constructor() {
        this.db = remote.getGlobal('MyDatabase');
        console.log(this.db);
        this.depositoryNum = 0;
        this.db.find({ "depository-type": "main" }, (err: any, docs: any) => {
            if (docs.length == 0) {
                this.defaultDepository = null;
            }
            else {
                this.defaultDepository = docs[0];
            }
        });
        // this.db = remote.getGlobal('MyDatabase');
    }

    getDepositorys(): any {
        this.db.find({ "data-type": "depository" }, (err: any, docs: any) => {
            this.depositoryNum = docs.length;
            console.log(`[story] ${docs}`);
            if (docs.length == 0) {
                return null;
            }
            else {
                return docs;
            }
        });
    }

    getDefaulDepository(callback: any): any {

        this.db.find({ "depository-type": "main" }, (err: any, docs: any) => {
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

    createDepository(): any {
        smalltalk
            .prompt('Depository', 'You are Creating a Depository, Please enter depository name', "")
            .then((depositoryName: String) => {
                let dep = {
                    "data-type": "depository",
                    "depository-type": 'normal',
                    "depository-index": this.depositoryNum,
                    "depository-date": new Date(),
                    "depository-name": depositoryName
                };
                this.db.insert(dep, (err: any, newDoc: any) => {
                    console.log(err);
                });
                if (this.depositoryNum === 0) {
                    this.SetDefaultDepository(depositoryName);
                }
            })
            .catch(() => {
                smalltalk
                    .alert('Error', 'fail to create depository!')
                    .then(() => {
                        console.log('ok');
                    });
            });
    }

    SetDefaultDepository(name: String): any {
        this.db.find({ "depository-type": "main" }, (err: any, docs: any) => {
            console.log(`[story] ${docs}`);
            if (docs.length == 0) {
            }
            else {
                this.db.update({ "depository-type": 'main' }, { $set: { "depository-type": 'normal' } }, {}, function (err: any, numReplaced: any) {
                    console.log(err);
                })
            }
            this.db.update({ "depository-name": name }, { $set: { "depository-type": 'main' } }, {}, function (err: any, numReplaced: any) {
                console.log(err);
            })
        });
    }

    find(something: any) {
        return this.db.find(something);
    }
    insert(something: any) {
        this.db.insert(something);
    }
}

export { Database };
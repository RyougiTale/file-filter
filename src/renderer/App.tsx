import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Button, CircularProgress } from '@material-ui/core/';
import { ipcRenderer, remote } from 'electron';
import { key_word } from '../Common/db'
// import Datastore from '../../node_modules/nedb'
import { Database } from '../Database';
const smalltalk = require('smalltalk');
const { Menu } = require('electron').remote
import { Filter } from '../Components/Filter'
import { ListV } from '../Components/ListV'
// import Nedb = require("../../node_modules/@types/nedb")
// Import the styles here to process them with webpack
import '@public/style.css';
import Choose from '@/Components/Choose';



interface Props {
};

interface State {
    mainDepositoryName: String,
    buttonNum: number,
    buttonsArray: String[],
    depositoryArray: String[],
    needInit: boolean,
}

let db: any = new Database();

export default class App extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = { mainDepositoryName: "", buttonNum: 0, buttonsArray: [], depositoryArray: [], needInit: false };
        this.setMainDepositoryName = this.setMainDepositoryName.bind(this)
    }

    setMainDepositoryName(value: string) {
        this.setState({
            mainDepositoryName: value,
        })
    }

    shouldComponentUpdate(nextProps: Props, nextState: State) {
        // console.log(nextState);
        if (nextState !== this.state) {
            console.log("update" + nextState);
            return true;
        }
        else return false;
    }

    initMenu() {
        let sub: any = [
            {
                label: 'create depository',
                click() {
                    ipcRenderer.send('open-file-dialog');
                }
            },
        ]
        db.db.find({ "data-type": "depository" }, (err: any, docs: any) => {
            console.log(docs);
            if (docs.length !== 0) {
                for (let ele of docs) {
                    sub.push({
                        label: ele["depository-name"],
                        click() {
                            this.
                                console.log(ele);
                        }
                    })
                }
            }
            const template: Electron.MenuItemConstructorOptions[] = [{
                label: 'Edit',
                submenu: [
                    { role: 'undo' },
                    { role: 'redo' },
                    { type: 'separator' },
                    { role: 'cut' },
                    { role: 'copy' },
                    { role: 'paste' },
                    { role: 'pasteandmatchstyle' },
                    { role: 'delete' },
                    { role: 'selectall' }
                ]
            },
            {
                label: 'View',
                submenu: [
                    { role: 'reload' },
                    { role: 'forcereload' },
                    { role: 'toggledevtools' },
                    { type: 'separator' },
                    { role: 'resetzoom' },
                    { role: 'zoomin' },
                    { role: 'zoomout' },
                    { type: 'separator' },
                    { role: 'togglefullscreen' }
                ]
            },
            { role: 'window', submenu: [{ role: 'minimize' }, { role: 'close' }] },
            {
                role: 'help',
                submenu: [{
                    label: 'Learn More',
                    click() {
                        require('electron').shell.openExternal('https://electron.atom.io');
                    }
                }]
            },
            {
                label: 'depository',
                submenu: sub
            },
            ];

            const menu = Menu.buildFromTemplate(template)
            Menu.setApplicationMenu(menu)
        })

    }

    componentDidMount() {
        // this.listenDrag();
        this.initMenu();
        console.log(__dirname);
        document.ondragover = document.ondrop = (ev) => {
            ev.preventDefault()
        };
        document.body.ondrop = (ev) => {
            this.saveFile((ev.dataTransfer as DataTransfer).files[0].path)
            ev.preventDefault()
        }
    }

    saveFile(name: any): void {
        console.log(typeof (name) + " " + name);
        db.db.find({ "depository-type": "main" }, (err: any, docs: any) => {
            console.log(`[story] ${docs}`);
            console.log(docs)
            if (docs.length == 0) {
                db.createDepository();
            }
            else {
                let defaultDepository = docs[0];
                let des: String = "";
                smalltalk
                    .prompt('Description', 'You should type description for this file', "")
                    .then((description: String) => {
                        des = description;
                        let tags: String = "tags";

                        smalltalk
                            .prompt('Tags', 'You should type tags with space \" \"', "example: c++ thread developing")
                            .then((tag: String) => {

                                let file = {
                                    "owner-name": defaultDepository["depository-name"],
                                    "file-path": name,
                                    "description": des,
                                    "tags": tag.split(" ").filter(n => n),
                                };
                                db.insert(file);

                            })
                            .catch(() => {
                                tags = "";
                            });
                    })
                    .catch(() => {
                        des = "no description";
                    });
            }
        });










    }
    //popup


    listenDrag(): void {
        if (document.getElementById('drag')) {
            const myElement = document.getElementById('drag');
            if (myElement) {
                myElement.ondragstart = (event) => {
                    console.log(event);
                    event.preventDefault()
                    ipcRenderer.send('ondragstart', __filename)
                }
            }
        }
    }

    listenInit(): void {
        console.log("hello")
        ipcRenderer.on('init success', (event: any, path: any) => {
            console.log("hello")
            this.setState({ needInit: false });
        });
    }

    render() {
        if (this.state.needInit === true) {
            return (
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Button onClick={() => {
                        // this.listenInit();
                        db.createDepository().then(() => {
                            this.setState({ needInit: false })
                        });
                    }}>You need init your depository</Button>
                </div>
            );
        }


        if (this.state.mainDepositoryName === "") {
            if (this.state.depositoryArray.length === 0) {

                db.db.find({ "data-type": "depository" }, (err: any, docs: any) => {
                    console.log(`[story] ${docs}`);
                    console.log(docs);
                    if (docs.length == 0) {
                        this.setState({ needInit: true })
                    }
                    else {
                        this.setState({ depositoryArray: docs.map((obj: any) => { return obj["depository-name"] }) });
                    }
                });
                return (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <CircularProgress />
                    </div>
                );
            }
            else {
                return <Choose depositoryArray={this.state.depositoryArray} callBack={this.setMainDepositoryName} />

            }

        }
        //ButtonsArray={["c++", "javascript", "typescript"]}
        else {

            return (
                <div style={{
                    width: '100%',
                    height: '100%'
                }}>
                    Hello world
                    <Filter
                        //ButtonNum={this.state.buttonNum}
                        //ButtonsArray={this.state.buttonsArray}
                        ButtonNum={40}
                        ButtonsArray={["C",
                            "Java",
                            "Python",
                            "C++",
                            "C#",
                            "Visual Basic",
                            "JavaScript",
                            "PHP",
                            "R",
                            "SQL",
                            "Swift",
                            "Go",
                            "Ruby",
                            "Assembly language",
                            "MATLAB",
                            "Perl",
                            "PL/SQL",
                            "Scratch",
                            "Classic Visual Basic",
                            "Rust",
                            "Objective-C",
                            "Delphi/Object Pascal",
                            "D",
                            "Lisp",
                            "Dart",
                            "SAS",
                            "Transact-SQL",
                            "Logo",
                            "COBOL",
                            "Kotlin",
                            "Groovy",
                            "Scala",
                            "Julia",
                            "ABAP",
                            "PowerShell",
                            "OpenEdge ABL",
                            "Fortran",
                            "Lua",
                            "VBScript",
                            "Ada",
                            "FoxPro",
                            "ML",
                            "LabVIEW",
                            "TypeScript",
                            "Haskell",
                            "Scheme",
                            "Prolog",
                            "ActionScript",
                            "Bash",]}  >
                    </Filter>
                </div >
            );
        }
    }
};

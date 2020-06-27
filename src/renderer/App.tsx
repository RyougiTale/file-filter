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
    selectedButtonArray: String[],
    depositoryArray: String[],
    fileArray: String[],

    needInit: boolean,
    needUpdateTags: boolean,
    needUpdateFiles: boolean,
}

let db: any = new Database();

export default class App extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = { mainDepositoryName: "", buttonNum: 0, buttonsArray: [], selectedButtonArray: ["all-files"], depositoryArray: [], needInit: false, needUpdateTags: true, needUpdateFiles: true, fileArray: [] };
        this.setMainDepositoryName = this.setMainDepositoryName.bind(this)
    }

    setMainDepositoryName(value: string) {
        this.setState({
            mainDepositoryName: value,
        })
    }

    setSelectedButtonArray(arr: String[]) {
        this.setState({
            selectedButtonArray: arr,
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

        if (this.state.mainDepositoryName !== "") {
            let defaultDepository: String = this.state.mainDepositoryName;
            let des: String = "";
            smalltalk
                .prompt('Description', 'You should type description for this file', "")
                .then((description: String) => {
                    des = description;
                    let tags: String = "tags";

                    smalltalk
                        .prompt('Tags', 'You should type tags with space \" \"', "example: c++ thread developing")
                        .then((tag: String) => {
                            let tagArray = tag.split(" ").filter(n => n);
                            let file = {
                                "owner-name": defaultDepository,
                                "file-path": name,
                                "description": des,
                                "tags": tagArray,
                            };
                            // db.db.findOne({ "data-type": "tags" }, (err: any, docs: any) => {
                            //     console.log(docs);
                            // })
                            // for (let ele of tagArray) {
                            //     db.update({"data-type": "tags"}, )
                            // }

                            db.insert(file);
                            this.setState({ needUpdateFiles: true, needUpdateTags: true })
                        })
                        .catch(() => {
                            tags = "";
                        });
                })
                .catch(() => {
                    des = "no description";
                });
        }

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


    render() {
        if (this.state.needInit === true) {
            return (
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Button onClick={() => {
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

        if (this.state.needUpdateTags === true) {
            db.db.find({ "owner-name": this.state.mainDepositoryName }, (err: any, docs: any) => {
                console.log(docs.map((obj: any) => { return obj["tags"] }))
                // this.setState({buttonsArray, needUpdateTags: false})
                let tagsArray: any[] = [];
                for (let array of docs.map((obj: any) => { return obj["tags"] })) {
                    for (let tag of array) {
                        if (tagsArray[tag]) tagsArray[tag]++;
                        else tagsArray[tag] = 1;
                    }
                }
                let keysSorted = Object.keys(tagsArray).sort(function (a: any, b: any) { return tagsArray[b] - tagsArray[a] })
                console.log(keysSorted);
                this.setState({ buttonsArray: keysSorted, needUpdateTags: false })
            })
            return (
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <CircularProgress />
                </div>
            );
        }

        if (this.state.needUpdateFiles === true) {
            db.db.find({ "owner-name": this.state.mainDepositoryName }, (err: any, docs: any) => {
                let array: any[] = [];
                for (let tag in this.state.selectedButtonArray) {
                    // filter
                }
                console.log(docs.map((obj: any) => { return obj["tags"] }))
                this.setState({ needUpdateFiles: false, fileArray: array })
                // this.setState({buttonsArray, needUpdateTags: false})
            })
            return (
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <CircularProgress />
                </div>
            );
        }

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
                        "Bash",]} />
                <ListV fileArray={this.state.fileArray} />

            </div >
        );

    }
};

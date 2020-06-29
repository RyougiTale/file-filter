import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { CircularProgress } from '@material-ui/core/';
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
const SplitterLayout = require('react-splitter-layout/lib').default
import 'react-splitter-layout/lib/index.css';
import { dummyButtons, dummyFiles } from '../Common/dummydata';



interface Props {
};

interface State {
    mainRepositoryName: String,

    buttonNum: number,
    buttonsArray: String[],
    selectedButtonArray: String[],
    repositoryArray: String[],
    fileArray: any[],

    needInit: boolean,
    needUpdateTags: boolean,
    needUpdateFiles: boolean,
}

let db: any = new Database();

export default class App extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = { mainRepositoryName: "", buttonNum: 0, buttonsArray: [], selectedButtonArray: ["all-files"], repositoryArray: [], needInit: false, needUpdateTags: true, needUpdateFiles: true, fileArray: [] };
    }

    setMainRepositoryName(value: string) {
        this.setState({
            mainRepositoryName: value,
        })
    }

    setSelectedButtonArray(arr: String[]) {
        this.setState({
            selectedButtonArray: arr,
            needUpdateFiles: true,
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
                label: 'create repository',
                click() {
                    ipcRenderer.send('open-file-dialog');
                }
            },
        ]
        db.db.find({ "data-type": "repository" }, (err: any, docs: any) => {
            console.log(docs);
            if (docs.length !== 0) {
                for (let ele of docs) {
                    sub.push({
                        label: ele["repository-name"],
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
                label: 'repository',
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

    saveFile(path: any): void {

        if (this.state.mainRepositoryName !== "") {
            let defaultRepository: String = this.state.mainRepositoryName;
            let des: String = "";
            smalltalk
                .prompt('Description', 'You should type description for this file', "")
                .then((description: String) => {
                    des = description;

                    smalltalk
                        .prompt('Tags', 'You should type tags with space \" \"', "example: c++ thread developing")
                        .then((tag: String) => {
                            let tagArray = tag.split(" ").filter(n => n);
                            let fileNames: String[] = [];
                            if (path.indexOf(":") !== -1)
                                fileNames = path.split("\\");
                            else
                                fileNames = path.split("/");
                            let file = {
                                "owner-name": defaultRepository,
                                "file-name": fileNames[fileNames.length - 1],
                                "file-path": path,
                                "file-description": des,
                                "file-tags": tagArray,
                            };
                            // db.db.findOne({ "data-type": "file-tags" }, (err: any, docs: any) => {
                            //     console.log(docs);
                            // })
                            // for (let ele of tagArray) {
                            //     db.update({"data-type": "file-tags"}, )
                            // }

                            db.insert(file);
                            this.setState({ needUpdateFiles: true, needUpdateTags: true })
                        })
                        .catch(() => {
                            console.log("error")
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
                    <button className="needInit" onClick={() => {
                        db.createRepository().then(() => {
                            this.setState({ needInit: false })
                        });
                    }}>You need init your repository</button>
                </div>
            );
        }
        if (this.state.mainRepositoryName === "") {
            if (this.state.repositoryArray.length === 0) {
                db.db.find({ "data-type": "repository" }, (err: any, docs: any) => {
                    console.log(`[story] ${docs}`);
                    console.log(docs);
                    if (docs.length == 0) {
                        this.setState({ needInit: true })
                    }
                    else {
                        this.setState({ repositoryArray: docs.map((obj: any) => { return obj["repository-name"] }) });
                    }
                });
                return (
                    <div className="mainRepository" style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <CircularProgress color="secondary" />
                    </div>
                );
            }
            else {
                return <Choose repositoryArray={this.state.repositoryArray} callBack={this.setMainRepositoryName.bind(this)} />
            }
        }

        if (this.state.needUpdateTags === true) {
            db.db.find({ "owner-name": this.state.mainRepositoryName }, (err: any, docs: any) => {
                console.log(docs.map((obj: any) => { return obj["file-tags"] }))
                // this.setState({buttonsArray, needUpdateTags: false})
                let tagsArray: any[] = [];
                for (let array of docs.map((obj: any) => { return obj["file-tags"] })) {
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
                    <CircularProgress color="secondary" />
                </div>
            );
        }

        if (this.state.needUpdateFiles === true) { // have bug
            // MyDatabase.find({"tags":{$in: ["a","c"]}},(err,docs)=>{console.log(docs)})
            // MyDatabase.find({$and: [{"tags":"a"},{"tags":"c"}]},(err,docs)=>{console.log(docs)})
            db.db.find({ "owner-name": this.state.mainRepositoryName }, (err: any, docs: any) => {
                let array: any[] = [];
                console.log(this.state.selectedButtonArray)
                if (this.state.selectedButtonArray.length === 0) {
                    for (let file of docs) {
                        array.push(file);
                    }
                    console.log(array)
                    this.setState({ needUpdateFiles: false, fileArray: array })
                    return;
                }
                let findArgs: any[] = [];
                for (let tag of this.state.selectedButtonArray) {
                    // filter
                    findArgs.push({ "file-tags": tag });
                }
                console.log(docs.map((obj: any) => { return obj["file-tags"] }))
                console.log(findArgs);
                db.db.find({ $and: findArgs }, (err: any, docs: any) => {
                    for (let file of docs) {
                        array.push(file);
                    }
                    console.log(array)
                    this.setState({ needUpdateFiles: false, fileArray: array })
                })
                // this.setState({buttonsArray, needUpdateTags: false})
            })
            // return (
            //     <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            //         <CircularProgress color="secondary" />
            //     </div>
            // );
        }

        return (
            <div style={{
                width: '100%',
                height: '100%'
            }}>
                <SplitterLayout vertical={false}>
                    <Filter
                        //ButtonNum={this.state.buttonNum}
                        ButtonsArray={this.state.buttonsArray}
                        SetSelected={this.setSelectedButtonArray.bind(this)}
                    />
                    <ListV
                        fileArray={this.state.fileArray}
                    />

                </SplitterLayout>
            </div >
        );

    }
};

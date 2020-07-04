import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { CircularProgress } from '@material-ui/core/';
import { ipcRenderer, remote } from 'electron';
import { Database } from '../Database';
const smalltalk = require('smalltalk');
const { Menu } = require('electron').remote
import { Filter } from '../Components/Filter'
import { ListV } from '../Components/ListV'
import '@public/style.css';
import Choose from '@/Components/Choose';
const SplitterLayout = require('react-splitter-layout/lib').default
import 'react-splitter-layout/lib/index.css';

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
    needFresh: boolean,
}

let db = new Database();

export default class App extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            mainRepositoryName: "", buttonNum: 0, buttonsArray: [], selectedButtonArray: [],
            repositoryArray: [], needInit: false, needUpdateTags: true, needUpdateFiles: true, fileArray: [],
            needFresh: false
        };
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
                click: () => {
                    this.setState({ needInit: true })
                }
            },
        ]
        db.findAllRepotory().then(
            (docs: any) => {
                if (docs.length !== 0) {
                    for (let ele of docs) {
                        sub.push({
                            label: ele["repository-name"],
                            click: () => {
                                this.setState({ mainRepositoryName: ele["repository-name"], needUpdateTags: true, needUpdateFiles: true })
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
        process.noAsar = true;
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
                            // db.db.findOne({ "data-type": "file-tags" }, (err: any, docs: any) => {
                            db.insertFile(defaultRepository, fileNames[fileNames.length - 1], path, des, tagArray).then(
                                () => { this.setState({ needUpdateFiles: true, needUpdateTags: true }) },
                                (err) => {
                                    console.log(err)
                                    smalltalk
                                        .alert('Error', err.toString())
                                        .then(() => {
                                            console.log('err');
                                        });
                                }
                            )

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

    deleteFile(filename: String) {
        db.deleteFileByName(filename, this.state.mainRepositoryName);
        this.setState({ needUpdateTags: true, needUpdateFiles: true });
    }

    editTags(filename: String, tags: String) {
        smalltalk
            .prompt('Edit Tags', 'You are Editing Tags', tags.toString().replace(/,/g, " "))
            .then((newtags: String) => {
                db.editTagsByName(filename, this.state.mainRepositoryName, newtags.split(" ").filter(n => n));
                this.setState({ needUpdateTags: true, needUpdateFiles: true });

            })
            .catch(() => {
                smalltalk
                    .alert('Error', 'fail to edit tags!')
                    .then(() => {
                        console.log('ok');
                    });
            });
    }
    //main

    getLoading() {
        return (<div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CircularProgress color="secondary" />
        </div>);
    }

    checkInit() {
        if (this.state.needInit === true) {
            return (
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <button className="needInit" onClick={() => {
                        db.createRepository().then(() => {
                            this.setState({ needInit: false, needFresh: true })
                        });
                    }}>You need init your repository</button>
                </div>
            );
        }
    }

    checkMainRepository() {
        if (this.state.mainRepositoryName === "") {
            if (this.state.repositoryArray.length === 0 || this.state.needFresh === true) {
                db.findAllRepotory().then(
                    (arr: any) => {
                        console.log(arr);
                        if (arr.length == 0) {
                            this.setState({ needInit: true })
                        }
                        else {
                            this.setState({ repositoryArray: arr.map((obj: any) => { return obj["repository-name"] }) });
                        }
                        this.setState({ needFresh: false });
                    }
                )
                return this.getLoading();
            }
            else {
                return <Choose repositoryArray={this.state.repositoryArray} callBack={this.setMainRepositoryName.bind(this)} />
            }
        }
    }

    checkUpdateTags() {
        if (this.state.needUpdateTags === true) {
            db.findFilesByRepName(this.state.mainRepositoryName).then((docs: any) => {
                console.log(docs.map((obj: any) => { return obj["file-tags"] }))
                // this.setState({buttonsArray, needUpdateTags: false})
                let tagsArray: any[] = [];
                for (let array of docs.map((obj: any) => { return obj["file-tags"] })) {
                    for (let tag of array) {
                        if (tagsArray[tag]) tagsArray[tag]++;
                        else tagsArray[tag] = 1;
                    }
                }
                console.log(tagsArray);
                let keysSorted = Object.keys(tagsArray).sort(function (a: any, b: any) { return tagsArray[b] - tagsArray[a] })
                console.log(keysSorted);
                this.setState({ buttonsArray: keysSorted, needUpdateTags: false })
            })
            return this.getLoading();
        }
    }

    checkUpdateFiles() {
        if (this.state.needUpdateFiles === true) {
            // MyDatabase.find({"tags":{$in: ["a","c"]}},(err,docs)=>{console.log(docs)})
            // MyDatabase.find({$and: [{"tags":"a"},{"tags":"c"}]},(err,docs)=>{console.log(docs)})
            db.findFilesByRepName(this.state.mainRepositoryName).then((docs: any) => {
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
                console.log(docs.map((obj: any) => { return obj["file-tags"] }))
                db.findFileByTagsArray(this.state.selectedButtonArray, this.state.mainRepositoryName).then((docs: any) => {
                    for (let file of docs) {
                        array.push(file);
                    }
                    this.setState({ needUpdateFiles: false, fileArray: array })
                })
            })
            return this.getLoading();
        }
    }

    render() {
        let curFlow: any;
        if (curFlow = this.checkInit()) return curFlow;
        if (curFlow = this.checkMainRepository()) return curFlow;
        if (curFlow = this.checkUpdateTags()) return curFlow;
        this.checkUpdateFiles();
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
                        deleteFile={this.deleteFile.bind(this)}
                        editTags={this.editTags.bind(this)}
                    />

                </SplitterLayout>
            </div >
        );

    }
};

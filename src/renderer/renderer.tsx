/**
 * React renderer.
 */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import { ipcRenderer, remote } from 'electron';
import { key_word } from '../Common/db'
// import Datastore from '../../node_modules/nedb'
import { Database } from '../Database';
const smalltalk = require('smalltalk');
const { Menu } = require('electron').remote
import {Filter} from '../Components/Filter'
import {ListV} from '../Components/ListV'

// import Nedb = require("../../node_modules/@types/nedb")
// Import the styles here to process them with webpack
import '@public/style.css';

interface Props {
};

interface State {
  bar: any,
}

let db: any = new Database();;

class App extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = { bar: 1.0 };
  }

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    // console.log(this);
    // console.log(nextState);
    if (nextState.bar !== this.state.bar) {
      console.log("update" + nextState.bar);
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

  render() {
    return (
      <div style={{
        width: '100%',
        height: '100%'
      }}>
        <Filter ButtonNum={3} ButtonsArray={["c++", "javascript", "typescript"]} ></Filter>
      </div>
    );
  }
};


// db.db.find({ "depository-type": "main" }, (err: any, docs: any) => {
//   console.log(`[story] ${docs}`);
//   console.log(docs)
//   if (docs.length == 0) {
//     db.createDepository();
//   }
//   else {
//     let defaultDepository = docs[0];
//     let des: String = "";
//     smalltalk
//       .prompt('Description', 'You should type description for this file', "")
//       .then((description: String) => {
//         des = description;
//         let tags: String = "tags";
//         smalltalk
//           .prompt('Tags', 'You should type tags with space \" \"', "example: c++ thread developing")
//           .then((tag: String) => {
//             let file = {
//               "owner-name": defaultDepository["depository-name"],
//               "file-path": name,
//               "description": des,
//               "tags": tag.split(" ").filter(n => n),
//             };
//             db.insert(file);
//           })
//           .catch(() => {
//             tags = "";
//           });
//       })
//       .catch(() => {
//         des = "no description";
//       });
//   }
// });

ReactDOM.render(
  <App />,
  document.getElementById('app')
);

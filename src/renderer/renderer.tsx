/**
 * React renderer.
 */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import { ipcRenderer, remote } from 'electron';
import { key_word } from '../Common/db'
// import Datastore from '../../node_modules/nedb'
const smalltalk = require('smalltalk');
const Datastore = require('../../node_modules/nedb')

// import Nedb = require("../../node_modules/@types/nedb")
// Import the styles here to process them with webpack
import '@public/style.css';

interface Props {
  foo: string,
};

interface State {
  bar: any,
}

let db: any;

class App extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    db = remote.getGlobal('MyDatabase');
    this.state = { bar: 1.0 };
  }

  // componentDidMount() {
  //   this.timer = setInterval(function () {
  //     var opacity = this.state.opacity;
  //     opacity -= .05;
  //     if (opacity < 0.1) {
  //       opacity = 1.0;
  //     }
  //     this.setState({
  //       opacity: opacity
  //     });
  //   }.bind(this), 100);
  // }
  shouldComponentUpdate(nextProps: Props, nextState: State) {
    // console.log(this);
    // console.log(nextState);
    if (nextState.bar !== this.state.bar) {
      console.log("update" + nextState.bar);
      return true;
    }
    else return false;
  }

  componentDidMount() {
    // this.listenDrag();

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
    console.log(typeof (name) + " " + name)

    db.find({ "depository-type": "depository" }, function (err: any, docs: any) {
      if (docs.length == 0) {
        //popup
        smalltalk
          .prompt('Depository', 'You are first use file-filter, Please enter depository name', "")
          .then((depositoryName: String) => {
            let dep = {
              "depository-type": "depository",
              "depository-index": 1,
              "depository-date": new Date(),
              "depository-name": depositoryName
            };

            db.insert(dep);
            db.insert({ "table-name": "depository-list", "default-depository": depositoryName });
          })
          .catch(() => {
            smalltalk
              .alert('Error', 'You do not have a depository!')
              .then(() => {
                console.log('ok');
              });
          });

      }
      else {
        //[]
        db.find({ "table-name": "depository-list" }, function (err: any, docs: any) {
          let default_depository = docs[0]["default-depository"];
          console.log(default_depository);
          if (default_depository !== "") {
            db.find({ "depository-name": default_depository }, function (err: any, docs: any) {
              console.log(docs);
              if (docs !== null) {
                //insert
                let des: String = "";
                smalltalk
                  .prompt('Description', 'You should type description for this file', "")
                  .then((description: String) => {
                    des = description;
                    let tags: String = "tags";

                    smalltalk
                      .prompt('Tags', 'You should type tags with space \" \"', "example: c++ thread developing")
                      .then((tag: String) => {
                        tags = tag;
                        for (let str of tags.split(" ")) {
                          if (str !== "") {
                            let file = {
                              "owner-name": default_depository,
                              "file-path": name,
                              "description": des,
                              "tags": str,
                            };
                            db.insert(file);
                          }
                        }
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
        })
      }
    })
    //popup
  }

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
      <div id="drag">
        <Button variant="contained" color="primary" onClick={() => { this.setState({ bar: 2.0 }); alert('clicked') }}>
          HELLO, WORLD
      </Button>
      </div>
    );
  }
};




ReactDOM.render(
  <App foo="hello" />,
  document.getElementById('app')
);

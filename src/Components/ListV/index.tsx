import * as React from 'react';
import { Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/';
import { Card, CardActions, CardContent, Typography, Button } from '@material-ui/core/';
const { shell } = require('electron')
import './index.css'


interface Props {
    fileArray: any[],
    deleteFile: Function,
    editTags: Function,
};

interface State {
}

export class ListV extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    componentWillMount() { }

    makeCard(filename: String, filepath: String, description: String, tags: String[]) {
        console.log(filename)
        const classes: any = makeStyles({
            root: {
                minWidth: 275,
            },
            bullet: {
                display: 'inline-block',
                margin: '0 2px',
                transform: 'scale(0.8)',
            },
            title: {
                fontSize: 14,
            },
            pos: {
                marginBottom: 12,
            },
        });
        const bull = <span className={classes.bullet}>•</span>;
        return (<Card color={"primary"} className={classes.root} key={filename.toString()}>
            <CardContent>
                {/* <Typography className={classes.title} color="textSecondary" gutterBottom>
                    {filepath}
                </Typography> */}
                <Typography color={"primary"} variant="h5" component="h2">
                    {bull}{filename}{bull}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    {tags.map((obj: any) => { return obj + " " })}
                </Typography>
                <br />
                <Typography variant="body2" component="p">
                    {description}
                </Typography>
            </CardContent>
            <CardActions style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                <Button size="small" color={"primary"} onClick={() => {
                    console.log(filepath)
                    shell.showItemInFolder(filepath.toString());
                }}>Open It</Button>
                <Button size="small" color={"primary"} onClick={() => {
                    this.props.editTags(filename, tags)
                }}>Edit Tags</Button>
                <Button size="small" color={"primary"} onClick={() => {
                    this.props.deleteFile(filename)
                }}>Remove It</Button>
            </CardActions>
        </Card>);
    }

    render() {
        let Cards = [];

        for (let obj of this.props.fileArray) {

            Cards.push(this.makeCard(obj["file-name"], obj["file-path"], obj["file-description"], obj["file-tags"]));

            // Cards.push(<div key={obj["file-path"]}>{obj["file-path"]} {obj["file-description"]} {obj["file-tags"]}</div>)
        }
        return (<div>{Cards}</div>)
    }

    componentDidMount() { }

    componentWillReceiveProps() { }

    shouldComponentUpdate(nextProps: Props, nextState: State) { return true }

    componentWillUpdate() { }

    componentDidUpdate() { }

    componentWillUnmount() { }

}
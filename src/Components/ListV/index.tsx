import * as React from 'react';
import { Paper } from '@material-ui/core'

interface Props {
    fileArray: any[],
};

interface State {
}

export class ListV extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    componentWillMount() { }

    render() {
        let Card = [];
        for (let obj of this.props.fileArray) {
            Card.push(<div key={obj["file-path"]}>{obj["file-path"]} {obj["description"]} {obj["tags"]}</div>)
        }
        return (<div>{Card}</div>)
    }

    componentDidMount() { }

    componentWillReceiveProps() { }

    shouldComponentUpdate(nextProps: Props, nextState: State) { return true }

    componentWillUpdate() { }

    componentDidUpdate() { }

    componentWillUnmount() { }

}
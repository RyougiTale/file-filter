import * as React from 'react';
import {Paper} from '@material-ui/core'

interface Props {
    fileArray: String[],
};

interface State {
}

export class ListV extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    componentWillMount() { }

    render() {
        return (<div></div>)
    }

    componentDidMount() { }

    componentWillReceiveProps() { }

    shouldComponentUpdate(nextProps: Props, nextState: State) { return true }

    componentWillUpdate() { }

    componentDidUpdate() { }

    componentWillUnmount() { }

}
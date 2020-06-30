import * as React from 'react';
import './index.css'

interface Props {
    repositoryArray: String[],
    callBack: Function,
};

interface State {
};

export default class Choose extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
    }

    componentWillMount() { }

    render() {
        let buttons = [];
        for (let ele of this.props.repositoryArray) {
            buttons.push(<button
                className="warehouseButton"
                style={{

                }}
                key={ele.toString()}
                color="primary"
                onClick={() => {
                    this.props.callBack(ele);
                }}


            >{ele}</button>)
        }
        return (<div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>{buttons}</div>)
    }

    componentDidMount() { }

    componentWillReceiveProps() { }

    shouldComponentUpdate(nextProps: Props, nextState: State) { return true }

    componentWillUpdate() { }

    componentDidUpdate() { }

    componentWillUnmount() { }
}
import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';

class LoadingButton extends Component {

    constructor(props, content) {
        super(props, content);
        this.state = {
            isLoading: false
        }
        this.handleClick = this.handleClick.bind(this);
    }
    renderChildren(){
        let eventKeyCount = 0;
        return React.Children.map(this.props.children, child => {
            return React.cloneElement(child, {eventKey: ++eventKeyCount});
        });
    }
    handleClick(e) {
        const { onClick } = this.props;
        this.setState({isLoading: true});

        setTimeout(() => {
          this.setState({isLoading: false});
        }, 2000);
        if(onClick) {
            onClick(e);
        }
    }
    render() {
        let isLoading = this.state.isLoading;
        return (<Button disabled= {isLoading}
                        {...this.props} onClick = { !isLoading ? this.handleClick : null}>
                    { this.renderChildren() }
                </Button>
            );
    }
}

export default LoadingButton;

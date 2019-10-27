import React, { Component } from 'react'

export default class eventScroll extends Component {
    constructor(props) {
        super(props);
        this.state = {
            runingFunction: false,
        }
    }

    handleScroll = async () => {
        const { runingFunction } = this.state;
        if (
          window.innerHeight + document.documentElement.scrollTop
          >= document.documentElement.offsetHeight && !runingFunction
        ) {
          this.setState({
            runingFunction: true,
          });
          const { fun } = this.props;
          await fun();
          this.setState({
            runingFunction: false,
          });
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    render() {
        const { children } = this.props;
        return (
            <>
                {children}
            </>
        )
    }
}

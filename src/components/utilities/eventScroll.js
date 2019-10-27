import React, { Component } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

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
        const { runingFunction } = this.state;
        return (
          <>
            <ClipLoader
              sizeUnit={"px"}
              size={50}
              color={'#c4183c'}
              loading={runingFunction}
            />
          </>
        )
    }
}

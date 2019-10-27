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
        console.log( window.innerHeight + document.documentElement.scrollTop);
        console.log(document.documentElement.offsetHeight);
        console.log('///////////');
        
        if (
          (window.innerHeight + document.documentElement.scrollTop + 10)
          >= document.documentElement.offsetHeight && !runingFunction
        ) {
          console.log('1111111');
          
          this.setState({
            runingFunction: true,
          });
          const { fun } = this.props;
          await fun();
          this.setState({
            runingFunction: false,
          });
          console.log('222222');

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

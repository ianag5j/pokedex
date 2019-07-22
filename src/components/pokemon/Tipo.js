import React, { Component } from 'react'

export default class Tipo extends Component {
    state = {
        color: null
    }
    async componentDidMount () {
    }

    render() {
        return (
           <div className={'col text-center tipo-' +  this.props.types.type.name}>
               {
                   this.props.types.type.name
               }
           </div>
        )
    }
}

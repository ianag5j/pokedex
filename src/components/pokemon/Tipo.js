import React, { Component } from 'react'
import {
    Badge,
} from 'shards-react'

export default class Tipo extends Component {
    render() {
        return (
           <div className='text-center m-1'>
                <Badge className={'tipo-' +  this.props.types.type.name}>
                    { this.props.types.type.name }
                </Badge>
           </div>
        )
    }
}

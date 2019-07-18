import React, { Component } from 'react'
import Axios from 'axios';
import Tipo from './Tipo'

export default class PokeCard extends Component {
    state = {
        foto: null,
        tipos: []
    }
    async componentDidMount () {
        const res = await Axios.get(this.props.url)
        this.setState({
            foto: res.data.sprites.front_default,
            tipos: res.data.types
        })
    }

    render() {
        return (
            <div className="col-4 mt-2">
                <div className="card">
                    <img 
                     src={this.state.foto} 
                     className="card-img-top"
                     alt={this.props.nombre}>
                    </img>
                    <div className='card-body'>
                        <h5> {this.props.nombre} </h5>
                    </div>
                    <div className='card-footer row'>    
                        {
                            this.state.tipos.map((tipo) => {
                                return <Tipo types={tipo} />
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}

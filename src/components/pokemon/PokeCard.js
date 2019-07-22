import React, { Component } from 'react'
import Axios from 'axios';

export default class PokeCard extends Component {
    state = {
        foto: 'default.png',
        tipos: []
    }

    async componentDidMount () {
        const res = await Axios.get(this.props.url)
        this.setState({
            foto: res.data.sprites.front_default,
            tipos: res.data.types,
            id: res.data.id
        })
    }

    render() {
        return (
            <div className="col-3 mt-2 poke-card">
                <div className="card" style={{background: this.colorFondo(this.state.tipos)}}>
                    <img 
                     src={this.state.foto} 
                     className="card-img-top"
                     alt={this.props.nombre}>
                    </img>
                    <span class="posicion badge badge-pill badge-secondary m-1">
                        {this.state.id}
                    </span>
                    <div className='card-body row'>
                        <h5 className='card-title col text-center'>
                            {this.props.nombre} 
                        </h5>
                    </div>
                    {/* <div className='card-footer row'>    
                        {
                            this.state.tipos.map((tipo) => {
                                return <Tipo types={tipo} />
                            })
                        }
                    </div> */}
                </div>
            </div>
        )
    }

    colorFondo(tipos) {
       if (tipos.length > 0) {
            let colorFondo = ''
            if (tipos.length > 1) {
                colorFondo = 'linear-gradient(360deg, '
            }

            tipos.forEach((tipo, index) => {
                switch (tipo.type.name) {
                    case 'normal':
                        colorFondo += '#b7aaa7'
                        break;
                    case 'poison':
                        colorFondo += '#8b4f7d'
                    break;
                    case 'grass':
                        colorFondo += '#7fbf67'
                    break;
                    case 'fire':
                        colorFondo += '#dd563f'
                    break;
                    case 'water':
                        colorFondo += '#3898f5'
                    break;
                    case 'electric':
                        colorFondo += '#ffdb71'
                    break;
                    case 'bug':
                        colorFondo += '#aabb2a'
                    break;
                    case 'flying':
                        colorFondo += '#6d9ae2'
                    break;
                       
                    default:
                        break;
                }
                
                if (tipos[(index + 1)] !== undefined) {
                    colorFondo += ', '
                    
                }
            });

            if (tipos.length > 1) {
                colorFondo += ')'
            }
            
            return colorFondo
       }
    }
}

import React, { Component } from 'react'
import Axios from 'axios';
import {
    Card,
    CardBody,
    CardTitle,
    CardImg,
    Badge,
} from 'shards-react'

export default class PokeCard extends Component {
    state = {
        foto: 'default.png',
        id: '???',
        tipos: []
    }

    async componentDidMount () {
        try {
            const res = await Axios.get(this.props.url)
            this.setState({
                foto: res.data.sprites.front_default,
                tipos: res.data.types,
                id: res.data.id
            })
        } catch (error) {
           console.log(error);
        }
    }

    mostrarModal() {
        console.log('mostrate');
    }

    render() {
        return (
            <div className="col-3 mt-2 poke-card">
                <Card className="poke-card" style={{background: this.colorFondo(this.state.tipos)}}>
                    <Badge pill theme='secondary' className='poke-pill m-2'>
                        {this.state.id}
                    </Badge>
                    <CardImg top src={this.state.foto} />
                    <CardBody>
                        <CardTitle className='text-center'>
                            {this.props.nombre}
                        </CardTitle>
                    </CardBody>
                </Card>
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

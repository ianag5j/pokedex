import React, { Component } from 'react'
import Axios from 'axios';
import {
    Card,
    CardBody,
    CardTitle,
    CardImg,
    Badge,
    Modal,
    ModalHeader,
    ModalBody,
    Progress
} from 'shards-react'
import Tipo from './Tipo'

export default class PokeCard extends Component {
    constructor (props) {
        super(props)
        this.state = {
            foto: 'default.png',
            id: '???',
            tipos: [],
            stats: [],
            pokeDescripcion: props.nombre,
            modalOpen: false,
        }
        this.toggle = this.toggle.bind(this)
    }

    async componentDidMount () {
        try {
            const res = await Axios.get(this.props.url)
            this.setState({
                foto: res.data.sprites.front_default,
                tipos: res.data.types,
                id: res.data.id,
                stats: res.data.stats.reverse(),
                pokemon: res.data
            })
            try {
                const pokeDescripciones = await Axios.get(res.data.species.url)
                const pokeDescripcion = pokeDescripciones.data.flavor_text_entries.find(function(descripcion) {
                    return descripcion.language.name === 'es';
                });
                this.setState({
                    pokeDescripcion: pokeDescripcion.flavor_text
                })
            } catch (error) {
            //    console.log(error);
            }
        } catch (error) {
        //    console.log(error);
        }
    }

    toggle() {
        this.setState({
            modalOpen: !this.state.modalOpen
        })
    }

    render() {
        const { modalOpen } = this.state
        return (
            <div className="col-sm-3 col-md-4 col-lg-3 mt-2" onClick={this.toggle}>
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

                <Modal size='lg' open={modalOpen} toggle={this.toggle} className='poke-modal'>
                    <div className='row badges-tipos'>
                        {
                            this.state.tipos.map((tipo) => {
                                return <Tipo types={tipo} />
                            })
                        }
                    </div>
                    <ModalHeader>
                        {this.props.nombre}
                    </ModalHeader>
                    <ModalBody className='row'>
                        <div className='col'>
                            <div className='text-center'>
                                <img src={this.state.foto} >
                                </img>
                            </div>
                            <p>
                                {this.state.pokeDescripcion}
                            </p>
                        </div>
                        <div className="col-8">
                            {
                                this.state.stats.map(stat => {
                                    return <div className='row'>
                                        <div className='col-3'>
                                            {stat.stat.name}
                                        </div>
                                        <div className='col'>
                                            <Progress value={stat.base_stat}>{stat.base_stat}</Progress>
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                    </ModalBody>
                </Modal>
            </div>
        )
    }

    getColorTipo(tipo) {
        switch (tipo) {
            case 'normal':
                return '#b7aaa7'
            case 'poison':
                return '#8b4f7d'
            case 'grass':
                return '#7fbf67'
            case 'fire':
                return '#dd563f'
            case 'water':
                return '#3898f5'
            case 'electric':
                return '#ffdb71'
            case 'bug':
                return '#aabb2a'
            case 'flying':
                return '#6d9ae2' 
            default:
                return 'red'
        }
    }

    colorFondo(tipos) {
       if (tipos.length > 0) {
            // if (tipos.length === 1) {
            //     return this.getColorTipo(tipos[1].type.name)
            // }
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
                        colorFondo += '#b97fc9'
                    break;
                    case 'grass':
                        colorFondo += '#9bcc50'
                    break;
                    case 'fire':
                        colorFondo += '#fd7d24'
                    break;
                    case 'water':
                        colorFondo += '#4592c4'
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
                    case 'psychic':
                        colorFondo += '#f366b9'
                        break;
                    case 'ice':
                        colorFondo += '#51c4e7'
                        break;
                    case 'dragon':
                        colorFondo += '#ab82ff'
                        break;
                    case 'dark':
                        colorFondo += '#707070'
                        break;
                    case 'fairy':
                        colorFondo += '#fdb9e9'
                        break;
                    case 'shadow':
                        colorFondo += 'red'
                        break;
                    case 'fighting':
                        colorFondo += '#d56723'
                        break;
                    case 'ground':
                        colorFondo += '#ab9842'
                        break;
                    case 'rock':
                        colorFondo += '#a38c21'
                        break;
                    case 'steel':
                        colorFondo += '#9eb7b8'
                        break;
                    case 'ghost':
                        colorFondo += '#7b62a3'
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

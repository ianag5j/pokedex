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
            <div className="col-3 mt-2 poke-card" onClick={this.toggle}>
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

                <Modal size='lg' open={modalOpen} toggle={this.toggle} >
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

import React, { Component } from 'react'
import Axios from 'axios';
import PokeCard from './PokeCard'
import PokeInfo from './PokeInfo'

import {
    Row,
    Alert,
    Modal,
    ModalHeader,
    ModalBody
} from 'shards-react'

import "../../tipos.css";



export default class PokeList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // pokeUrl : 'https://pokeapi.co/api/v2/pokemon/',
            pokeUrl : "https://pokeapi.co/api/v2/pokemon/?limit=25",
            pokemons : [
                // {name: 'bulbasur'},
                // {name: 'duki'},
                // {name: 'kea'},
            ],
            modalOpen: false
        }
        this.toggle = this.toggle.bind(this)
        this.alertCerrar = this.alertCerrar.bind(this)
    }
    
    async componentDidMount () {
        try {
            const res = await Axios.get(this.state.pokeUrl)
            this.setState({pokemons: res.data['results']})            
        } catch (error) {
            this.setState({
                alertTexto: 'Error al obtener lista de Pokemons',
                visible: true
            })
        }
    }

    toggle() {
        this.setState({
            modalOpen: !this.state.modalOpen
        })
    }

    alertCerrar() {
        this.setState({visible:false})
    }

    render() {
        const { modalOpen } = this.state
        return (
            <div>
                <Alert theme='warning' open={this.state.visible} dismissible={this.alertCerrar}>
                    {this.state.alertTexto}
                </Alert>
                <Modal open={modalOpen} toggle={this.toggle} >
                    <ModalHeader>
                        Hola <span role='img'>🤟</span>
                    </ModalHeader>
                    <ModalBody>
                        Skere
                    </ModalBody>
                </Modal>
                <Row className='m-2'>
                    {
                        this.state.pokemons.map(pokemon => (
                            <PokeCard
                                nombre={pokemon.name}
                                url={pokemon.url}
                                onClick={this.toggle.bind(this)}
                            />
                        ))
                    }
                </Row>
            </div>
        )
    }
}

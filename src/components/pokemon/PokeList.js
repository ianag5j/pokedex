import React, { Component } from 'react'
import Axios from 'axios';
import PokeCard from './PokeCard'
import PokeInfo from './PokeInfo'

import "../../tipos.css";



export default class PokeList extends Component {
    state = {
        pokeUrl : 'https://pokeapi.co/api/v2/pokemon/',
        pokeUrl : "https://pokeapi.co/api/v2/pokemon/?limit=25",
        pokemons : []
    }

    async componentDidMount () {
        const res = await Axios.get(this.state.pokeUrl)
        this.setState({pokemons: res.data['results']})        
    }

    render() {
        return (
            <div className="row p-2">
                <PokeInfo />
                {
                    this.state.pokemons.map(pokemon => (
                        <PokeCard nombre={pokemon.name} url={pokemon.url} />
                    ))
                }
            </div>
        )
    }
}

import React, { Component } from 'react'

export default class NavBar extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg poke-nav">
                    <a className="navbar-brand">
                        <img src="Pokédex_logo.png" height="30" alt="Pokedex">
                        </img>
                    </a>
                </nav>
            </div>
        )
    }
}

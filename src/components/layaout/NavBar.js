import React, { Component } from 'react'
import {
    Navbar,
    NavbarBrand
 } from 'shards-react'

export default class NavBar extends Component {
    render() {
        return (
            <div>
                <Navbar type="dark" theme="danger" expand='md'>
                    <NavbarBrand href='/'>
                        <img src="Pokédex_logo.png" height="30" alt="Pokedex">
                        </img>
                    </NavbarBrand>
                </Navbar>
            </div>
        )
    }
}

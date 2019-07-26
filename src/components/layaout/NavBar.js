import React, { Component } from 'react'
import {
    Navbar,
    Nav,
    NavbarBrand,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    FormInput
 } from 'shards-react'
 import { faSearch } from "@fortawesome/free-solid-svg-icons";
 import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default class NavBar extends Component {
    render() {
        return (
            <div>
                <Navbar type="dark" theme="danger" expand='md' sticky='sticky'>
                    <NavbarBrand href='/'>
                        <img src="Pokédex_logo.png" height="30" alt="Pokedex">
                        </img>
                    </NavbarBrand>
                    {/* <Nav navbar className="ml-auto">
                        <InputGroup size="sm" seamless>
                        <InputGroupAddon type="prepend">
                            <InputGroupText>
                            <FontAwesomeIcon icon={faSearch} />
                            </InputGroupText>
                        </InputGroupAddon>
                        <FormInput className="border-0" placeholder="Buscar Pokemon" />
                        </InputGroup>
                    </Nav> */}
                </Navbar>
                
            </div>
        )
    }
}

import React, { Component } from "react";
import Axios from "axios";
import {
  Navbar,
  Nav,
  NavbarBrand,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormInput,
  ListGroup,
  ListGroupItem
} from "shards-react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      UrlAllsPokemons: "https://pokeapi.co/api/v2/pokemon/?limit=10000",
      listaAllsPokemons: [],
      resultadoPokemons: []
    };
    this.buscarPokemon = this.buscarPokemon.bind(this);
  }

  async componentDidMount() {
    let listaPokemons = await Axios.get(this.state.UrlAllsPokemons);
    this.setState({
      listaAllsPokemons: listaPokemons.data.results
    });
  }

  buscarPokemon(event) {
    let busqueda = event.target.value;
    if (busqueda !== "") {
      let resultados = this.state.listaAllsPokemons.filter(pokemon =>
        pokemon.name.includes(busqueda)
      );
      resultados = resultados.slice(0, 5);
      this.setState({
        resultadoPokemons: resultados
      });
      console.log(resultados);
    } else {
      this.setState({
        resultadoPokemons: []
      });
    }
  }

  render() {
    return (
      <div>
        <Navbar type="dark" theme="danger" expand="md">
          <NavbarBrand href="/">
            <img src="Pokédex_logo.png" height="30" alt="Pokedex" />
          </NavbarBrand>
          <Nav navbar className="ml-auto">
            <InputGroup size="sm" seamless>
              <InputGroupAddon type="prepend">
                <InputGroupText>
                  <FontAwesomeIcon icon={faSearch} />
                </InputGroupText>
              </InputGroupAddon>
              <FormInput
                id="buscador"
                className="border-0"
                placeholder="Buscar Pokemon"
                onChange={this.buscarPokemon}
              />
              <ListGroup small={true} id="resultados-busqueda">
                {this.state.resultadoPokemons.map(pokemon => {
                  return <ListGroupItem>{pokemon.name}</ListGroupItem>;
                })}
              </ListGroup>
              <div />
            </InputGroup>
          </Nav>
        </Navbar>
      </div>
    );
  }
}

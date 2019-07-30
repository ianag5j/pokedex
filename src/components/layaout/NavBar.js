import React, { Component } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
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

  /**
   * Filtra los nombres por la busqueda y devuelve los primeros 5
   * @param {*} event
   * @memberof NavBar
   */
  buscarPokemon(event) {
    let busqueda = event.target.value;
    busqueda = busqueda.toLowerCase();
    if (busqueda !== "") {
      let resultados = this.state.listaAllsPokemons.filter(pokemon =>
        pokemon.name.includes(busqueda)
      );
      resultados = resultados.slice(0, 5);
      this.setState({
        resultadoPokemons: resultados
      });
    } else {
      this.setState({
        resultadoPokemons: []
      });
    }
  }

  render() {
    return (
      <div>
        <Navbar type="dark" theme="danger" expand="md" className="row">
          <NavbarBrand href="/" className="col-4">
            <img src="/Pokédex_logo.png" height="30" alt="Pokedex" />
          </NavbarBrand>
          <Nav navbar className="ml-auto col col-md-4">
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
              <ListGroup id="resultados-busqueda">
                {this.state.resultadoPokemons.map(pokemon => {
                  return (
                    <ListGroupItem>
                      <Link to={"/pokemon/" + pokemon.name}>
                        {pokemon.name}
                      </Link>
                    </ListGroupItem>
                  );
                })}
              </ListGroup>
            </InputGroup>
          </Nav>
        </Navbar>
      </div>
    );
  }
}

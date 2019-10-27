import React, { Component } from "react";
import Axios from "axios";
import PokeCard from "./PokeCard";
import { Row, Alert, Button } from "shards-react";
import EventScroll from '../utilities/eventScroll';
import "../../tipos.css";

export default class PokeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokeUrl: "https://pokeapi.co/api/v2/pokemon/?limit=25",
      pokemons: [],
      nextUrl: null,
      modalOpen: false,
      alertVisible: false,
      BotonDisable: false
    };
    this.toggle = this.toggle.bind(this);
    this.alertCerrar = this.alertCerrar.bind(this);
    this.getPokemons = this.getPokemons.bind(this);
  }

  async componentDidMount() {
    this.getPokemons();
  }

  toggle() {
    this.setState({
      modalOpen: !this.state.modalOpen
    });
  }

  alertCerrar() {
    this.setState({ alertVisible: false });
  }

  async getPokemons() {
    try {
      this.setState({
        BotonDisable: true
      });
      let url = this.state.nextUrl;
      if (this.state.nextUrl === null) {
        url = this.state.pokeUrl;
      }
      const res = await Axios.get(url);
      this.setState({
        pokemons: this.state.pokemons.concat(res.data.results),
        nextUrl: res.data.next,
        BotonDisable: false
      });
    } catch (error) {
      this.setState({
        alertTexto: "Error al obtener lista de Pokemons",
        alertVisible: true,
        BotonDisable: false
      });
    }
  }

  render() {
    return (
      <div>
        <Alert
          theme="warning"
          open={this.state.alertVisible}
          dismissible={this.alertCerrar}
        >
          {this.state.alertTexto}
        </Alert>
        <Row className="m-2">
          {this.state.pokemons.map(pokemon => (
            <PokeCard
              nombre={pokemon.name}
              url={pokemon.url}
              onClick={this.toggle.bind(this)}
            />
          ))}
        </Row>
        <div className="m-2 col text-center">
          <EventScroll fun={this.getPokemons} />
        </div>
      </div>
    );
  }
}

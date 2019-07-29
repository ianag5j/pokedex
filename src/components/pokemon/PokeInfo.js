import React, { Component } from "react";
import Axios from "axios";
import { Progress } from "shards-react";
import Tipo from "./Tipo";
import "../../tipos.css";

export default class PokeInfo extends Component {
  constructor(props) {
    super(props);
    let n = props.location.pathname.lastIndexOf("/");
    let pokemonNombre = props.location.pathname.substring(n + 1);

    this.state = {
      nombre: pokemonNombre,
      url: "https://pokeapi.co/api/v2/pokemon/" + pokemonNombre,
      foto: "/default.png",
      id: "???",
      tipos: [],
      stats: [],
      pokeDescripcion: pokemonNombre,
      modalOpen: true
    };
  }

  async componentDidMount() {
    try {
      const res = await Axios.get(this.state.url);
      this.setState({
        foto: res.data.sprites.front_default,
        tipos: res.data.types,
        id: res.data.id,
        stats: res.data.stats.reverse(),
        pokemon: res.data
      });
      try {
        const pokeDescripciones = await Axios.get(res.data.species.url);
        const pokeDescripcion = pokeDescripciones.data.flavor_text_entries.find(
          function(descripcion) {
            return descripcion.language.name === "es";
          }
        );
        this.setState({
          pokeDescripcion: pokeDescripcion.flavor_text
        });
      } catch (error) {
        //    console.log(error);
      }
    } catch (error) {
      //    console.log(error);
    }
  }

  render() {
    // const { modalOpen } = this.state;
    return (
      <div>
        <div className="container mt-2">
          <h2 className='text-center text-capitalize'>{this.state.nombre}</h2>
          <div className="row">
            <div className="col-2 text-center">
              <img src={this.state.foto} alt={this.state.nombre} />
            </div>
            <div className="col mt-3">
              <p>{this.state.pokeDescripcion}</p>
            
            </div>
            <div className='col-2 row'>
              {this.state.tipos.map(tipo => {
                return <Tipo types={tipo} />;
              })} 
            </div>
          </div>
          {/* <div className="row">
            {this.state.tipos.map(tipo => {
              return <Tipo types={tipo} />;
            })}
          </div> */}
          {this.state.stats.map(stat => {
            return (
              <div className="row">
                <div className="col-3">{stat.stat.name}</div>
                <div className="col">
                  <Progress value={stat.base_stat}>{stat.base_stat}</Progress>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

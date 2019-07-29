import React, { Component } from "react";
import { Badge } from "shards-react";

/**
 * Badge con El tipo de Pokemon
 *
 * @export
 * @class Tipo
 * @extends {Component}
 */
export default class Tipo extends Component {
  render() {
    return (
      <div className="text-center m-1 text-capitalize">
        <Badge className={"tipo-" + this.props.types.type.name}>
          {this.props.types.type.name}
        </Badge>
      </div>
    );
  }
}

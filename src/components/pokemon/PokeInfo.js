import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody } from "shards-react";

export default class PokeInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: true
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modalOpen: !this.state.modalOpen
    });
  }

  render() {
    const { modalOpen } = this.state;
    return <div />;
  }
}

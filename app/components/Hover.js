import React from "react";

const styles = {
  container: {
    position: "relative",
    display: "flex",
  },
};

export default class Hover extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hovering: false,
    };

    this.mouseOver = this.mouseOver.bind(this);
    this.mouseOut = this.mouseOut.bind(this);
  }

  mouseOver() {
    this.setState({
      hovering: true,
    });
  }

  mouseOut() {
    this.setState({
      hovering: false,
    });
  }

  render() {
    return (
      <div
        onMouseOver={this.mouseOver}
        onMouseOut={this.mouseOut}
        style={styles.container}
      >
        {this.props.children(this.state.hovering)}
      </div>
    );
  }
}

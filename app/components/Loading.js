import React from 'react';
import PropTypes from 'prop-types';

const styles = {
  content: {
    fontSize: '35px',
    position: 'absolute',
    left: 0,
    right: 0,
    marginTop: '20px',
    textAlign: 'center'
  }
}

export default class Loading extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      content: this.props.text
    }
  }

  componentDidMount() {
    const { text, speed } = this.props;

    this.interval = window.setInterval(() => {
      // this.setState(({content}) => {
        this.state.content === text + '...' 
        ? this.setState({content: text})
        : this.setState(({ content }) => ({ content: content + '.' }))

        // if (content === 'Loading...') {
        //   content = 'loading';
        // } else {
        //   content += '.';
        // }
        // return {
        //   content
        // }
      // })
    }, speed)
  }

  componentWillUnmount() {
    window.clearInterval(this.interval);
  }

  render() {
    return (
      <p style={styles.content}>
        {this.state.content}
      </p>
    )
  }
}

Loading.propTypes = {
  text: PropTypes.string.isRequired,
  speed: PropTypes.number.isRequired
}

Loading.defaultProps = {
  text: 'Loading',
  speed: 300
}
import React from "react";
import PropTypes from "prop-types";
import { fetchPopularRepos } from "../utils/api";

function Nav({ selected, onUpdateTopic }) {
  const topics = ["JavaScript", "React", "Vue", "Angular", "Ember", "Polymer"];

  return (
    <ul className="flex-center">
      {topics.map(topic => (
        <li key={topic}>
          <button
            className="btn-clear nav-link"
            style={topic === selected ? { color: "hsl(4, 90%, 58%)" } : null}
            onClick={() => onUpdateTopic(topic)}
          >
            {topic}
          </button>
        </li>
      ))}
    </ul>
  );
}

Nav.propTypes = {
  selected: PropTypes.string.isRequired,
  onUpdateTopic: PropTypes.func.isRequired
};

export default class Popular extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTopic: "JavaScript",
      repos: {},
      error: null
    };

    this.updateTopic = this.updateTopic.bind(this);
    this.isLoading = this.isLoading.bind(this);
  }

  componentDidMount() {
    this.updateTopic(this.state.selectedTopic);
  }

  updateTopic(selectedTopic) {
    this.setState({
      selectedTopic,
      error: null
    });

    if (!this.state.repos[selectedTopic]) {
      fetchPopularRepos(selectedTopic)
        .then(data => {
          this.setState(currentState => ({
            repos: {
              ...currentState.repos,
              [selectedTopic]: data
            }
          }));
        })
        .catch(() => {
          console.warn("Error fetching repos", error);

          this.setState({
            error: "There was an error fetching the repositories"
          });
        });
    }
  }
  isLoading() {
    const { selectedTopic, repos, error } = this.state;

    return !repos[selectedTopic] && error === null;
  }
  render() {
    const { selectedTopic, repos, error } = this.state;

    return (
      <React.Fragment>
        <Nav
          selected={this.state.selectedTopic}
          onUpdateTopic={this.updateTopic}
        />

        {this.isLoading() && <p>LOADING</p>}
        {error && <p>{this.state.error}</p>}
        {repos[selectedTopic] && (
          <pre>{JSON.stringify(repos[selectedTopic], null, 2)}</pre>
        )}
      </React.Fragment>
    );
  }
}
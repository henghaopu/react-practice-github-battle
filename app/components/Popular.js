import React from "react";
import PropTypes from "prop-types";
import { fetchPopularRepos } from "../utils/api";
import {
  FaUser,
  FaStar,
  FaCodeBranch,
  FaExclamationTriangle,
} from "react-icons/fa";
import Card from "./Card";
import Loading from "./Loading";
import Tooltip from "./Tooltip";

function Nav({ selected, onUpdateTopic }) {
  const topics = ["JavaScript", "React", "Vue", "Angular", "Ember", "Polymer"];

  return (
    <ul className="flex-center">
      {topics.map((topic) => (
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
  onUpdateTopic: PropTypes.func.isRequired,
};

function RepoCards({ repos }) {
  return (
    <ul className="grid space-around">
      {repos.map((repo, index) => {
        const {
          name,
          owner,
          html_url,
          stargazers_count,
          forks,
          open_issues,
        } = repo;
        const { login, avatar_url } = owner;

        return (
          <li key={html_url}>
            <Card
              header={`#${index + 1}`}
              avatar={avatar_url}
              href={html_url}
              name={login}
            >
              <ul className="card-list">
                <li>
                  <Tooltip text="GitHub username">
                    <FaUser color="rgb(255, 191, 116)" size={22} />
                    <a href={`https://github.com/${login}`}>{login}</a>
                  </Tooltip>
                </li>
                <li>
                  <FaStar color="rgb(255, 215, 0)" size={22} />
                  {stargazers_count.toLocaleString()} stars
                </li>
                <li>
                  <FaCodeBranch color="rgb(129, 195, 245)" size={22} />
                  {forks.toLocaleString()} forks
                </li>
                <li>
                  <FaExclamationTriangle color="rgb(241, 138, 147)" size={22} />
                  {open_issues.toLocaleString()} open issues
                </li>
              </ul>
            </Card>
          </li>
        );
      })}
    </ul>
  );
}

RepoCards.propTypes = {
  repos: PropTypes.array.isRequired,
};

export default class Popular extends React.Component {
  state = {
    selectedTopic: "JavaScript",
    repos: {},
    error: null,
  };

  componentDidMount() {
    this.updateTopic(this.state.selectedTopic);
  }

  updateTopic = (selectedTopic) => {
    this.setState({
      selectedTopic,
      error: null,
    });

    if (!this.state.repos[selectedTopic]) {
      fetchPopularRepos(selectedTopic)
        .then((data) => {
          this.setState((currentState) => ({
            repos: {
              ...currentState.repos,
              [selectedTopic]: data,
            },
          }));
        })
        .catch(() => {
          console.warn("Error fetching repos", error);

          this.setState({
            error: "There was an error fetching the repositories",
          });
        });
    }
  };
  isLoading = () => {
    const { selectedTopic, repos, error } = this.state;

    return !repos[selectedTopic] && error === null;
  };
  render() {
    const { selectedTopic, repos, error } = this.state;

    return (
      <React.Fragment>
        <Nav selected={selectedTopic} onUpdateTopic={this.updateTopic} />

        {this.isLoading() && <Loading text="Fetching Repos" />}
        {error && <p className="center-text error">{error}</p>}
        {repos[selectedTopic] && <RepoCards repos={repos[selectedTopic]} />}
      </React.Fragment>
    );
  }
}

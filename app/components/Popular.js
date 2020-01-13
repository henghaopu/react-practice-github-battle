import React from "react";

export default class Popular extends React.Component {
  render() {
    const languages = ["All", "JavaScript", "Ruby", "Java", "CSS", "Python"];

    return (
      <ul>
        {languages.map(language => (
          <li key={language}>
            <button>{language}</button>
          </li>
        ))}
      </ul>
    );
  }
}

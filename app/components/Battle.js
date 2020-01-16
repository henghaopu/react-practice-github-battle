import React from "react";
import { FaUserFriends, FaFighterJet, FaTrophy } from "react-icons/fa";

function Instructions() {
  return (
    <div>
      <h1>Instructions</h1>
      <ol>
        <li>
          <h3>Enter two GitHub users</h3>
          <FaUserFriends/>
        </li>
        <li>
          <h3>Battle</h3>
          <FaFighterJet/>
        </li>
        <li>
          <h3>See the winner</h3>
          <FaTrophy/>
        </li>
      </ol>
    </div>
    );
}

export default class Battle extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Instructions />
      </React.Fragment>
    );
  }
}

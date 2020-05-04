import React from "react";
import PropTypes from "prop-types";
import Hover from "./Hover";

const styles = {
  tooltip: {
    boxSizing: "border-box",
    position: "absolute",
    width: "160px",
    bottom: "100%",
    left: "50%",
    marginLeft: "-80px",
    borderRaidus: "3px",
    backgroundColor: "hsla(0, 0%, 20%, 0.9)",
    padding: "7px",
    marginBottom: "5px",
    color: "#fff",
    textAlign: "center",
    fontSize: "14px",
  },
};

export default function Tooltip({ text, children }) {
  return (
    <Hover>
      {(hovering) => (
        <div>
          {hovering && <div style={styles.tooltip}>{text}</div>}
          {children}
        </div>
      )}
    </Hover>
    
  );
}

Tooltip.propTyles = {
  text: PropTypes.string.isRequired,
};
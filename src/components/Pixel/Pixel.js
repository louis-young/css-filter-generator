import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";

import "./Pixel.scss";

const Pixel = ({ filter, background }) => {
  const pixel = useRef();

  useEffect(() => {
    if (!filter && !background) {
      return;
    }

    if (filter) {
      pixel.current.setAttribute("style", filter);
    } else {
      pixel.current.setAttribute("style", `background-color: ${background}`);
    }
  }, [filter, background]);

  if (!filter && !background) {
    return <></>;
  }

  return (
    <>
      <div className="pixel">
        <div className="pixel__render" ref={pixel}></div>

        <p className="pixel__text">
          {filter
            ? "Filtered pixel with colour applied through CSS filter."
            : "Real pixel with the colour applied through CSS background-color."}
        </p>
      </div>
    </>
  );
};

Pixel.propTypes = {
  filter: PropTypes.string,
};

export default Pixel;

import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Color from "../../includes/Color";
import Solver from "../../includes/Solver";
import Pixel from "../../components/Pixel/Pixel";
import Message from "../../components/Message/Message";

import "./Form.scss";

const Form = ({ colour, setColour }) => {
  const [filter, setFilter] = useState(null);
  const [background, setBackground] = useState(null);
  const [message, setMessage] = useState(null);

  const input = useRef();

  useEffect(() => {
    input.current.focus();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const rgb = hexToRgb(colour);

    const color = new Color(rgb[0], rgb[1], rgb[2]);

    const solver = new Solver(color);

    const result = solver.solve();

    setFilter(result.filter);

    setBackground(color.toString());

    const roundedLoss = Math.round(result.loss);

    if (result.loss < 1) {
      setMessage(`This is a perfect result with a loss of ${roundedLoss}.`);
    } else if (result.loss < 5) {
      setMessage(`The is a close result with a loss of ${roundedLoss}.`);
    } else if (result.loss < 15) {
      setMessage(`This is a poor result with a loss of ${roundedLoss}.`);
    } else {
      setMessage(`This is a terrible result with a loss of ${roundedLoss}.`);
    }
  };

  const hexToRgb = (hex) => {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (m, r, g, b) => {
      return r + r + g + g + b + b;
    });

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    return result
      ? [
          parseInt(result[1], 16),
          parseInt(result[2], 16),
          parseInt(result[3], 16),
        ]
      : null;
  };

  return (
    <>
      <section className="section section--center">
        <p className="section__text">Enter the target hexadecimal colour:</p>
        <form className="form" onSubmit={(event) => handleSubmit(event)}>
          <input
            className="form__input"
            onChange={(event) => setColour(event.target.value)}
            placeholder="#123456"
            ref={input}
            pattern="^#(?:[0-9a-fA-F]{3}){1,2}$"
          ></input>
          <button className="form__submit button">Go</button>
        </form>
      </section>

      <section className="results section section--center">
        <aside className="pixels">
          <Pixel background={background}></Pixel>
          <Pixel filter={filter}></Pixel>
        </aside>
        <Message message={filter} />
        <Message message={message} />
      </section>

        <p className="section__text section__text--small section__text--no-bottom"> Developed by <a className="link" href="https://www.louisyoung.co.uk/" target="_blank" rel="noopener nofollow noreferrer">Louis Young</a>, logic by <a className="link" href="https://codepen.io/sosuke/pen/Pjoqqp" target="_blank" rel="noopener nofollow noreferrer">Barrett Sonntag</a>.</p>
     
    </>
  );
};

Form.propTypes = {
  setValue: PropTypes.func,
};

export default Form;

import PropTypes from 'prop-types';

import React, { useState } from 'react';
import { TwitterPicker } from 'react-color';

ColorAPI.propTypes = {
  updateColor: PropTypes.func
};

export default function ColorAPI({ updateColor }) {
  const [background, setBackground] = useState('#fff');

  const handleChangeComplete = (color) => {
    updateColor(color.hex);
    setBackground(color.hex);
  };

  return (
    <TwitterPicker color={background} onChangeComplete={handleChangeComplete} />
  );
}

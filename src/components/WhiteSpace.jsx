import React from 'react';

export default ({ size }) => {
  let marginTop = 32;
  switch (size) {
    case 'xs': { marginTop = 8; break; }
    case 'sm': { marginTop = 16; break; }
    case 'md': { marginTop = 24; break; }
    case 'lg': { marginTop = 32; break; }
    default: { marginTop = 16; break; }
  }
  return <div style={{ marginTop }}/>;
}

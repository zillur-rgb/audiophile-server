const info = async (...params) => console.log(...params);

const error = async (...params) => console.error(...params);

module.exports = {
  info,
  error,
};

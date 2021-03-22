/**
 * DevConsole module provide simple logging into the console
 * when `__DEV__` is set to true.
 *
 * @module devConsole
 *
 */
const devConsole = {
  /**
   * Function log to the console given message if `__DEV__`
   * is set to `true`.
   *
   * @function log
   * @param {any=} message message to by logged to the console
   * @returns {undefined}
   */
  log: (message) => {
    if (process.env.NODE_ENV === "development") {
      console.log(message);
    }
  },
};

export default devConsole;

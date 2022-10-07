

class Logger {
  get now() {
    return Intl.DateTimeFormat("be-BE", {
      minute: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      month: "2-digit",
      year: "numeric",
      second: "2-digit",
    }).format(Date.now());
  }

  /**
   * @param {string} type
   * @param {string} error
   */
  error(type, error) {
    const err = error instanceof Error ? error.message : error;
    return console.error(`${chalk.red("[ERROR]")}-[${this.now}]: ${err}`);
  }

  /**
   * @param {string} type
   * @param {string} warning
   */
  warn(type, warning) {
    return console.warn(`${chalk.yellow("[WARNING]")}-[${this.now}]: ${warning}`);
  }

  /**
   * @param {string} type
   * @param {string} content
   */
  info(type, content) {
    return console.log(`${chalk.blueBright("[INFO]")}-[${this.now}]: ${content}`);
  }

  /**
   * @param {string} type
   * @param {string} text
   */
  debug(type, text) {
    return console.log(`${chalk.green("[DEBUG]")}-[${this.now}]: ${text}`);
  }
}

module.exports = new Logger();
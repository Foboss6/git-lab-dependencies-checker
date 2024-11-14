/**
 * Logger.
 * Writes messages to the console in stringified format.
 * It has the levels: info, success, warn, error, debug.
 */
export const logger = {
  info: (message: string) => console.log(`[INFO]: ${message}`),
  success: (message: string) => console.log(`\x1b[32m${`[SUCCESS]: ${message}`}\x1b[0m`),
  warn: (message: string) => console.log(`\x1b[33m${`[WARN]: ${message}`}\x1b[0m`),
  error: (message: string) => console.log(`\x1b[31m${`[ERROR]: ${message}`}\x1b[0m`),
  debug: (message: string) => process.env.IS_DEBUG && console.log(`\x1b[34m${`[DEBUG]: ${message}`}\x1b[0m`),
};

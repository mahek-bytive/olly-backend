// src/utils/logger.ts
import {
  createLogger, transports, format, Logger,
} from 'winston';

const logConfiguration = {
  transports: [
    new transports.File({
      filename: 'logs/error.log',
      level: 'error',
      format: format.combine(format.timestamp(), format.json()),
    }),
    new transports.File({
      filename: 'logs/combined.log',
      format: format.combine(format.timestamp(), format.json()),
    }),
    new transports.Console({
      level: 'info',
      format: format.combine(format.colorize(), format.simple()),
    }),
  ],
};

const logger: Logger = createLogger(logConfiguration);

export const logInfo = (message: string): void => {
  logger.info(message);
};

export const logError = (message: string): void => {
  logger.error(message);
};

export const logWarn = (message: string): void => {
  logger.warn(message);
};

export const logDebug = (message: string): void => {
  logger.debug(message);
};

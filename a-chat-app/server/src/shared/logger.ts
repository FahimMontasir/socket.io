import path from 'path';
import { createLogger, format, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import configs from '../configs';

const { combine, timestamp, label, printf } = format;

const customFormat = printf(({ level, message, label, timestamp }) => {
  const date = new Date(timestamp);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  return `${level}: [${date.toDateString()} ${hours}:${minutes}:${seconds}] ${label}: ${message}`;
});

const isProduction = configs.env === 'production';

const logger = createLogger({
  level: 'info',
  format: combine(format.colorize(), label({ label: 'CHAT' }), timestamp(), customFormat),
  transports: [new transports.Console()],
  exitOnError: false,
});

const errorLogger = createLogger({
  level: 'error',
  format: combine(format.colorize(), label({ label: 'CHAT-ERROR' }), timestamp(), customFormat),
  transports: [
    isProduction
      ? new DailyRotateFile({
          filename: path.join(process.cwd(), 'logs', 'errors', 'chat-%DATE%-error.log'),
          datePattern: 'YYYY-DD-MM-HH',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d',
        })
      : new transports.Console(),
  ],
  exitOnError: false,
});

export { logger, errorLogger };

const { winston, loggers, transports, format } = require('winston');

var transportsArray = [
  new transports.File({ filename: 'error.log', level: 'error' }),
  new transports.File({ filename: 'combined.log' }),
];

if (process.env.NODE_ENV !== 'production') {
  transportsArray.push(
    new transports.Console({
      format: format.combine(
        format.timestamp(),
        format.colorize(),
        format.simple()
      ),
    })
  );
}

const logger = loggers.add('logger', {
  level: 'info',
  format: format.combine(format.timestamp(), format.json()),
  transports: transportsArray,
});

logger.info('Successfully started the monkey Winston!');

module.exports = logger;

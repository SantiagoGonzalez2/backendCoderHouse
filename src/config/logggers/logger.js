import winston from "winston";




// Logger para dev
export const developmentLogger = winston.createLogger({
    levels: {
      debug: 0,
      http: 1,
      info: 2,
      warning: 3,
      error: 4,
      fatal: 5
    },
    transports: [
      new winston.transports.Console({ level: "fatal" })
    ]
  });

// Logger para producción
export const productionLogger = winston.createLogger({
    levels: {
      debug: 0,
      http: 1,
      info: 2,
      warning: 3,
      error: 4,
      fatal: 5
    },
    transports: [
        new winston.transports.File({
          level: "error", 
          filename: "./src/logs/error.log", 
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json()
          )
        })
      ],
    level: "info" 
  });
  



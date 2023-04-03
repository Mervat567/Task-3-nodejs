const winston = require('winston');


//date+logger level+message

const dateFormat=()=>{
    return new Date(Date.now()).toLocaleString()
}

class loggerService{
    constructor(folder,fileName){
    this.fileName=fileName
    const logger = winston.createLogger({
        level: 'info',
        format: winston.format.printf(info=>{
            let message=`${dateFormat()} | ${info.level.toUpperCase()} |${info.message}|`
            message=info.obj?message+`date ${JSON.stringify(info.obj)} |`:message
            return message
        }),
        transports: [
          
          new winston.transports.File({ filename: `logs/${folder}/${fileName}.log`}),
        ],
      });
      this.logger=logger
    }
    async info (message){
        this.logger.log('info',message)
    }
    async info (message,obj){
        this.logger.log('info',message,{obj})
    }

    async error (message){
        this.logger.log('error',message)
    }
    async error (message,obj){
        this.logger.log('error',message,{obj})
    }

    async dubug (message){
        this.logger.log('dubug',message)
    }
    async dubug (message,obj){
        this.logger.log('dubug',message,{obj})
    }
}


module.exports=loggerService
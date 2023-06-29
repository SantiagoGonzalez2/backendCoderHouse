import { Router } from "express";
import config from "../../config/config.js";
const router = Router();



router.get('/loggerTest', (req, res) => {
    // Ejemplo de uso de diferentes niveles de log
    config.logger.debug('Este es un mensaje de log de nivel debug');
    config.logger.http('Este es un mensaje de log de nivel http');
    config.logger.info('Este es un mensaje de log de nivel info');
    config.logger.warning('Este es un mensaje de log de nivel warning');
    config.logger.error('Este es un mensaje de log de nivel error');
    config.logger.fatal('Este es un mensaje de log de nivel fatal');
  
    res.send('Logs enviados al logger');
  });
  
  export default router;
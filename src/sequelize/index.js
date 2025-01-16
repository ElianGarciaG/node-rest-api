import { Sequelize } from 'sequelize'
import logger from '../util/logger.js'

/**
 * export for configure Sequelize object connection
 */

logger.info('Inicializando MySql...')

const sequelizeMysql = new Sequelize({
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  host: process.env.MYSQL_HOST ?? 'localhost',
  port: process.env.MYSQL_PORT ?? 3306,
  dialect: 'mysql',
  dialectOptions: {
    timezone: 'Z',
  },
  logging: false,
})

export default sequelizeMysql

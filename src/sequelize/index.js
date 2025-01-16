import { Sequelize } from 'sequelize'
import logger from '../util/logger.js'

/**
 * export for configure Sequelize object connection
 */

logger.info('Inicializando MySql...')

const sequelizeMysql = new Sequelize({
  username: process.env.MYSQL_USER ?? 'petsafe_egarcia',
  password: process.env.MYSQL_PASSWORD ?? '123456789',
  database: process.env.MYSQL_DATABASE ?? 'petsafe',
  host: process.env.MYSQL_HOST ?? 'localhost',
  port: process.env.MYSQL_PORT ?? 3306,
  dialect: 'mysql',
  dialectOptions: {
    timezone: 'Z',
  },
  logging: false,
})

export default sequelizeMysql

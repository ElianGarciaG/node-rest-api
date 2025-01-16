import camelcase from 'camelcase'
import { DateTime } from 'luxon'

/*
 * Fuction to check if the *arg* parameter is empty no matter what king of type
 * the parameter arg is
 */
export const isEmpty = (arg) => {
  let isEmpty = false
  if (
    typeof arg === 'boolean' ||
    arg instanceof Date ||
    arg instanceof DateTime ||
    arg instanceof Function
  ) {
    isEmpty = false
  } else if (!arg && typeof arg !== 'number') {
    isEmpty = true
  } else if (typeof arg === 'string' || Array.isArray(arg)) {
    isEmpty = arg.length === 0
  } else if (typeof arg === 'object') {
    isEmpty = Object.keys(arg).length === 0
  }
  return isEmpty
}

export const isNVL = (arg) => {
  return arg === null || arg === undefined || arg === ''
}

// Funcion para convertir un string a camelCase
export const turnToCamelCase = (string) => {
  if (isEmpty(string) || typeof string !== 'string') {
    return string
  }

  return camelcase(string)
}

/*
 * Función para convertir un string a un numero (incluye float o integer).
 */
export const toNumber = (arg) => {
  if (isEmpty(arg) || typeof arg === 'number') {
    return arg
  }

  // Verifica si el string contiene solo números o un punto para los decimales o un signo negativo.
  if (!/^-?[0-9]+(\.[0-9]+)?$/.test(arg)) {
    return null
  }

  const number = parseFloat(arg)
  return isNaN(number) ? null : number
}

const { validateRUT, getCheckDigit } = require('validar-rut')

const rutValidated = async (rut) => {
    const result = validateRUT(rut)
    if(result === false) {
        throw new Error(`El rut '${rut}' no es válido`)
    }
}

module.exports = {
    rutValidated
}
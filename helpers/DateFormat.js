
const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio','Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
const days   = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado']

const getDayMonthYear = ( newDate ) => {

    return {
        day: newDate.getDate(),
        month: months[ newDate.getMonth() ],
        yearDay: `${ newDate.getFullYear() }, ${ days[ newDate.getDay() ] }`,
    }

}

module.exports = {
    getDayMonthYear
}
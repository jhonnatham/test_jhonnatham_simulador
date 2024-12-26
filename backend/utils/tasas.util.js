const diffMoth = async (fecha_inicio, fecha_fin) => {
    let months = 0
    months = (fecha_fin.getFullYear() - fecha_inicio.getFullYear()) * 12;
    months -= fecha_inicio.getMonth();
    months += fecha_fin.getMonth();
    return months <= 0 ? 1 : Number.parseFloat(months).toFixed(2);
}

const diffYear = async (fecha_inicio, fecha_fin) => {
    let months = await diffMoth(fecha_inicio, fecha_fin)
    let years = months / 12

    return Number.parseFloat(years).toFixed(2);
}

module.exports = {
    diffMoth,
    diffYear
}
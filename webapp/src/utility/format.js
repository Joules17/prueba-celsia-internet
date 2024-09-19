function formatDate(date) {
    if (!date) return '';
    const [leftPart] = date.split('T');
    return leftPart;
}

function formatMoney(money) {
    if (typeof money !== 'number') return '';
    return `$${money.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
}

export { formatDate, formatMoney };

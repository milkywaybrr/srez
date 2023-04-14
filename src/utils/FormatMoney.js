const FormatMoney = (value, sale) => {
    value = value-(value*0.2);
    return `${Intl.NumberFormat('ru-RU').format(parseInt(value))} ₽`;
}

export default FormatMoney;
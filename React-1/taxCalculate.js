function calculateTax(income) {
    const rates = [0, 0.19, 0.325, 0.37, 0.45];
    const brackets = [18200, 45000, 120000, 180000];

    let tax = 0;

    if (income <= brackets[0]) {
        tax = 0;
    } else if (income <= brackets[1]) {
        tax = (income - brackets[0]) * rates[1];
    } else if (income <= brackets[2]) {
        tax =
            (brackets[1] - brackets[0]) * rates[1] +
            (income - brackets[1]) * rates[2];
    } else if (income <= brackets[3]) {
        tax =
            (brackets[1] - brackets[0]) * rates[1] +
            (brackets[2] - brackets[1]) * rates[2] +
            (income - brackets[2]) * rates[3];
    } else {
        tax =
            (brackets[1] - brackets[0]) * rates[1] +
            (brackets[2] - brackets[1]) * rates[2] +
            (brackets[3] - brackets[2]) * rates[3] +
            (income - brackets[3]) * rates[4];
    }

    return tax;
}

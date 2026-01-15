function calculateTax(income){
    let rate = -1;
    let tax = -1;
    const rates = [0, 0.19, 0.325, 0.37, 0.45]
    const incomes = [18200, 45000, 120000, 180000]
    const taxes = [incomes[0]*rates[0], (incomes[1]-incomes[0])*rates[1], (incomes[2]-incomes[1])*rates[2], (incomes[3]-incomes[2])*rates[3]];
    if(income <= incomes[0]){
        rate = rates[0];
        tax = income * rate;
    }

    if(income <= incomes[1]){
        rate = rates[1]
        tax = (income-18200)*rate;
    }
    if (income <=incomes[2]) {
        rate = rates[2];
        tax = taxes[0]+taxes[1] + (income-45000)*rate;
    }

    if (income < income[3]) {
        rate = rates[3]
        tax = taxes[0] + taxes[1] + taxes[2] + (incomes[3]-incomes[2])*rates[2]
    }
};
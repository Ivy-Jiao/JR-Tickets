
const brackets1 = [
        { limit: 18200, rate: 0 },
        { limit: 45000, rate: 0.19 },
        { limit: 120000, rate: 0.325 },
        { limit: 180000, rate: 0.37 },
        { limit: Infinity, rate: 0.45 }
    ];

const brackets2 = [
        { limit: 19100, rate: 0 },
        { limit: 45200, rate: 0.18 },
        { limit: 120000, rate: 0.33 },
        { limit: 180000, rate: 0.37 },
        { limit: Infinity, rate: 0.45 }
    ];
    
function calculateTax1(income) {
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

// AI
function calculateTax2(brackets, income) {
    
    let tax = 0;
    let previousLimit = 0;

    for (const bracket of brackets) {
        if (income <= previousLimit) break;
        
        const taxableIncome = Math.min(income, bracket.limit) - previousLimit;
        tax += taxableIncome * bracket.rate;
        previousLimit = bracket.limit;
    }

    return tax;
}

const income = 31900;
console.log(`Income: $${income}`);
console.log(`Tax1: $${calculateTax1(income)}`);
console.log(`Tax2: $${calculateTax2(brackets1, income)}`);
console.log(`Tax2: $${calculateTax2(brackets2, income)}`);


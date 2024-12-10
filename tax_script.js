document.querySelector("#calculateTax").addEventListener("click", () => {
    const taxableIncome = document.querySelector("#taxableIncome").value;
    const calculatedTax = ((num1) => {
        const taxableIncome = parseFloat(num1);
        let taxAmount = 0;

        if (taxableIncome <= 250000) {
            taxAmount = 0;
        } else if (taxableIncome <= 400000) {
            taxAmount = (taxableIncome - 250000) * 0.20;
        } else if (taxableIncome <= 800000) {
            taxAmount = (taxableIncome - 400000) * 0.25 + 30000;
        } else if (taxableIncome <= 2000000) {
            taxAmount = (taxableIncome - 800000) * 0.30 + 130000;
        } else if (taxableIncome <= 8000000) {
            taxAmount = (taxableIncome - 2000000) * 0.32 + 490000;
        } else {
            taxAmount = (taxableIncome - 8000000) * 0.35 + 2410000;
        }

        return taxAmount;
    })(taxableIncome);

    document.querySelector("#taxResult").textContent = `Total Tax: ₱${calculatedTax.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
});

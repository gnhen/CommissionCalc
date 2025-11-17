const revenueInput = document.getElementById('revenue');
const commissionRateInput = document.getElementById('commissionRate');
const hourlyRateInput = document.getElementById('hourlyRate');
const hoursWorkedInput = document.getElementById('hoursWorked');
const customersServedInput = document.getElementById('customersServed');

const totalCommissionEl = document.getElementById('totalCommission');
const totalHourlyEl = document.getElementById('totalHourly');
const totalCombinedEl = document.getElementById('totalCombined');
const totalPerHourEl = document.getElementById('totalPerHour');
const totalPerCustomerEl = document.getElementById('totalPerCustomer');

function formatCurrency(value) {
    return '$' + value.toFixed(2);
}

function calculate() {
    const revenue = parseFloat(revenueInput.value) || 0;
    const commissionRate = parseFloat(commissionRateInput.value) || 0;
    const hourlyRate = parseFloat(hourlyRateInput.value) || 0;
    const hoursWorked = parseFloat(hoursWorkedInput.value) || 0;
    const customersServed = parseFloat(customersServedInput.value) || 0;

    const commission = revenue * (commissionRate / 100);
    totalCommissionEl.querySelector('.result-value').textContent = formatCurrency(commission);

    if (hoursWorked > 0) {
        const hourlyTotal = hourlyRate * hoursWorked;
        const combined = commission + hourlyTotal;
        const perHour = combined / hoursWorked;

        totalCombinedEl.querySelector('.result-value').textContent = formatCurrency(combined);
        totalHourlyEl.querySelector('.result-value').textContent = formatCurrency(hourlyTotal);
        totalPerHourEl.querySelector('.result-value').textContent = formatCurrency(perHour);

        totalCombinedEl.classList.remove('hidden');
        totalHourlyEl.classList.remove('hidden');
        totalPerHourEl.classList.remove('hidden');
    } else {
        totalCombinedEl.classList.add('hidden');
        totalHourlyEl.classList.add('hidden');
        totalPerHourEl.classList.add('hidden');
    }

    if (customersServed > 0) {
        const perCustomer = commission / customersServed;
        totalPerCustomerEl.querySelector('.result-value').textContent = formatCurrency(perCustomer);
        totalPerCustomerEl.classList.remove('hidden');
    } else {
        totalPerCustomerEl.classList.add('hidden');
    }
}

revenueInput.addEventListener('input', calculate);
commissionRateInput.addEventListener('input', calculate);
hourlyRateInput.addEventListener('input', calculate);
hoursWorkedInput.addEventListener('input', calculate);
customersServedInput.addEventListener('input', calculate);

calculate();
const revenueInput = document.getElementById('revenue');
const commissionRateInput = document.getElementById('commissionRate');
const hourlyRateInput = document.getElementById('hourlyRate');
const hoursWorkedInput = document.getElementById('hoursWorked');
const customersServedInput = document.getElementById('customersServed');
const servicePlansToggle = document.getElementById('servicePlansToggle');
const servicePlansInputs = document.getElementById('servicePlansInputs');
const servicePlansRevenueInput = document.getElementById('servicePlansRevenue');
const servicePlansAmountInput = document.getElementById('servicePlansAmount');
const salesCommissionRateInput = document.getElementById('salesCommissionRate');

const totalCommissionEl = document.getElementById('totalCommission');
const totalHourlyEl = document.getElementById('totalHourly');
const totalCombinedEl = document.getElementById('totalCombined');
const totalPerHourEl = document.getElementById('totalPerHour');
const totalPerCustomerEl = document.getElementById('totalPerCustomer');
const totalSalesCommissionEl = document.getElementById('totalSalesCommission');
const totalCommissionPerPlanEl = document.getElementById('totalCommissionPerPlan');

let servicePlansVisible = false;

function formatCurrency(value) {
    return '$' + value.toFixed(2);
}

function calculate() {
    const revenue = parseFloat(revenueInput.value) || 0;
    const commissionRate = parseFloat(commissionRateInput.value) || 0;
    const hourlyRate = parseFloat(hourlyRateInput.value) || 0;
    const hoursWorked = parseFloat(hoursWorkedInput.value) || 0;
    const customersServed = parseFloat(customersServedInput.value) || 0;
    const servicePlansRevenue = parseFloat(servicePlansRevenueInput.value) || 0;
    const servicePlansAmount = parseFloat(servicePlansAmountInput.value) || 0;
    const salesCommissionRate = parseFloat(salesCommissionRateInput.value) || 0;

    const commission = revenue * (commissionRate / 100);
    const salesCommission = servicePlansRevenue * (salesCommissionRate / 100);
    
    totalCommissionEl.querySelector('.result-value').textContent = formatCurrency(commission);

    // Hourly calculations - only show when hours worked is entered
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

    // Per customer calculation - only show when customers served is entered
    if (customersServed > 0) {
        const perCustomer = commission / customersServed;
        totalPerCustomerEl.querySelector('.result-value').textContent = formatCurrency(perCustomer);
        totalPerCustomerEl.classList.remove('hidden');
    } else {
        totalPerCustomerEl.classList.add('hidden');
    }

    // Service plans calculations - moved to bottom and only show when service plans is visible and data is entered
    if (servicePlansVisible) {
        // Show sales commission if service plans revenue is entered
        if (servicePlansRevenue > 0) {
            totalSalesCommissionEl.querySelector('.result-value').textContent = formatCurrency(salesCommission);
            totalSalesCommissionEl.classList.remove('hidden');
        } else {
            totalSalesCommissionEl.classList.add('hidden');
        }

        // Show commission per plan if both service plans amount and revenue are entered
        if (servicePlansAmount > 0 && servicePlansRevenue > 0) {
            const commissionPerPlan = salesCommission / servicePlansAmount;
            totalCommissionPerPlanEl.querySelector('.result-value').textContent = formatCurrency(commissionPerPlan);
            totalCommissionPerPlanEl.classList.remove('hidden');
        } else {
            totalCommissionPerPlanEl.classList.add('hidden');
        }
    } else {
        totalSalesCommissionEl.classList.add('hidden');
        totalCommissionPerPlanEl.classList.add('hidden');
    }
}

servicePlansToggle.addEventListener('click', function() {
    servicePlansVisible = !servicePlansVisible;
    if (servicePlansVisible) {
        servicePlansInputs.classList.remove('hidden');
        servicePlansToggle.textContent = 'Hide Service Plans';
    } else {
        servicePlansInputs.classList.add('hidden');
        servicePlansToggle.textContent = 'Include Service Plans';
    }
    calculate();
});

revenueInput.addEventListener('input', calculate);
commissionRateInput.addEventListener('input', calculate);
hourlyRateInput.addEventListener('input', calculate);
hoursWorkedInput.addEventListener('input', calculate);
customersServedInput.addEventListener('input', calculate);
servicePlansRevenueInput.addEventListener('input', calculate);
servicePlansAmountInput.addEventListener('input', calculate);
salesCommissionRateInput.addEventListener('input', calculate);

calculate();
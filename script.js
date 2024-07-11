document.addEventListener('DOMContentLoaded', () => {
    const currentYear = new Date().getFullYear();
    const startYearSelect = document.getElementById('start-year');
    for (let year = currentYear; year >= 2010; year--) {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        startYearSelect.appendChild(option);
    }
});

function calculateBitcoin() {
    const coffeePrice = parseFloat(document.getElementById('coffee-price').value);
    const coffeesPerWeek = parseInt(document.getElementById('coffees-per-week').value);
    const startMonth = parseInt(document.getElementById('start-month').value);
    const startYear = parseInt(document.getElementById('start-year').value);
    const currency = document.getElementById('currency').value;
    const currencySymbols = {
        'USD': '$',
        'GBP': '£',
        'EUR': '€'
    };
    const bitcoinLogo = '<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/20px-Bitcoin.svg.png" alt="Bitcoin Logo">';

    if (isNaN(coffeePrice) || isNaN(coffeesPerWeek) || isNaN(startMonth) || isNaN(startYear) || coffeePrice <= 0 || coffeesPerWeek <= 0) {
        document.getElementById('result').innerText = "Please enter valid values.";
        return;
    }

    const startDate = new Date(startYear, startMonth - 1, 1);
    const currentDate = new Date();
    const totalDays = Math.floor((currentDate - startDate) / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(totalDays / 7);
    const totalSpent = coffeePrice * coffeesPerWeek * weeks;

    // Fetch historical Bitcoin prices and calculate accumulated Bitcoin
    fetch(`https://api.coindesk.com/v1/bpi/historical/close.json?currency=${currency}&start=${startDate.toISOString().split('T')[0]}&end=${currentDate.toISOString().split('T')[0]}`)
        .then(response => response.json())
        .then(data => {
            const prices = data.bpi;
            let totalBitcoin = 0;
            Object.keys(prices).forEach(date => {
                const weeklySpend = coffeePrice * coffeesPerWeek;
                totalBitcoin += weeklySpend / prices[date];
            });

            document.getElementById('result').innerHTML = `
                You spent this much on ☕️: ${currencySymbols[currency]}${totalSpent.toLocaleString()}<br>
                If you invested it in ${bitcoinLogo}: ${totalBitcoin.toFixed(6)}
            `;
        })
        .catch(error => {
            console.error('Error fetching historical Bitcoin prices:', error);
            document.getElementById('result').innerText = "Error fetching Bitcoin prices.";
        });
}

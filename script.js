document.addEventListener('DOMContentLoaded', fetchBitcoinPrice);

function fetchBitcoinPrice() {
    fetch('https://api.coindesk.com/v1/bpi/currentprice/BTC.json')
        .then(response => response.json())
        .then(data => {
            const btcPrice = data.bpi.USD.rate_float;
            document.getElementById('btc-price').value = btcPrice.toFixed(2);
        })
        .catch(error => {
            console.error('Error fetching Bitcoin price:', error);
            document.getElementById('btc-price').placeholder = 'Error fetching price';
        });
}

function calculateBitcoinExpense() {
    const expense = parseFloat(document.getElementById('expense').value);
    const btcPrice = parseFloat(document.getElementById('btc-price').value);
    const projection = parseInt(document.getElementById('projection').value);
    const growthRate = parseFloat(document.getElementById('growth-rate').value) / 100;

    if (isNaN(expense) || isNaN(btcPrice) || isNaN(projection) || isNaN(growthRate) || expense <= 0 || btcPrice <= 0 || projection <= 0) {
        document.getElementById('result').innerText = "Please enter valid values.";
        return;
    }

    const btcExpense = expense / btcPrice;
    const monthlyGrowthRate = Math.pow(1 + growthRate, 1 / 12) - 1;

    const futureBtcPrices = [];
    const futureExpenses = [];
    let futureBtcPrice = btcPrice;
    for (let i = 0; i < projection; i++) {
        futureBtcPrice *= (1 + monthlyGrowthRate);
        futureBtcPrices.push(futureBtcPrice.toFixed(2));
        futureExpenses.push((expense / futureBtcPrice).toFixed(6));
    }

    document.getElementById('result').innerText = `Current Bitcoin expense: ${btcExpense.toFixed(6)} BTC`;

    // Generate chart
    const ctx = document.getElementById('expenseChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from({length: projection}, (_, i) => i + 1),
            datasets: [{
                label: 'Future Bitcoin Price (USD)',
                data: futureBtcPrices,
                borderColor: 'rgba(75, 192, 192, 1)',
                fill: false,
                yAxisID: 'y1',
            }, {
                label: 'Future Expense in Bitcoin',
                data: futureExpenses,
                borderColor: 'rgba(153, 102, 255, 1)',
                fill: false,
                yAxisID: 'y2',
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    id: 'y1',
                    type: 'linear',
                    position: 'left',
                    scaleLabel: {
                        display: true,
                        labelString: 'Bitcoin Price (USD)'
                    }
                }, {
                    id: 'y2',
                    type: 'linear',
                    position: 'right',
                    scaleLabel: {
                        display: true,
                        labelString: 'Expense in Bitcoin (BTC)'
                    },
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}

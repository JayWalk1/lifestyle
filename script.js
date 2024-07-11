function calculateBitcoin() {
    const coffeePrice = parseFloat(document.getElementById('coffee-price').value);
    const coffeesPerWeek = parseInt(document.getElementById('coffees-per-week').value);
    const startDate = new Date(document.getElementById('start-date').value);

    if (isNaN(coffeePrice) || isNaN(coffeesPerWeek) || isNaN(startDate.getTime()) || coffeePrice <= 0 || coffeesPerWeek <= 0) {
        document.getElementById('result').innerText = "Please enter valid values.";
        return;
    }

    const currentDate = new Date();
    const totalDays = Math.floor((currentDate - startDate) / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(totalDays / 7);
    const totalSpent = coffeePrice * coffeesPerWeek * weeks;

    // Fetch historical Bitcoin prices and calculate accumulated Bitcoin
    fetch(`https://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate.toISOString().split('T')[0]}&end=${currentDate.toISOString().split('T')[0]}`)
        .then(response => response.json())
        .then(data => {
            const prices = data.bpi;
            let totalBitcoin = 0;
            Object.keys(prices).forEach(date => {
                const weeklySpend = coffeePrice * coffeesPerWeek;
                totalBitcoin += weeklySpend / prices[date];
            });
            document.getElementById('result').innerText = `If you had invested in Bitcoin instead of buying coffee, you would have ${totalBitcoin.toFixed(6)} BTC worth approximately $${(totalBitcoin * prices[Object.keys(prices).pop()]).toFixed(2)} today.`;
        })
        .catch(error => {
            console.error('Error fetching historical Bitcoin prices:', error);
            document.getElementById('result').innerText = "Error fetching Bitcoin prices.";
        });
}

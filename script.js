const bitcoinPricesUSD = {
    '2014-01': 815.28, '2014-02': 562.84, '2014-03': 458.38, '2014-04': 448.50, '2014-05': 580.11, '2014-06': 598.19, '2014-07': 622.25, '2014-08': 520.04, '2014-09': 410.06, '2014-10': 338.15, '2014-11': 378.05, '2014-12': 314.43,
    '2015-01': 216.69, '2015-02': 255.92, '2015-03': 254.24, '2015-04': 238.39, '2015-05': 223.58, '2015-06': 259.72, '2015-07': 294.76, '2015-08': 229.29, '2015-09': 236.49, '2015-10': 312.34, '2015-11': 326.73, '2015-12': 430.77,
    '2016-01': 431.13, '2016-02': 437.89, '2016-03': 415.15, '2016-04': 447.50, '2016-05': 531.14, '2016-06': 625.62, '2016-07': 659.25, '2016-08': 576.48, '2016-09': 610.12, '2016-10': 683.04, '2016-11': 710.14, '2016-12': 951.39,
    '2017-01': 968.23, '2017-02': 1176.38, '2017-03': 1164.45, '2017-04': 1346.55, '2017-05': 2324.77, '2017-06': 2483.75, '2017-07': 2729.94, '2017-08': 4580.13, '2017-09': 4367.56, '2017-10': 5738.52, '2017-11': 9891.68, '2017-12': 14291.26,
    '2018-01': 10425.33, '2018-02': 10356.76, '2018-03': 8898.41, '2018-04': 9355.67, '2018-05': 7570.43, '2018-06': 6327.27, '2018-07': 7690.36, '2018-08': 7082.06, '2018-09': 6596.94, '2018-10': 6360.54, '2018-11': 4293.50, '2018-12': 3837.73,
    '2019-01': 3456.01, '2019-02': 3673.74, '2019-03': 4096.08, '2019-04': 5256.99, '2019-05': 8690.82, '2019-06': 10808.77, '2019-07': 9505.11, '2019-08': 9478.00, '2019-09': 8285.05, '2019-10': 9189.07, '2019-11': 7572.19, '2019-12': 7408.54,
    '2020-01': 9302.79, '2020-02': 8571.04, '2020-03': 6403.36, '2020-04': 8720.54, '2020-05': 9456.76, '2020-06': 9142.10, '2020-07': 11368.01, '2020-08': 11713.28, '2020-09': 10778.39, '2020-10': 13787.92, '2020-11': 18002.22, '2020-12': 28979.21,
    '2021-01': 33472.00, '2021-02': 45490.52, '2021-03': 58958.84, '2021-04': 57620.62, '2021-05': 37892.12, '2021-06': 35505.92, '2021-07': 41849.97, '2021-08': 47011.64, '2021-09': 43823.68, '2021-10': 61492.84, '2021-11': 57230.39, '2021-12': 47728.22,
    '2022-01': 37669.04, '2022-02': 43340.40, '2022-03': 45257.57, '2022-04': 40197.17, '2022-05': 31731.17, '2022-06': 20284.96, '2022-07': 23421.99, '2022-08': 19941.19, '2022-09': 19244.88, '2022-10': 20567.97, '2022-11': 16534.40, '2022-12': 16537.96,
    '2023-01': 23202.93, '2023-02': 23280.08, '2023-03': 28520.36, '2023-04': 29029.71, '2023-05': 27705.59, '2023-06': 30527.75, '2023-07': 29565.36, '2023-08': 29173.71, '2023-09': 26842.50, '2023-10': 34552.11, '2023-11': 38712.32, '2023-12': 44765.93,
    '2024-01': 48570.39, '2024-02': 51823.48, '2024-03': 55245.60, '2024-04': 58427.29, '2024-05': 60581.54, '2024-06': 62534.29, '2024-07': 64580.60, '2024-08': 63050.60, '2024-09': 59000.00, '2024-10': 61000.00, '2024-11': 70000.00
};

function calculateBitcoin() {
    const coffeePrice = parseFloat(document.getElementById('coffee-price').value);
    const coffeesPerWeek = parseInt(document.getElementById('coffees-per-week').value);
    const startYear = parseInt(document.getElementById('start-year').value);
    const startMonth = parseInt(document.getElementById('start-month').value) - 1;
    const currencySymbol = '$';
    const bitcoinSymbol = '₿';

    if (isNaN(coffeePrice) || isNaN(coffeesPerWeek) || isNaN(startYear) || isNaN(startMonth) || coffeePrice <= 0 || coffeesPerWeek <= 0) {
        document.getElementById('result').innerText = "Please enter valid values.";
        return;
    }

    const startDate = new Date(startYear, startMonth);
    const currentDate = new Date();
    const totalDays = Math.floor((currentDate - startDate) / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(totalDays / 7);
    const totalSpent = coffeePrice * coffeesPerWeek * weeks;

    let totalBitcoin = 0;

   // Loop through each month from the start date to the end date
    let dateIterator = new Date(startDate);
    while (dateIterator <= currentDate) {
        const monthKey = `${dateIterator.getFullYear()}-${String(dateIterator.getMonth() + 1).padStart(2, '0')}`;
        const price = bitcoinPricesUSD[monthKey];
        if (price) {
            const weeklySpend = coffeePrice * coffeesPerWeek;
            totalBitcoin += (weeklySpend * 4) / price; // assuming 4 weeks in a month
        } else {
            document.getElementById('result').innerText = "Error fetching Bitcoin prices.";
            return;
        }
        // Move to the next month
        dateIterator.setMonth(dateIterator.getMonth() + 1);
    }

    const lastMonthKey = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}`;
    const lastPrice = bitcoinPricesUSD[lastMonthKey];
    const totalValue = totalBitcoin * lastPrice;

    document.getElementById('result').innerHTML = `
        You spent this much on ☕️: ${currencySymbol}${totalSpent.toLocaleString()}<br>
        If you invested it in Bitcoin: ${totalBitcoin.toFixed(6)} ${bitcoinSymbol} worth approximately ${currencySymbol}${totalValue.toLocaleString()}
    `;
}

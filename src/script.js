// Function to fetch currencies from the API and populate the dropdowns
function populateCurrencies() {
    fetch("https://api.exchangerate-api.com/v4/latest/USD")
        .then(response => response.json())
        .then(data => {
            const currencies = Object.keys(data.rates);
            const dropdowns = document.querySelectorAll('select');
            currencies.forEach(currency => {
                dropdowns.forEach(dropdown => {
                    const option = document.createElement('option');
                    option.value = currency;
                    option.textContent = currency;
                    dropdown.appendChild(option);
                });
            });
        })
        .catch(error => {
            console.log('Error:', error);
        });
}

// Function to convert currencies
function convert() {
    const amount = document.getElementById('amount').value;
    const from = document.getElementById('from').value;
    const to = document.getElementById('to').value;

    fetch(`https://api.exchangerate-api.com/v4/latest/${from}`)
        .then(response => response.json())
        .then(data => {
            const rate = data.rates[to];
            const result = amount * rate;
            document.getElementById('result').innerHTML = `${amount} ${from} = ${result.toFixed(2)} ${to}`;
        })
        .catch(error => {
            console.log('Error:', error);
        });
}

function reset() {
    document.getElementById('amount').value = '';
    document.getElementById('result').innerHTML = '';
}

// Call the populateCurrencies function when the page loads
window.onload = populateCurrencies;

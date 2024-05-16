<script>
  import { onMount } from 'svelte';
  let fromCurrency = 'USD';
  let toCurrency = 'EUR';
  let amountToConvert = '1';
  let convertedAmount = '0';
  let rates = {};

  const fetchRates = async (base = 'USD') => {
    const res = await fetch(`https://api.exchangerate-api.com/v4/latest/${base}`);
    const data = await res.json();
    rates = data.rates;
  };

  const convertCurrency = (direction = 'forward') => {
    if (direction === 'forward') {
      convertedAmount = (parseFloat(amountToConvert) * rates[toCurrency]).toFixed(2);
    } else {
      amountToConvert = (parseFloat(convertedAmount) / rates[toCurrency]).toFixed(2);
    }
  };

  onMount(async () => {
    await fetchRates(fromCurrency);
    convertCurrency();
  });
</script>

<div>
  <input type="number" bind:value={amountToConvert} on:input="{() => convertCurrency('forward')}" min="0">
  <select bind:value={fromCurrency} on:change="{async () => { await fetchRates(fromCurrency); convertCurrency(); }}">
    {#each Object.keys(rates) as currency}
      <option>{currency}</option>
    {/each}
  </select>
  <span>=</span>
  <input type="number" bind:value={convertedAmount} on:input="{() => convertCurrency('backward')}" min="0">
  <select bind:value={toCurrency} on:change="{()=>convertCurrency()}">
    {#each Object.keys(rates) as currency}
      <option>{currency}</option>
    {/each}
  </select>
</div>

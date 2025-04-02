 //Global variavel 
 const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';


 //Carregamento de dados 
 const cities = [];
     fetch(endpoint)
     .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
     })
    //  .then(blob => blob.json())
     .then(data => cities.push(...data))
 
 //Filtragem de dados
 function findMatches(wordToMatch, cities) {
     return cities.filter(place => {
         // verificar se escrita bate com as cidades e estados dos EUA 
         const regex = new RegExp(wordToMatch, 'gi');
         return place.city.match(regex) || place.state.match(regex);
     });
 }
 //Formatação de numeros
 function numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
 }

 //Ajuste nas chamadas a Api reduzindo o tempo de resposta
 function debounce(func, wait = 200) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(this, args);
        }, wait);
    }
 }

 //Exibir resultados
 function displayMatches() {
     const matchArray = findMatches(this.value, cities);
     const html = matchArray.map(place => {
         const regex = new RegExp(this.value, 'gi');
         const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`);
         const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`);
         return `
             <li>
                 <span class="name">${cityName}, ${stateName}</span>
                 <span class="population">${numberWithCommas(place.population)}</span>
             </li>
         `;
     }).join('');
     suggestions.innerHTML = html;        
 }

 const searchInput = document.querySelector('.search');
 const suggestions = document.querySelector('.suggestions');

 searchInput.addEventListener('input', debounce(displayMatches)); //eventos que são disparados apos mudanças e tecla


async function getData() {
    const response = await fetch('https://api.pokemontcg.io/v2/cards?q=name:pikachu');
    const data = await response.json();
    renderTable(data.data)
}


function renderTable(pika) {
    const tableColumns = ['Image', 'Set Name', 'Set Symbol', 'Cardmarket link', 'Collected?'];
    const tableData = [];
    for (let i = 0; i < pika.length; i++) {
        const pikaArray = [];
        pikaArray.push(gridjs.html('<img style="max-width: 300px; max-height: 250px" src="'+ pika[i].images.small + '" alt="Pika"></img>'));
        pikaArray.push(pika[i].set.name);
        pikaArray.push(gridjs.html('<img style="max-width: 50px; max-height: 50px" src="'+ pika[i].set.images.symbol + '" alt="Pika"></img>'));
        if (pika[i].cardmarket) {
           pikaArray.push(gridjs.html('<a href="' + pika[i].cardmarket.url + '" target="_blank">MKM Link</a>'))
        } else {
            pikaArray.push('Link Coming Soon')
        }
        pikaArray.push(gridjs.html('<input type="checkbox"></input>'))

        tableData.push(pikaArray);
    }



    new gridjs.Grid({
        columns: tableColumns,
        data: tableData,
        search: true,
        sort: true,
        pagination: {
            limit: 15,
            summary: false
          }
    }).render(document.getElementById('mytable'));
}

getData();
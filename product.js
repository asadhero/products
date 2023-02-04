
// Practice-------

document.getElementById('error-message').style.display = 'none';
const searchFood = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // Clear data 
    searchField.value = '';
    document.getElementById('error-message').style.display = 'none';
    if (searchText == '') {
        const warningField = document.getElementById('warning');
        warningField.innerHTML = `<p class="text-danger">Please write something to display</p>`;
    }
    else {
        // Load data
        const url = `https://panel.supplyline.network/api/product/search-suggestions/?limit=100&offset=100${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchReult(data.data.products.results))
            .catch(error => displayError(error));
    }

}


const displayError = error => {
    document.getElementById('error-message').style.display = 'block';
}

const displaySearchReult = products => {

    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';

    if (products.length == 0) {
        // No result found
        const warningField = document.getElementById('warning');
        warningField.innerHTML = `<h1>No result found</h1>`;
    }

    products.forEach(product => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <div class="card h-100">
                <img src="${product.image}" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">${product.product_name}</h5>
                  <h4 class="card-text text-danger">Price: ${product.charge.current_charge} Tk</h4>
                </div>
            </div>`;
        searchResult.appendChild(div);
    })


}

let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let count = document.getElementById('count');
let category = document.getElementById('category');
let total = document.getElementById('total')
let submit = document.getElementById('submit');
let mood = 'create';
let temp;
let searchmode = '';
function getdata() {
    if (price.value != '') {
        let result = +price.value + +taxes.value + +ads.value - +discount.value;
        total.innerText = result;
        total.style.background = '#040';
    }
    else {
        total.innerText = '';
        total.style.background = "#a00d02";
    }
}

let product_data;
if (localStorage.product != null) {
    product_data = JSON.parse(localStorage.product);
}
else {
    product_data = [];
}
showdata();

function cleardata() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    count.value = '';
    category.value = '';
    total.innerText = '';
    submit.value = '';
}
submit.onclick = function () {
    product = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        count: count.value,
        category: category.value,
        total: total.innerText
    }
    if (title.value != "" && category.value != '' && price.value != "" && count.value < 100) {
        if (mood == 'create') {
            if (count.value > 0) {
                for (let i = 0; i < count.value; i++) {
                    product_data.push(product);
                }
            }
            else {
                product_data.push(product);
            }
        }
        else {
            product_data[temp] = product;
            submit.innerText = "Create";
            count.style.display = 'block';
            mood = 'create';
        }
        cleardata();
    }

    localStorage.setItem('product', JSON.stringify(product_data));
    showdata();
}
function showdata() {
    let table = '';
    for (let i = 0; i < product_data.length; i++) {
        table += `
        <tr>
        <td>${ i }</td>
        <td>${ product_data[i].title }</td>
        <td>${ product_data[i].price }</td >
        <td>${ product_data[i].taxes }</td >
        <td>${ product_data[i].ads }</td >
        <td>${ product_data[i].discount }</td >
        <td>${ product_data[i].total }</td >
        <td>${ product_data[i].category }</td >
        <td><button onclick = "uppdateproduct(${ i })" id="update">update</button></td>
        <td><button onclick = "deletedata(${ i })" id="delete">delete</button></td>
        </tr >
        `
    }
    let btndelete = document.getElementById('deleteall');
    if (product_data.length > 0) {
        btndelete.innerHTML = `<button onclick = "deleteall()">Delete All(${ product_data.length })</button>`;
    }
    else {
        btndelete.innerHTML = '';
    }
    document.getElementById('tbody').innerHTML = table;

}

function deleteall() {
    localStorage.clear();
    product_data.splice(0);
    showdata();
}


function deletedata(i) {
    product_data.splice(i, 1);
    localStorage.product = JSON.stringify(product_data);
    showdata();
}

function uppdateproduct(i) {
    title.value = product_data[i].title;
    taxes.value = product_data[i].taxes;
    price.value = product_data[i].price;
    ads.value = product_data[i].ads;
    discount.value = product_data[i].discount;
    category.value = product_data[i].category;
    getdata();
    submit.innerText = "Update";
    mood = 'update';
    temp = i;
    count.style.display = 'none'
}

function search(id) {
    document.getElementById('search').style.display = "block";
    if (id == 'search-title') {
        searchmode = id;
        document.getElementById('search').placeholder = 'Search By Title'
    }
    else {
        searchmode = id;
        document.getElementById('search').placeholder = 'Search By Category'
    }
    document.getElementById('search').focus();
    document.getElementById('search').value = '';
    showdata();
}

function Sear(value) {
    let newvalue = value.toLowerCase();
    let newtitle = '';
    let newcategory = '';
    let table = '';
    for (let i = 0; i < product_data.length; i++) {
        if (searchmode == 'search-title') {
            newtitle = product_data[i].title.toLowerCase();
            if (newtitle.includes(newvalue)) {
                table += `
            <tr>
                <td>${ i }</td>
                <td>${ product_data[i].title }</td>
                <td>${ product_data[i].price }</td >
                <td>${ product_data[i].taxes }</td >
                <td>${ product_data[i].ads }</td >
                <td>${ product_data[i].discount }</td >
                <td>${ product_data[i].total }</td >
                <td>${ product_data[i].category }</td >
                <td><button onclick = "uppdateproduct(${ i })" id="update">update</button></td>
                <td><button onclick = "deletedata(${ i })" id="delete">delete</button></td>
            </tr >
            `
            }
        }
        else {
            newcategory = product_data[i].category.toLowerCase();
            if (newcategory.includes(newvalue)) {
                table += `
            <tr>
                <td>${ i }</td>
                <td>${ product_data[i].title }</td>
                <td>${ product_data[i].price }</td >
                <td>${ product_data[i].taxes }</td >
                <td>${ product_data[i].ads }</td >
                <td>${ product_data[i].discount }</td >
                <td>${ product_data[i].total }</td >
                <td>${ product_data[i].category }</td >
                <td><button onclick = "uppdateproduct(${ i })" id="update">update</button></td>
                <td><button onclick = "deletedata(${ i })" id="delete">delete</button></td>
            </tr >
            `
            }
        }
    }
    document.getElementById('tbody').innerHTML = table;
}

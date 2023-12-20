let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let adds = document.getElementById("adds");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let searchInput = document.getElementById("searchInput");
let mode = "create";
let tempIndex;

function getTotal(){
    if(price.value){
        total.style.backgroundColor="green";
        total.innerHTML=(+price.value+ +taxes.value+ +adds.value)- +discount.value; 
    }
    else{
        total.style.backgroundColor="red";
        total.innerHTML="0.00";
    }
}
let products;
if (localStorage.ProductList !=null) {
    products = JSON.parse(localStorage.ProductList);
} else {
    products=[];
}
submit.addEventListener("click",function() {
    let newProduct = {
        title:title.value,
        price:price.value,
        taxes:taxes.value,
        adds:adds.value,
        discount:discount.value,
        count:count.value,
        total:total.innerHTML,
        category:category.value,
    }
    if (mode=="create") {
        for (let i = 0; i < newProduct.count; i++) {
            products.push(newProduct);        
        }
    } else {
        products[tempIndex]=newProduct;
        mode="create";
        count.style.display = "block";
        submit.style.backgroundColor="orange";
        submit.innerHTML="Create";
    }
    
    localStorage.setItem('ProductList',JSON.stringify(products)); 
    console.log(products);
    appendData(products);
    clearData();
});

 
function appendData(p) {
    let table = '';
    for (let i = 0; i < p.length; i++) {
        table = table + `
        <tr>
            <td>${i + 1}</td>
            <td>${p[i].title}</td>
            <td>${p[i].price}</td>
            <td>${p[i].taxes}</td>
            <td>${p[i].adds}</td>
            <td>${p[i].discount}</td>
            <td>${p[i].total}</td>
            <td>${p[i].category}</td>
            <td><button onclick="updateData(${i})">Update</button></td>
            <td><button onclick="deleteData(${i})">Delete</button></td>                
        </tr>
        `;
    }
    let deleteAllDiv = document.getElementById("deleteAll");
    if (p.length>0) {
        deleteAllDiv.innerHTML=`<button onclick="deleteAllData()">Delete All(${p.length})</button>`
    } else {
        deleteAllDiv.innerHTML=""; 
    }
    let TableBody= document.getElementById("tbody");
    TableBody.innerHTML = table;
}

function clearData(){
    title.value='';
    price.value='';
    taxes.value='';
    adds.value='';
    discount.value='';
    count.value='';
    total.innerHTML='';
    category.value='';
}
 appendData(products);
 
 function updateData(i) {
    tempIndex=i;
    title.value=products[i].title;
    price.value=products[i].price;
    taxes.value=products[i].taxes;
    adds.value=products[i].adds;
    discount.value=products[i].discount;
    category.value=products[i].category;
    count.style.display="none";
    submit.innerHTML = "Update";
    submit.style.backgroundColor = "green";
    scroll(
        { 
            top:0,
            behavior:"smooth"
        }
    )
    mode = "update"
    getTotal()
}
function deleteData(index) {
    products.splice(index,1);
    localStorage.setItem('ProductList', JSON.stringify(products));
    appendData(products);
}function deleteAllData(){
    if (confirm("Are you sure you want to delete all data?")) {
        // Clear the local storage and products array
        localStorage.removeItem('ProductList');//or localStorage.clear();
        products = [];
        // Clear the table and update the view
        appendData(products);
    }
}
let searchMode="title";
function getSearchMode(id) {
    if (id==="searchTitle") {
        searchInput.placeholder="Search By Title";
        searchMode="title";
    } else {
        searchInput.placeholder="Search By Category";
        searchMode="category";
    }
    searchInput.focus();
    searchInput.value="";
}
function searchData(v) {
    if (searchMode==="title") {
        let productsByTitle = products.filter((p)=>{
            return p.title.toLowerCase().includes(v.toLowerCase());
        });
        appendData(productsByTitle);
    }else if (searchMode==="category") {
        let productsByCategory = products.filter((p)=>{
            return p.category.toLowerCase().includes(v.toLowerCase());
        });
        appendData(productsByCategory);
    }
}

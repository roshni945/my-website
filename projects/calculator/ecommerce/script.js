/* ==========================================
        ROSHNI STORE
        E-COMMERCE JAVASCRIPT
========================================== */


/* =========================
        PRODUCTS DATA
========================= */


const products = [

    {
        id: 1,
        name: "Smart Watch",
        price: 1999,
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30"
    },


    {
        id: 2,
        name: "Digital Camera",
        price: 8999,
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f"
    },


    {
        id: 3,
        name: "Premium Shoes",
        price: 2499,
        category: "Fashion",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff"
    },


    {
        id: 4,
        name: "Wireless Headphone",
        price: 2999,
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b"
    }

];



/* =========================
        CART
========================= */


let cart =
    JSON.parse(localStorage.getItem("cart")) || [];



/* =========================
        DISPLAY PRODUCTS
========================= */


const productGrid =
    document.querySelector(".product-grid");



function displayProducts(items) {


    if (!productGrid)
        return;



    productGrid.innerHTML = "";



    items.forEach(product => {


        productGrid.innerHTML += `


<div class="product-card">


<img src="${product.image}"
alt="${product.name}">


<h3>

${product.name}

</h3>


<p>

₹${product.price}

</p>


<button onclick="addToCart(${product.id})">

Add To Cart

</button>


</div>


`;



    });


}



displayProducts(products);




/* =========================
        ADD TO CART
========================= */


function addToCart(id) {


    const product =
        products.find(item => item.id === id);



    cart.push(product);



    localStorage.setItem(

        "cart",

        JSON.stringify(cart)

    );



    updateCart();



    alert(

        product.name + " Added To Cart 🛒"

    );


}





/* =========================
        CART COUNT
========================= */


function updateCart() {


    const cartIcon =
        document.querySelector(".fa-cart-shopping");



    if (cartIcon) {


        cartIcon.setAttribute(

            "data-count",

            cart.length

        );


    }


}



updateCart();


/* =========================
        SEARCH PRODUCT
========================= */


const searchInput =
    document.querySelector(".search-section input");



if (searchInput) {


    searchInput.addEventListener(
        "input",
        () => {


            const value =
                searchInput.value.toLowerCase();



            const filteredProducts =
                products.filter(product =>

                    product.name
                        .toLowerCase()
                        .includes(value)

                );



            displayProducts(filteredProducts);



        });


}





/* =========================
        WISHLIST
========================= */


let wishlist =
    JSON.parse(localStorage.getItem("wishlist")) || [];



function addToWishlist(id) {


    const product =
        products.find(item => item.id === id);



    wishlist.push(product);



    localStorage.setItem(

        "wishlist",

        JSON.stringify(wishlist)

    );



    alert(

        product.name + " Added ❤️"

    );


}





/* =========================
        CART DATA GET
========================= */


function getCart() {


    return JSON.parse(

        localStorage.getItem("cart")

    ) || [];



}





/* =========================
        CART TOTAL
========================= */


function calculateTotal() {


    let total = 0;



    cart.forEach(item => {


        total += item.price;



    });



    return total;


}





/* =========================
        REMOVE CART ITEM
========================= */


function removeFromCart(id) {


    cart =
        cart.filter(item =>

            item.id !== id

        );



    localStorage.setItem(

        "cart",

        JSON.stringify(cart)

    );



    updateCart();


}





/* =========================
        CLEAR CART
========================= */


function clearCart() {


    localStorage.removeItem("cart");



    cart = [];



    updateCart();


}





/* =========================
        PRODUCT BUTTON EFFECT
========================= */


document.addEventListener(

    "click",

    (e) => {


        if (e.target.classList.contains("fa-heart")) {


            alert("Wishlist Feature ❤️");


        }



    });





/* =========================
        SMOOTH SCROLL
========================= */


document.querySelectorAll(
    "nav a"
)
    .forEach(link => {


        link.addEventListener(
            "click",
            function (e) {


                const href =
                    this.getAttribute("href");



                if (href.startsWith("#")) {


                    e.preventDefault();



                    document.querySelector(href)
                        .scrollIntoView({

                            behavior: "smooth"

                        });


                }


            });


    });





/* =========================
        PAGE LOAD
========================= */


window.addEventListener(

    "load",

    () => {


        updateCart();


        console.log(

            "Roshni Store Loaded Successfully 🚀"

        );


    });
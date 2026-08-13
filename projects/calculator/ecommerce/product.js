/* ==========================================
        ROSHNI STORE
        PRODUCT.JS
========================================== */


/* =========================
        PRODUCTS DATA
========================= */


const products = [

    {
        id: 1,
        name: "Smart Watch",
        price: 1999,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
        description:
            "Premium smart watch with fitness tracking, heart rate monitor and stylish design."
    },


    {
        id: 2,
        name: "Digital Camera",
        price: 8999,
        image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f",
        description:
            "High quality digital camera for professional photography and videos."
    },


    {
        id: 3,
        name: "Premium Shoes",
        price: 2499,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
        description:
            "Comfortable premium shoes with modern design and durable material."
    },


    {
        id: 4,
        name: "Wireless Headphone",
        price: 2999,
        image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b",
        description:
            "Wireless headphone with clear sound quality and long battery life."
    }

];





/* =========================
        GET PRODUCT ID
========================= */


const params =
    new URLSearchParams(
        window.location.search
    );


const productId =
    Number(params.get("id"));



const product =
    products.find(item =>
        item.id === productId
    );






/* =========================
        DISPLAY PRODUCT
========================= */


if (product) {


    document.getElementById("productImage")
        .src =
        product.image;



    document.getElementById("productName")
        .textContent =
        product.name;



    document.getElementById("productPrice")
        .textContent =
        "₹" + product.price;



    document.getElementById("productDescription")
        .textContent =
        product.description;



}





/* =========================
        ADD TO CART
========================= */


const addCartBtn =
    document.getElementById("addCartBtn");



addCartBtn.addEventListener(
    "click",
    () => {


        let cart =
            JSON.parse(
                localStorage.getItem("cart")
            ) || [];



        const quantity =
            Number(
                document.getElementById("quantity").value
            );



        for (let i = 0; i < quantity; i++) {


            cart.push(product);


        }



        localStorage.setItem(

            "cart",

            JSON.stringify(cart)

        );



        alert(
            product.name +
            " Added To Cart 🛒"
        );

        window.location.href = "cart.html";



    });





/* =========================
        BUY NOW
========================= */


const buyBtn =
    document.querySelector(".buy-btn");



buyBtn.addEventListener(
    "click",
    () => {


        alert(
            "Redirecting to Checkout 💳"
        );


    });
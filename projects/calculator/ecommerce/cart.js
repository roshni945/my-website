/* ==========================================
        ROSHNI STORE
        CART.JS
========================================== */


let cart =
    JSON.parse(localStorage.getItem("cart")) || [];



const cartContainer =
    document.getElementById("cartContainer");


const cartTotal =
    document.getElementById("cartTotal");




/* =========================
        DISPLAY CART
========================= */


function displayCart() {


    if (!cartContainer) return;


    cartContainer.innerHTML = "";


    if (cart.length === 0) {


        cartContainer.innerHTML = `

        <h2 style="text-align:center">

        Your Cart is Empty 🛒

        </h2>

        `;


        cartTotal.textContent = "₹0";

        return;

    }



    let total = 0;



    cart.forEach((item, index) => {


        total += item.price;



        cartContainer.innerHTML += `


        <div class="cart-item">


            <img 
            src="${item.image}"
            width="120">


            <div>


            <h3>
            ${item.name}
            </h3>


            <p>
            Price: ₹${item.price}
            </p>


            <button onclick="removeItem(${index})">

            Remove

            </button>


            </div>


        </div>


        `;


    });



    cartTotal.textContent =
        "₹" + total;



}





/* =========================
        REMOVE ITEM
========================= */


function removeItem(index) {


    cart.splice(index, 1);



    localStorage.setItem(

        "cart",

        JSON.stringify(cart)

    );



    displayCart();


}





/* =========================
        CHECKOUT
========================= */


const checkoutBtn =
    document.getElementById("checkoutBtn");



if (checkoutBtn) {


    checkoutBtn.addEventListener(

        "click",

        () => {


            if (cart.length === 0) {


                alert(
                    "Your cart is empty 🛒"
                );


            }

            else {


                alert(
                    "Order placed successfully 🎉"
                );


                localStorage.removeItem("cart");


                cart = [];


                displayCart();


            }


        });


}





/* =========================
        LOAD CART
========================= */


displayCart();
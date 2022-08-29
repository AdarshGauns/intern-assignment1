
// window.onscroll = function() {myFunction()};


// var header = document.getElementById("myHeader");
// var sticky = header.offsetTop;


function onClick() {

    let navBar = document.getElementById('nav-bar');
    let icon = document.getElementById('icon');
    let content = document.getElementById('content');
    // icon.style.transform= "rotate(180deg)";





    if (navBar.style.width != '5%') {
        navBar.style.width = '5%';
        icon.style.transform = "rotate(180deg)";
        content.style.width = '95%';
    }
    else {
        navBar.style.width = '20%';
        icon.style.transform = "rotate(0deg)";
    }
}


// function myFunction() {
//   if (window.pageYOffset > sticky) {
//     header.classList.add("sticky");
//   } else {
//     header.classList.remove("sticky");
//   }
// }

const Data = [
    {
        "id": 1,
        "name": "Food Card",
        "description": "This card is used for spending on Food merchants",
        "final_price": 21,
        "img_url": "https://react-coding-assignment.s3.ap-south-1.amazonaws.com/cards/orange_card.png",
        "inCart": 0


    },
    {
        "id": 2,
        "name": "Travel Card",
        "description": "This card is used for spending on Travel and hotel bookings",
        "final_price": 20,
        "img_url": "https://react-coding-assignment.s3.ap-south-1.amazonaws.com/cards/blue_card.png",
        "inCart": 0

    },
    {
        "id": 3,
        "name": "Epic Card",
        "description": "Use this card and get benefits on every transaction",
        "final_price": 30,
        "img_url": "https://react-coding-assignment.s3.ap-south-1.amazonaws.com/cards/golden_card.png",
        "inCart": 0

    },
    {
        "id": 4,
        "name": "Happay Premium Card",
        "description": "Use this card and get benefits on every transaction",
        "final_price": 40,
        "img_url": "https://react-coding-assignment.s3.ap-south-1.amazonaws.com/cards/black_card.png",
        "inCart": 0

    }
];

(function () {
    for (let item of Data) {
        const images = document.getElementById('cards');
        const items = document.createElement('div');
        items.classList.add("items");

        const imgTag = document.createElement('img');
        imgTag.src = item?.img_url;
        imgTag.style.width = '100%';
        items.appendChild(imgTag);

        const cardDetails = document.createElement('div');
        cardDetails.classList.add("cardDetails");

        const cardName = document.createElement('div');
        cardName.textContent = item?.name.split("-").join(" ").toLocaleLowerCase();
        cardDetails.appendChild(cardName);

        const cardAmount = document.createElement('div');
        cardAmount.textContent = `$${item?.final_price}`;
        cardDetails.appendChild(cardAmount);

        items.appendChild(cardDetails);

        const cardDesc = document.createElement('p');
        cardDesc.textContent = item?.description;
        items.appendChild(cardDesc);
        const valueInCart = JSON.parse(localStorage.getItem("productsInCart"))?.[item?.name]?.inCart;

        const buttonContainer = document.createElement("div");
        const addElement = document.createElement("button");
        const removeElement = document.createElement("button");
        const addToCardBtn = document.createElement("div");
        addElement.setAttribute("id", `add_${item?.name}`);
        removeElement.setAttribute("id", `remove_${item?.name}`);
        addToCardBtn.setAttribute("id", `button-${item?.name}`);
        addToCardBtn.classList.add("addToCardBtn");
        addToCardBtn.textContent = valueInCart || "Add To Cart";

        addElement.textContent = "+";
        removeElement.textContent = "-";
        buttonContainer.setAttribute("class", "button-container");
        removeElement.setAttribute("class", "border-r");
        addElement.setAttribute("class", "border-l");
        buttonContainer.appendChild(removeElement);
        buttonContainer.appendChild(addToCardBtn);
        buttonContainer.appendChild(addElement);

        // const addToCartBtn = document.createElement('button');
        // addToCartBtn.classList.add("addToCartBtn");
        // addToCartBtn.textContent = 'Add To Cart';
        // items.appendChild(addToCartBtn);

        items.appendChild(buttonContainer);
        images.appendChild(items);



    }

}

)();


let carts = document.getElementsByClassName("addToCardBtn");

const containerEle = document.getElementById("cards");

containerEle.addEventListener("click", (event) => {
    const targetElement = event.target.id;
    const [action, card] = targetElement.split("_");
    let cards = JSON.parse(localStorage.getItem("productsInCart"));
    const currentCard = cards?.[card];

    const currentProduct = Data.find((el) => el.name === card);
    const buttonEle = document.getElementById(`button-${card}`);
    const currentCardCartValue = currentCard?.inCart || 0;
    let totalCartValue = +localStorage.getItem("totalCartValue") || 0;

    if (action === "remove" && currentCardCartValue > 0) {
        cards = {
            ...cards,
            [card]: {
                ...currentProduct,
                inCart: currentCardCartValue - 1,
            },
        };

        totalCartValue = totalCartValue - 1;

        buttonEle.textContent = currentCardCartValue - 1;
    } else if (action === "add") {
        cards = {
            ...cards,
            [card]: {
                ...currentProduct,
                inCart: currentCardCartValue + 1,
            },
        };
        totalCartValue = totalCartValue + 1;
        buttonEle.textContent = currentCardCartValue + 1;
    }

    document.querySelector(".cart1 span").textContent = totalCartValue;

    localStorage.setItem("productsInCart", JSON.stringify(cards));
    localStorage.setItem("totalCartValue", totalCartValue);
});



function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('totalCartValue');
    if (productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;
    }
}
onLoadCartNumbers();

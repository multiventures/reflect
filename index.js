window.addEventListener("load", hideLoading);
cartIcon = document.querySelector('.cart');
itemCount = cartIcon.querySelector('.badge');
itemcontainer = document.querySelector('.catalogue');
// Attach the filterItems function to the input's 'input' event
input = document.getElementById('searchInput');
// Get the list of items
var items = itemcontainer.querySelectorAll('.item');
minimizeBtn = document.querySelector('.minimize');
minimizeBtn.addEventListener('click', hideCart);

console.log(cartIcon);
cartIcon.addEventListener("click", showCart);
cartIcon.style.border = "1px solid";

var messageElement = document.querySelector('.message');

input.addEventListener('change', filterItems);
input.addEventListener('input', hoverFeedback);
input.addEventListener('mouseenter', hoverFeedback);
input.addEventListener('mouseleave', function(){
    searchBar = input.parentNode;
    searchBar.querySelector('i').style.color = "gray";
    searchBar.parentElement.style.boxShadow = "2px 2px 3px transparent,-2px -2px 3px transparent,-2px 2px 3px transparent,2px -2px 3px transparent";
});
function hoverFeedback(){
    searchBar = input.parentNode;
    searchBar.querySelector('i').style.color = "var(--primary-color)";
    searchBar.parentElement.style.boxShadow = "2px 2px 3px var(--secondary-color),-2px -2px 3px var(--secondary-color),-2px 2px 3px var(--secondary-color),2px -2px 3px var(--secondary-color)";
};
shoes = document.querySelector('.content');

function hideLoading(){
    loading = document.querySelector('.loading');
    loading.style.display = "none";
}

var countDownDate = new Date("November 20, 2023 08:00:00").getTime();
    var x = setInterval(function(){
    var now = new Date().getTime();
    var distance = countDownDate - now;

    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60 )) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / (1000));

    document.getElementById("days").innerHTML = days;
    document.getElementById("hours").innerHTML = hours;
    document.getElementById("minutes").innerHTML = minutes;
    document.getElementById("seconds").innerHTML = seconds;

    if(distance < 0){
        document.getElementById("days").innerHTML = "00";
        document.getElementById("hours").innerHTML = "00";
        document.getElementById("minutes").innerHTML = "00";
        document.getElementById("seconds").innerHTML = "00";
    }
  }, 1000);

itemcontainer.addEventListener("wheel", scrollx);
function scrollx(event){
    //event.preventDefault();
    // Use deltaY to dynamically adjust scrollLeft value
    const scrollSpeed = 0.4; // Adjust the scroll speed as needed
    this.scrollLeft += event.deltaY * scrollSpeed;
};

itemcontainer.addEventListener('mouseenter', scrolling);
function scrolling(){
    btnRight = document.createElement('button');
    btnLeft = document.createElement('button');
    btnContainer = document.createElement('div');
    btnContainer.classList = "btnContainer";
    btnRight.innerText = ">";
    btnRight.classList = "btn";
    btnLeft.innerText = "<";
    btnLeft.classList = "btn";
    btnContainer.appendChild(btnLeft);
    btnContainer.appendChild(btnRight);
    itemcontainer.appendChild(btnContainer);
    btnRight.addEventListener("click",scrollRight);
    btnLeft.addEventListener("click",scrollLeft);
}
itemcontainer.addEventListener('mouseleave', destroy);
function destroy(){
    itemcontainer.querySelector('.btn').remove();
    itemcontainer.querySelector('.btnContainer').remove();
}
function scrollRight(){
    itemcontainer.scrollLeft += (itemcontainer.querySelector('.item').scrollWidth + 9.5);
}
function scrollLeft(){
    itemcontainer.scrollLeft -= (itemcontainer.querySelector('.item').scrollWidth + 9.5);
}
function filterItems() {
    // Get input value and convert to lowercase for case-insensitive search
    var input = document.getElementById('searchInput').value.toLowerCase();
    
    if (input.trim() == "") {
        searchBar.querySelector('i').style.color = "gray";
    }    
    // Loop through the items, hide those that don't match the search input
    for (var i = 0; i < items.length; i++) {
        var myArray = [];
        myArray[i] = items[i];
        var itemName = items[i].innerText.toLowerCase();
        if (!(itemName.indexOf(input) !== -1)) {
            items[i].style.display = "none";
        }
        else{
            items[i].remove();
            items[i].style.boxShadow = "2px 2px 4x var(--hover-color)";
            shoes.style.display = "flex";
            itemcontainer.style.display = "none";
            itemSearched = document.createElement('div');
            itemSearched = items[i];
            shoes.appendChild(itemSearched);
            items[i].style.display = "inline-block";
            shoes.style.display = "grid";
            items[i].style.alignSelf = "flex-start";
            shoes.style.overflow = "auto";
            shoes.style.gridTemplateColumns = "repeat(auto-fit,minmax(180px, 1fr))";
            shoes.style.gridTemplateRows = "(auto-fit,minmax(20px, 1fr))";
            shoes.style.justifyContent = "flex-start";
            document.querySelector('.category').textContent = "'Results for : "+ input + "'";
        }

    
    }
    
}
var cart = new Set();
cartContainer = document.createElement('div');
//cartContainer.innerHTML = cart[i];
cartParent = document.querySelector('.cart-container');
cartParent.appendChild(cartContainer);
// Iterate through each parentDiv and attach an event listener
items.forEach (function addToCart(item){
    item.addEventListener('click', function (event) {
        // Check if the clicked element is the current item
        if (event.target === item || event.target.tagName === 'IMG') {
            if (!cart.has(item)) {
                cart.add(item);
                messageElement.style.color = "white";
                showMessage("√ The item has been added to the cart");
            } else {
                messageElement.style.color = "rgb(255, 60, 0)";
                showMessage("⨷ Item already added");
            }
            
        }
        else if(event.target.parentElement.classList == 'details'){
            if (!cart.has(event.target.parentElement.parentElement)) {
                cart.add(event.target.parentElement.parentElement);
                messageElement.style.color = "white";
                showMessage("√ The item has been added to the cart");
            } else {
                messageElement.style.color = "rgb(255, 60, 0)";
                showMessage("⨷ Item already added");
            }
        }
        else if(event.target.parentElement.classList == 'price'){
            if (!cart.has(event.target.parentElement.parentElement.parentElement)) {
                cart.add(event.target.parentElement.parentElement.parentElement);
                messageElement.style.color = "white";
                showMessage("√ The item has been added to the cart");
            } else {
                messageElement.style.color = "rgb(255, 60, 0)";
                showMessage("⨷ Item already added");
            }
        }


        else{
            console.log(event.target.parentElement.classList);
        }
        let itemClicked = false;
        cartContainer.innerHTML = '';
        cart.forEach(function (added) {
            cartContainer.appendChild(added.cloneNode(true)); // Clone the node to avoid moving the original node
            itemClicked = true;
        });
        itemCount.style.color = "var(--secondary-color)";
        itemCount.textContent = cart.size;
    });
    
});
function showCart(){
    if(cart.size == 0){
        showMessage("⨷ Add an item to view in the cart");
        cartContainer.parentElement.style.display = "none";
        messageElement.style.color = "rgb(255, 160, 0)";
    }
    else{
        messageElement.style.color = "white";
        cartContainer.parentElement.style.display = "inline-block";
    }
};
function hideCart(){
    cartContainer.parentElement.style.display = "none";
}
function showMessage(message) {
    // Display the message in the 'message' element
    messageElement.textContent = message;

    // Clear the message after a certain duration (e.g., 2 seconds)
    setTimeout(function () {
        messageElement.textContent = '';
    }, 2000); // 2000 milliseconds = 2 seconds
}
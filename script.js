import menuArray from "./data";

const container = document.getElementById("container");
const orders = document.getElementById("orders");
const totalPriceEl = document.getElementById("total-price-el");
const orderContainer = document.getElementById("order-container");
const completeOrder = document.getElementById("complete-order");
const formSection = document.getElementById("form-section");
const pay = document.getElementById("pay");
const thanks = document.getElementById("thanks");

let total = 0;
let ordersFood = []
let countFood = []
let price = 0;
document.addEventListener("click", (e) => {
    if(e.target.dataset.addbtn){
        handleAddBtnClick(e.target.dataset.addbtn)
    }else if(e.target.id === 'remove-btn'){
        handleremoveBtnClick(e.target.id === 'remove-btn', countFood)
    }else if(e.target === completeOrder){
        formSection.style.display = 'block'
    }else if(e.target === pay){
            e.preventDefault()
            const name = document.getElementById("name").value;
            const cardNumber = document.getElementById("card-num").value;
            const cvvNumber = document.getElementById("cvv").value;
            if(name.length>0 && cardNumber.length >0 && cvvNumber.length ===3){
                formSection.style.display = 'none'
                orderContainer.style.display = 'none'
            }else{
              alert("Please Enter the details correctly");
            } 
            thanks.textContent = 'Thanks, James! Your order is on its way!'
            thanks.style.color = '#065F46'
            thanks.style.fontSize = '24px'
            thanks.style.textAlign = 'center'
            thanks.style.padding = '30px'    
    }
})

function handleAddBtnClick(menuId){
    const targetMenuObj = menuArray.find(food => food.id === Number(menuId))
    const orderItem  = `
            <div class="food">
                <p class="name name-order">${targetMenuObj .name}</p>
                <button class="remove-btn" id="remove-btn">remove</button>   
            </div>
            <div>
                <p class="price price-order">${targetMenuObj .price}</p>
            </div>
    `
    orderContainer.style.display = 'flex'    
    orders.innerHTML += orderItem
    ordersFood.forEach(food => (price += food.price))
    totalPriceEl.textContent = `$${price}`
    ordersFood.push(targetMenuObj)   
}

function handleremoveBtnClick(menuId) {
    const index = ordersFood.findIndex(food => food.id === menuId)

    if(index !== -1) {
        ordersFood.splice(index, 1)
    }
}
   


function renderMenuList(menuList){
    return menuList.map(menu => {
    const {
        name,
        ingredients,
        id,
        price,
        emoji
    } = menu
    

    return `
            <div class="menu-container">
                    <span class="emoji">${emoji}</span>
                    <div>
                        <h4 class="name">${name}</h4>
                        <p class="ingredient">${ingredients}</p>
                        <h6 class="price">${price}</h6>       
                    </div>
                    <span class="add-btn" data-addbtn="${id}">+</span>    
            </div>
            
            
        `     
}).join(' ')  
            
}
container.innerHTML = renderMenuList(menuArray)

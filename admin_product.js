let boxDrop = document.querySelectorAll(".menu li")
var boxAdmin = document.querySelectorAll(".boxAdmin");
boxDrop.forEach(item=>{
    item.addEventListener("click",(e)=>{
        if(item.classList.contains("boxDrop")){
            document.querySelector(".boxDrop.active").classList.remove("active");
            item.classList.add("active");
            var itemDataName = item.getAttribute("data-name")
            boxAdmin.forEach((itemBoxAdmin)=>{
                let itemBox = itemBoxAdmin.getAttribute("data-name")
                if(itemBox == itemDataName){
                    itemBoxAdmin.classList.add("show")
                    itemBoxAdmin.classList.remove("hide")
                }
                else{
                    itemBoxAdmin.classList.add("hide")
                    itemBoxAdmin.classList.remove("show")
                }
            })
        }
        var li = document.querySelectorAll(".dropdown li")
        li.forEach((itemLi)=>{
            itemLi.addEventListener("click",()=>{
                document.querySelector(".dropdown .active").classList.remove("active")
                itemLi.classList.add("active")
            })
        })
    })
})



var nameProduct = document.querySelector(".nameProduct");
    var imgProduct = document.querySelector(".image");
    var discountProduct = document.querySelector(".discount");
    var priceProduct = document.querySelector(".price");
    var moreProducts = document.querySelector(".moreProducts");
    document.querySelector("p").style.display = 'none'
    var clickImg = document.querySelector(".clickImgInput")
    clickImg.addEventListener("click",()=>{
        imgProduct.click();
    })
    imgProduct.addEventListener("change", function(){
        const file = this.files[0];
        const reader = new FileReader();
        reader.onload = function(){
            var result = reader.result;
            document.querySelector("p").innerText = result;
            document.querySelector(".itemForm img").src = result;
            document.querySelector(".itemForm img").style.border = "none";
            document.querySelector("#imgText").innerText = file.name
        }
        reader.readAsDataURL(file);
    })
    var array = []
    function reset(option){
        var formElement = document.querySelector(option.form);
        if(formElement){
            formElement.addEventListener("submit",(e)=>{
                e.preventDefault();
                var checkAll = true
                option.rules.forEach(function(rule){
                    var inputElement = formElement.querySelector(rule.selecter);
                    var checkInput = checkError(inputElement, rule);
                    if(!checkInput){
                        checkAll = false;
                    }
                })
                var name = nameProduct.value;
                var p = document.querySelector(".linkImg").innerText;
                var discount = discountProduct.value;
                var price = priceProduct.value;
                var imgText = document.querySelector("#imgText");
                if(imgText.innerText == ""){
                    document.querySelector(".messageImg").innerText = "Vui lòng thêm ảnh"
                }else{
                    document.querySelector(".messageImg").innerText = ""

                }
                if(!(nameProduct.value == "" || document.querySelector("#imgText").innerText =="" || priceProduct.value =="") ){
                    var obj = addObject(name,p,discount,price);
                    array.push(obj)
                    var json = JSON.stringify(array);
                    localStorage.setItem("product", json);
                    showProduct()
                    nameProduct.value = ''
                    document.querySelector("#imgText").innerText = ''
                    document.querySelector(".itemForm img").src = 'https://t4.ftcdn.net/jpg/04/99/93/31/360_F_499933117_ZAUBfv3P1HEOsZDrnkbNCt4jc3AodArl.jpg';
                    document.querySelector(".itemForm img").style.border = "1px solid";
                    discountProduct.value = ''
                    priceProduct.value = ''
                    console.log(array);
                    showItemProduct();
                }
            })
            function checkError(inputElement,rule){
                var errorMessage = rule.test(inputElement.value);
                console.log(errorMessage);
                var messageEl = inputElement.parentElement.querySelector(".message");
                if(errorMessage){
                    messageEl.innerText = errorMessage;
                    inputElement.classList.add("error");
                }
                else{
                    messageEl.innerText = '';
                    inputElement.classList.remove("error");
                }
                return !errorMessage;
            }
            option.rules.forEach(function(rule){
                var inputElement = formElement.querySelector(rule.selecter);
                if(inputElement){
                    inputElement.onblur = function(){
                        checkError(inputElement, rule)
                    }
                }
            })
        }
    }
    reset.isResquired = function(selecter){
        return{
            selecter: selecter,
            test: function(value){
                return value.trim() ? undefined : 'Vui lòng nhập tên sản phẩm';
            }
        }
    }
    reset.isPrice = function(selecter){
        return{
            selecter: selecter,
            test: function(value){
                var regex = /[0-9]/;
                return regex.test(value) ? undefined : "Vui lòng nhập giá sản phẩm"
            }
        }
    }
    function showProduct(){
        var jsonAr = localStorage.getItem('product');
        if(jsonAr == null){
            array = [];
        }
        else{
            array = JSON.parse(jsonAr);
        }
    }
    function addObject(name,p, discount, price){
        var sanpham = new Object();
        sanpham.name = name;
        sanpham.p = p;
        sanpham.discount = discount;
        sanpham.price = price;
        return sanpham;
    }
    function showItemProduct(){
        let jsonArray = localStorage.getItem('product');
        if(jsonArray == null){
            array = [];
        }
        else{
            array = JSON.parse(jsonArray);
        }
        let html = ''
        array.forEach((item,index)=>{
            html += `
                    <tr>
                        <th scope="row">${index+1}</th>
                        <td>${item.name}</td>
                        <td><img src="${item.p}" alt="san pham"></td>
                        <td>${(item.discount =="" ? '0 đ': (item.discount))}</td>
                        <td>${item.price}</td>
                        <td><p class="delete deleteBoxAdmin" data-name="toyen" onclick="deleteProduct(${index})">Xóa</p></td>
                    </tr>
                        `;
        })
        document.querySelector("tbody").innerHTML = html;
    }
    function deleteProduct(index){
        var json = localStorage.getItem('product')
        if(json == null){
            array = [];
        }
        else{
            array = JSON.parse(json)
        }
        console.log(array);
        array.splice(index,1)
        localStorage.setItem('product', JSON.stringify(array))
        showItemProduct()
        showProduct()
    }
    showItemProduct()
    showProduct()

    
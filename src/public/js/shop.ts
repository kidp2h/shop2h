import $ from "jquery"
import toast from "toastify-js"
import "toastify-js/src/toastify.css"

$(function(){
    function formatCurrency(value){
        return new Intl.NumberFormat('en-US',{style:"currency",currency:"USD"}).format(Number(value)).replace(/(\.|,)00$/g, '');
    }
    function convertCurrencyToNumber(value){
        return Number(value.replace(/[^0-9.-]+/g,""))
    }

    $(".product__action").on("click",".addItemToCart",function(e){
        e.preventDefault();
        let productId = $(this).parents(".product__action").attr("data-id-product")
        console.log(productId);
        $.ajax({
            type: "POST",
            url: `/cart/addItem`,
            data : {productId : productId},
            success: function (response) {
                toast({
                    text: "Added to cart !!",
                    duration: 2500,
                    close: true,
                    gravity: "bottom", // `top` or `bottom`
                    position: "right", // `left`, `center` or `right`
                    backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
                    stopOnFocus: true
                }).showToast();
            },
            error : function(response){
                window.location.replace(`${window.location.origin}/auth`);
            }
        });
    })
})
// $(function(){
//     function formatCurrency(value){
//         return new Intl.NumberFormat('en-US',{style:"currency",currency:"USD"}).format(Number(value)).replace(/(\.|,)00$/g, '');
//     }
//     function convertCurrencyToNumber(value){
//         return Number(value.replace(/[^0-9.-]+/g,""))
//     }
//     $(".product__list").on("click",".detail-view",function(e){
//         e.preventDefault();
//         const product = {
//             id : $(this).parents(".product__action").attr("data-id-product"),
//             nameProduct :  $(this).parents(".container-product").find(".product__details").find(".name--product").text(),
//             imageProduct : $(this).parents(".product__inner").find(".image--product").attr("src"),
//             colorProduct : $(this).parents(".product__action").attr("color-product"),
//             sizeProduct : $(this).parents(".product__action").attr("size-product"),
//             price : $(this).parents(".container-product").find(".product__details").find(".old__price").text(),
//             discount : $(this).parents(".container-product").find(".product__details").find(".new__price").text(),
//         }
//         $(".detail__image-product").attr("src",product.imageProduct);
//         $(".detail__title-product").text(product.nameProduct);
//         $(".detail__new-price").text(product.discount)
//         $(".detail__old-price").text(product.price)
//         $(".detail__color-product").text(product.colorProduct)
//         $(".detail__size-product").text(product.sizeProduct)
//         $(".detail__color-product").css("background",`${product.colorProduct} none repeat scroll 0 0`)
//     })

//     $(".product--shop").on("click",".product__action--add-to-cart",function(e){
//         e.preventDefault();
//         const idProduct = $.trim($(this).parents(".product__action").attr("data-id-product"));
//         const product = {
//             id : $(this).parents(".product__action").attr("data-id-product"),
//             nameProduct :  $(this).parents(".container-product").find(".product__details").find(".name--product").text(),
//             imageProduct : $(this).parents(".product__inner").find(".image--product").attr("src"),
//             colorProduct : $(this).parents(".product__action").attr("color-product"),
//             sizeProduct : $(this).parents(".product__action").attr("size-product"),
//             price : $(this).parents(".container-product").find(".product__details").find(".old__price").text(),
//             discount : $(this).parents(".container-product").find(".product__details").find(".new__price").text(),
//         }
//         $.ajax({
//             type: "POST",
//             url: "/user/add-to-cart",
//             data: {idProduct : idProduct},
//             success: function (response) {
//                 var found = false;
//                 if(response.status){
//                     Toastify({
//                         text: "Added to cart !!",
//                         duration: 2000,
//                         newWindow: true,
//                         gravity : "bottom",
//                         position: "right",
//                         close: true,
//                         backgroundColor: "linear-gradient(90deg, rgba(236,43,31,1) 0%, rgba(255,14,0,1) 34%, rgba(255,65,54,1) 58%, rgba(255,63,52,1) 83%, rgba(241,135,135,1) 100%)",
//                     }).showToast();
//                     // show product in cart

//                     //increase amount
//                     $(".cart__item").each(function( index ) {
//                         let _idProductInCart = $.trim($(this).attr("data-id-product"));
//                         if(idProduct == _idProductInCart ){
//                             found = true;
//                             let currentAmount = $(this).find(".amount__product").text()
//                             let newNumber = Number(currentAmount.match(/[0-9]+/)[0]) + 1;
//                             $(this).find(".amount__product").text(`QTY: ${newNumber}`);
//                             //update subtotal
//                             let subTotal = $(this).parents(".shopping__cart__inner").find(".shoping__total").children(".total__price").text();
//                             let newSubTotal = convertCurrencyToNumber(subTotal) + convertCurrencyToNumber(product.discount)
//                             $(this).parents(".shopping__cart__inner").find(".shoping__total").children(".total__price").text(formatCurrency(newSubTotal))
//                         }
//                     });
//                     // create new product in cart
//                     if(found == false){
                        
//                         $(".shp__cart__wrap").append(`
//                             <div class="shp__single__product cart__item" data-id-product="${product.id}">
//                                 <div class="shp__pro__thumb">
//                                     <a href="javascript:void(0)">
//                                         <img src="${product.imageProduct}" alt="product images">
//                                     </a>
//                                 </div>
//                                 <div class="shp__pro__details">
//                                     <h2><a href="/product/detail">${product.nameProduct}</a></h2>
//                                     <span class="quantity amount__product">QTY: 1</span>
//                                     <span class="shp__price">${product.discount}</span>
//                                 </div>
//                                 <div class="remove__btn">
//                                     <a href="" title="Remove this item"><i class="zmdi zmdi-close"></i></a>
//                                 </div>
//                             </div>
//                         `)
//                         let subTotal = $(".shopping__cart__inner").find(".shoping__total").children(".total__price").text();
//                         let newSubTotal = convertCurrencyToNumber(subTotal) + convertCurrencyToNumber(product.discount)
//                         $(".shopping__cart__inner").find(".shoping__total").children(".total__price").text(formatCurrency(newSubTotal))
//                     }
//                 } 
//             },
//             error : function (response) {
//                 window.location.replace(`${window.location.origin}/auth`);
//             }
//         });
        
//     })
//     $(".shopping__cart__inner").on("click","div.remove__btn", function(e){
//         e.preventDefault();
        
//         let subTotal = $(".shopping__cart__inner").find(".shoping__total").children(".total__price").text();
//         let amountProduct = $(this).parent().find(".shp__pro__details").children(".amount__product").text().match(/[0-9]+/)[0];
//         let priceProduct = convertCurrencyToNumber($(this).parent().find(".shp__pro__details").children(".shp__price").text()) * Number(amountProduct);
//         let newSubTotal = convertCurrencyToNumber(subTotal) - priceProduct
//         $(".shopping__cart__inner").find(".shoping__total").children(".total__price").text(formatCurrency(newSubTotal))
        
//         $(this).parent().remove();
//         const idProduct = $(this).parent().attr("data-id-product");
//         $.ajax({
//             type: "POST",
//             url: "/user/remove-from-cart",
//             data: {idProduct : $.trim(idProduct)},
//             success: function (response) {
                
//             }
//         });
//     })

//     $(":input").bind('keyup change click', function (e) {
//         if (!$(this).data("previousValue") || $(this).data("previousValue") != $(this).val()){
//             let priceProduct = $(this).parent().find(".product-price")
//             console.log(priceProduct);
//             $(this).data("previousValue", $(this).val());
//         }  
//     });

//     $(".btn__load-more").on('click', function(e) {
//             e.preventDefault();
//             let skip = $(".product--shop").length;
            
//             $.ajax({
//                 type: "GET",
//                 url: `/shop/loadProduct?skip=${skip}&limit=3`,
//                 beforeSend : function(){
//                     $(".lds-ring").show();
//                 },
//                 success: function (response) {
//                     let temp = skip;
//                     response.products.forEach(product => {
//                         temp = temp + 1;
//                         let contentProduct = 
//                             `
//                             <div class="product--shop col-md-3 single__pro col-lg-3 cat--1 col-sm-4 cat--${product._id} size--${product.sizeProduct} color--${product.colorProduct}">
//                                 <div class="product foo container-product">
//                                     <div class="product__inner">
//                                         <div class="pro__thumb">
//                                             <a href="">
//                                                 <img class="image--product" src="${product.imageProduct}" alt="product images">
//                                             </a>
//                                         </div>
//                                         <div class="product__hover__info">
//                                             <ul class="product__action"  data-id-product="${product._id}" color-product="${product.colorProduct}" size-product="${product.sizeProduct}">
//                                                 <li><a data-toggle="modal" data-target="#productModal" title="Quick View" class="quick-view modal-view detail-link detail-view" ><span class="ti-eye"></span></a></li>
//                                                 <li><a title="Add TO Cart" class="product__action--add-to-cart" href="/shop/cart"><span class="ti-shopping-cart"></span></a></li>
//                                                 <li><a title="Wishlist" href="/user/wishlist"><span class="ti-heart"></span></a></li>
//                                             </ul>
//                                         </div>
//                                     </div>
//                                     <div class="product__details">
//                                         <h2><a href="product-details" class="name--product">${product.nameProduct}</a></h2>
//                                         <ul class="product__price">
//                                             <li class="old__price">$${product.price.toLocaleString("en")}</li>
//                                             <li class="new__price">$${product.discount.toLocaleString("en")}</li>
//                                         </ul>
//                                     </div>
//                                 </div>
//                             </div>
//                             `
//                             var $newItems = $(contentProduct);
//                             // var $grid = $('.product__list').isotope({
//                             //     itemSelector: '.single__pro',
//                             //     percentPosition: true,
//                             //     layoutMode: 'fitRows',
//                             //     masonry: {
//                             //         // use outer width of grid-sizer for columnWidth
//                             //         columnWidth: '.single__pro',
//                             //         fitWidth: true
//                             //     }
//                             // });
//                             $(".product__list").append($newItems).show("slow")

//                             // window.sr = ScrollReveal({
//                             //     duration: 800,
//                             //     reset: false
//                             // });
//                             // sr.sync();
//                             // sr.reveal();
//                     });
//                 }
//             }).done(function(){
//                 $(".lds-ring").hide();
//                             // window.sr = ScrollReveal({
//                             //     duration: 800,
//                             //     reset: false
//                             // });
//                             // sr.reveal();
//             });
//     });
// })


$(document).ready(begAnimation);

/*$(window).resize(function() {
	console.log("resize");
	location.reload(false);
});*/

//Начальная анимация 
var begAnimation = setTimeout(function() {
	$(".begAnim").css("margin-left", "0");
	$(".begAnim").css("opacity", "1");
	$(".header ul").css("padding-right", "0");
	$(".header ul").css("opacity", "1");
	$("#woman").css("opacity", "1");
}, 400);

//Открытие всплывающей формы регистрации
var regClean1 = document.getElementById("block1");
var regClean2 = document.getElementById("block2");
var regClean3 = document.getElementById("block3");
var regClean4 = document.getElementById("cardbox");
var regClean = [];
var tempClean;
tempClean = regClean1.getElementsByTagName("*");
console.log(tempClean);

var reg = document.getElementById("block8");
$("#phone").click(function() {
	$("body::-webkit-scrollbar").css("width", "0");
	$("#block8").css("display", "block");
	$("#block8").css("visibility", "visible");
	$("#block8").css("opacity", "1");
	$("#block1, #block2").css("filter", "blur(5px)");
});
$(".card-button-div").click(function() {
	$('body,html').animate({scrollTop: 0}, 300);
	$("#block8").css("display", "block");
	$("#block8").css("visibility", "visible");
	$("#block8").css("opacity", "1");
	$("#block1, #block2").css("filter", "blur(5px)");
});

$(function() {
   $("#block1, #block2, #block8").mousewheel(function(evt, del) {
      if (getComputedStyle(reg).display == "block") {
      	return false;
      }
   });
});



//Закрытие всплывающей формы регистрации
window.onclick = function(event) {
	if (event.target == regClean1 || event.target == regClean2 || event.target == regClean3 || event.target == regClean4) {
		reg.style.opacity = "0";
		reg.style.visibility = "hidden";
		reg.style.display = "none";
		$("#block8").removeClass("reg2");
		$("#block1, #block2, #block3, #block4, #block5, #block6, #block7").css("filter", "blur(0)");
		console.log("done");
		console.log(event.target);
	}
}


//Скорость скролла блока 2 
var lambd = 0;
var curWidth = getComputedStyle(document.body).width;
curWidth = curWidth.substring(0, curWidth.length - 2)
if (curWidth > 1500) {
	lambd = 30;
}
else {
	lambd = 15;
}
console.log(curWidth);


$(function() {
   $("#cardbox").mousewheel(function(evt, del) {
      this.scrollLeft -= (del * lambd);
      console.log(evt);
      evt.preventDefault();
   });
});

//Запрет прокрутки на слайдере 2
$(function() {
   $(".slider").mousewheel(function(evt, del) {
      evt.preventDefault();
   });
});


//Определение вида слайдера 2 
if (curWidth < 1000) {
	$("#block4_mobile").css("display", "block");
	$("#block4").css("display", "none");
}
else {
	$("#block4").css("display", "block");
	$("#block4_mobile").css("display", "none");
}
 

//Прокрутка по ссылкам
$(document).ready(function(){
	$("#menu").on("click","a", function (event) {
		//отменяем стандартную обработку нажатия по ссылке
		event.preventDefault();

		//забираем идентификатор бока с атрибута href
		var id  = $(this).attr('href'),

		//узнаем высоту от начала страницы до блока на который ссылается якорь
			top = $(id).offset().top;
		
		//анимируем переход на расстояние - top за 1500 мс
		$('body,html').animate({scrollTop: top}, 1000);
	});
});


//Кнопка "Подробнее" на слайдере 1 
$(".square .card-content").mouseover(function(event) {
	$(this).addClass("active");
});
$(".square .card-content").mouseout(function() {
	$("div").removeClass("active");
});
$(".card-button-div").mouseover(function(event) {
	$(this).prev().addClass("active");
});
$(".card-button-div").mouseout(function() {
	$("div").removeClass("active");
});


$(".rect .half").mouseover(function() {
	$(this).addClass("active");
	console.log(1);
});
$(".rect .half").mouseout(function() {
	$("div").removeClass("active");
});

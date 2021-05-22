window.onload = function() {
    document.getElementById("dileak-search-input").focus();
};

//showError(keyword);
//showResults(response);
//alert("Error retrieving search results, please refresh the page");

if(localStorage.getItem("data") != undefined) {
	localStorage.removeItem("data");
}

function ajax(keyword) { //AJAX request
	indexOfURL("assets/index.txt");
	data = localStorage.getItem("data");
	console.log(data.includes(keyword));
	if(data.includes(keyword) == true) {
		localStorage.removeItem("data");
		alert("found");
	}
	if(data.includes(keyword) == false) {
		localStorage.removeItem("data");
		showError(keyword);
	}
}

/*
function showResults(callback) {
	for (var i = 0; i <= 9; i++) {
		$(".display-results").append("<div class='result-list result-" + i + "'>" + "<span class='result-title title-" + i + "'></span>" + "<br>" +"<span class='result-snippet snippet-" + i + "'></span>" + "<br>" + "<span class='result-metadata metadata-" + i + "'></span>" + "</div>" );
	}

	for (var m = 0; m <= 9; m++) {
		console.log(timestamp);
		$(".title-" + m).html("<a href='urlofthefile" + url + "' target='_blank'>titleofthefile</a>");
		$(".snippet-" + m).html("informations");
		$(".metadata-" + m).html("size kb (line of keyword words) - time");
	}
}*/

function verifyMode() {
	if(localStorage.getItem('mode') == "BlackHat") {
		button_bh = document.getElementById("btn-bh");
		button_bh.style.display = "none";
		button_wh = document.getElementById("btn-wh");
		button_wh.style.display = "inline-block";
		logo_bh = document.getElementById("bh-mode");
		logo_bh.style.display = "inline-block";
		logo_wh = document.getElementById("wh-mode");
		logo_wh.style.display = "none";
	}
	if(localStorage.getItem('mode') == "WhiteHat") {
		button_bh = document.getElementById("btn-bh");
		button_bh.style.display = "inline-block";
		button_wh = document.getElementById("btn-wh");
		button_wh.style.display = "none";
		logo_bh = document.getElementById("bh-mode");
		logo_bh.style.display = "none";
		logo_wh = document.getElementById("wh-mode");
		logo_wh.style.display = "inline-block";
	}
}

verifyMode()

function switchBHMode() {
	button_bh = document.getElementById("btn-bh");
	button_bh.style.display = "none";
	button_wh = document.getElementById("btn-wh");
	button_wh.style.display = "inline-block";
	localStorage.setItem("mode", "BlackHat");
	logo_bh = document.getElementById("bh-mode");
	logo_bh.style.display = "inline-block";
	logo_wh = document.getElementById("wh-mode");
	logo_wh.style.display = "none";
}

function switchWHMode() {
	button = document.getElementById("btn-wh");
	button.style.display = "none";
	button_bh = document.getElementById("btn-bh");
	button_bh.style.display = "inline-block";
	localStorage.setItem("mode", "WhiteHat");
	logo_bh = document.getElementById("bh-mode");
	logo_bh.style.display = "none";
	logo_wh = document.getElementById("wh-mode");
	logo_wh.style.display = "inline-block";
}

function showError(keyword) {
	$(".display-results").append( "<div class='error'> <p>Your search <span class='keyword'>" + keyword + "</span> did not match any documents.</p> <p>Suggestions:</p><li>Make sure that all words are spelled correctly.</li><li>Try different keywords.</li><li>Try more general keywords.</li></div> ");
}

$(".result-btn-dileak").click(function (event) {
	event.preventDefault();
	$(".display-results").html("");
	var keyword = $(".result-dileak-search-form-input").val();
	document.getElementById("result-dileak-search-form-input").blur();
	ajax(keyword);
});

$(".btn-dileak").click(function(event) {
	event.preventDefault();
	var keyword = $(".dileak-search-input").val();

	if (keyword !== "") {
		$(".result-dileak-search-form-input").val(keyword);
		$(".home").addClass('hidden');
   	 	$(".result").removeClass('hidden');
    	document.getElementById("dileak-search-input").blur();
   		$(".dileak-search-input").val("");
		document.getElementById("result-dileak-search-form-input").blur();	
		$(".display-results").html("");
		ajax(keyword);
	}

	else {
		console.log("No words entered in the search bar...")
	}
	
});

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function autoType() {
	var title = 'DirectoLeak Search';

	for(let i = 0; i < title.length; i++) {
    	document.getElementById("title").innerHTML += title.charAt(i);
    	await sleep(1500);
	}
	document.getElementById("title").innerHTML = "";
    autoType()
}

autoType()

function readLeaks(file) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function () {
        if(rawFile.readyState === 4) {
            if(rawFile.status === 200 || rawFile.status == 0) {
                var allText = rawFile.responseText;
                localStorage.setItem("data",allText)
            }
        }
    }
    rawFile.send(null);
}

function indexOfURL(file) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function () {
        if(rawFile.readyState === 4) {
            if(rawFile.status === 200 || rawFile.status == 0) {
                var allText = rawFile.responseText;
                indexof = allText.split("\n")
                for(let i = 0; i < indexof.length; i++) {
                	if(indexof[i] != "") {
                		readLeaks(indexof[i]);
                	}
                }
            }
        }
    }
    rawFile.send(null);
}
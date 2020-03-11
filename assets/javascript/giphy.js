function generate_gif(images) {
	var gif = $("<img>").addClass("img-fluid img-thumbnail");
	gif.attr("still", images.original_still.url);
	gif.attr("webp", images.original.webp);
	gif.attr("state", "still");
	gif.attr("src", gif.attr("still"));
	return gif;
}

function generate_spacing(num) {
	var spacing_div = $("<div>").addClass("w-100");

	if (!(num % 4)) {
		spacing_div.addClass("d-block d-md-block");
	} else if (!(num % 2)) {
		spacing_div.addClass("d-block d-md-none");
	} else {
		spacing_div.addClass("d-block d-sm-none");
	}

	return spacing_div;
}

function display_gifs(response) {
	var gif_row = $("<div>").addClass("row");
	$("#gifs").append(gif_row);
	for (var i = 0; i < response.data.length; i++) {
		var gif_div = $("<div>").addClass("col");
		gif_div.append(generate_gif(response.data[i].images));
		gif_div.append($("<p>").text(response.data[i].rating));
		gif_row.append(gif_div);
		gif_row.append(generate_spacing(i + 1));
	}
}

function toggle_animation() {
	if ($(this).attr("state") === "still") {
		$(this).attr("state", "webp");
		$(this).attr("src", $(this).attr("webp"));
	} else if ($(this).attr("state") === "webp") {
		$(this).attr("state", "still");
		$(this).attr("src", $(this).attr("still"));
	}
}

$.ajax({
	url: "https://api.giphy.com/v1/gifs/search?api_key=Y489HiM8mmuPI3SU3kkniTTFUTGMj1L2&q=&limit=10&offset=0&lang=en&q=bird",
	method: "GET"
}).then(display_gifs);

$(document).on("click", "img", toggle_animation);

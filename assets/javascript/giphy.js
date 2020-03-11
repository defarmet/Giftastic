function display_gifs(response) {
	var gif_row;
	for (var i = 0; i < response.data.length; i++) {
		if (!(i % 2)) {
			gif_row = $("<div>").addClass("row");
			$("#gifs").append(gif_row);
		}
		var gif_div = $("<div>").addClass("col-md-6");
		var gif = $("<img>");
		gif.attr("still", response.data[i].images.original_still.url);
		gif.attr("webp", response.data[i].images.original.webp);
		gif.attr("state", "still");
		gif.attr("src", gif.attr("still"));
		gif_div.append(gif);
		gif_row.append(gif_div);
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

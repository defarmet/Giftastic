var topics = ["bird", "walt disney", "epcot"];

function capitalize(topic) {
	var str = topic.split(" ");
	for (var i = 0; i < str.length; i++) {
		str[i] = str[i][0].toUpperCase() + str[i].substr(1);
	}
	return str.join(" ");
}

function generate_card(topic) {
	var card = $("<div>").addClass("card");
	card.append($("<h5>").addClass("card-header").text(capitalize(topic)));
	return card;
}

function generate_gif(images) {
	var gif = $("<img>");
	gif.attr("still", images.original_still.url);
	gif.attr("webp", images.original.webp);
	gif.attr("state", "still");
	gif.attr("src", gif.attr("still"));
	return gif;
}

function generate_div(data) {
	var gif_div = $("<div>").addClass("gif");
	gif_div.append(generate_gif(data.images));
	gif_div.append($("<p>").text(data.rating.toUpperCase()));
	return gif_div;
}

function display_gifs(response) {
	var gif_row = $("<div>").addClass("card-body scroll");
	$("#gifs").prepend($("<br>"));
	$("#gifs").prepend(generate_card(topic).append(gif_row));
	for (var i = 0; i < response.data.length; i++) {
		gif_row.append(generate_div(response.data[i]));
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

function get_topic() {
	topic = $(this).attr("value");
	$.ajax({
		url: "https://api.giphy.com/v1/gifs/search?api_key=Y489HiM8mmuPI3SU3kkniTTFUTGMj1L2&q=&limit=10&offset=0&lang=en&q=" + topic,
		method: "GET"
	}).then(function(response) {
		display_gifs(response, topic);
	});
}

function add_button(topic) {
	var button = $("<button>").addClass("btn get_gifs");
	button.attr("value", topic);
	button.text(capitalize(topic));
	$("#header").append(button);
}

function add_topic(e) {
	event.preventDefault();
	topic = $("#query").val().trim();
	$("#query").val("");
	topics.push(topic);
	add_button(topic);
}

for (var i = 0; i < topics.length; i++) {
	add_button(topics[i]);
}

$(document).on("click", "img", toggle_animation);
$(document).on("click", "#search", add_topic);
$(document).on("click", ".get_gifs", get_topic);

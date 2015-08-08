
(function($){

	$(document).ready(function (){

		// некоторые настройки отображения
		$('.menu_item').hover(
			function white_icon_image () {
				var img = $(this).children('a').children('img');
				var img_src_old = img.attr('src');
				var img_src_new = img_src_old.replace('blue', 'white');
				img.attr('src', img_src_new);
			},
			function blue_icon_image () {
				var img = $(this).children('a').children('img');
				var img_src_old = img.attr('src');
				var img_src_new = img_src_old.replace('white', 'blue');
				img.attr('src', img_src_new);
			}
		);
		function upgradeView () {
			var line_width = $(".author_video").width() - $(".author_nickname").width() - 20;
			$(".line").css("width", line_width);
		}
		upgradeView();

		//КАЛЕНДАРЬ

		function show_calendar(id, year, month) {

			var Dlast = new Date(year,month+1,0).getDate(); //Узнаем количество дней в текущем месяце
			    day_prev_month = new Date(year,month,0).getDate(); //Узнаем количество дней в предыдущем месяце
			    D = new Date(year,month,Dlast); //информация о последнем дне месяца
			    DNlast = new Date(D.getFullYear(),D.getMonth(),Dlast).getDay(); //день недели для последнего дня месяца
			    DNfirst = new Date(D.getFullYear(),D.getMonth(),1).getDay(); //день недели дя первого дня месяца
			    calendar = '<tr>';
			    month=["ЯНВАРЬ","ФЕВРАЛЬ","МАРТ","АПРЕЛЬ","МАЙ","ИЮНЬ","ИЮЛЬ","АВГУСТ","СЕНТЯБРЬ","ОКТЯБРЬ","НОЯБРЬ","ДЕКАБРЬ"];

			//Добавление дней с прошедшего месяца
			if (DNfirst != 0) {
				day_prev_month = day_prev_month-DNfirst+2;
			  	for(var  i = 1; i < DNfirst; i++) {
			  		calendar += '<td>'+day_prev_month;
			  		day_prev_month++;
			  	};
			}else{
				day_prev_month = day_prev_month-5;
			  	for(var  i = 0; i < 6; i++) {
			  		calendar += '<td>'+day_prev_month;
			  		day_prev_month++;
			  	};
			};

			//Добавление дней с текущего месяца
			for(var  i = 1; i <= Dlast; i++) {
			  	if (i == new Date().getDate() && D.getFullYear() == new Date().getFullYear() && D.getMonth() == new Date().getMonth()) {
			    	calendar += '<td class="today"><div>' + i + '</div>';
			  	}else{
			    	if (i > new Date().getDate() && D.getFullYear() == new Date().getFullYear() && D.getMonth() == new Date().getMonth()){
			    		calendar += '<td class="next_days">' + i;
			    	}else{
			    		calendar += '<td>' + i;
			    	}
			  	}
			  	if (new Date(D.getFullYear(),D.getMonth(),i).getDay() == 0) {
			    	calendar += '<tr>';
			  	}
			};

			//Добавление дней со следующего месяца
			var day_next_month = 1;
			if (DNlast != 0) {
				if (D.getFullYear() == new Date().getFullYear() && D.getMonth() == new Date().getMonth()) {
					for(var  i = DNlast; i < 7; i++) {
						calendar += '<td class="next_month_days">'+day_next_month;
						day_next_month++;
					};
				}else{
					for(var  i = DNlast; i < 7; i++) {
						calendar += '<td>'+day_next_month;
						day_next_month++;
					};
				};
			};

			//Выводим данные на страницу
			document.querySelector('#'+id+' tbody').innerHTML = calendar;
			document.querySelector('#'+id+' thead td:nth-child(2)').innerHTML = month[D.getMonth()] +' '+ D.getFullYear();
			document.querySelector('#'+id+' thead td:nth-child(2)').dataset.month = D.getMonth();
			document.querySelector('#'+id+' thead td:nth-child(2)').dataset.year = D.getFullYear();
		}

		show_calendar("calendar", new Date().getFullYear(), new Date().getMonth());

		// переключатель минус месяц
		document.querySelector('#calendar thead tr:nth-child(1) td:nth-child(1)').onclick = function() {
			show_calendar("calendar", document.querySelector('#calendar thead td:nth-child(2)').dataset.year, parseFloat(document.querySelector('#calendar thead td:nth-child(2)').dataset.month)-1);
		}

		// переключатель плюс месяц
		document.querySelector('#calendar thead tr:nth-child(1) td:nth-child(3)').onclick = function() {
			show_calendar("calendar", document.querySelector('#calendar thead td:nth-child(2)').dataset.year, parseFloat(document.querySelector('#calendar thead td:nth-child(2)').dataset.month)+1);
		}


		//VIDEO

	    var controls = {
	        video: $(".my_video"),
	        playpause: $(".play_pause"),
	        playpause_bottom: $(".play_pause_bottom"),
	        total: $(".total"),
		    buffered: $(".buffered"),
		    progress: $(".current"),
		    progress_circle: $(".current_circle"),
		    duration: $(".duration"),
		    currentTime: $(".currenttime"),
		    hasHours: false,
		    dynamic: $(".volume_control"),
		    full_screen: $(".full_screen"),
	        togglePlayback: function() {
		        (video.paused) ? video.play() : video.pause();
		    },
		    play_pause_change: function () {
		    	if (video.paused) {
		            this.playpause.hide();
		            this.playpause_bottom.attr('src','img/video_controls/pause_icon_controls.png');
		        } else {
		            this.playpause.show();
		            this.playpause_bottom.attr('src','img/video_controls/play_icon_controls.png');
		        }
		        this.playpause.toggleClass("paused");
		        this.playpause_bottom.toggleClass("paused");
		    }
	    };

	    var video = controls.video[0];

		controls.playpause.click(function(){
			controls.play_pause_change();
    		controls.togglePlayback();
		});

		controls.playpause_bottom.click(function(){
			controls.play_pause_change();
    		controls.togglePlayback();
		});

		controls.video.click(function() {
			controls.play_pause_change();
		    controls.togglePlayback();
		});

		video.addEventListener("ended", function() {
		    video.pause();
		    controls.playpause.show().toggleClass("paused");
		    controls.playpause_bottom.attr('src','img/video_controls/play_icon_controls.png').toggleClass("paused");
		});

		video.addEventListener("play", function() {
		    controls.playpause.hide();
		    controls.playpause.toggleClass("paused");
		    controls.playpause_bottom.attr('src','img/video_controls/pause_icon_controls.png')
		    controls.playpause_bottom.toggleClass("paused");
		});

		video.addEventListener("pause", function() {
		    controls.playpause.show();
		    controls.playpause.toggleClass("paused");
		    controls.playpause_bottom.attr('src','img/video_controls/play_icon_controls.png')
		    controls.playpause_bottom.toggleClass("paused");
		});

		video.addEventListener("canplay", function() {
		    controls.hasHours = (video.duration / 3600) >= 1.0;
		    controls.duration.text(formatTime(video.duration, controls.hasHours));
		    controls.currentTime.text(formatTime(0),controls.hasHours);
		}, false);

		function formatTime(time, hours) {
		    if (hours) {
		        var h = Math.floor(time / 3600);
		        time = time - h * 3600;
		        var m = Math.floor(time / 60);
		        var s = Math.floor(time % 60);
		        return h.lead0(2)  + ":" + m + ":" + s.lead0(2);
		    } else {
		        var m = Math.floor(time / 60);
		        var s = Math.floor(time % 60);
		        return m + ":" + s.lead0(2);
		    }
		}

		Number.prototype.lead0 = function(n) {
		    var nz = "" + this;
		    while (nz.length < n) {
		        nz = "0" + nz;
		    }
		    return nz;
		};

		video.addEventListener("timeupdate", function() {
		    controls.currentTime.text(formatTime(video.currentTime, controls.hasHours));
		    var progress = Math.floor(video.currentTime) / Math.floor(video.duration);
		    controls.progress[0].style.width = Math.floor(progress * controls.total.width()) + "px";
		}, false);

		controls.total.click(function(e) {
			var el_coordinate = $(this).offset();
			var click_coordinate = e.pageX;
		    var x = (click_coordinate - el_coordinate.left)/$(this).width();
		    video.currentTime = x * video.duration;
		});

		video.addEventListener("progress", function() {
		    if (video.buffered.length != 0) {
		    	var buffered = Math.floor(video.buffered.end(0)) / Math.floor(video.duration);
		    };
		    controls.buffered[0].style.width =  Math.floor(buffered * controls.total.width()) + "px";
		}, false);

		controls.dynamic.click(function() {
		    if(video.muted){
		    	this.setAttribute("src", "img/video_controls/volume_icon.png");
		    } else{
		    	this.setAttribute("src", "img/video_controls/volume_icon_off.png");
		    }
		    video.muted = !video.muted;
		});

		controls.full_screen.on('click', function() {
			if(video.webkitEnterFullscreen) {
				video.webkitEnterFullscreen();
			} else if (video.mozRequestFullScreen) {
				video.mozRequestFullScreen();
			} else {
				alert('Your browsers doesn\'t support fullscreen');
			}
		});


		//Charts

		function render_circle_chart () {
			var example = document.getElementById('circle_graph'),
				ctx = example.getContext('2d'),
				x = example.width / 2,
				y = example.height / 2 - 5,
				r = 54,
				start_angle = 0,
				end_angle = 0,
				counterClockwise = false,
				data_array = [],
				percent_summ = 0,
				graph_el = document.getElementById('circle_graph_data').querySelectorAll('.cell');

			for (var i = 0; i < graph_el.length; i++) {
				var data = graph_el[i].getElementsByTagName("div"),
					example_object = {
						name: data[0].innerHTML,
						percent: data[1].innerHTML,
						back_color: window.getComputedStyle(data[0]).borderTopColor
					};
				data_array.push(example_object);
			};
			for (var i = 0; i < data_array.length; i++) {
				percent_summ =  percent_summ + parseInt(data_array[i].percent);
			};
			if (percent_summ != 100) {
				alert("В графике заданы не корректные данные!!!");
				return;
			};

			for (var i = 0; i < data_array.length; i++) {
				end_angle = end_angle + ((parseInt(data_array[i].percent) / 100 * 360) * (Math.PI / 180));

				ctx.beginPath();
				ctx.arc(x, y, r, start_angle, end_angle, counterClockwise);
				ctx.lineWidth = 22;
				ctx.strokeStyle = data_array[i].back_color;
				console.log(ctx.strokeStyle);
				ctx.stroke();

				start_angle = end_angle;
			};

			ctx.font = "bold 16px ubuntu";
			ctx.fillStyle = "#fff";
			ctx.fillText("JUNE", x-21, y-2);

			ctx.font = "16px ubuntu";
			ctx.fillStyle = "#9099b7";
			ctx.fillText("2013", x-19, y+18);
		};

		render_circle_chart();

		function render_mini_circle (ctx, x, y) {
			var r = 3;
			ctx.strokeStyle = "#fff";
			ctx.lineWidth = 2;
			ctx.beginPath();
			ctx.arc(x, y, r, 0, 2 * Math.PI, false);
			ctx.stroke();
		}
		function render_rect(ctx, x, y, w, h, r, text){
			ctx.fillStyle = "#50597b";
			ctx.beginPath();
			ctx.moveTo(x+r, y);
			ctx.lineTo(x+w-r, y);
			ctx.quadraticCurveTo(x+w, y, x+w, y+r);
			ctx.lineTo(x+w, y+h-r);
			ctx.quadraticCurveTo(x+w, y+h, x+w-r, y+h);
			ctx.lineTo(x+r, y+h);
			ctx.quadraticCurveTo(x, y+h, x, y+h-r);
			ctx.lineTo(x, y+r);
			ctx.quadraticCurveTo(x, y, x+r, y);
			ctx.fill();

			ctx.beginPath();
			ctx.fillStyle = "#fff";
			ctx.font = "10px ubuntu"
			ctx.fillText("+" + text, x+2, y+10)
		}
		function render_line_chart () {
			var example = document.getElementById('line_graph'),
				ctx = example.getContext('2d'),
				data_array = [],
				graph_el = document.getElementById('line_graph_data').querySelectorAll('.cell'),
				one_line = 24,
				max_percent = 30,
				one_percent_in_pixel = one_line*3/max_percent,
				x = 0,
				y = example.height-1;

			for (var i = 1; i < graph_el.length; i = i+2) {
				data_array.push(graph_el[i].innerHTML)
			};

			ctx.strokeStyle = "#009699";

			for (var i = 0; i < 4; i++) {
				ctx.beginPath();
				ctx.moveTo(x,y);
				ctx.lineTo(example.width, y);
				ctx.stroke();
				y = y - one_line;
			};

			ctx.strokeStyle = "#fff";
			x = 25;
			y = example.height - (data_array[0] * one_percent_in_pixel);

			render_mini_circle(ctx, x, y);
			render_rect(ctx, x-10, y-25, 22, 15, 3, data_array[0]);

			for (var i = 1; i < data_array.length; i++) {
				ctx.lineWidth = 1;
				ctx.beginPath();
				ctx.moveTo(x+3, y);
				x = x + 130;
				y = example.height - (data_array[i] * one_percent_in_pixel);
				ctx.lineTo(x-3, y);
				ctx.stroke();
				render_mini_circle(ctx, x, y);
				render_rect(ctx, x-10, y-25, 22, 15, 3, data_array[i]);
			};
		};
		render_line_chart();
	});


})(window.jQuery);

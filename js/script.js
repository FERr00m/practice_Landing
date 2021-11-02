window.addEventListener('DOMContentLoaded', function() {
	try {
		//swiper
		const swiper = new Swiper('.swiper', {
			// Optional parameters
			direction: 'horizontal',
			loop: true,
			freeMode: true,
			autoplay: {
				delay: 2500,
				disableOnInteraction: false,
			},
			slidesPerView: 6,
			spaceBetween: 74,
			pagination: {
				el: ".swiper-pagination",
				clickable: true,
			},
			breakpoints: {
				// when window width is >= 320px
				320: {
					slidesPerView: 2,
					spaceBetween: 20
				},
				// when window width is >= 480px
				480: {
					slidesPerView: 3,
					spaceBetween: 30
				},
				// when window width is >= 640px
				640: {
					slidesPerView: 6,
					spaceBetween: 74
				}
			}
		});
	} catch (error) {
		console.error(error);
	}

	try {
		const form = document.getElementById('form');

		const modalWrap = $('.modal-wrap'),
			loader = $('.loader')

		form.addEventListener('submit', function(e) {
			e.preventDefault();

			let body = {},
				data = new FormData(form);

			data.forEach((val, key) => {
        body[key] = val.toLowerCase().trim();
      });

			fetch(`https://melalex.ru/handlers/emailHandler.php`, {
				method: "POST",
				headers: {
					'Content-type': 'application/json; charset=utf-8',
					'Set-Cookie': 'SameSite=None'
				},
				credentials: 'include',
				body: JSON.stringify(body)
			})
			.then(response => {
					modalWrap.fadeIn()

					if (!response.ok) throw Error(response.statusText);
					setTimeout(() => {
						loader.fadeOut();
					}, 1000)
					return response.json();
			})
			.then(data => {
				if(data.answerFromServer === 'ok') {
					console.log(data)
				} else {
					console.log('Ошиька на сервере')
				}

			})
			.catch(error => {
				setTimeout(() => {
					loader.fadeOut();
				}, 1000)
				console.error(error)
			});
		})

	} catch (error) {
		console.error(error);
	}

	try {
		//burger menu
		const burger = $('.burger-icon'),
			body = $('body'),
			close = $('.close'),
			divs = $('.close div'),
			nav = $('.nav');

		burger.on('click', function() {
			nav.toggleClass('active');
			body.toggleClass('nav-active');
			divs.toggleClass('active');
		})
		close.on('click', function() {
			nav.toggleClass('active');
			body.toggleClass('nav-active');
			divs.toggleClass('active');
		})
	} catch (error) {
		console.error(error);
	}
});

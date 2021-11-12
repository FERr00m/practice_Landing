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
			modalWindowWrap = $('.modal-window-wrap'),
			loader = $('.loader'),
			closeModal = $('#close-modal');

		const htmlSuccess = `<p>Thank you! :)</p>
			<p>On your email: <span id="email-person"></span> we send a letter</p>`;htmlFailed = `<p>Something went <span class="special">wrong</span> :(</p>
				<p>Try again, please.</p>`

			modalWrap.on('click', function(e) {
			if (e.target.id === 'modal') {
				modalWrap.fadeOut('slow')
				modalWindowWrap.fadeOut('slow')
			}

		})
		closeModal.on('click', function() {
			modalWrap.fadeOut('slow')
			modalWindowWrap.fadeOut('slow')
		})

		form.addEventListener('submit', function(e) {
			e.preventDefault();

			loader.fadeIn()
			modalWrap.fadeIn()
			let body = {},
				data = new FormData(form);

			data.forEach((val, key) => {
        body[key] = val.toLowerCase().trim();
      });

			fetch(`https://melalex.ru/handlers/emailHandler.php`, {
				method: "POST",
				headers: {
					'Content-type': 'application/json; charset=utf-8'
				},
				credentials: 'include',
				body: JSON.stringify(body)
			})
			.then(response => {

					if (!response.ok) throw Error(response.statusText);
					return response.json();
			})
			.then(data => {
				if (data.msgSendError) throw Error(data.msgSendError)
				setTimeout(() => {
					loader.fadeOut();
					$('.modal-window').html(htmlSuccess);
					$('#email-person').html(data.email)
					modalWindowWrap.fadeIn()
				}, 1000)
			})
			.catch(error => {
				setTimeout(() => {
					loader.fadeOut();
					$('.modal-window').html(htmlFailed);
					modalWindowWrap.fadeIn()
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
			close = $('#close-nav'),
			divs = $('#close-nav div'),
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

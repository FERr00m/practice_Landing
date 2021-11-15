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
		//form submit
		const form = document.getElementById('form');

		const modalWrap = $('#modal-form'),
			modalWindowWrap = $('.modal-form-wrap'),
			loader = $('.loader'),
			inputEmail = document.querySelector('.form-input'),
			formAlert = $('.form-alert');

		const htmlSuccess = `<p>Thank you! :)</p>
			<p>On your email: <span id="email-person"></span> we send a letter</p>`;htmlFailed = `<p>Something went <span class="special">wrong</span> :(</p>
				<p>Try again, please.</p>`

		inputEmail.addEventListener('input', function() {
			console.log(this.value);
      this.value = this.value.replace(/[^a-z@\-_.!~*'0-9]/gi, '');
    });

		form.addEventListener('submit', function(e) {
			e.preventDefault();
			if (!/^\w+@\w+\.\w{2,}$/.test(inputEmail.value)) {
				formAlert.animate({
					opacity: 1,
					height: '30px'
				});
				return
			} else {
				formAlert.animate({
					opacity: 0,
					height: 0
				});
			}

			loader.fadeIn()
			modalWrap.fadeIn()
			let body = {},
				data = new FormData(form);

			data.forEach((val, key) => {
        body[key] = val.toLowerCase().trim();
      });

			let url = 'https://melalex.ru/handlers/emailHandler.php',
				fakeUrl = '/php/fakeServer.json';

			fetch(`${fakeUrl}`, {
				// method: "POST",
				// headers: {
				// 	'Content-type': 'application/json; charset=utf-8'
				// },
				// credentials: 'include',
				// body: JSON.stringify(body)
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

	try {
		const closeModalBtns = $('.close-modal'),
			modalWraps = $('.modal-wrap');

		closeModalBtns.each(function() {
			$(this).on('click', function(e) {
				let target = $(e.target);
				target.closest('.modal-wrap').fadeOut();
				target.closest('.modal-window-wrap').fadeOut();
			})
		})

		modalWraps.each(function() {
			$(this).on('click', function(e) {
				let target = $(e.target);
				if (target.is('.modal-wrap'))
					target.closest('.modal-wrap').fadeOut();
					target.find('.modal-window-wrap').fadeOut();
			})
		})

		// modalWrap.on('click', function(e) {
		// 	if (e.target.matches('.modal-wrap')) {
		// 		modalWrap.fadeOut('slow')
		// 		modalWindowWrap.fadeOut('slow')
		// 	}

		// 	})

		//Modals sign-in & sign-up
		const modalSignIn = $('#modal-sign-in'),
			signInBtn = $('.jq-sign-in'),
			signUpBtn = $('.jq-sign-up'),
			modalSignUp = $('#modal-sign-up');

		signInBtn.on('click', function() {
			modalSignIn.fadeIn()
		})
	} catch (error) {
		console.error(error);
	}
});

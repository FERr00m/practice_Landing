window.addEventListener('DOMContentLoaded', function() {
	try {
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
});

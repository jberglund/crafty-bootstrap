import Barba from 'barba.js';
import anime from 'animejs';

Barba.Dispatcher.on('newPageReady', function(currentStatus, oldStatus, container) {
	// New view is ready
});

var FadeTransition = Barba.BaseTransition.extend({
	start: function() {
		Promise
			.all([this.newContainerLoading, this.fadeOut()])
			.then(this.fadeIn.bind(this));
	},

	fadeOut: function() {

		var anim = anime({
			targets: this.oldContainer,
			opacity: 0,
			easing: 'easeInOutCubic'
		});

		return anim.finished;
	},

	fadeIn: function() {
		this.oldContainer.style.display = 'none';
		this.newContainer.style.visibility = 'visible';

		var anim = anime({
			targets: this.newContainer,
			opacity: [0,1],
			easing: 'easeInOutCubic'
		});

		anim.complete = this.done();
	} 
});

/**
 * Next step, you have to tell Barba to use the new Transition
 */

Barba.Pjax.getTransition = function() {
	return FadeTransition;
};


Barba.Pjax.start();

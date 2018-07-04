import EventBus from './utils/EventBus';
import Router from './utils/router';
import drawPageAbout from './about/about';
import getMatrix from './matrix/matrix';

export const eventBus = new EventBus();
const main = document.querySelector('#main');

eventBus.on('matrix', getMatrix);
eventBus.trigger('matrix', {col: 7, row: 5});

var router = new Router({
	routes: [
		{
			name: 'About',
			match: '',
			onEnter: () => {
				drawPageAbout(main);
			}
		},

		{
			name: 'text',
			match: 'text',
			onEnter: () => {
				main.innerHTML = 'text';

			}
		},

		{
			name: 'canvas',
			match: 'canvas',
			onEnter: () => {
				main.innerHTML = 'canvas';
			}
		},

		{
			name: 'SVG',
			match: 'svg',
			onEnter: () => {
				main.innerHTML = 'svg';
			}
		}
		]});
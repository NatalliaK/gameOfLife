import EventBus from './utils/EventBus';
import Router from './utils/router';
import drawPageAbout from './about/about';
import Controls from './controls/controls';
import TextField from './textField/textField';
import CanvasField from './canvasField/canvasField';
import SvgField from './svgField/svgField';

export const eventBus = new EventBus();
const main = document.querySelector('#main');

eventBus.on('drawPageAbout', drawPageAbout);
eventBus.on('initTextField', TextField);
// eventBus.trigger('subscribeToClick');
// eventBus.trigger('play');

var router = new Router({
	routes: [
		{
			name: 'About',
			match: '',
			onEnter: () => {
				eventBus.trigger('drawPageAbout', main);
			},

			onLeave: () => {
				main.innerHTML = '';
			}
		},

		{
			name: 'text',
			match: 'text',
			onEnter: () => {

				var field = document.createElement('div');
				field.id = 'game-field';
				field.classList.add('main__game-field');

				if (!main.childNodes.length) {
					main.innerHTML = '<div id="controls"></div>';

					let controls = document.querySelector('#controls');
					new Controls(controls);
				}

				main.insertAdjacentHTML('afterBegin', '<div id="game-field" class="main__game-field"></div>');

				let row = main.querySelector('#x').options[main.querySelector('#x').selectedIndex].value;
				let col = main.querySelector('#y').options[main.querySelector('#y').selectedIndex].value;
				new TextField({ htmlEl: document.querySelector('#game-field'), row: row, col: col});

				// eventBus.on('play', () => {
				// 	console.log('play');
				// });
			},

			onLeave: () => {
				document.querySelector('#game-field').remove();
			}
		},

		{
			name: 'canvas',
			match: 'canvas',
			onEnter: () => {
				if (!main.childNodes.length) {
					main.innerHTML = '<div id="game-field" class="main__game-field"></div><div id="controls"></div>';
					var field = document.querySelector('#game-field');
					var controls = document.querySelector('#controls');

					new Controls(controls);

				} else {
					field = document.createElement('div');
					field.id = 'game-field';
					controls = document.querySelector('#controls');
					main.insertBefore(field, controls);
				}

				let row = main.querySelector('#x').options[main.querySelector('#x').selectedIndex].value;
				let col = main.querySelector('#y').options[main.querySelector('#y').selectedIndex].value;

				new CanvasField({ htmlEl: field, row: row, col: col});
			},

			onLeave: () => {
				document.querySelector('#game-field').remove();
			}
		},

		{
			name: 'SVG',
			match: 'svg',
			onEnter: () => {
				if (!main.childNodes.length) {
					main.innerHTML = '<div id="game-field" class="main__game-field"></div><div id="controls"></div>';
					var field = document.querySelector('#game-field');
					var controls = document.querySelector('#controls');
					new Controls(controls);

				} else {
					field = document.createElement('div');
					field.id = 'game-field';
					controls = document.querySelector('#controls');
					main.insertBefore(field, controls);
				}

				let row = main.querySelector('#x').options[main.querySelector('#x').selectedIndex].value;
				let col = main.querySelector('#y').options[main.querySelector('#y').selectedIndex].value;

				new SvgField({col: col, row: row, htmlEl: field});
			},

			onLeave: () => {
				document.querySelector('#game-field').remove();
			}
		}
		]});
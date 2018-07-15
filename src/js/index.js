import EventBus from './utils/EventBus';
import Router from './utils/router';
import drawPageAbout from './about/about';
import GetMatrixGame from './matrix/matrix';
import TextField from './textField/textField';
import CanvasField from './canvasField/canvasField';
import SvgField from './svgField/svgField';

export const eventBus = new EventBus();
const main = document.querySelector('#main');
var state = {};
//export var count = 1;

eventBus.on('drawPageAbout', drawPageAbout);

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
					main.innerHTML = '<div id="controls"></div>';

					var controls = document.querySelector('#controls');
					main.insertAdjacentHTML('afterBegin', '<div id="game-field" class="main__game-field"></div>');
					var field = document.querySelector('#game-field');
					new TextField();
					if (!state.count) {
						//new GetMatrixGame({controlsCont: controls, fieldCont: field, state: state});
					}
			},

			onLeave: () => {
				// eventBus.off('field: drawGameField');
				// eventBus.off('changeSizeGameField');
				// eventBus.off('matrix: playGame');
				// eventBus.off('matrix: stopGame');
				// eventBus.off('setSpeedGame');
				main.innerHTML = '';
			}
		},

		{
			name: 'canvas',
			match: 'canvas',
			onEnter: () => {
				if (!document.querySelector('#game-field')) {
					var field = document.createElement('div');
					field.id = 'game-field';
					field.classList.add('main__game-field');
					main.innerHTML = '<div id="controls"></div>';

					let controls = document.querySelector('#controls');
					main.insertAdjacentHTML('afterBegin', '<div id="game-field" class="main__game-field"></div>');
					let field = document.querySelector('#game-field');
					new CanvasField();
					new GetMatrixGame({controlsCont: controls, fieldCont: field});
				} else {
					new CanvasField();
				}
			},

			onLeave: () => {
				eventBus.off('field: drawGameField');
				document.querySelector('#game-field').innerHTML = '';
			}
		},

		{
			name: 'SVG',
			match: 'svg',
			onEnter: () => {
				var field = document.createElement('div');
				field.id = 'game-field';
				field.classList.add('main__game-field');

				if (!main.childNodes.length) {
					main.innerHTML = '<div id="controls"></div>';

					let controls = document.querySelector('#controls');
					main.insertAdjacentHTML('afterBegin', '<div id="game-field" class="main__game-field"></div>');
					let field = document.querySelector('#game-field');
					new SvgField();
					new GetMatrixGame({controlsCont: controls, fieldCont: field});
				} else {
					main.insertAdjacentHTML('afterBegin', '<div id="game-field" class="main__game-field"></div>');
					new SvgField();
				}
			},

			onLeave: () => {
				eventBus.off('field: drawGameField');
				document.querySelector('#game-field').remove();
			}
		}
		]});
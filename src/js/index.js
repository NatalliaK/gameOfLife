import EventBus from './utils/EventBus';
import Router from './utils/router';
import drawPageAbout from './about/about';
import GetMatrixGame from './matrix/matrix';
import TextField from './textField/textField';
import CanvasField from './canvasField/canvasField';
import SvgField from './svgField/svgField';

export const eventBus = new EventBus();
const about = document.querySelector('#about');
const controls = document.querySelector('#controls');
const fieldCont = document.querySelector('#game-field');
var state = {count: 1};
var game = new GetMatrixGame({state: state, controlsCont: controls, fieldCont: fieldCont});

document.querySelector('#new-game').addEventListener('click', _ => {
	document.querySelector('#btn-play').innerHTML = '<img id="play" src="img/play.png" class="controls__img">';
	state = {};
	state.count = 1;
	//game.drawNewField();
	eventBus.trigger('newGame');
	eventBus.trigger('matrix: stopGame');
});

eventBus.on('drawPageAbout', drawPageAbout);

var router = new Router({
	routes: [
		{
			name: 'About',
			match: '',
			onBeforeEnter: () => {
				controls.classList.add('hide');
				eventBus.trigger('matrix: stopGame');
			},

			onEnter: () => {
				eventBus.trigger('drawPageAbout', about);
			},

			onLeave: () => {
				about.innerHTML = '';
				controls.classList.remove('hide');
			}
		},

		{
			name: 'text',
			match: 'text',
			onEnter: () => {
				new TextField(state, fieldCont);
			},

			onLeave: () => {
				fieldCont.innerHTML = '';
				eventBus.off('field: drawGameField');
			}
		},

		{
			name: 'canvas',
			match: 'canvas',
			onEnter: () => {
				new CanvasField(state, fieldCont);
			},

			onLeave: () => {
				fieldCont.innerHTML = '';
				eventBus.off('field: drawGameField');
			}
		},

		{
			name: 'SVG',
			match: 'svg',
			onEnter: () => {
				new SvgField(state, fieldCont);
			},

			onLeave: () => {
				fieldCont.innerHTML = '';
				eventBus.off('field: drawGameField');
			}
		}
		]});
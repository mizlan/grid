/* import {hexToRGB} from 'util' */

class Point {
	constructor(public x: number, public y: number) {}
}

/**
 * Add an alpha value to any hex code.
 * @returns an rgba string
 */
let hexToRGB = (hex: string, alpha: string): string => {
	const r = parseInt(hex.slice(1, 3), 16);
	const g = parseInt(hex.slice(3, 5), 16);
	const b = parseInt(hex.slice(5, 7), 16);

	if (alpha) {
		return `rgba(${r}, ${g}, ${b}, ${alpha})`;
	} else {
		return `rgba(${r}, ${g}, ${b})`;
	}
}

class App {
	/** canvas DOM object */
	private canvas: HTMLCanvasElement;
	/** canvas 2d context */
	private ctx: CanvasRenderingContext2D;

	/** the origin of the grid */
	private origin: Point;
	/** the number of pixels per one step */
	private stepSize: number;
	/** distance one step corresponds with */
	private stepRange: number;
	/** list of colors to use */
	private colors = ['#9c7979', '#9c9279', '#799c7d', '#799c97', '#798c9c', '#93799c', '#9c798f']
	/** data used to detect when the grid is dragged */
	private lastMousePos = {x: 0, y: 0};
	/** is the mouse down on the grid */
	private mouseIsDown = false;

	constructor() {
		// initialize canvas
		this.canvas = document.getElementById('canv') as HTMLCanvasElement;
		this.ctx = this.canvas.getContext('2d');
		this.origin = new Point(0, 0);

		// add mouse listeners to detect drag
		this.addMouseListeners();

		// set default step size
		this.stepSize = 50;
		this.stepRange = 1;

		// initialize width/height and draw the grid basis
		this.resize();
		this.drawBasis();
	}

	/**
	 * add mouselisteners to detect when the mouse is pressed down on the grid
	 */
	addMouseListeners() {
		// check when mouse is pressed down, and locate position
		this.canvas.addEventListener('mousedown', (event) => {
			this.mouseIsDown = true;
			this.lastMousePos.x = event.x;
			this.lastMousePos.y = event.y;
		});
		// detect mouseup
		this.canvas.addEventListener('mouseup', () => {
			this.mouseIsDown = false;
		});
		// when mouse moves, calculate distance between old and new positions,
		// and use that to shift the grid
		this.canvas.addEventListener('mousemove', (event) => {
			if (!this.mouseIsDown) return;
			if (this.lastMousePos.x !== undefined && this.lastMousePos.y !== undefined) {
				let mDx = event.x - this.lastMousePos.x;
				let mDy = event.y - this.lastMousePos.y;
				this.shiftOrigin(mDx, mDy);
				this.drawBasis();
				this.updateAll();
			}
			// update mouse position
			this.lastMousePos.x = event.x;
			this.lastMousePos.y = event.y;
		});
	}

	/**
	 * Change step size and redraw the grid basis and shapes
	 */
	changeStepSize(newSize: number) {
		this.stepSize = newSize;
		this.drawBasis();
		this.updateAll();
	}

	/**
	 * Change step range and redraw the grid basis and shapes
	 */
	changeStepRange(newRange: number) {
		this.stepRange = newRange;
		this.drawBasis();
		this.updateAll();
	}

	/**
	 * Update the canvas visible width and height
	 * @param resetOrigin - re-center the origin.
	 */
	resize(resetOrigin = true): void {
		let w = window.getComputedStyle(this.canvas, null).getPropertyValue("width");
		let h = window.getComputedStyle(this.canvas, null).getPropertyValue("height")
		// may need add 8 pixels to height, for some reason. however am using
		// overflow-y: hidden, which disables scroll and excess
		this.canvas.setAttribute('width', w);
		this.canvas.setAttribute('height', h);

		if (resetOrigin)
			this.origin = new Point(this.canvas.width/2, this.canvas.height/2);

		// for some reason, these values are reset inside this function, so set them back
		this.ctx.lineCap = 'round';
		this.ctx.lineJoin = 'round';
	}

	/**
	 * Clears grid
	 */
	clearGrid() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}

	/**
	 * Move the origin
	 * @remarks
	 * this method does NOT redraw basis, nor change height.
	 */
	shiftOrigin(deltaX: number, deltaY: number) {
		this.origin.x += deltaX;
		this.origin.y += deltaY;
	}

	/**
	 * Draw an x guideline given an x-coordinate
	 */
	drawXGuideline(position: number) {
		this.ctx.lineWidth = 2;
		this.ctx.strokeStyle = '#eeeeee';
		this.ctx.beginPath();
		this.ctx.moveTo(position, 0);
		this.ctx.lineTo(position, this.canvas.height);
		this.ctx.stroke();
		this.ctx.closePath();
	}

	/**
	 * Draw an y guideline given an y-coordinate
	 */
	drawYGuideline(position: number) {
		this.ctx.lineWidth = 2;
		this.ctx.strokeStyle = '#eeeeee';
		this.ctx.beginPath();
		this.ctx.moveTo(0, position);
		this.ctx.lineTo(this.canvas.width, position);
		this.ctx.stroke();
		this.ctx.closePath();
	}

	/**
	 * Draw all tick marks, origin, and main axes
	 */
	drawBasis(): void {
		// tick marks
		for (let pos = this.origin.x + this.stepSize; pos < this.canvas.width; pos += this.stepSize) {
			this.drawXGuideline(pos);
		}
		for (let pos = this.origin.x - this.stepSize; pos > 0; pos -= this.stepSize) {
			this.drawXGuideline(pos);
		}
		for (let pos = this.origin.y + this.stepSize; pos < this.canvas.height; pos += this.stepSize) {
			this.drawYGuideline(pos);
		}
		for (let pos = this.origin.y - this.stepSize; pos > 0; pos -= this.stepSize) {
			this.drawYGuideline(pos);
		}
		this.ctx.lineWidth = 2;
		this.ctx.fillStyle = '#c9c9c9';
		this.ctx.strokeStyle = '#c9c9c9';
		// the origin
		this.ctx.beginPath();
		this.ctx.arc(this.origin.x, this.origin.y, 5, 0, Math.PI * 2);
		this.ctx.fill();
		this.ctx.closePath();
		// y axis
		this.ctx.lineWidth = 2;
		this.ctx.strokeStyle = '#c9c9c9';
		this.ctx.beginPath();
		this.ctx.moveTo(this.origin.x, 0);
		this.ctx.lineTo(this.origin.x, this.canvas.height);
		this.ctx.stroke();
		this.ctx.closePath();
		// x axis
		this.ctx.lineWidth = 2;
		this.ctx.strokeStyle = '#c9c9c9';
		this.ctx.beginPath();
		this.ctx.moveTo(0, this.origin.y);
		this.ctx.lineTo(this.canvas.width, this.origin.y);
		this.ctx.stroke();
		this.ctx.closePath();
	}

	/**
	 * Locate the actual coordinates of a point on the canvas, given a grid point
	 **/
	canvLocate(point: Point): Point {
		return new Point(
			this.origin.x + (this.stepSize * point.x) / this.stepRange,
			this.origin.y - (this.stepSize * point.y) / this.stepRange
		);
	}

	/**
	 * Fill in a polygon onto the grid given an array of vertices
	 */
	gridPoly(points: Point[], color: string): void {
		if (points.length === 0)
			return;
		this.ctx.fillStyle = hexToRGB(color, '0.5');
		this.ctx.strokeStyle = color;
		this.ctx.lineWidth = 5;
		this.ctx.moveTo(points[0].x, points[0].y);
		this.ctx.beginPath();
		for (let point of points) {
			let pt = this.canvLocate(point);
			this.ctx.lineTo(pt.x, pt.y);
		}
		this.ctx.closePath();
		this.ctx.stroke();
		this.ctx.fill();
	}

	/**
	 * Add a rectangle
	 * @param left - the left x coordinate
	 * @param right - the right x coordinate
	 * @param top - the top y coordinate
	 * @param bottom - the bottom y coordinate
	 */
	addRect(left: number, right: number, top: number, bottom: number, color: string): void {
		let points: Point[] = [];
		points.push(new Point(left, top));
		points.push(new Point(left, bottom));
		points.push(new Point(right, bottom));
		points.push(new Point(right, top));
		this.gridPoly(points, color);
	}

	/**
	 * Add a circle
	 */
	addCirc(radius: number, center: Point, color: string) {
		this.ctx.strokeStyle = color;
		this.ctx.fillStyle = hexToRGB(color, '0.5');
		this.ctx.lineWidth = 5;
		this.ctx.beginPath();
		let pt = this.canvLocate(center);
		this.ctx.arc(pt.x, pt.y, radius * this.stepSize, 0, Math.PI * 2);
		this.ctx.fill();
		this.ctx.stroke();
		this.ctx.closePath();
	}

	/**
	 * Add a polygon
	 * @param coordStyle - either xyxy (coordinates grouped) or xxyy (split)
	 */
	addPoly(pts: number[], color: string, coordStyle: "xyxy" | "xxyy") {
		let points: Point[] = [];
		switch (coordStyle) {
			case "xyxy":
				for (let i = 0; i < pts.length; i+= 2) {
					points.push(new Point(pts[i], pts[i+1]));
				};
				break;
			case "xxyy":
				let half = Math.floor(pts.length / 2);
				for (let i = 0; i < half; i++) {
					points.push(new Point(pts[i], pts[i + half]));
				}
				break;
			default:
				break;
		};
		this.gridPoly(points, color);
	}

	/**
	 * Check array for NaNs
	 */
	isValid(arr: number[]): boolean {
		// check for NaN
		for (let x of arr)
			if (Number.isNaN(x))
				return false;
		return true;
	}

	isValidRect(arr: number[]): boolean {
		return this.isValid(arr) && (arr.length === 4);
	}

	isValidCirc(arr: number[]): boolean {
		return this.isValid(arr) && arr.length === 3;
	}

	isValidPoly(arr: number[]): boolean {
		return this.isValid(arr) && arr.length % 2 === 0;
	}

	// TODO: split function into one separate one (not in class) that
	// takes in the shapes, and another one within the class that processes

	/**
	 * Update all the shapes, read them from the HTML list
	 */
	updateAll(): void {
		this.clearGrid();
		this.drawBasis();
		const shapeList = document.getElementById('shapes') as HTMLUListElement;
		shapeList.childNodes.forEach((value, position) => {
			let options = (value as HTMLElement).getElementsByTagName('select');
			let shapeType = options[0].value;
			let isMultiLine = options[1].value === 'm';
			let input = (value as HTMLElement).getElementsByTagName('textarea')[0].value.trim();
			let shapes: number[][] = [];
			if (isMultiLine) {
				let numbers = input.split(/[\n ]+/).map(x => +x);
				shapes = [numbers];
			} else {
				shapes = input.split(/\n+/).map(line => line.split(/ +/).map(x => +x));
			}
			let color = this.colors[position % this.colors.length];
			for (let numbers of shapes) {
				switch (shapeType) {
					case 'rectangle':
						if (this.isValidRect(numbers)) {
							this.addRect(numbers[0], numbers[1], numbers[2], numbers[3], color);
						}
						break;
					case 'circle':
						if (this.isValidCirc(numbers)) {
							this.addCirc(numbers[0], new Point(numbers[1], numbers[2]), color);
						}
						break;
					case 'poly xyxy':
						if (this.isValidPoly(numbers)) {
							this.addPoly(numbers, color, 'xyxy');
						}
						break;
					case 'poly xxyy':
						if (this.isValidPoly(numbers)) {
							this.addPoly(numbers, color, 'xxyy');
						}
						break;
					default:
						break;
				}
			}
		});
	}
}

let app = new App();

const addShapeButton = document.getElementById('add');
const shapeList = document.getElementById('shapes') as HTMLUListElement;
const shapes = ['rectangle', 'circle', 'poly xyxy', 'poly xxyy'];
const keyIsDown = new Map<string, boolean>();

shapeList.addEventListener('input', (event) => {
	let target = (event.target as HTMLElement);
	if (target.tagName === 'TEXTAREA') {
		app.updateAll();
	}
});

shapeList.addEventListener('change', (event) => {
	let target = (event.target as HTMLElement);
	if (target.tagName === 'SELECT') {
		app.updateAll();
	}
});

let triggerKeyEffects = (key: string) => {
	switch (key) {
		case 'a':
			addNewShape();
			shapeList.lastElementChild.getElementsByTagName('textarea')[0].focus();
			break;
		default:
			break;
	};
}

window.addEventListener('keydown', (event) => {
	let ignore = ['SELECT', 'TEXTAREA'];
	let target = (event.target as HTMLElement);
	// use escape to blur
	if (event.key === 'Escape') {
		target.blur();
		return;
	}
	if (!ignore.includes(target.tagName)) {
		keyIsDown[event.key] = true;
	}
});

window.addEventListener('keyup', (event) => {
	let key = event.key;
	if (keyIsDown[key])
		triggerKeyEffects(key);
	keyIsDown[key] = false;
});

let addNewShape = () => {
	// add new list element
	let li = document.createElement('li');
	// add area for text
	let di = document.createElement('div');
	let tx = document.createElement('textarea');
	di.append(tx);
	di.style.width = '100%';
	di.classList.add('w-wrap');
	// add selection for shape type
	let se = document.createElement('select');
	// add selection for single or multi
	let sm = document.createElement('select');
	li.append(se);
	li.append(sm);
	li.append(di);
	shapeList.append(li);
	for (let shape of shapes) {
		let option = document.createElement('option');
		option.append(document.createTextNode(shape));
		se.append(option);
	}
	for (let t of ['s', 'm']) {
		let option = document.createElement('option');
		option.append(document.createTextNode(t));
		sm.append(option);
	}
}

// add new shapes
addShapeButton.addEventListener('click', () => {
	addNewShape();
});

window.addEventListener('resize', () => {
	app.resize();
	app.drawBasis();
	app.updateAll();
});

const sizeInput = document.getElementById('size') as HTMLInputElement;
sizeInput.addEventListener('input', () => {
	if (sizeInput.value === '') {
		app.changeStepSize(50);
	}
	let p = +sizeInput.value;
	if (!Number.isNaN(p)) {
		if (p > 20)
			app.changeStepSize(p);
	}
});
const rangeInput = document.getElementById('range') as HTMLInputElement;
rangeInput.addEventListener('input', () => {
	if (rangeInput.value === '') {
		app.changeStepRange(1);
	}
	let p = +rangeInput.value;
	if (!Number.isNaN(p)) {
		if (p > 0)
			app.changeStepRange(p);
	}
});

// vim: set fdm=syntax fdl=10: (fold subsections)

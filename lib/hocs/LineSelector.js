'use strict';

exports.__esModule = true;
exports.methods = exports.TYPE = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.intersects = intersects;
exports.area = area;

var _offsetCoordinates = require('../utils/offsetCoordinates');

var TYPE = exports.TYPE = 'LINE';

function intersects(_ref, geometry) {
	var x = _ref.x,
	    y = _ref.y;

	if (x < geometry.x) return false;
	if (y < geometry.y) return false;
	if (x > geometry.x + geometry.width) return false;
	if (y > geometry.y + geometry.height) return false;

	return true;
}

function area(geometry) {
	return geometry.height * geometry.width;
}

var methods = exports.methods = {
	onMouseDown: function onMouseDown(annotation, e) {
		if (!annotation.selection) {
			var coordOfClick = (0, _offsetCoordinates.getCoordPercentage)(e);
			var x = coordOfClick.x;
			var y = coordOfClick.y;
			var width = 0;
			var height = 0;
			return _extends({}, annotation, {
				geometry: _extends({}, annotation.geometry, {
					type: TYPE,
					x: x,
					y: y,
					width: width,
					height: height,
					points: [coordOfClick]
				}),
				id: Math.random(),
				selection: _extends({}, annotation.selection, {
					mode: 'SELECTING'
				})
			});
		} else {
			return {};
		}
		return annotation;
	},
	onMouseUp: function onMouseUp(annotation, e) {
		if (annotation.selection) {
			var selection = annotation.selection,
			    geometry = annotation.geometry;

			if (!geometry) {
				return {};
			}
			var coordOfClick = (0, _offsetCoordinates.getCoordPercentage)(e);
			var points = [].concat(geometry.points, [coordOfClick]);
			var x = points.sort(function (a, b) {
				return a.x < b.x ? -1 : 1;
			})[0].x;
			var y = points.sort(function (a, b) {
				return a.y < b.y ? -1 : 1;
			})[0].y;
			var width = points.sort(function (a, b) {
				return a.x > b.x ? -1 : 1;
			})[0].x - x;
			var height = points.sort(function (a, b) {
				return a.y > b.y ? -1 : 1;
			})[0].y - y;
			switch (annotation.selection.mode) {
				case 'SELECTING':
					return _extends({}, annotation, {
						geometry: _extends({}, geometry, {
							type: TYPE,
							x: x,
							y: y,
							width: width,
							height: height,
							points: points
						}),
						selection: _extends({}, annotation.selection, {
							showEditor: true,
							mode: 'EDITING'
						})
					});
				default:
					break;
			}
		}
		return annotation;
	}
};

exports.default = {
	TYPE: TYPE,
	intersects: intersects,
	area: area,
	methods: methods
};
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _offsetCoordinates = require('../../utils/offsetCoordinates');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Point(props) {
  var _props$annotation = props.annotation,
      geometry = _props$annotation.geometry,
      data = _props$annotation.data,
      selection = _props$annotation.selection;
  var color = props.color,
      isMouseHovering = props.isMouseHovering,
      onSubmit = props.onSubmit;

  if (!geometry) return null;
  var item = geometry.points[0];
  return _react2.default.createElement('div', {
    draggable: !selection ? true : false,
    onDragEnd: function onDragEnd(e) {
      var point = (0, _offsetCoordinates.getOffsetCoordPercentage)(e, document.getElementsByClassName('annotationWrapper')[0]);
      if (item.x === point.x || item.y === point.y || point.y > 100 || point.x > 100 || point.y < 0 || point.x < 0) {
        return;
      }
      geometry.points[0] = point;
      var points = props.annotation.geometry ? Object.assign([], props.annotation.geometry.points) : [];
      onSubmit(_extends({}, props.annotation, {
        geometry: _extends({}, geometry, {
          x: points.sort(function (a, b) {
            return a.x < b.x ? -1 : 1;
          })[0].x,
          y: points.sort(function (a, b) {
            return a.y < b.y ? -1 : 1;
          })[0].y,
          width: points.sort(function (a, b) {
            return a.x > b.x ? -1 : 1;
          })[0].x - points.sort(function (a, b) {
            return a.x < b.x ? -1 : 1;
          })[0].x,
          height: points.sort(function (a, b) {
            return a.y > b.y ? -1 : 1;
          })[0].y - points.sort(function (a, b) {
            return a.y < b.y ? -1 : 1;
          })[0].y
        })
      }));
    },
    style: {
      border: 'solid 1px ' + color,
      borderRadius: '50%',
      width: 8,
      visibility: isMouseHovering !== false ? 'visible' : 'hidden',
      cursor: !selection ? 'move' : '',
      height: 8,
      boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.3), 0 0 0 2px rgba(0, 0, 0, 0.2), 0 5px 4px rgba(0, 0, 0, 0.4)',
      zIndex: 10,
      left: 'calc(' + item.xPx + 'px - 4px)',
      top: 'calc(' + item.yPx + 'px - 4px)',
      position: 'absolute'
    }
  });
}

exports.default = Point;
module.exports = exports['default'];
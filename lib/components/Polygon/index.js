'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactLineto = require('react-lineto');

var _reactLineto2 = _interopRequireDefault(_reactLineto);

var _offsetCoordinates = require('../../utils/offsetCoordinates');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function edgesFromPoints(points) {
  if (!points || points.length < 3) return [];

  var edges = [];
  for (var i = 0; i < points.length; ++i) {
    if (i + 1 === points.length) {
      edges.push(Math.hypot(points[0].x - points[i].x, points[0].y - points[i].y));
    } else {
      edges.push(Math.hypot(points[i + 1].x - points[i].x, points[i + 1].y - points[i].y));
    }
  }

  return edges;
}

function Polygon(props) {
  var onChange = props.onChange,
      onSubmit = props.onSubmit,
      annotation = props.annotation,
      color = props.color,
      isMouseHovering = props.isMouseHovering;
  var geometry = annotation.geometry,
      data = annotation.data,
      selection = annotation.selection;

  if (!geometry || !geometry.points || geometry.points.length === 0) return null;

  return _react2.default.createElement(
    'div',
    null,
    geometry.points.length >= 3 && geometry.points.map(function (item, i) {
      var prevItem = void 0;
      if (i === 0) {
        prevItem = geometry.points[geometry.points.length - 1];
      } else {
        prevItem = geometry.points[i - 1];
      }
      return _react2.default.createElement(_reactLineto2.default, {
        key: i + '_' + item.x + '_' + item.y + '_' + prevItem.x + '_' + prevItem.y,
        delay: 0,
        within: 'annotationWrapper',
        from: 'annotationWrapper',
        fromAnchor: item.x + '% ' + item.y + '%',
        to: 'annotationWrapper',
        toAnchor: prevItem.x + '% ' + prevItem.y + '%',
        borderColor: color,
        borderStyle: 'dashed',
        borderWidth: 4,
        className: 'LineTo'
      });
    }),
    geometry.points.map(function (item, i) {
      return _react2.default.createElement('div', {
        draggable: !selection ? true : false,
        onDragEnd: function onDragEnd(e) {
          var point = (0, _offsetCoordinates.getOffsetCoordPercentage)(e, document.getElementsByClassName('annotationWrapper')[0]);
          if (item.x === point.x || item.y === point.y || point.y > 100 || point.x > 100 || point.y < 0 || point.x < 0) {
            return;
          }
          geometry.points[i] = point;
          var points = annotation.geometry ? Object.assign([], annotation.geometry.points) : [];
          onSubmit(_extends({}, annotation, {
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
        key: i + '_' + item.x + '_' + item.y,
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
    })
  );
}

Polygon.defaultProps = {
  className: '',
  style: {}
};

exports.default = Polygon;
module.exports = exports['default'];
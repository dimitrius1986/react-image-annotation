'use strict';

exports.__esModule = true;
exports.methods = exports.TYPE = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.intersects = intersects;
exports.area = area;

var _offsetCoordinates = require('../utils/offsetCoordinates');

var TYPE = exports.TYPE = 'RECTANGLE';

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
        selection: _extends({
          originalX: x,
          originalY: y
        }, annotation.selection, {
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

      console.log(area(selection));
      if (!geometry || isNan(area(selection)) || area(selection) < 2) {
        return {};
      }

      var coordOfClick = (0, _offsetCoordinates.getCoordPercentage)(e);
      var points = [].concat(geometry.points, [{
        x: geometry.points[0].x,
        xPx: geometry.points[0].xPx,
        y: coordOfClick.y,
        yPx: coordOfClick.yPx
      }, coordOfClick, {
        y: geometry.points[0].y,
        yPx: geometry.points[0].yPx,
        x: coordOfClick.x,
        xPx: coordOfClick.xPx
      }]);
      switch (annotation.selection.mode) {
        case 'SELECTING':
          return _extends({}, annotation, {
            geometry: _extends({}, geometry, {
              type: TYPE,
              x: selection.x,
              y: selection.y,
              width: selection.width,
              height: selection.height,
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
  },
  onMouseMove: function onMouseMove(annotation, e) {
    if (annotation.selection && annotation.selection.mode === 'SELECTING') {
      var _annotation$selection = annotation.selection,
          originalX = _annotation$selection.originalX,
          originalY = _annotation$selection.originalY;

      var _getCoordPercentage = (0, _offsetCoordinates.getCoordPercentage)(e),
          newX = _getCoordPercentage.x,
          newY = _getCoordPercentage.y;

      var width = originalX < newX ? newX - originalX : originalX - newX;
      var height = originalY < newY ? newY - originalY : originalY - newY;
      return _extends({}, annotation, {
        geometry: _extends({}, annotation.geometry),
        selection: _extends({}, annotation.selection, {
          x: originalX < newX ? originalX : newX,
          y: originalY < newY ? originalY : newY,
          width: width,
          height: height,
          mode: 'SELECTING'
        })
      });
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
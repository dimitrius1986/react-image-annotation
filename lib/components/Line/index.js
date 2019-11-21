'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _reactRnd = require('react-rnd');

var _reactLineto = require('react-lineto');

var _reactLineto2 = _interopRequireDefault(_reactLineto);

var _index = require('../Point/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Line(props) {
  var onChange = props.onChange,
      onSubmit = props.onSubmit,
      annotation = props.annotation,
      color = props.color,
      isMouseHovering = props.isMouseHovering;
  var geometry = annotation.geometry,
      data = annotation.data,
      selection = annotation.selection;


  if (!geometry) return null;
  return _react2.default.createElement(
    'div',
    {
      className: ' ' + props.className,
      style: {
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%'
      } },
    _react2.default.createElement(_reactRnd.Rnd, {
      key: geometry.xPx + '_' + geometry.yPx + '_1',
      style: {
        border: 'solid 1px ' + color,
        borderRadius: '50%',
        visibility: isMouseHovering !== false ? 'visible' : 'hidden',
        boxSizing: 'border-box',
        pointerEvents: 'auto',
        zIndex: 10,
        boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.3), 0 0 0 2px rgba(0, 0, 0, 0.2), 0 5px 4px rgba(0, 0, 0, 0.4)',
        position: 'absolute'
      },
      bounds: 'parent',
      size: {
        width: 8,
        height: 8
      },
      disableDragging: selection,
      enableResizing: false,
      onDragStop: function onDragStop(e, d, k) {
        if (geometry.xPx !== d.x || geometry.yPx !== d.y) {
          if (d.x === 0) {
            d.x = 0.1;
          }
          if (d.y === 0) {
            d.y = 0.1;
          }
          geometry.x1 = d.x * geometry.x1 / geometry.xPx;
          geometry.y1 = d.y * geometry.y1 / geometry.yPx;
          geometry.xPx = d.x;
          geometry.yPx = d.y;
          geometry.x = geometry.x1 < geometry.x2 ? geometry.x1 : geometry.x2;
          geometry.y = geometry.y1 < geometry.y2 ? geometry.y1 : geometry.y2;
          geometry.width = geometry.x1 < geometry.x2 ? geometry.x2 - geometry.x1 : geometry.x1 - geometry.x2;
          geometry.height = geometry.y1 < geometry.y2 ? geometry.y2 - geometry.y1 : geometry.y1 - geometry.y2;
          onChange(annotation);
          onSubmit();
        }
      },
      position: {
        x: geometry.xPx,
        y: geometry.yPx
      }
    }),
    !selection && _react2.default.createElement(_reactLineto2.default, {
      key: geometry.x1 + '_' + geometry.y1 + '_' + geometry.x2 + '_' + geometry.y2,
      from: 'annotationWrapper',
      delay: 0,
      within: 'annotationWrapper',
      fromAnchor: geometry.x1 + '% ' + geometry.y1 + '%',
      to: 'annotationWrapper',
      toAnchor: geometry.x2 + '% ' + geometry.y2 + '%',
      borderColor: color,
      borderStyle: 'dashed',
      borderWidth: 3,
      className: !props.active ? 'Polygon-LineTo' : 'Polygon-LineToActive'
    }),
    _react2.default.createElement(_reactRnd.Rnd, {
      key: geometry.x2Px + '_' + geometry.y2Px + '_2',
      style: {
        border: 'solid 1px ' + color,
        borderRadius: '50%',
        boxSizing: 'border-box',
        pointerEvents: !selection ? 'auto' : 'none',
        zIndex: 10,
        visibility: isMouseHovering !== false ? 'visible' : 'hidden',
        boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.3), 0 0 0 2px rgba(0, 0, 0, 0.2), 0 5px 4px rgba(0, 0, 0, 0.4)',

        position: 'absolute'
      },
      disableDragging: selection,
      bounds: 'parent',
      size: {
        width: 8,
        height: 8
      },
      enableResizing: false,
      onDragStop: function onDragStop(e, d, k) {
        if (geometry.x2Px !== d.x || geometry.y2Px !== d.y) {
          if (d.x === 0) {
            d.x = 0.1;
          }
          if (d.y === 0) {
            d.y = 0.1;
          }
          geometry.x2 = d.x * geometry.x2 / geometry.x2Px;
          geometry.y2 = d.y * geometry.y2 / geometry.y2Px;
          geometry.x2Px = d.x;
          geometry.y2Px = d.y;
          geometry.x = geometry.x1 < geometry.x2 ? geometry.x1 : geometry.x2;
          geometry.y = geometry.y1 < geometry.y2 ? geometry.y1 : geometry.y2;
          geometry.width = geometry.x1 < geometry.x2 ? geometry.x2 - geometry.x1 : geometry.x1 - geometry.x2;
          geometry.height = geometry.y1 < geometry.y2 ? geometry.y2 - geometry.y1 : geometry.y1 - geometry.y2;
          onChange(annotation);
          onSubmit();
        }
      },
      position: {
        x: geometry.x2Px,
        y: geometry.y2Px
      }
    })
  );
}

Line.defaultProps = {
  className: '',
  style: {}
};

exports.default = Line;
module.exports = exports['default'];
'use strict';

exports.__esModule = true;

var _templateObject = _taggedTemplateLiteralLoose(['\n  background: rgba(0, 0, 0, 0.2);\n  position: absolute;\n'], ['\n  background: rgba(0, 0, 0, 0.2);\n  position: absolute;\n']),
    _templateObject2 = _taggedTemplateLiteralLoose(['\n  position: absolute;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  right: 0;\n'], ['\n  position: absolute;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  right: 0;\n']);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteralLoose(strings, raw) { strings.raw = raw; return strings; }

var Box = _styledComponents2.default.div(_templateObject);

var Container = _styledComponents2.default.div(_templateObject2);

function FancyRectangle(props) {
  var selection = props.annotation.selection;


  if (!selection) return null;

  return _react2.default.createElement(
    Container,
    { className: props.className, style: props.style },
    _react2.default.createElement(Box, {
      style: {
        height: selection.y + '%',
        width: '100%'
      }
    }),
    _react2.default.createElement(Box, {
      style: {
        top: selection.y + '%',
        height: selection.height + '%',
        width: selection.x + '%'
      }
    }),
    _react2.default.createElement(Box, {
      style: {
        top: selection.y + '%',
        left: selection.x + selection.width + '%',
        height: selection.height + '%',
        width: 100 - (selection.x + selection.width) + '%'
      }
    }),
    _react2.default.createElement(Box, {
      style: {
        top: selection.y + selection.height + '%',
        height: 100 - (selection.y + selection.height) + '%',
        width: '100%'
      }
    })
  );
}

FancyRectangle.defaultProps = {
  className: '',
  style: {}
};

exports.default = FancyRectangle;
module.exports = exports['default'];
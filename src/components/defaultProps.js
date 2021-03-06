import React from 'react'

import Point from './Point'
import Editor from './Editor'
import FancyRectangle from './FancyRectangle'
import Rectangle from './Rectangle'
import Line from './Line'
import Oval from './Oval'
import Content from './Content'
import Overlay from './Overlay'
import Drawing from './Drawing'
import Polygon from './Polygon'
import PolygonControls from './PolygonControls'
import {
  RectangleSelector,
  LineSelector,
  PointSelector,
  DrawingSelector,
  OvalSelector,
  PolygonSelector
} from '../selectors'

export default {
  innerRef: () => {},
  onChange: () => {},
  onLoad: () => {},
  onSubmit: () => {},
  type: RectangleSelector.TYPE,
  selectors: [
    RectangleSelector,
    PointSelector,
    OvalSelector,
    PolygonSelector,
    LineSelector,
    DrawingSelector
  ],
  disableAnnotation: false,
  disableSelector: false,
  disableEditor: false,
  imageZoomAmount: 1,
  disableOverlay: false,
  activeAnnotationComparator: (a, b) => a === b,
  renderSelector: ({ annotation, onChange, color }) => {
    switch (annotation.geometry.type) {
      case RectangleSelector.TYPE:
        return <FancyRectangle annotation={annotation} />
      case LineSelector.TYPE:
        return <Line annotation={annotation} color={color} />
      case PointSelector.TYPE:
        return <Point annotation={annotation} color={color} />
      case DrawingSelector.TYPE:
        return <Drawing annotation={annotation} color={color} />
      case PolygonSelector.TYPE:
        return <Polygon annotation={annotation} color={color} />
      case OvalSelector.TYPE:
        return <Oval annotation={annotation} color={color} />
      default:
        return null
    }
  },
  renderEditor: ({ annotation, onChange, onSubmit }) => (
    <Editor annotation={annotation} onChange={onChange} onSubmit={onSubmit} />
  ),
  renderPolygonControls: ({
    annotation,
    onSelectionComplete,
    onSelectionClear,
    onSelectionUndo,
    imageZoomAmount
  }) => (
    <PolygonControls
      annotation={annotation}
      onSelectionComplete={onSelectionComplete}
      onSelectionClear={onSelectionClear}
      onSelectionUndo={onSelectionUndo}
      imageZoomAmount={imageZoomAmount}
    />
  ),
  renderHighlight: ({
    key,
    annotation,
    active,
    onChange,
    onSubmit,
    isMouseHovering
  }) => {
    switch (annotation.geometry.type) {
      case RectangleSelector.TYPE:
        return (
          <Rectangle
            key={key}
            color={annotation.color}
            annotation={annotation}
            isMouseHovering={isMouseHovering}
            onChange={onChange}
            onSubmit={onSubmit}
            active={active}
          />
        )
      case LineSelector.TYPE:
        return (
          <Line
            key={key}
            color={annotation.color}
            annotation={annotation}
            isMouseHovering={isMouseHovering}
            active={active}
            onChange={onChange}
            onSubmit={onSubmit}
          />
        )
      case DrawingSelector.TYPE:
        return (
          <Drawing
            key={key}
            color={annotation.color}
            annotation={annotation}
            onChange={onChange}
            onSubmit={onSubmit}
            active={active}
          />
        )
      case PointSelector.TYPE:
        return (
          <Point
            color={annotation.color}
            key={key}
            annotation={annotation}
            active={active}
            onChange={onChange}
            onSubmit={onSubmit}
          />
        )
      case OvalSelector.TYPE:
        return (
          <Oval
            key={key}
            color={annotation.color}
            annotation={annotation}
            onChange={onChange}
            onSubmit={onSubmit}
            active={active}
          />
        )
      case PolygonSelector.TYPE:
        return (
          <Polygon
            key={key}
            color={annotation.color}
            annotation={annotation}
            isMouseHovering={isMouseHovering}
            onChange={onChange}
            onSubmit={onSubmit}
            active={active}
          />
        )
      default:
        return null
    }
  },
  renderContent: ({ key, annotation }) => (
    <Content key={key} annotation={annotation} />
  ),
  renderOverlay: ({ type, annotation }) => {
    switch (type) {
      case PolygonSelector.TYPE:
        return <Overlay>Click to Add Points to Annotation</Overlay>
      case PointSelector.TYPE:
        return <Overlay>Click to Annotate</Overlay>
      default:
        return <Overlay>Click and Drag to Annotate</Overlay>
    }
  }
}

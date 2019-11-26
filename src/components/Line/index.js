import React from 'react'
import styled from 'styled-components'
import { Rnd as Resizable } from 'react-rnd'
import LineTo from 'react-lineto'
import Point from '../Point/index'

function Line(props) {
  const { onChange, onSubmit, annotation, color, isMouseHovering } = props
  const { geometry, data, selection } = annotation

  if (!geometry) return null
  return (
    <div
      className={` ${props.className}`}
      style={{
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%'
      }}>
      <Resizable
        key={geometry.xPx + '_' + geometry.yPx + '_1'}
        style={{
          border: 'solid 1px ' + color,
          borderRadius: '50%',
          visibility: isMouseHovering !== false ? 'visible' : 'hidden',
          boxSizing: 'border-box',
          pointerEvents: 'auto',
          zIndex: 10,
          boxShadow:
            '0 0 0 1px rgba(0, 0, 0, 0.3), 0 0 0 2px rgba(0, 0, 0, 0.2), 0 5px 4px rgba(0, 0, 0, 0.4)',
          position: 'absolute'
        }}
        bounds={'parent'}
        size={{
          width: 8,
          height: 8
        }}
        disableDragging={selection ? true : false}
        enableResizing={false}
        onDragStop={(e, d, k) => {
          if (geometry.xPx !== d.x || geometry.yPx !== d.y) {
            if (d.x === 0) {
              d.x = 0.1
            }
            if (d.y === 0) {
              d.y = 0.1
            }
            geometry.x1 = (d.x * geometry.x1) / geometry.xPx
            geometry.y1 = (d.y * geometry.y1) / geometry.yPx
            geometry.xPx = d.x
            geometry.yPx = d.y
            geometry.x = geometry.x1 < geometry.x2 ? geometry.x1 : geometry.x2
            geometry.y = geometry.y1 < geometry.y2 ? geometry.y1 : geometry.y2
            geometry.width =
              geometry.x1 < geometry.x2
                ? geometry.x2 - geometry.x1
                : geometry.x1 - geometry.x2
            geometry.height =
              geometry.y1 < geometry.y2
                ? geometry.y2 - geometry.y1
                : geometry.y1 - geometry.y2
            onChange(annotation)
            onSubmit()
          }
        }}
        position={{
          x: geometry.xPx,
          y: geometry.yPx
        }}
      />

      {!selection && (
        <LineTo
          key={
            geometry.x1 +
            '_' +
            geometry.y1 +
            '_' +
            geometry.x2 +
            '_' +
            geometry.y2
          }
          from="annotationWrapper"
          delay={0}
          within="annotationWrapper"
          fromAnchor={geometry.x1 + '% ' + geometry.y1 + '%'}
          to="annotationWrapper"
          toAnchor={geometry.x2 + '% ' + geometry.y2 + '%'}
          borderColor={color}
          borderStyle={'dashed'}
          borderWidth={3}
          className={!props.active ? 'Polygon-LineTo' : 'Polygon-LineToActive'}
        />
      )}

      <Resizable
        key={geometry.x2Px + '_' + geometry.y2Px + '_2'}
        style={{
          border: 'solid 1px ' + color,
          borderRadius: '50%',
          boxSizing: 'border-box',
          pointerEvents: !selection ? 'auto' : 'none',
          zIndex: 10,
          visibility: isMouseHovering !== false ? 'visible' : 'hidden',
          boxShadow:
            '0 0 0 1px rgba(0, 0, 0, 0.3), 0 0 0 2px rgba(0, 0, 0, 0.2), 0 5px 4px rgba(0, 0, 0, 0.4)',

          position: 'absolute'
        }}
        disableDragging={selection ? true : false}
        bounds={'parent'}
        size={{
          width: 8,
          height: 8
        }}
        enableResizing={false}
        onDragStop={(e, d, k) => {
          if (geometry.x2Px !== d.x || geometry.y2Px !== d.y) {
            if (d.x === 0) {
              d.x = 0.1
            }
            if (d.y === 0) {
              d.y = 0.1
            }
            geometry.x2 = (d.x * geometry.x2) / geometry.x2Px
            geometry.y2 = (d.y * geometry.y2) / geometry.y2Px
            geometry.x2Px = d.x
            geometry.y2Px = d.y
            geometry.x = geometry.x1 < geometry.x2 ? geometry.x1 : geometry.x2
            geometry.y = geometry.y1 < geometry.y2 ? geometry.y1 : geometry.y2
            geometry.width =
              geometry.x1 < geometry.x2
                ? geometry.x2 - geometry.x1
                : geometry.x1 - geometry.x2
            geometry.height =
              geometry.y1 < geometry.y2
                ? geometry.y2 - geometry.y1
                : geometry.y1 - geometry.y2
            onChange(annotation)
            onSubmit()
          }
        }}
        position={{
          x: geometry.x2Px,
          y: geometry.y2Px
        }}
      />
    </div>
  )
}

Line.defaultProps = {
  className: '',
  style: {}
}

export default Line

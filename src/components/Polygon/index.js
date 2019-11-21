import React from 'react'
import LineTo from 'react-lineto'
import styled from 'styled-components'
import { Rnd as Resizable } from 'react-rnd'

function edgesFromPoints(points) {
  if (!points || points.length < 3) return []

  const edges = []
  for (let i = 0; i < points.length; ++i) {
    if (i + 1 === points.length) {
      edges.push(
        Math.hypot(points[0].x - points[i].x, points[0].y - points[i].y)
      )
    } else {
      edges.push(
        Math.hypot(points[i + 1].x - points[i].x, points[i + 1].y - points[i].y)
      )
    }
  }

  return edges
}

function Polygon(props) {
  const { onChange, onSubmit, annotation, color, isMouseHovering } = props
  const { geometry, data, selection } = annotation
  if (!geometry || !geometry.points || geometry.points.length === 0) return null

  return (
    <div
      className={` ${props.className}`}
      style={{
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        ...props.style
      }}>
      {geometry.points.length >= 3 &&
        geometry.points.map((item, i) => {
          // Iterate over points to create the edge lines
          let prevItem
          if (i === 0) {
            // First point (links from last to first)
            prevItem = geometry.points[geometry.points.length - 1]
          } else {
            prevItem = geometry.points[i - 1]
          }
          return (
            // Note that each LineTo element must have a unique key (unique relative to the connected points)
            <LineTo
              key={
                i +
                '_' +
                item.x +
                '_' +
                item.y +
                '_' +
                prevItem.x +
                '_' +
                prevItem.y
              }
              within="annotationWrapper"
              delay={0}
              from="annotationWrapper"
              fromAnchor={item.x + '% ' + item.y + '%'}
              to="annotationWrapper"
              toAnchor={prevItem.x + '% ' + prevItem.y + '%'}
              borderColor={color}
              borderStyle={'dashed'}
              borderWidth={3}
              className={
                !props.active ? 'Polygon-LineTo' : 'Polygon-LineToActive'
              }
            />
          )
        })}
      {geometry.points.map((item, i) => {
        // Iterate over points to points
        return (
          // Note that each LineTo element must have a unique key (unique relative to the point)

          <Resizable
            key={i + '_' + item.x + '_' + item.y}
            style={{
              border: 'solid 1px ' + color,
              borderRadius: '50%',
              visibility: isMouseHovering !== false ? 'visible' : 'hidden',
              boxShadow:
                '0 0 0 1px rgba(0, 0, 0, 0.3), 0 0 0 2px rgba(0, 0, 0, 0.2), 0 5px 4px rgba(0, 0, 0, 0.4)',
              top: 4,
              left: 4,
              zIndex: 10,
              position: 'absolute'
            }}
            size={{
              width: 8,
              height: 8
            }}
            bounds={'.annotationWrapper'}
            disableDragging={selection}
            enableResizing={false}
            onDragStop={(e, d, k) => {
              if (!selection && (item.x !== d.x || item.y !== d.y)) {
                if (d.x === 0) {
                  d.x = 0.1
                }
                if (d.y === 0) {
                  d.y = 0.1
                }
                let p = annotation.geometry
                  ? Object.assign([], annotation.geometry.points)
                  : []
                annotation.geometry.points[i].x =
                  (d.x * annotation.geometry.points[i].x) /
                  annotation.geometry.points[i].xPx
                annotation.geometry.points[i].y =
                  (d.y * annotation.geometry.points[i].y) /
                  annotation.geometry.points[i].yPx
                annotation.geometry.points[i].xPx = d.x
                annotation.geometry.points[i].yPx = d.y

                annotation.geometry.x = p.sort((a, b) =>
                  a.x < b.x ? -1 : 1
                )[0].x

                annotation.geometry.y = p.sort((a, b) =>
                  a.y < b.y ? -1 : 1
                )[0].y

                annotation.geometry.width =
                  p.sort((a, b) => (a.x > b.x ? -1 : 1))[0].x -
                  annotation.geometry.x

                annotation.geometry.height =
                  p.sort((a, b) => (a.y > b.y ? -1 : 1))[0].y -
                  annotation.geometry.y
                onChange(annotation)
                onSubmit()
              }
            }}
            position={{
              x: item.xPx,
              y: item.yPx
            }}
          />
        )
      })}
    </div>
  )
}

Polygon.defaultProps = {
  className: '',
  style: {}
}

export default Polygon

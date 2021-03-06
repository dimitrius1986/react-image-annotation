import React from 'react'
import LineTo from 'react-lineto'

import { getOffsetCoordPercentage } from '../../utils/offsetCoordinates'

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
    <div>
      {geometry.points.length >= 3 &&
        geometry.points.map((item, i) => {
          let prevItem
          if (i === 0) {
            prevItem = geometry.points[geometry.points.length - 1]
          } else {
            prevItem = geometry.points[i - 1]
          }
          return (
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
              delay={0}
              within="annotationWrapper"
              from="annotationWrapper"
              fromAnchor={item.x + '% ' + item.y + '%'}
              to="annotationWrapper"
              toAnchor={prevItem.x + '% ' + prevItem.y + '%'}
              borderColor={color}
              borderStyle={'dashed'}
              borderWidth={4}
              className={'LineTo'}
            />
          )
        })}

      {geometry.points.map((item, i) => {
        return (
          <div
            draggable={!selection ? true : false}
            onDragEnd={e => {
              let point = getOffsetCoordPercentage(
                e,
                document.getElementsByClassName('annotationWrapper')[0]
              )
              if (
                item.x === point.x ||
                item.y === point.y ||
                point.y > 100 ||
                point.x > 100 ||
                point.y < 0 ||
                point.x < 0
              ) {
                return
              }
              geometry.points[i] = point
              let points = annotation.geometry
                ? Object.assign([], annotation.geometry.points)
                : []
              onSubmit({
                ...annotation,
                geometry: {
                  ...geometry,
                  x: points.sort((a, b) => (a.x < b.x ? -1 : 1))[0].x,
                  y: points.sort((a, b) => (a.y < b.y ? -1 : 1))[0].y,
                  width:
                    points.sort((a, b) => (a.x > b.x ? -1 : 1))[0].x -
                    points.sort((a, b) => (a.x < b.x ? -1 : 1))[0].x,
                  height:
                    points.sort((a, b) => (a.y > b.y ? -1 : 1))[0].y -
                    points.sort((a, b) => (a.y < b.y ? -1 : 1))[0].y
                }
              })
            }}
            key={i + '_' + item.x + '_' + item.y}
            style={{
              border: 'solid 1px ' + color,
              borderRadius: '50%',
              width: 8,
              visibility: isMouseHovering !== false ? 'visible' : 'hidden',
              cursor: !selection ? 'move' : '',
              height: 8,
              boxShadow:
                '0 0 0 1px rgba(0, 0, 0, 0.3), 0 0 0 2px rgba(0, 0, 0, 0.2), 0 5px 4px rgba(0, 0, 0, 0.4)',
              zIndex: 10,
              left: `calc(${item.xPx}px - 4px)`,
              top: `calc(${item.yPx}px - 4px)`,
              position: 'absolute'
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

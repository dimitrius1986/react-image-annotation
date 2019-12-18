import React from 'react'
import { getOffsetCoordPercentage } from '../../utils/offsetCoordinates'
function Point(props) {
  const { geometry, data, selection } = props.annotation
  const { color, isMouseHovering, onSubmit } = props
  if (!geometry) return null
  let item = geometry.points[0]
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
        geometry.points[0] = point
        let points = props.annotation.geometry
          ? Object.assign([], props.annotation.geometry.points)
          : []
        onSubmit({
          ...props.annotation,
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
      style={{
        border: 'solid 1px ' + color,
        borderRadius: '50%',
        width: 16,
        cursor: !selection ? 'move' : '',
        height: 16,
        boxShadow:
          '0 0 0 1px rgba(0, 0, 0, 0.3), 0 0 0 2px rgba(0, 0, 0, 0.2), 0 5px 4px rgba(0, 0, 0, 0.4)',
        zIndex: 10,
        left: `calc(${item.xPx}px - 8px)`,
        top: `calc(${item.yPx}px - 8px)`,
        position: 'absolute'
      }}
    />
  )
}

export default Point

import React from 'react'

import LineTo from 'react-lineto'

import { getOffsetCoordPercentage } from '../../utils/offsetCoordinates'
function Line(props) {
  const {
    onChange,
    onSubmit,
    annotation,
    color,
    isMouseHovering,
    active
  } = props
  const { geometry, data, selection } = annotation
  if (!geometry) return null
  return (
    <div>
      {geometry.points.map((item, i) => {
        let prevItem
        if (i === 0) {
          return
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
            within="annotationWrapper"
            from="annotationWrapper"
            fromAnchor={item.x + '% ' + item.y + '%'}
            to="annotationWrapper"
            toAnchor={prevItem.x + '% ' + prevItem.y + '%'}
            borderColor={color}
            borderStyle={'dashed'}
            borderWidth={3}
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

              let points = annotation.geometry
                ? Object.assign([], annotation.geometry.points)
                : []

              points[i] = point

              onSubmit({
                ...annotation,
                geometry: {
                  ...annotation.geometry,
                  x: points.sort((a, b) => (a.x < b.x ? -1 : 1))[0].x,
                  y: points.sort((a, b) => (a.y < b.y ? -1 : 1))[0].y,
                  width:
                    points.sort((a, b) => (a.x > b.x ? -1 : 1))[0].x -
                    points.sort((a, b) => (a.x < b.x ? -1 : 1))[0].x,
                  height:
                    points.sort((a, b) => (a.y > b.y ? -1 : 1))[0].y -
                    points.sort((a, b) => (a.y < b.y ? -1 : 1))[0].y,
                  points
                }
              })
            }}
            key={i + '_' + item.x + '_' + item.y}
            style={{
              border: 'solid 1px ' + color,
              borderRadius: '50%',
              width: 4,
              cursor: !selection ? 'crosshair' : '',
              height: 4,
              boxShadow:
                '0 0 0 1px rgba(0, 0, 0, 0.3), 0 0 0 2px rgba(0, 0, 0, 0.2), 0 5px 4px rgba(0, 0, 0, 0.4)',
              zIndex: 10,
              left: item.xPx,
              top: item.yPx,
              position: 'absolute'
            }}
          />
        )
      })}
    </div>
  )
}

Line.defaultProps = {
  className: '',
  style: {}
}

export default Line

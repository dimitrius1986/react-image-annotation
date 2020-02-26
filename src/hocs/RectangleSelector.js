import { getCoordPercentage } from '../utils/offsetCoordinates'
export const TYPE = 'RECTANGLE'

export function intersects({ x, y }, geometry) {
  if (x < geometry.x) return false
  if (y < geometry.y) return false
  if (x > geometry.x + geometry.width) return false
  if (y > geometry.y + geometry.height) return false

  return true
}

export function area(geometry) {
  return geometry.height * geometry.width
}

export const methods = {
  onMouseDown(annotation, e) {
    if (!annotation.selection) {
      const coordOfClick = getCoordPercentage(e)
      const x = coordOfClick.x
      const y = coordOfClick.y
      const width = 0
      const height = 0
      return {
        ...annotation,
        geometry: {
          ...annotation.geometry,
          type: TYPE,
          x,
          y,
          width,
          height,
          points: [coordOfClick]
        },
        id: Math.random(),
        selection: {
          originalX: x,
          originalY: y,
          ...annotation.selection,
          mode: 'SELECTING'
        }
      }
    } else {
      return {}
    }
    return annotation
  },

  onMouseUp(annotation, e) {
    if (annotation.selection) {
      const { selection, geometry } = annotation
      console.log(area(selection))
      if (!geometry || isNan(area(selection)) || area(selection) < 2) {
        return {}
      }

      const coordOfClick = getCoordPercentage(e)
      let points = [
        ...geometry.points,
        {
          x: geometry.points[0].x,
          xPx: geometry.points[0].xPx,
          y: coordOfClick.y,
          yPx: coordOfClick.yPx
        },
        coordOfClick,
        {
          y: geometry.points[0].y,
          yPx: geometry.points[0].yPx,
          x: coordOfClick.x,
          xPx: coordOfClick.xPx
        }
      ]
      switch (annotation.selection.mode) {
        case 'SELECTING':
          return {
            ...annotation,
            geometry: {
              ...geometry,
              type: TYPE,
              x: selection.x,
              y: selection.y,
              width: selection.width,
              height: selection.height,
              points
            },
            selection: {
              ...annotation.selection,
              showEditor: true,
              mode: 'EDITING'
            }
          }
        default:
          break
      }
    }
    return annotation
  },

  onMouseMove(annotation, e) {
    if (annotation.selection && annotation.selection.mode === 'SELECTING') {
      const { originalX, originalY } = annotation.selection
      const { x: newX, y: newY } = getCoordPercentage(e)
      const width = originalX < newX ? newX - originalX : originalX - newX
      const height = originalY < newY ? newY - originalY : originalY - newY
      return {
        ...annotation,
        geometry: {
          ...annotation.geometry
        },
        selection: {
          ...annotation.selection,
          x: originalX < newX ? originalX : newX,
          y: originalY < newY ? originalY : newY,
          width,
          height,
          mode: 'SELECTING'
        }
      }
    }

    return annotation
  }
}

export default {
  TYPE,
  intersects,
  area,
  methods
}

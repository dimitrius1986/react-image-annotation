import { getCoordPercentage } from '../utils/offsetCoordinates'
export const TYPE = 'LINE'

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
			if (!geometry) {
				return {}
			}
			const coordOfClick = getCoordPercentage(e)
			let points = [...geometry.points, coordOfClick]
			const x = points.sort((a, b) => (a.x < b.x ? -1 : 1))[0].x
			const y = points.sort((a, b) => (a.y < b.y ? -1 : 1))[0].y
			const width = points.sort((a, b) => (a.x > b.x ? -1 : 1))[0].x - x
			const height = points.sort((a, b) => (a.y > b.y ? -1 : 1))[0].y - y
			switch (annotation.selection.mode) {
				case 'SELECTING':
					return {
						...annotation,
						geometry: {
							...geometry,
							type: TYPE,
							x,
							y,
							width,
							height,
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
	}
}

export default {
	TYPE,
	intersects,
	area,
	methods
}

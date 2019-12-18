import React from 'react'
import styled from 'styled-components'

const Box = styled.div`
  background: rgba(0, 0, 0, 0.2);
  position: absolute;
`

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`

function FancyRectangle(props) {
  const { selection } = props.annotation

  if (!selection) return null

  return (
    <Container className={props.className} style={props.style}>
      <Box
        style={{
          height: `${selection.y}%`,
          width: '100%'
        }}
      />
      <Box
        style={{
          top: `${selection.y}%`,
          height: `${selection.height}%`,
          width: `${selection.x}%`
        }}
      />
      <Box
        style={{
          top: `${selection.y}%`,
          left: `${selection.x + selection.width}%`,
          height: `${selection.height}%`,
          width: `${100 - (selection.x + selection.width)}%`
        }}
      />
      <Box
        style={{
          top: `${selection.y + selection.height}%`,
          height: `${100 - (selection.y + selection.height)}%`,
          width: '100%'
        }}
      />
    </Container>
  )
}

FancyRectangle.defaultProps = {
  className: '',
  style: {}
}

export default FancyRectangle

import styled from 'styled-components'

export const Canvas = styled.canvas`
  cursor: crosshair;
  background-image: url("https://picsum.photos/400/400/?image=373");
  background-size: cover;
  background-repeat: no-repeat;
`

export const Divider = styled.hr`
  border: 1px solid white;
  margin: 8px 0px;
`

export const DrawingToolButton = styled.button`
  padding: 8px;
  margin: 8px;
  border-radius: 8px;
  cursor: pointer;
  border: none;
  background-color: ${props => props.isClicked ? "#0083DF" : "none"};

  img {
    ${props => props.isClicked && "filter: brightness(0) invert(1)"};
  }
`
export const ColorPickerWrapper = styled.div`
  margin-top: 12px;  
`

export const DrawingToolsetWrapper = styled.div`
  margin-top: 12px;
`
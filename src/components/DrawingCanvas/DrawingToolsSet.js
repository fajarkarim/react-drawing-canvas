import React from 'react'
import PropTypes from 'prop-types'

import { TwitterPicker } from 'react-color'

import { DrawingToolButton, ColorPickerWrapper, DrawingToolsetWrapper } from './style'

import PolygonIcon from './assets/polygon.png'
import LineIcon from './assets/line.png'
import ErasesIcon from './assets/eraser.png'

class DrawingToolsSet extends React.PureComponent {  

  static propTypes = {
    color: PropTypes.string,
    colors: PropTypes.array,
    toolset: PropTypes.string
  } 

  static defaultProps = {
    color: "#ef1010",
    colors: ["#ef1010", "#2110ef", "#26ff3a"],
    toolset: "polygon"
  }

  handleColorOnChange = (color, e) => {
    if (this.props.colorOnChange) {
      this.props.colorOnChange(color)
    }
  }

  handleClickToolset = (toolset) => (e) => { 
    if (this.props.toolsetOnChange) {
      this.props.toolsetOnChange(toolset)
    }           
  }

  render () {    
    const { color, colors, toolset } = this.props
    return (
      <React.Fragment>
        <DrawingToolsetWrapper>
          <DrawingToolButton 
            isClicked={toolset === "polygon"} 
            onClick={this.handleClickToolset("polygon")}>
            <img src={PolygonIcon}/>
          </DrawingToolButton>

          <DrawingToolButton 
            isClicked={toolset === "line"} 
            onClick={this.handleClickToolset("line")}>
            <img src={LineIcon}/>
          </DrawingToolButton>

          <DrawingToolButton 
            isClicked={toolset === "eraser"} 
            onClick={this.handleClickToolset("eraser")}>
            <img src={ErasesIcon}/>
          </DrawingToolButton>        
        </DrawingToolsetWrapper> 
        <ColorPickerWrapper>          
          <TwitterPicker 
            onChange={this.handleColorOnChange} 
            triangle={"hide"} 
            colors={colors} 
            color={color}            
          />
        </ColorPickerWrapper>
      </React.Fragment>

    )
  }
}

export default DrawingToolsSet
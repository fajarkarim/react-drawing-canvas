import React from 'react'
import PropTypes from 'prop-types'
import DrawingToolSet from './DrawingToolsSet'

import { Converter } from './utils'

class DrawingCanvas extends React.PureComponent {
  static propTypes = {
    canvasSize: PropTypes.object,
    canvasImagePreview: PropTypes.string,
    onFinish: PropTypes.func
  }

  static defaultProps = {
    canvasSize: {
      canvasWidth: 480,
      canvasHeight: 480
    }
  }
  
  defaultState = {    
    stPoint: { 
      x: null, 
      y: null
    },    
    mouseClicked: false,
    mouseRelease: true,
    mouseDownCounter: 0,
    lines: [],
    polygonComplete: false,
    color: "#ef1010",
    fillPolygonColor: {
      r: 0,
      g: 0,
      b: 255,
      a: 0.3
    },
    colors: ["#ef1010", "#2110ef", "#26ff3a"],
    toolset: "polygon"    
  }
  
  state = this.defaultState

  initCanvas = () => {    
    this.ctx = this.canvas.getContext("2d");       
  }
  

  onMouseClick = (e) => {    
    const { toolset } = this.state
    if (toolset === "polygon") {
      this.setState(state => state.mouseClicked = true)   
    } else if (toolset === "line") {
      this.setState(state => state.mouseClicked = !state.mouseClicked)
    }
  }

  onMouseDown = (e) => {
    
    const { toolset, polygonComplete } = this.state

    if (toolset === "polygon") {
      // if polygon complete, clear all and redraw the line      
      if (polygonComplete) {        
        this.setState({ 
          polygonComplete: false, 
          lines: [], 
          stPoint: {
            x: null,
            y: null
          } }, () => {
          this.drawPolygonLines(this.state.lines)
        })      
        return 
      }
  
      let objtmp = {}
      const rect = this.canvas.getBoundingClientRect();  
      let currentX = e.clientX - rect.left
      let currentY = e.clientY - rect.top
       
      objtmp.startX = this.state.stPoint.x
      objtmp.startY = this.state.stPoint.y
  
      this.setState(state => {
        state.stPoint.x = currentX
        state.stPoint.y = currentY
      }, () => {
        let endPoint = this.state.stPoint
        objtmp.endX = endPoint.x
        objtmp.endY = endPoint.y
        
        if (objtmp.startX !== null && objtmp.startY !== null && 
            objtmp.startX !== objtmp.endX && objtmp.startY !== objtmp.endY ) {     
  
          this.setState({
            lines: [...this.state.lines, objtmp ]
          }, () => this.drawPolygonLines(this.state.lines))        
        }
      })    
    } else if (toolset === "line") {

      if (this.state.lines.length >= 3) {
        alert("Maksimal 3 Garis")        
      }

      const rect = this.canvas.getBoundingClientRect();  
      let currentX = e.clientX - rect.left
      let currentY = e.clientY - rect.top           
      
      if (this.state.stPoint.x !== null && 
          currentX !== this.state.stPoint.x) {        
        let objtmp = {}
        objtmp.startX = this.state.stPoint.x
        objtmp.startY = this.state.stPoint.y
        objtmp.endX = currentX
        objtmp.endY = currentY 
        objtmp.color = this.state.color

        this.setState({
          stPoint: {
            x: currentX,
            y: currentY
          },
          lines: [...this.state.lines, objtmp]
        }, () => {
          this.setState({ 
            stPoint: {
              x: null,
              y: null
            }
           })  
           if (this.state.lines.length === 3) {
             this.handleOnFinish()
           }              
        })
      } else {
        this.setState(state => {
          state.stPoint.x = currentX
          state.stPoint.y = currentY
        })
      }
    }

  }

  onMouseMove = (e) => {
    let { mouseClicked, stPoint, toolset } = this.state

    if (toolset === "polygon") {
      
      if (mouseClicked && stPoint.x !== null) {      
        this.clearDrawingCanvas()  
        
        let rectCanvas = this.canvas.getBoundingClientRect()
        let currentPathX = e.clientX - rectCanvas.left
        let currentPathY = e.clientY - rectCanvas.top     
        
        this.drawPolygonLines(this.state.lines)
  
        this.ctx.beginPath();  
        this.ctx.moveTo(stPoint.x, stPoint.y)
        this.ctx.lineTo(currentPathX, currentPathY)
        this.ctx.lineWidth = 3
        this.ctx.strokeStyle = this.state.color
        this.ctx.closePath()
        this.ctx.stroke()        
      }
    } else if (toolset === "line") {
      if (mouseClicked && stPoint.x !== null) {
        this.clearDrawingCanvas()
        let rectCanvas = this.canvas.getBoundingClientRect()
        let currentPathX = e.clientX - rectCanvas.left
        let currentPathY = e.clientY - rectCanvas.top   

        this.drawLines(this.state.lines)

        this.ctx.beginPath()
        this.ctx.moveTo(stPoint.x, stPoint.y)
        this.ctx.lineTo(currentPathX, currentPathY)
        this.ctx.lineWidth = 3
        this.ctx.strokeStyle = this.state.color
        this.ctx.closePath() 
        this.ctx.stroke()           
      }
    } 

  }

  handleOnDoubleClick = (e) => {    

    const { toolset } = this.state

    if (toolset === "polygon") {
      const { fillPolygonColor: {r, g, b} } = this.state
      this.ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.3)`
      this.ctx.fill()
      this.ctx.closePath()
      this.ctx.stroke()
      this.setState({ mouseClicked: false, polygonComplete: true })
      this.handleOnFinish()
    }
  }  

  drawPolygonLines = (lines) => {

    const { toolset } = this.state

    if (toolset === "polygon") {

      if (lines.length > 0) {   
  
        let firstPointX = lines[0].startX
        let firstPointY = lines[0].startY 
    
        this.ctx.beginPath()
        this.ctx.moveTo(firstPointX, firstPointY)
    
        lines.forEach(line => {
          this.ctx.lineTo(line.endX, line.endY)
        })
        this.ctx.strokeStyle = this.state.color      
        this.ctx.stroke()
      }
    }
    
  }

  drawLines = (lines) => {
    const { toolset } = this.state
    if (toolset === "line") {
      if (lines.length > 0) {
        
        lines.forEach(line => {
          this.ctx.beginPath()
          this.ctx.moveTo(line.startX, line.startY)
          this.ctx.lineTo(line.endX, line.endY)
          this.ctx.strokeStyle = line.color
          this.ctx.stroke();          
        })       

      }
    }
  }

  clearDrawingCanvas () {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);    
  }  

  clearAll () {
    this.clearDrawingCanvas()
    this.setState({
      lines: [],
      stPoint: {
        x: null,
        y: null
      }
    })
  }
  
  handleColorOnChange = (color) => {    
    this.setState({ 
      color: color.hex,
      fillPolygonColor: color.rgb
    })    
  }

  hanldeToolsetOnChange = (toolset) => {
    if (toolset === "eraser") {
      this.clearAll()
    } else {
      this.clearAll()
      this.setState({ toolset })     
    }   
  }

  handleOnFinish () {
    if (this.props.onFinish) {
      const { lines, toolset }= this.state  
      const { canvasSize: {canvasHeight, canvasWidth }} = this.props
      
      if (toolset === "polygon") {
        let normalizedPolygonCoordinates = Converter.normalizePolygonCanvasCoordinates(lines, {canvasHeight, canvasWidth })      
        this.props.onFinish(normalizedPolygonCoordinates)
      } else if (toolset === "line") {
        let normalizedLineCoordinates = Converter.normalizeLineCanvasCoordinates(lines, {canvasHeight, canvasWidth })
        this.props.onFinish(normalizedLineCoordinates)
      }

    }
  }


  componentDidMount () {
    this.initCanvas()    
  }    
  
  render () {
    
    const { color, colors, toolset } = this.state
    const { canvasImagePreview } = this.props
    const { canvasSize: { canvasHeight, canvasWidth }} = this.props  

    return (
      <div className="col-md-6">
        <div id="drawingCanvas">
          <h3>CCTV Preview</h3>

          <div ref={canvasContainer => (this.canvasContainer = canvasContainer)}>                    
            <canvas 
              className="canvas__drawing" 
              ref={canvas => (this.canvas = canvas)} 
              width={canvasWidth} height={canvasHeight} 
              onClick={this.onMouseClick}
              onMouseMove={this.onMouseMove}
              onMouseDown={this.onMouseDown}
              onDoubleClick={this.handleOnDoubleClick}
              style={{
                backgroundImage: `url(${canvasImagePreview})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                cursor: 'crosshair',
                backgroundColor: 'white'
              }}          
              />
          </div>

          {/* <h3>Drawing Tools</h3>
          <Divider/> */}
          <DrawingToolSet 
            colorOnChange={this.handleColorOnChange} 
            toolsetOnChange={this.hanldeToolsetOnChange}
            color={color}
            colors={colors}
            toolset={toolset}
          />          
        </div>

      </div>
    )     
  }
}

export default DrawingCanvas
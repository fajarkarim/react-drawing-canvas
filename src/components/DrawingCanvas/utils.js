class Converter {

  static normalizePolygonCanvasCoordinates (rawCoordinates, canvasSize) {
    let firstCoordinate = rawCoordinates[0]    

    if (!firstCoordinate.hasOwnProperty("startX") && !firstCoordinate.hasOwnProperty("startY")) {
      console.error("property name must have startX and startY property")
      return
    }

    if (!canvasSize.hasOwnProperty("width") && !canvasSize.hasOwnProperty("height")) {
      console.error("canvas size dont have width or height property")
      return
    }       

    let normalizedCoordinates = Converter.normalizeCoordinates(rawCoordinates, canvasSize)
  
    let rawArrayCoordinates = normalizedCoordinates.map((coordinate, i) => {
      let arrTemp = []
      if (i >= 1) {
        arrTemp[0] = coordinate.endX
        arrTemp[1] = coordinate.endY    
    
        return arrTemp
    
      } else return null
    })
    
    const replaceFirstCoordinateWithTwoPointCoordinates = function (coordinates) {
      let firstCoordinate = [normalizedCoordinates[0].startX, normalizedCoordinates[0].startY]
      let secondCoordinate = [normalizedCoordinates[1].endX, normalizedCoordinates[1].endY]
      coordinates.shift()
      coordinates.unshift(secondCoordinate)
      coordinates.unshift(firstCoordinate)
      return coordinates
    }
          
    let arrayCoordinates = replaceFirstCoordinateWithTwoPointCoordinates(rawArrayCoordinates)    
    
    return arrayCoordinates
  }

  static normalizeLineCanvasCoordinates (rawArrayCoordinates, canvasSize) {
    let firstCoordinate = rawArrayCoordinates[0]    

    if (!firstCoordinate.hasOwnProperty("startX") && !firstCoordinate.hasOwnProperty("startY")) {
      console.error("property name must have startX and startY property")
      return
    }

    if (!canvasSize.hasOwnProperty("width") && !canvasSize.hasOwnProperty("height")) {
      console.error("canvas size dont have width or height property")
      return
    }  
    
    let normalizedArr = Converter.normalizeCoordinates(rawArrayCoordinates, canvasSize)

    let result = normalizedArr.map(coor => {
      let obj = {}
      obj.x1 = coor.startX
      obj.y1 = coor.startY
      obj.x2 = coor.endX
      obj.y2 = coor.endY
      return obj
    })

    return result
  }

  static normalizeCoordinates (rawCoordinates, canvasSize) {
    let result = rawCoordinates.map(coordinate => {      
      coordinate.startX = parseFloat(((coordinate.startX / canvasSize.width)).toFixed(7))
      coordinate.startY = parseFloat(((coordinate.startY / canvasSize.height)).toFixed(7))
      coordinate.endX = parseFloat(((coordinate.endX / canvasSize.width)).toFixed(7))
      coordinate.endY = parseFloat(((coordinate.endY / canvasSize.height)).toFixed(7))
      
      return coordinate
    })  

    return result
  }
}

export { Converter }
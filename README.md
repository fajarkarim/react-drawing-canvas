# simple-react-drawing-canvas

> simple canvas drawing with polygon and line toolset.

[![NPM](https://img.shields.io/npm/v/simple-react-drawing-canvas.svg)](https://www.npmjs.com/package/simple-react-drawing-canvas) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save simple-react-drawing-canvas
```

## Usage

```jsx
import React, { Component } from 'react'

import DrawingCanvas from 'simple-react-drawing-canvas'

class Example extends Component {
  state = {
    canvasImagePreview: null
  }

  handleOnFinish = (linesCoordinate) => {
    // List of list coordinate
    console.log(linesCoordinate)
  }

  render () {
    const canvasSize = {
      canvasHeight: 480;
      canvasWidth: 480
    }

    return (
      <DrawingCanvas 
        canvasSize={canvasSize}
        canvasImagePreview={canvasImagePreview}
        onFinish={this.handleOnFinish}        
      />
    )
  }
}
```

## License

MIT © [fajarkarim](https://github.com/fajarkarim)

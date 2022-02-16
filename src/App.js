import './App.css';
import React, { useCallback, useEffect, useRef } from 'react'
import { BallProperties } from './Ball'

function App() {
  const ballDiameter = 50
  let request = useRef()
  let number = useRef(1)
  let updateBall = BallProperties()
  const pointer = useRef()

  document.onmousemove = (e) => {
    pointer.current = {
      x: e.pageX,
      aX: e.movementX,
      y: e.pageY,
      aY: e.movementY
    }
  }

  const animate = useCallback(() => {
    let objectRef = document.getElementsByClassName('ball')
    let body = document.getRootNode().body
    body.style.setProperty('--ballDiameter', ballDiameter + 'px')
    if (number.current !== undefined) {
      let newCoordinate = updateBall(ballDiameter,objectRef, pointer.current)
      body.style.setProperty('--pX', pointer.current && pointer.current.x + 'px')
      body.style.setProperty('--pY', pointer.current && pointer.current.y + 'px')
      body.style.setProperty('--x', newCoordinate && -newCoordinate.x + 'px')
      body.style.setProperty('--y', newCoordinate && -newCoordinate.y + 'px')
    }
    request.current = requestAnimationFrame(animate)
  }, [number, updateBall])

  useEffect(() => {
    request.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(request.current)
  }, [animate])

  return (

    < div className="App" >
      <header className="App-header">
        <span className='ball2'></span>
        <span className='ball' />
      </header>
    </div >
  );
}

export default App;

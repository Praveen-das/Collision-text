import { useRef } from "react";

const getRadian = (ox, oy, ex, ey) => {
    var dy = ey - oy;
    var dx = ex - ox;
    var theta = Math.atan2(dy, dx)
    return theta;
}

const getPointerDistanceFromAnObject = (ox, oy, ex, ey) => {
    let a = ox - ex
    let b = oy - ey
    let pointerDistance = Math.sqrt(a * a + b * b)
    return pointerDistance
}

export function BallProperties() {
    let previousCoordinate = useRef({ x: 0, y: 0 })
    let newCoordinate = useRef({ x: 0, y: 0 })

    const updateBall = (ballDiameter, objectRef, pointerRef) => {

        if (!objectRef) return
        if (!pointerRef) return
        if (!newCoordinate.current) return

        let object = {
            x: objectRef[0].getBoundingClientRect().x + ballDiameter / 2,
            y: objectRef[0].getBoundingClientRect().y + ballDiameter / 2
        }
        let pointer = {
            x: pointerRef.x,
            y: pointerRef.y
        }

        let momentum = 10
        let velocity = Math.abs(pointerRef.aX + pointerRef.aY) * momentum
        let pointerDistance = getPointerDistanceFromAnObject(object.x, object.y, pointer.x, pointer.y)
        let radian = getRadian(object.x, object.y, pointer.x, pointer.y)

        let direction = {
            x: Math.cos(radian) * velocity,
            y: Math.sin(radian) * velocity
        }
        if (pointerDistance <= ballDiameter - 15) {
            newCoordinate.current.x = previousCoordinate.current.x + direction.x
            newCoordinate.current.y = previousCoordinate.current.y + direction.y
            previousCoordinate.current = {
                x: previousCoordinate.current.x + direction.x,
                y: previousCoordinate.current.y + direction.y
            }
        }
        return { x: newCoordinate.current.x, y: newCoordinate.current.y }
    }

    return updateBall
}

import { websocketClient } from "@polygon.io/client-js";

// Would fix all the types to not be any for message, err, code, and reason
const polygonWebSocketClient = () => {

    // @ts-ignore
    const ws = websocketClient(process.env.REACT_APP_POLYGON_API_KEY, 'wss://socket.polygon.io').stocks()

    ws.onopen = () => {
        ws.send(JSON.stringify({ action: 'auth', params: process.env.REACT_APP_POLYGON_API_KEY}))
        ws.send(JSON.stringify({ action: 'subscribe', params: 'AM.MSFT'}))
    }

    ws.onmessage = (message: any) => {
        console.log('message', message)
        const parsedMessage = JSON.parse(message.data)
        console.log('Message:', parsedMessage[0].message)
    }

    // Would add better error handling with a component that would display the info to the user
    ws.onerror = (err: any) => console.log("Polygon WebSocket error:", err)

    ws.onClose = (code: any, reason: any) => {
        console.log('Polygon WebSocket closed:', code, reason)
    }
}

export default polygonWebSocketClient
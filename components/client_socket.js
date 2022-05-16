import {useEffect, useRef, useState} from 'react';
import io from 'socket.io-client';
import { DEATS_SERVER_URL } from '../utils/Constants';

export const useClientSocket = ({userId, orderId, enabled}) => {
  const ref = useRef(null);

  const joinRoomForOrder = (orderId) => {
    ref.current?.emit("join", {
        order_id: orderId, 
        user_id: userId
    }, (response) => {
        console.log("server join room response", response); 
    });
  }

  useEffect(() => {
    if (!enabled) {
      return;
    }
    const socket = io(DEATS_SERVER_URL, { })

    socket.on('disconnect', () => {
      console.log('disconnected');
    });

    socket.on("connect", () => {
        console.log("socket id:", socket.id)

        const engine = socket.io.engine;
        console.log("transport before upgrade:", engine.transport.name)

        engine.once("upgrade", () => {
           console.log("transport after upgrade:", engine.transport.name)
        })
    })

    socket.on('reconnect', () => {
      if (orderId) {
        joinRoomForOrder(userId, orderId);
      }

      console.log('reconnected');
    });

    socket.on('message', (message) => {
      console.log('user:', userId, 'message:', message);
    });

    socket.on('order:deliverer', (deliverer) => {
      console.log("A deliverer has entered the room:", deliverer);
    });

    ref.current = socket;

    // disconnect after component unmount
    return () => socket.disconnect();
  }, [enabled, orderId]);

  return [joinRoomForOrder]
};
import {useEffect, useRef, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';
import { selectSelectedCustomer, setSelectedCustomer } from '../redux/slices/makeDeliverySlice';
import { setDelivererId, setDelivererInfo } from '../redux/slices/orderDeliverySlice';
import { DEATS_SERVER_URL } from '../utils/Constants';

export const useClientSocket = ({userId, orderId, enabled}) => {
  const dispatch = useDispatch();
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

    // FROM DELIVERER: announcements for customer 
    socket.on('del:order_status:cus', (order_status) => {
      const customer = useSelector(selectSelectedCustomer)
      dispatch(setSelectedCustomer({...customer, order_status: order_status}))
      console.log(userId, "The deliverer has updated the order status to:", order_status);
    });

    socket.on('del:match:cus', (payload) => {
      dispatch(setDelivererInfo(payload.deliverer.user_info))
      dispatch(setDelivererId(payload.deliverer.user_id))
      console.log(userId, "A deliverer has requested to match with your order:", payload);
    });


    // FROM DELIVERER: announcements for all connected clients 
    socket.on('del:match:all', (order_id) => {
      
      console.log(userId, `The order, ${order_id}, has been matched`);
    });


    // FROM CUSTOMER: announcements for deliverer 
    socket.on('cus:update:del', (updated_payload) => {
      
      console.log(userId, `The customer has updated the order with: ${updated_payload}`);
    });

    socket.on('cus:unmatch:del', (payload) => {
      
      console.log(userId, `The customer has unmatched you from the order: ${payload}`);
    });

    socket.on('cus:cancel:del', (payload) => {
      
      console.log(userId, `The customer has canceled the order: ${payload}`);
    });

    
    // FROM CUSTOMER: announcements for all connected clients
    socket.on('cus:new:all', (order_id) => {
      
      console.log(userId, "A new order has been created:", order_id);
    });

    socket.on('cus:update:all', (order_id) => {
      
      console.log(userId, `The order, ${order_id}, has been updated`);
    });

    socket.on('cus:unmatch:all', (order_id) => {
      
      console.log(userId, `The deliverer on the order, ${order_id}, has been unmatched`);
    });

    socket.on('cus:cancel:all', (order_id) => {
      
      console.log(userId, `The order, ${order_id}, has been canceled`);
    });

    ref.current = socket;

    // disconnect after component unmount
    return () => socket.disconnect();
  }, [enabled, orderId]);

  return [joinRoomForOrder]
};
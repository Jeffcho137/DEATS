import { scheduleNotificationAsync } from 'expo-notifications';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';
import { selectSelectedCustomer, setSelectedCustomer } from '../redux/slices/makeDeliverySlice';
import { selectExpoPushToken } from '../redux/slices/notificationsSlice';
import { setDelivererId, setDelivererInfo, setOrderFee, setOrderId, setOrderStatus } from '../redux/slices/orderDeliverySlice';
import { selectToggle, setToggle } from '../redux/slices/socketSlice';
import { setDEATSTokens } from '../redux/slices/userSlice';
import { DEATS_SERVER_URL } from '../utils/Constants';
import { schedulePushNotification } from './notifications';

export const useClientSocket = ({userId, orderId, paymentIntentId, enabled}) => {
  const toggle = useSelector(selectToggle)
  const exponentPushToken = useSelector(selectExpoPushToken)
  
  const dispatch = useDispatch();
  const ref = useRef(null);

  const joinRoomForOrder = (orderId) => {
    ref.current?.emit("join_order_room", {
        order_id: orderId, 
        user_id: userId
    }, (response) => {
        console.log("server join order room response", response); 
    });
  }

  const joinRoomForPayment = (paymentIntentId) => {
    ref.current?.emit("join_payment_room", {
        payment_intent_id: paymentIntentId, 
        user_id: userId
    }, (response) => {
        console.log("server join payment room response", response); 
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

        if (orderId) {
          joinRoomForOrder(orderId);
        }

        if (paymentIntentId) {
          joinRoomForPayment(paymentIntentId);
        }
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

    // FROM SERVER:STRIPE: announcements for customer 
    socket.on('stripe:order_with_card:cus', (payload) => {
      dispatch(setOrderId(payload.order.order_id))
      dispatch(setOrderFee(payload.order.order_fee))
      dispatch(setDEATSTokens(payload.user.DEATS_tokens))
      console.log(`${userId},`, "Your order with card payment has been created:", payload);
    });

    // FROM DELIVERER: announcements for customer 
    socket.on('del:order_status:cus', (order_status) => {
      dispatch(setOrderStatus(order_status))
      console.log(`${userId},`, "The deliverer has updated the order status to:", order_status);
    });

    socket.on('del:match:cus', (payload) => {
      dispatch(setDelivererInfo(payload.deliverer.user_info))
      dispatch(setDelivererId(payload.deliverer.user_id))
      schedulePushNotification()
      console.log(`${userId},`, "A deliverer has requested to match with your order:", payload);
    });


    // FROM DELIVERER: announcements for all connected clients 
    socket.on('del:match:all', (order_id) => {
      dispatch(setToggle(Math.random()))
      console.log(`${userId},`, `The order, ${order_id}, has been matched`);
    });


    // FROM CUSTOMER: announcements for deliverer 
    socket.on('cus:update:del', (updated_payload) => {
      const customer = useSelector(selectSelectedCustomer)
      dispatch(setSelectedCustomer({...customer, updated_payload}))
      console.log(`${userId},`, `The customer has updated the order with: ${updated_payload}`);
    });

    socket.on('cus:unmatch:del', (payload) => {
      
      console.log(`${userId},`, `The customer has unmatched you from the order: ${payload}`);
    });

    socket.on('cus:cancel:del', (payload) => {
      
      console.log(`${userId},`, `The customer has canceled the order: ${payload}`);
    });

    
    // FROM CUSTOMER: announcements for all connected clients
    socket.on('cus:new:all', (order_id) => {
      dispatch(setToggle(Math.random()))
      console.log(`${userId},`, "A customer has created a new order:", order_id);
    });

    socket.on('cus:update:all', (order_id) => {
      
      console.log(`${userId},`, `The order, ${order_id}, has been updated`);
    });

    socket.on('cus:unmatch:all', (order_id) => {
      
      console.log(`${userId},`, `The deliverer on the order, ${order_id}, has been unmatched`);
    });

    socket.on('cus:cancel:all', (order_id) => {
      
      console.log(`${userId},`, `The order, ${order_id}, has been canceled`);
    });

    ref.current = socket;

    // disconnect after component unmount
    return () => socket.disconnect();
  }, [enabled, orderId]);

  return [joinRoomForOrder, joinRoomForPayment]
};
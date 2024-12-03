import { useEffect } from 'react';
import { Client } from '@stomp/stompjs';

const StompClient = ({ onMessage }) => {
	useEffect(() => {
		const client = new Client({
			brokerURL: 'ws://localhost:15674/ws',
			onConnect: () => {
			  client.subscribe('/exchange/promociones', message => {
				const mensaje = JSON.parse(message.body);
				if (onMessage) 
				  onMessage(mensaje);
			  });
			}
		  });
		  client.activate();
	  
		  return () => {
			client.deactivate(); 
		  };
	}, [onMessage]);
	return null; 
};

export default StompClient;

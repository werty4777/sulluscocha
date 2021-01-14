import {InjectableRxStompConfig} from '@stomp/ng2-stompjs';

export const myRxStompConfig: InjectableRxStompConfig = {


    brokerURL: 'wss://serviceprox.herokuapp.com/chat',

    heartbeatIncoming: 0, // Typical value 0 - disabled
    heartbeatOutgoing: 0, // Typical value 20000 - every 20 seconds

    // Wait in milliseconds before attempting auto reconnect
    // Set to 0 to disable
    // Typical value 5000 (5 seconds)
    reconnectDelay: 200,
    debug: (msg: string): void => {

        console.log(new Date(), msg);
    }
}




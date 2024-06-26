import { EventBridge } from '@aws-sdk';
const eventbridge = new EventBridge();

function putEventInEventBridge(orderDetails) {

    const detail = { 
      ticketEventName: orderDetails.ticketEventName,
      order: orderDetails.order,
      customerName: orderDetails.name,
      amount: orderDetails.amount
    };
  
    var params = {
      Entries: [
        {
          Detail: JSON.stringify(detail),
          DetailType: 'order',
          Source: 'custom.orderManager'
        },
      ]
    };
  
    console.log(params);
    return eventbridge.putEvents(params).promise();
  }

export async function putOrder(event) {
    console.log('putOrder');

    const orderDetails = JSON.parse(event.body);
    const data = await putEventInEventBridge(orderDetails);

    console.log(data);
    
    return {
        statusCode: 200,
        body: JSON.stringify(orderDetails),
        headers: {}
      }
}
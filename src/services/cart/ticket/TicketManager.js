import {Ticket} from "../../../db/models/ticket.model.js"

class TicketService {
    constructor (){}


   async createTicket(code, amount, purchaser) {


    let ticket =  {
        code,
        amount,
        purchaser
      };
    try {
    

      const createdTicket = await Ticket.create(ticket);
      

      return createdTicket;
    } catch (error) {
      throw new Error('Error al crear el ticket');
    }
  }
  async calculateTotal(ticketProducts) {
    try {
      let totalAmount = 0;
      for (const product of ticketProducts) {
        const price = product.product.price;
        const quantity = product.quantity;
        totalAmount += price * quantity;
      }
      return totalAmount;
    } catch (error) {
      console.error('Error al calcular el monto total:', error);
      throw new Error('Error al calcular el monto total');
    }
  }

}

export default TicketService;

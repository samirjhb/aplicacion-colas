const fs = require('fs');

class Ticket {
    constructor(numero, escritorio) {

        this.numero = numero;
        this.escritorio = escritorio;

    }

}



class TicketControl {

    constructor() {

        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimo4 = [];

        let data = require('../data/data.json');

        if (data.hoy === this.hoy) {
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimo4 = data.ultimo4;

        } else {
            this.reiniciarConteo();


        }

    }

    siguiente() {
        this.ultimo += 1;

        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);

        this.grabarArchivo();

        return `Ticket ${this.ultimo}`;

    }

    getUltimoTicket() {
        return `Ticket ${this.ultimo}`;

    }

    getUltimo4() {
        return this.ultimo4;

    }

    atenderTicket(escritorio) {

        if (this.tickets.length === 0) {
            return 'No hay tickets';
        }

        let numeroTicket = this.tickets[0].numero;
        this.tickets.shift();

        let atenderTicket = new Ticket(numeroTicket, escritorio);


        this.ultimo4.unshift(atenderTicket);

        if (this.ultimo4.length > 4) {
            this.ultimo4.splice(-1, 1); //borra el ultimo
        }
        console.log('Ultimo 4');
        console.log(this.ultimo4);

        this.grabarArchivo();
        return atenderTicket;
    }

    reiniciarConteo() {
        this.ultimo = 0;
        this.tickets = [];
        this.ultimo4 = [];
        console.log('Se ha inicializado el sistema');
        this.grabarArchivo();


    }

    grabarArchivo() {
        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimo4: this.ultimo4
        };
        let jsonDataString = JSON.stringify(jsonData);

        fs.writeFileSync('./server/data/data.json', jsonDataString);
    }

}



module.exports = {
    TicketControl
}
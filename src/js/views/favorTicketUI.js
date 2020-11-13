class TicketsFavUI {
  constructor() {
    this.container = document.querySelector('#dropdown1');
  }

  renderTicket(ticket) {

    const template = TicketsFavUI.ticketTemplate(ticket);

    this.container.insertAdjacentHTML('afterbegin', template);
  }

  static ticketTemplate(ticket) {
    return `
    <div class="row">
    <div class="col s12 ">
    <div class="favorite-item  d-flex align-items-start">
                <img
                  src="${ticket[7]}"
                  class="favorite-item-airline-img"
                />
                <div class="favorite-item-info d-flex flex-column">
                  <div
                    class="favorite-item-destination d-flex align-items-center"
                  >
                    <div class="d-flex align-items-center mr-auto">
                      <span class="favorite-item-city">${ticket[1]}</span>
                      <i class="medium material-icons">flight_takeoff</i>
                    </div>
                    <div class="d-flex align-items-center">
                      <i class="medium material-icons">flight_land</i>
                      <span class="favorite-item-city">${ticket[2]}</span>
                    </div>
                  </div>
                  <div class="ticket-time-price d-flex align-items-center">
                    <span class="ticket-time-departure">${ticket[3]}</span>
                    <span class="ticket-price ml-auto">${ticket[4]}</span>
                  </div>
                  <div class="ticket-additional-info">
                    <span class="ticket-transfers">${ticket[6]}</span>
                    <span class="ticket-flight-number">${ticket[5]}</span>
                  </div>
                  <a
                    class="waves-effect waves-light btn-small pink darken-3 delete-favorite ml-auto"
                    >Delete</a
                  >
                </div>
              </div>
            </div>
            </div>
    `;
  }
}

const ticketsFavUI = new TicketsFavUI();

export default ticketsFavUI;
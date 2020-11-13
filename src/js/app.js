import '../css/style.css';
import './plugins';
import locations from './store/locations';
import formUI from './views/form';
import ticketsUI from './views/tickets';
import currencyUI from './views/currency';
import favorLoc from './store/favorLocal';
import FavTicket from'./views/favorTicketUI';

document.addEventListener('DOMContentLoaded', e => {
  const form = formUI.form;
  const favorItem =  document.querySelector('.tickets-sections .row');

  // Events
  initApp();
  initAppFavor();
  

  
  form.addEventListener('submit', e => {
    e.preventDefault();
    onFormSubmit();
  });

  favorItem.addEventListener('click', e =>{
    if(e.target.classList.contains('add-favorite'))

    onClickAddFavor(e.target.parentElement);
  });

  // handlers
  async function initApp() {
    await locations.init();
    formUI.setAutocompleteData(locations.shortCities);
  }

  async function onClickAddFavor (oldTick) {
    const airLine_Name = oldTick.querySelector(".ticket-airline-name").textContent;
    const origin = oldTick.querySelectorAll(".ticket-city")[0].textContent;
    const destenation = oldTick.querySelectorAll(".ticket-city")[1].textContent;
    const depart_date = oldTick.querySelector(".ticket-time-departure").textContent;
    const price = oldTick.querySelector(".ticket-price").textContent;
    const flight_number = oldTick.querySelector(".ticket-flight-number").textContent;
    const transfers = oldTick.querySelector(".ticket-transfers").textContent;

    
    await favorLoc.fetchFavorTickets({ airLine_Name, origin, destenation,  depart_date, price, flight_number, transfers});

    FavTicket.renderTicket(favorLoc.lastTicket);
    
    
  }

  async function initAppFavor() {
    await favorLoc.init();
  }

  async function onFormSubmit() {
    const origin = locations.getCityCodeByKey(formUI.originValue);
    const destination = locations.getCityCodeByKey(formUI.destinationValue);
    const depart_date = formUI.departDateValue;
    const return_date = formUI.returnDateValue;
    const currency = currencyUI.currecyValue;

    await locations.fetchTickets({ origin, destination, depart_date, return_date, currency,});

    ticketsUI.renderTickets(locations.lastSearch);

  }
});

// *1 - создать отдельный метод для получения airlines
// *2 - в init добавить получение airlines
// *3 - serializeAirlines
// *4 - serializeTickets и переделать serializeCities и createShortCities и getCityCodeByKey
// *5 - новые методы getAirlineNameByCode, getAirlineLogoByCode, getCityNameByCode
// *6 - TicketsUI

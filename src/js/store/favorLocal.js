import api from '../services/apiService';


class FavorLocal {
  constructor(api){
    this.api = api;
    this.Airlines = {};
    this.lastTicket = {};
    
  }
  async init() {
  
    const response = await this.api.airlines();
    const [Airlines] = response;
    this.Airlines = this.serializeAirlines(response);
    console.log(this.Airlines);
   
    return response;
  }
  

  serializeAirlines(Airlines) {
    // Method changes array [{},{},..] to object {item.code:{}, item.code{..}, ..}
    //Use for serialize store.
    return Airlines.reduce((acc, item) => {
      item.logo = `http://pics.avs.io/200/200/${item.code}.png`;
      item.name = item.name || item.name_translations.en;
      acc[item.name] = item;
      return acc;
    }, {});
  }

  async fetchFavorTickets(ticket) {
    const airLogo = this.Airlines[ticket.airLine_Name].logo;
    this.lastTicket = Object.values(ticket).concat(airLogo);
  }

}

const favorLoc = new FavorLocal(api);

export default favorLoc;
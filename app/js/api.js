/**
* TODO connect with the real API
*/
import _ from 'lodash';
const Api = {

  /**
  * Return the items in shopping cart
  * @returns {Array}
  */
  getUserItemsInShoppingCart() {
    return [{
      name: 'Yo antes de ti',
      price: 340.00,
      deliverPrice: 44,
      autor: 'Joyo Moyes',
      format: 'Tapa blanda',
      photoUrl: 'assets/images/yo_antes_de_ti.jpg',
      deliverDate: 'nov 4 - nov 6',
      quantity: 1,
      language: 'Español',
      id: 'book1',
    }, {
      name: 'All the light We Cannot See',
      price: 129.00,
      deliverPrice: 44,
      autor: 'Antonhy Doeerr',
      format: 'Tapa blanda',
      photoUrl: 'assets/images/light_we_cannot_see.jpg',
      quantity: 1,
      deliverDate: 'nov 4 - nov 6',
      language: 'Inglés',
      id: 'book2',
    }];
  },

  /**
  * Return the suggested books to user
  * @returns {Array}
  */
  getUserSuggestedBooks() {
    return [{
      name: 'Bold',
      price: 89.99,
      deliverPrice: 44,
      autor: 'Peter H Diamonds',
      format: 'Tapa blanda',
      photoUrl: 'assets/images/bold.jpg',
      deliverDate: 'nov 4 - nov 6',
      language: 'Inglés',
      id: 'book3',
    }, {
      name: 'Creatividad S.A',
      price: 100,
      deliverPrice: 20,
      autor: 'Edwin Catmull',
      format: 'Tapa blanda',
      photoUrl: 'assets/images/creatividad.jpeg',
      deliverDate: 'nov 4 - nov 6',
      language: 'Español',
      id: 'book4',
    }, {
      name: 'Harry Potter and the cursed child',
      price: 150.5,
      deliverPrice: 50,
      autor: 'J. K. Rowling',
      format: 'Tapa blanda',
      photoUrl: 'assets/images/harrypotter.jpeg',
      deliverDate: 'nov 4 - nov 6',
      language: 'Inglés',
      id: 'book5',
    }];
  },

  /**
  * Return the value to delivery free to user
  * @return {Int}
  */
  getUserValueToDeliveryFree() {
    return 500;
  },

  /**
  * Simulate a fast validation with burn data
  */
  validateZipCode(zip) {
    const burnZips = [{
      zipCode: 20000,
      city: 'Aguascalientes',
      state: 'Zona centro',
      stateId: 1,
    }, {
      zipCode: 21000,
      city: 'Mexicali',
      state: 'Baja California',
      stateId: 2,
    }, {
      zipCode: 28000,
      city: 'Colima',
      state: 'Colima',
      stateId: 3,
    }];
    const zipInformation = _.find(burnZips, { zipCode: parseInt(zip, 10) });
    return zipInformation;
  },

  getCashPaymentsShops() {
    const shops = [{
      name: 'coppel',
      photoUrl: 'assets/images/coppel.png',
      id: 1,
    }, {
      name: '7eleven',
      photoUrl: 'assets/images/711.png',
      id: 2,
    }, {
      name: 'oxxo',
      photoUrl: 'assets/images/oxxo.png',
      id: 3,
    }, {
      name: 'extra',
      photoUrl: 'assets/images/extra.png',
      id: 4,
    }, {
      name: 'elektra',
      photoUrl: 'assets/images/elektra.png',
      id: 5,
    }, {
      name: 'chedraui',
      photoUrl: 'assets/images/chedraui.png',
      id: 6,
    }];
    return shops;
  },

};

export default Api;

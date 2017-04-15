jest.dontMock('../../app/js/stores/baseStore');
jest.dontMock('../../app/js/constants/ParkingConstants');
jest.dontMock('../../app/js/stores/parkingStore');
jest.dontMock('object-assign');
jest.dontMock('lodash');
jest.dontMock('react-autobind');
jest.dontMock('../../app/js/dispatcher/dispatcher');

import Constants from '../../app/js/constants/ParkingConstants';

describe('payment store', () => {
  let Dispatcher;
  let ParkingStore;

  const onSetVehicles = {
    type: Constants.ON_SET_VEHICLES,
    data: [{}],
  };

  beforeEach(() => {
    Dispatcher = require('../../app/js/dispatcher/dispatcher');
    ParkingStore = require('../../app/js/stores/parkingStore');
  });

  it ('Parking initializated with the correct data', () => {
    expect(ParkingStore.getVehicles().length).toEqual(0);
  });

  it ('Parking store seting correctly the vehicles', () => {
    const oldVehiclesLength = ParkingStore.getVehicles().length;
    Dispatcher.handleViewAction(onSetVehicles);
    const vehiclesLength = ParkingStore.getVehicles().length;
    expect(vehiclesLength).toEqual(oldVehiclesLength + 1);
  });


});

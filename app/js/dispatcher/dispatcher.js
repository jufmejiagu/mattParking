
var Dispatcher = require('flux').Dispatcher;
const assign = require('object-assign');
let n = 0;

var Dispatcher = assign(new Dispatcher(), {

  handleViewAction(action) {
    n++;
    const payload = {
      source: 'VIEW_ACTION',
      action,
    };
    this.dispatch(payload);
  },

  handleServerAction(action) {
    n++;
    const payload = {
      source: 'SERVER_ACTION',
      action,
    };
    this.dispatch(payload);
  },
});

module.exports = Dispatcher;

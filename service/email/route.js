const emailApi = require('./controller/email.controller');

class Routes {
  constructor(app) {
    this.app = app;
  }
  /* creating app Routes starts */
  appRoutes() {

    //Routes of userController
    this.app.post('/sendemail', emailApi.emailSend);

  }

  routesConfig() {
    this.appRoutes();
  }
}
module.exports = Routes;

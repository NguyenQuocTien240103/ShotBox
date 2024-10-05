class LoginController {
    //Get
    getLogin(req, res) {
        res.send('GET request for login');
    }

    // POST
    login(req, res) {
        res.send('POST request for login');
    }
}

export default new LoginController();

class RegisterController {
    // Method Get locallhost/register:
    getRegister(req, res) {
        res.send('Get request for register page');
    }
    // Method Post
    register(req, res) {
        console.log(req.body);
        res.send('Post request for register page');
    }
}

export default new RegisterController();
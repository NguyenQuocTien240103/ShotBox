
class UserController {
    // GET request để lấy thông tin người dùng theo ID
    getUserById(req, res) {
        const userId = req.params.id;
        // Logic để lấy thông tin người dùng dựa vào userId
        res.send(`GET request for user with ID: ${userId}`);
    }

    // PUT request để cập nhật thông tin người dùng
    updateUser(req, res) {
        const userId = req.params.id;
        // Logic để cập nhật thông tin người dùng
        res.send(`PUT request to update user with ID: ${userId}`);
    }

    // DELETE request để xóa người dùng
    deleteUser(req, res) {
        const userId = req.params.id;
        // Logic để xóa người dùng
        res.send(`DELETE request for user with ID: ${userId}`);
    }

}

export default new UserController();
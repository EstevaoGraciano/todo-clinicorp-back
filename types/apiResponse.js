class ApiResponse {
    constructor(data, success = true, error = []) {
        this.data = data;
        this.success = success;
        this.error = error;
    }
}

module.exports = { ApiResponse };

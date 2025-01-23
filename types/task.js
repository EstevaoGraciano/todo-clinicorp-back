class Task {
    constructor(description, responsable, status) {
        this.description = description;
        this.responsable = responsable;
        this.status = status;
        this.computer = "";
        this.errors = [];
    }

    static validateStatus(status) {
        return status === "todo" || status === "doing" || status === "done";
    }

    validate() {
        if (this.description.length === 0) this.errors.push("Insira uma descrição");
        
        if (!Task.validateStatus(this.status)) this.errors.push("Status inválido");

        if (this.errors.length > 0) return false;

        return true;
    }
}

module.exports = { Task };

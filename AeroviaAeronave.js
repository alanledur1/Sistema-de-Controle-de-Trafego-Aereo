// Classe Aeronave
class Aeronave {
    constructor(modelo, id) {
        this.modelo = modelo;
        this.id = id;
    }
}

// Classe ServicoAeronaves
class ServicoAeronaves {
    constructor() {
        this.aeronaves = [];
    }

    adicionarAeronave(aeronave) {
        this.aeronaves.push(aeronave);
    }

    getAeronaves() {
        return this.aeronaves;
    }
}

// Classe Aerovia
class Aerovia {
    constructor(nome, id) {
        this.nome = nome;
        this.id = id;
    }
}

// Classe ServicoAerovias
class ServicoAerovias {
    constructor() {
        this.aerovias = [];
    }

    adicionarAerovia(aerovia) {
        this.aerovias.push(aerovia);
    }

    getAerovias() {
        return this.aerovias;
    }
}
import { validate } from 'bycontract';
import nReadlines from 'n-readlines';
import PromptSync from "prompt-sync";
const prompt = PromptSync({sigint: true});


class Pilotos{
    #matricula
    #nome
    #habilitacaoAtiva

    constructor(matricula, nome, habilitacaoAtiva){
        const matriculaString = String(matricula).padStart(6, '0');
        validate(arguments, ["number", "string", "string"]);
    
        if (matriculaString.length !== 6) {
            throw new Error("Matricula inválida. A matrícula deve ter 6 caracteres.");
        }
        this.#matricula = matricula;
        this.#nome = nome;
        this.#habilitacaoAtiva = habilitacaoAtiva;
    }

    get matricula(){
        return this.#matricula;
    }

    get nome(){
        return this.#nome;
    }

    get habilitacaoAtiva(){
        return this.#habilitacaoAtiva;
    }
    set habilitacaoAtiva(habilitacaoAtiva){
        this.#habilitacaoAtiva = habilitacaoAtiva;
    }

    toString(){
        return `Matrícula: ${this.#matricula}\nNome: ${this.#nome}\nHabilitação ativa: ${this.#habilitacaoAtiva}`;
    }
    


}


export class ServicosPilotos extends Pilotos{
    #listaPilotos; // Nova propriedade para armazenar a lista de pilotos

    constructor(matricula, nome, habilitacaoAtiva){
        validate(arguments, ["number", "string", "string"]);
        super(matricula, nome, habilitacaoAtiva);
        this.#listaPilotos = this.listaDePilotos(); // Armazenar a lista de pilotos ao criar uma instância
    }

    recuperarDadosPilotos(matricula) {
        validate(arguments, ["number"]);
        const buscaDePilotos = this.#listaPilotos; // Usar a lista armazenada
        if (typeof matricula === "number") {
            const pilotoEncontrado = buscaDePilotos.find(piloto => piloto.matricula === matricula);
            if (pilotoEncontrado) {
                return pilotoEncontrado.toString();
            } else {
                throw new Error("Piloto não encontrado");
            }
        }
    }

    listaDePilotos(){
        let arq = new nReadlines('./pilotos.csv');
        let buf;
        let linha;
        let dados;
    
        let listaPilotos = []; // Inicializa a lista de pilotos
    
        while (buf = arq.next()){
            linha = buf.toString('utf8');
            dados = linha.split(',');
            let matriculaPiloto = isNaN(Number(dados[0])) ? 0 : Number(dados[0]);
            let nomePiloto = dados[1];
            let habilitacaoAtivaPiloto = dados[2];
    
            let piloto = new Pilotos(matriculaPiloto, nomePiloto, habilitacaoAtivaPiloto); // Cria um novo objeto Pilotos
            listaPilotos.push(piloto); // Adiciona o piloto à lista de pilotos
        }
    
        return listaPilotos; // Retorna a lista de pilotos
    }
    
        

    toString() {
        // Inicializa uma lista para armazenar as linhas formatadas
        let formattedList = [];
        
        // Adiciona a linha de cabeçalho à lista formatada e uma linha de separação
        formattedList.push("Matricula  | Nome                 | Habilitação Ativa");
        formattedList.push("------------------------------------------------------");

        // Variável para controlar se é a primeira linha do CSV
        let isFirstLine = true; 

        // Itera sobre cada piloto na lista de pilotos
        this.#listaPilotos.forEach(piloto => {
            if (isFirstLine) {
                isFirstLine = false; // Marcar que a primeira linha já foi processada
                return; // Ignorar a primeira linha
            }
            // Formata os dados do piloto e adiciona à lista formatada com linhas separando após cada piloto
            let formattedPiloto = `${piloto.matricula.toString().padEnd(10)} | ${piloto.nome.padEnd(20)} | ${piloto.habilitacaoAtiva}`;
            formattedList.push(formattedPiloto);
            formattedList.push("------------------------------------------------------");
        });
        return formattedList.join("\n");
    }
    
    
}
let servicos = new ServicosPilotos(876145, 'Paulo Gomes Silva', 'sim');
console.log(servicos.toString());
console.log(servicos.recuperarDadosPilotos(876145));



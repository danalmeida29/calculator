import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.scss'],
})
export class CalculadoraComponent implements OnInit {
  input: string = '';
  result: string = '';
  today: Date = new Date();
  ano!: string;

  constructor() {}

  ngOnInit(): void {
    this.ano = this.today.getDate().toLocaleString();
  }

  /**
   * Obtem o numero selecionado.
   * @param num Numero digitado
   * @returns
   */
  clicarNumero(num: string) {
    if (num == '.') {
      if (this.input != '') {
        const lastNum = this.obterUltimoOprador();

        if (lastNum.lastIndexOf('.') >= 0) return;
      }
    }

    if (num == '0') {
      if (this.input == '') {
        return;
      }

      const PrevKey = this.input[this.input.length - 1];
      if (
        PrevKey === '/' ||
        PrevKey === '*' ||
        PrevKey === '-' ||
        PrevKey === '+'
      ) {
        return;
      }
    }

    this.input = this.input + num;
    this.calculaResposta();
  }

  /**
   * Verifica se o ultima expreção é maior do que a anterior
   * @returns ultimo operador digitado
   */
  obterUltimoOprador() {
    let pos: number;

    pos = this.input.toString().lastIndexOf('+');
    if (this.input.toString().lastIndexOf('-') > pos)
      pos = this.input.lastIndexOf('-');
    if (this.input.toString().lastIndexOf('*') > pos)
      pos = this.input.lastIndexOf('*');
    if (this.input.toString().lastIndexOf('/') > pos)
      pos = this.input.lastIndexOf('/');

    return this.input.substr(pos + 1);
  }

  /**
   * Verifica qual operador foi selecionado
   * @param op Operador
   * @returns
   */
  clicarOperador(op: string) {
    const lastKey = this.input[this.input.length - 1];
    if (
      lastKey === '/' ||
      lastKey === '*' ||
      lastKey === '-' ||
      lastKey === '+'
    ) {
      return;
    }

    this.input = this.input + op;
    this.calculaResposta();
  }

  /**
   * Limpa o ultimo valor selecionado
   */
  limpar() {
    if (this.input != '') {
      this.input = this.input.substr(0, this.input.length - 1);
    }
  }

  /**
   * Limpa o display, preparando para uma nova operação
   */
  limparTudo() {
    this.result = '';
    this.input = '';
  }

  /**
   * Calcula a resposta
   */
  calculaResposta() {
    let formula = this.input;

    let lastKey = formula[formula.length - 1];

    if (lastKey === '.') {
      formula = formula.substr(0, formula.length - 1);
    }

    lastKey = formula[formula.length - 1];

    if (
      lastKey === '/' ||
      lastKey === '*' ||
      lastKey === '-' ||
      lastKey === '+' ||
      lastKey === '.'
    ) {
      formula = formula.substr(0, formula.length - 1);
    }

    this.result = eval(formula);
  }

  /**
   * Obtem a resposta.
   */
  obtemResposta() {
    this.calculaResposta();
    this.input = this.result;
    if (this.input == '0') this.input = '';
  }
}

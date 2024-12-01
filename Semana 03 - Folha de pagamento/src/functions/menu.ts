import readlineSync from 'readline-sync'
import {addEmployee, displayEmployees} from './addEmployee';
import { hoursRecord } from './hoursRecord';
import { salaryCalc } from './salaryFunctions';
import Funcionario from '../classes/Funcionario';
import employeeRelatory from './employeeRelatory';

let employeeList: Funcionario[] = [];
export default function mainMenu() {
  let running = true;

  while (running) {
    console.log("\nMenu");
    console.log("1. Adicionar Funcionário");
    console.log("2. Registro de horas");
    console.log("3. Calcular Salário");
    console.log("4. Listar Funcionários");
    console.log("5. Gerar Relatório");
    console.log("6. Sair");

    const op = readlineSync.question("Escolha um item do menu: ");

    switch (op) {
      case "1":
        addEmployee();
        break;
      case "2":
        hoursRecord();
        break;
      case "3":
        salaryCalc(employeeList);
        break;
      case "4":
        console.log("Lista de Funcionários:");
        displayEmployees()
        break;
      case "5":
        employeeRelatory(employeeList);
        break;
      case "6":
        running = false;
        console.log("Saindo...");
        break;
      default:
        console.log("Opção inválida.");
    }
  }
}
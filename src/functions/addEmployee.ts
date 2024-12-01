import Funcionario from "../classes/Funcionario";
import readlineSync from 'readline-sync';

export const employeeList: Funcionario[] = [];

function addEmployee(): void {
  const nameP = readlineSync.question("Insira o nome do funcionário: ");
  const positionP = readlineSync.question("Insira o cargo do funcionário: ");
  const hourValueP = parseFloat(readlineSync.question("Insira o valor hora do funcionário: "));

  if (isNaN(hourValueP)) {
    console.log("Insira apenas números para o valor da hora.");
    return;
  }

  const newEmployee = new Funcionario(nameP, positionP, hourValueP);
  employeeList.push(newEmployee);
  console.log("Funcionário adicionado com sucesso!");
  console.log("Funcionários cadastrados:", employeeList);
}

function displayEmployees() {
  if (employeeList.length === 0) {
    console.log("Nenhum funcionário registrado.");
  } else {
    console.log("Funcionários cadastrados:");
    employeeList.forEach((employee, index) => {
      console.log(`${index + 1}. Nome: ${employee.fullName}, Cargo: ${employee.position}, Valor Hora: R$${employee.hourValue}`);
    });
  }
}


export { addEmployee, displayEmployees };

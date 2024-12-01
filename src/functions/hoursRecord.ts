import readlineSync from 'readline-sync'
import Funcionario from '../classes/Funcionario';

const employees: Funcionario[] = []

export function hoursRecord() {
  const employeeName = readlineSync.question("Digite o nome do funcionário").toLowerCase();
  const matchedNames = employees.filter((emp) => emp.fullName.toLowerCase().includes(employeeName));
  if (matchedNames.length === 0) {
    console.log("Funcionário não encontrado.");
    return;
  }

  let employee: Funcionario;

  if (matchedNames.length === 1) {
    employee = matchedNames[0]
  } else {
    console.log("Existe mais de um funcionário cadastrado com esse nome, lista abaixo.")
    matchedNames.forEach((emp, index) =>
      console.log(`${index + 1}. ${emp.fullName}(${emp.position})`)
    )
  }

  const choice = parseInt(readlineSync.question("Escolha o número correspondente:"), 10);

  if (isNaN(choice) || choice < 1 || choice > matchedNames.length) {
    console.log("Opção inválida");
    return;
  }
  employee = matchedNames[choice - 1]

  const day = readlineSync.question("Insira a data(formato YYYY-MM-DD): ")
  const hoursNumber = parseFloat(readlineSync.question("Insira a quantidade de horas trabalhadas: "))

  if (isNaN(hoursNumber) || hoursNumber <= 0) {
    console.log("Número de horas inválido. Insira um valor válido.");
    return;
  }
  employee.hoursRegister(day, hoursNumber)
}

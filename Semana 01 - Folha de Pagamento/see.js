import PromptSync from "prompt-sync";
const prompt = PromptSync();

const employeeList = [];

// Função para adicionar um funcionário
function addEmployee() {
  const id = parseInt(prompt("Insira a id do funcionário: "), 10);

  if (isNaN(id)) {
    console.log("Insira apenas números.");
    return;
  }

  const fullName = prompt("Insira o nome do funcionário: ");
  const position = prompt("Insira o cargo do funcionário: ");
  const hourValue = parseFloat(prompt("Insira o valor hora do funcionário: "));

  if (isNaN(hourValue)) {
    console.log("Insira apenas números para o valor da hora.");
    return;
  }

  const employee = {
    id,
    fullName,
    position,
    hourValue,
    hoursWorked: [],
  };

  employeeList.push(employee);
  console.log("Funcionário adicionado com sucesso!");
  console.log("Lista de Funcionários:", employeeList);
}

// Função para registrar as horas trabalhadas
function hoursRecord() {
  const employeeId = parseInt(prompt("Digite a id do funcionário para registrar as horas: "), 10);
  const employee = employeeList.find((emp) => emp.id === employeeId);

  if (employee) {
    const hoursNumber = parseFloat(prompt("Insira a quantidade de horas trabalhadas: "));
    if (!isNaN(hoursNumber)) {
      employee.hoursWorked.push(hoursNumber); // Adiciona as horas ao funcionário
      const totalHours = employee.hoursWorked.reduce((sum, hours) => sum + hours, 0);
      console.log(`Total de horas registradas para ${employee.fullName}: ${totalHours} horas`);
    } else {
      console.log("Insira apenas números.");
    }
  } else {
    console.log("Funcionário não encontrado.");
  }
}

// Função para calcular o salário de um funcionário
function totalSalary(employee) {
  const totalHoursWorked = employee.hoursWorked.reduce((sum, hours) => sum + hours, 0);
  const totalSalary = totalHoursWorked * employee.hourValue;
  return totalSalary;
}

// Função para calcular o salário
function salaryCalc() {
  const employeeId = parseInt(prompt("Digite a id do funcionário para calcular o salário: "), 10);
  const employee = employeeList.find((emp) => emp.id === employeeId);

  if (employee) {
    const salary = totalSalary(employee);
    console.log(`Salário total de ${employee.fullName}: R$${salary.toFixed(2)}`);
  } else {
    console.log("Funcionário não encontrado para cálculo de salário.");
  }
}

// Função para mostrar o menu principal
function mainMenu() {
  let running = true;

  while (running) {
    console.log("\nMenu");
    console.log("1. Adicionar Funcionário");
    console.log("2. Registro de horas");
    console.log("3. Calcular Salário");
    console.log("4. Listar Funcionários");
    console.log("5. Sair");

    const op = prompt("Escolha um item do menu: ");

    switch (op) {
      case '1':
        addEmployee();  // Chama a função para adicionar funcionário
        break;
      case '2':
        hoursRecord();  // Chama a função para registrar horas
        break;
      case '3':
        salaryCalc();  // Chama a função para calcular salário
        break;
      case '4':
        console.log("Lista de Funcionários:");
        console.log(employeeList); // Exibe todos os funcionários
        break;
      case '5':
        running = false;
        console.log("Saindo...");
        break;
      default:
        console.log("Opção inválida.");
    }
  }
}

// Chama o menu principal para iniciar o programa
mainMenu();

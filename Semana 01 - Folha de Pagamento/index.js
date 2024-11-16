import PromptSync from "prompt-sync";
const prompt = PromptSync();

const employeeList = [];

function addEmployee() {
  const id = parseInt(prompt("Insira a id do funcionário: "), 10);

  if (isNaN(id)) {
    console.log("Insira apenas números.");
    return addEmployee;
  } else {
    const fullName = prompt("Insira o nome do funcionário: ");
    const position = prompt("Insira o cargo do funcionário: ");
    const hourValue = parseFloat(
      prompt("Insira o valor hora do funcionário: ")
    );
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
  }
}

function hoursRecord() {
  const employeeId = parseInt(prompt("Insira a id do funcionário: "), 10);
  const employee = employeeList.find((emp) => emp.id === employeeId);
  if (employee) {
    const hoursNumber = parseFloat(
      prompt("Insira a quantidade de horas trabalhadas: ")
    );
    if (!isNaN(hoursNumber)) {
      employee.hoursWorked.push(hoursNumber);
      const totalHours = employee.hoursWorked.reduce(
        (sum, hours) => sum + hours,
        0
      );
      console.log(
        `Total de horas registradas para ${employee.fullName}: ${totalHours} horas`
      );
    } else {
      console.log("Insira apenas números.");
    }
  } else {
    console.log("Funcionário não encontrado. ");
  }
}

function totalSalary(employee) {
  const totalHoursWorked = employee.hoursWorked.reduce(
    (sum, hours) => sum + hours,
    0
  );
  const totalSalary = totalHoursWorked * employee.hourValue;

  let inssRate;

  if (totalSalary <= 1320) {
    inssRate = 0.075;
  } else if (totalSalary <= 2571.29) {
    inssRate = 0.09;
  } else if (totalSalary <= 3856.94) {
    inssRate = 0.12;
  } else if (totalSalary >= 3856.95) {
    inssRate = 0.14;
  }

  const inssTotal = totalSalary * inssRate;

  const maxInss = 877.63;
  const finalInssAmount = inssTotal > maxInss ? maxInss : inssTotal;
  const salaryAfterInss = totalSalary - finalInssAmount;

  console.log(`Salário total: R$${totalSalary.toFixed(2)}`);
  console.log(`Desconto de INSS: R$${finalInssAmount.toFixed(2)}`);
  console.log(`Salário após desconto do INSS: R$${salaryAfterInss.toFixed(2)}`);

  return salaryAfterInss;
}

function employeeRelatory() {
  if (employeeList.length === 0) {
    console.log("Nenhum funcionário registrado.");
    return;
  }

  console.log("\nRelatório de Pagamento:");

  employeeList.forEach((employee) => {
    const salaryAfterInss = totalSalary(employee);

    console.log(`\nNome: ${employee.fullName}`);
    console.log(`Cargo: ${employee.position}`);
    console.log(
      `Total de horas trabalhadas: ${employee.hoursWorked.reduce(
        (sum, hours) => sum + hours,
        0
      )} horas`
    );
    console.log(
      `Salário Bruto: R$${(
        employee.hoursWorked.reduce((sum, hours) => sum + hours, 0) *
        employee.hourValue
      ).toFixed(2)}`
    );
    console.log(`Salário Líquido (após INSS): R$${salaryAfterInss.toFixed(2)}`);
  });
}

function salaryCalc() {
  const employeeId = parseInt(
    prompt("Digite a id do funcionário para calcular o salário: "),
    10
  );
  const employee = employeeList.find((emp) => emp.id === employeeId);
  if (employee) {
    const salary = totalSalary(employee);
    console.log(
      `Salário total de ${employee.fullName}: R$${salary.toFixed(2)}`
    );
  } else {
    console.log("Funcionário não encontrado para cálculo de salário.");
  }
}

function mainMenu() {
  let running = true;

  while (running) {
    console.log("\nMenu");
    console.log("1. Adicionar Funcionário");
    console.log("2. Registro de horas");
    console.log("3. Calcular Salário");
    console.log("4. Listar Funcionários");
    console.log("5. Gerar Relatório");
    console.log("6. Sair");

    const op = prompt("Escolha um item do menu: ");

    switch (op) {
      case "1":
        addEmployee();
        break;
      case "2":
        hoursRecord();
        break;
      case "3":
        salaryCalc();
        break;
      case "4":
        console.log("Lista de Funcionários:");
        console.log(employeeList);
        break;
      case "5":
        employeeRelatory();
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
mainMenu();

import readlineSync from 'readline-sync'
import Funcionario from '../classes/Funcionario';


function totalSalary(employees: Funcionario): number {
  if (employees.hoursWorked.length === 0) {
    console.log("Nenhuma hora trabalhada registrada para este funcionário.")
    return 0;
  }
  const totalHoursWorked = employees.hoursWorked.reduce((sum, record) => sum + record.hours, 0);

  const totalSalary = totalHoursWorked * employees.hourValue;
  const inssLimits = [1320, 2571.99, 3856.94]
  const inssRates = [0.075, 0.09, 0.12, 0.14]
  const maxInss = 877.63;

  let inssTotal = 0;
  let remainingSalary = totalSalary
  let inssRate;
  for (let i = 0; i < inssLimits.length; i++) {
    const limit = i === 0 ? inssLimits[i] : inssLimits[i] - inssLimits[i - 1]
    const taxableAmount = Math.min(remainingSalary, limit);
    inssTotal += taxableAmount * inssRates[i];
    remainingSalary -= taxableAmount;
    if (remainingSalary <= 0) break;
  }
  if (remainingSalary > 0) {
    inssTotal += remainingSalary * inssRates[inssRates.length - 1];
  }

  const finalInssAmount = Math.min(inssTotal, maxInss);
  const salaryAfterInss = totalSalary - finalInssAmount;
  console.log(`Salário total: R$${totalSalary.toFixed(2)}`);
  console.log(`Desconto de INSS: R$${finalInssAmount.toFixed(2)}`);
  console.log(`Salário após desconto do INSS: R$${salaryAfterInss.toFixed(2)}`);

  return salaryAfterInss;
}

function salaryCalc(employees: Funcionario[]) {
  const employeeName = readlineSync.question("Digite o nome do funcionário").toLowerCase();
  const matchedNames = employees.filter((emp) => emp.fullName.toLowerCase().includes(employeeName));
  if (matchedNames.length === 0) {
    console.log("Funcionário não encontrado.");
    return;
  }

  let employee: Funcionario;
  if (matchedNames.length > 1) {
    console.log("Mais de um funcionário encontrado com esse nome:");
    matchedNames.forEach((emp, index) =>
      console.log(`${index + 1}. ${emp.fullName} (${emp.position})`)
    );

    const choice = parseInt(
      readlineSync.question("Escolha o número correspondente: "),
      10
    );

    if (isNaN(choice) || choice < 1 || choice > matchedNames.length) {
      console.log("Opção inválida.");
      return;
    }

    employee = matchedNames[choice - 1];
  } else {
    employee = matchedNames[0];
  }

  const salary = totalSalary(employee);
  console.log(
    `Salário total de ${employee.fullName}: R$${salary.toFixed(2)}`
  );
}


export { totalSalary, salaryCalc }
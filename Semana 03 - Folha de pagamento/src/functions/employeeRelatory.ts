import { jsPDF } from "jspdf";
import Funcionario from "../classes/Funcionario";
import { totalSalary } from "./salaryFunctions";
import readlineSync from 'readline-sync'


function employeeRelatory(employeeList: Funcionario[]) {
  if (employeeList.length === 0) {
    console.log("Nenhum funcionário registrado.");
    return;
  }
  const employeeName = readlineSync.question("Digite o nome do funcionário para gerar o relatório: ").toLowerCase();


  const matchedEmployees = employeeList.filter((emp) =>
    emp.fullName.toLowerCase().includes(employeeName)
  );

  if (matchedEmployees.length === 0) {
    console.log("Nenhum funcionário encontrado com esse nome.");
    return;
  }


  let selectedEmployee: Funcionario;
  if (matchedEmployees.length > 1) {
    console.log("Mais de um funcionário encontrado com esse nome:");
    matchedEmployees.forEach((emp, index) =>
      console.log(`${index + 1}. ${emp.fullName} (${emp.position})`)
    );

    const choice = parseInt(
      readlineSync.question("Escolha o número correspondente: "),
      10
    );

    if (isNaN(choice) || choice < 1 || choice > matchedEmployees.length) {
      console.log("Opção inválida.");
      return;
    }

    selectedEmployee = matchedEmployees[choice - 1];
  } else {
    selectedEmployee = matchedEmployees[0];
  }
  const doc = new jsPDF();

  doc.setFont("sans-seriff", "normal");
  doc.setFontSize(12);

  let yPosition = 10;

  doc.text("Folha de pagamento,", 10, yPosition);
  yPosition += 10

  employeeList.forEach((employee: Funcionario) => {
    const totalSalaryAfterInss = totalSalary(employee);

    doc.text(`\nNome: ${employee.fullName},`, 10, yPosition)
    yPosition += 5;

    doc.text(`\nCargo: ${employee.position},`, 10, yPosition)
    yPosition += 5;

    const totalHours = employee.hoursWorked.reduce((sum, record) => sum + record.hours, 0)
    doc.text(`Total de horas trabalhadas: ${totalHours} horas`, 10, yPosition);
    yPosition += 5;

    const salaryBruto = totalHours * employee.hourValue;
    doc.text(`Salário Bruto: R$${salaryBruto.toFixed(2)}`, 10, yPosition);
    yPosition += 5;

    doc.text(`Salário Líquido (após INSS): R$${totalSalaryAfterInss.toFixed(2)}`, 10, yPosition);
    yPosition += 10;
  });
  doc.save("relatorio_de_pagamento.pdf")
}

export default employeeRelatory;
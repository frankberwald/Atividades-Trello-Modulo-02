import { randomUUID } from "crypto";

export default class Funcionario {
  id: string;
  fullName: string;
  position: string;
  hourValue: number;
  hoursWorked: { day: string, hours: number }[];

  constructor(nameP: string, positionP: string, hoursValueP: number) {
    this.id = randomUUID().substring(0, 5);
    this.fullName = nameP;
    this.position = positionP;
    this.hourValue = hoursValueP;
    this.hoursWorked = []
  }

  hoursRegister(day: string, hours: number) {
    if (hours <= 0) {
      console.log("Número de horas inválido. Insira um valor maior que 0.");
      return;
    }
    this.hoursWorked.push({ day, hours });
    console.log(`Horas registradas para ${this.fullName}: ${hours} horas no dia ${day}.`);
  }

  montlhyIncome(): string {
    const totalHours = this.hoursWorked.reduce((sum, record) => sum + record.hours, 0);
    const income = totalHours * this.hourValue;
    return `R$ ${income.toFixed(2)}`
  }
}
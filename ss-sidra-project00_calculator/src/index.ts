#!/usr/bin/env node

import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import gradient from "gradient-string";
import banner from "node-banner";
import figlet from "figlet";
import inquirer from "inquirer";
import { createSpinner } from "nanospinner";

let answer,
  n1: number,
  n2: number,
  op: string,
  result: number,
  ans,
  count = 0;

const sleep = () => new Promise((resolve) => setTimeout(resolve, 2000));

const f0 = async () => {
  await banner(
    "W E L C O M E",
    "This Is The Command Line Interface Calculator Made By Sidra Khalid\n",
    "green",
    "yellow"
  );
  await sleep();
  let text = gradient.teen.multiline(
    [
      ` -------------------------`,
      `| CALCULATOR          0   |`,
      ` -------------------------`,
      ` |   1  |    2   |   3   | `,
      ` ________________________ `,
      ` |   4  |    5   |   6   |`,
      ` ________________________`,
      ` |   7  |    8   |   9   |`,
      ` ________________________`,
      ` |   0  |    +   |   -   |`,
      ` ________________________`,
      ` |   *  |    /   |   =   |`,
      ` ________________________\n`,
    ].join(`\n`)
  );
  console.log(text);
  await sleep();
};

const f1 = async () => {
  answer = await inquirer.prompt({
    name: "q1",
    type: "input",
    message: chalk.greenBright("enter your first number!"),
    default() {
      return 0;
    },
  });
  n1 = answer.q1;
};
const f2 = async () => {
  answer = await inquirer.prompt({
    name: "q2",
    type: "input",
    message: chalk.yellowBright("enter your second number!"),
    default() {
      return 0;
    },
  });
  n2 = answer.q2;
};
const f3 = async () => {
  answer = await inquirer.prompt({
    name: "q3",
    type: "list",
    message: chalk.magenta("select your operation!!"),
    choices: [
      "addition",
      "subtraction",
      "multiplication",
      "division",
      "modulus",
      "exponentiation",
    ],
  });
  op = answer.q3;
};

const f4 = async () => {
  switch (op) {
    case "addition":
      result = Number(n1) + Number(n2);
      break;
    case "subtraction":
      result = n1 - n2;
      break;
    case "multiplication":
      result = n1 * n2;
      break;
    case "division":
      result = n1 / n2;
      break;
    case "modulus":
      result = n1 % n2;
      break;
    case "exponentiation":
      result = n1 ** n2;
  }

  let check = createSpinner(`Calculating result...`).start();
  await sleep();

  let msg;
  if (!isNaN(result)) {
    msg = check.success({
      text: `Answer:` + chalk.italic.whiteBright(`${result} \n`),
    });
  } else {
    msg = check.error({
      text: `Answer:` + chalk.italic.bgRed.whiteBright(` Math Error \n`),
    });
  }

  await sleep();
  let options = await inquirer.prompt({
    name: "option",
    type: "input",
    message: chalk.red("You want to continue!!"),
    default() {
      return "yes/no";
    },
  });
  ans = options.option;
};
await f0();
do {
  const rainbow = chalkAnimation.rainbow(`\nRound ${count} \n`);
  await sleep();
  rainbow.stop();
  await f1();
  await f2();
  await f3();
  await f4();
  count++;
} while (ans == "yes");

if (ans !== "yes") {
  figlet("Process Exits!", function (error, data) {
    console.log(gradient.pastel(data));
  });
}

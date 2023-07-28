#!/usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import banner from "node-banner";
import figlet from "figlet";
import gradient from "gradient-string";

let ans: boolean;
let ansr, r;
let items: string[] = [];
const addMoreItems = async () => {
  let selection: { continu: boolean } = await inquirer.prompt({
    name: "continu",
    type: "confirm",
    message: "you want to add more items?",
  });
  ans = selection.continu;
};
const anotherOperation = async () => {
  let selection: { continu: boolean } = await inquirer.prompt({
    name: "continu",
    type: "confirm",
    message: "you want to perform another operation?",
  });
  ansr = selection.continu;
};
const mainFunction = async () => {
  await banner(
    ` TODO APP`,
    `        CLI based todos project   \n`,
    "green",
    "yellow"
  );
  const question: { ques: string } = await inquirer.prompt({
    name: "ques",
    type: "list",
    message: "What you want?",
    choices: ["add items", "display items", "remove items", "exit"],
  });

  let answer = question.ques;

  if (answer == "add items") {
    do {
      let quest: { ques: string } = await inquirer.prompt({
        name: "ques",
        type: "input",
        message: chalk.rgb(255, 105, 180)(`Add item: `),
        default() {
          return "new item";
        },
        validate: (ques: string) => {
          if (items.includes(ques)) {
            return chalk.bgWhiteBright.italic(`item already exists`);
          } else {
            return true;
          }
        },
      });

      let answ = quest.ques;
      items.push(answ);
      await addMoreItems();
    } while (ans == true);
  } else if (answer == "display items") {
    if (items.length > 0) {
      console.log(items);
    } else {
      console.log(chalk.rgb(153, 101, 21)(`You have no items`));
    }
  } else if (answer == "remove items") {
    if (items.length > 0) {
      let ans: { item: string } = await inquirer.prompt({
        name: "item",
        type: "input",
        message: "Which item you want to remove!",
        default() {
          return chalk.rgb(0, 255, 255)(`${items}`);
        },
      });
      answer = ans.item;
      let element = items.indexOf(answer);
      if (element >= 0) {
        items.splice(element, 1);
        if (items.length > 0) {
          console.log(
            chalk.rgb(128, 0, 128)(`${answer} is successfully removed`)
          );
          console.log(chalk.rgb(255, 192, 203)(`Your updated list is:  `));
          console.log(gradient.pastel(`${items}`));
        } else {
          console.log(
            chalk.rgb(128, 0, 128)(`${answer} is successfully removed`)
          );
          console.log(gradient.pastel(`Your list is empty`));
        }
      } else {
        console.log("item not found");
      }
    } else {
      console.log(chalk.rgb(0, 255, 255)(`Your list have no items`));
    }
  } else if (answer == "exit") {
    return (r = true);
  }
};

do {
  await mainFunction();
  if (!r) {
    await anotherOperation();
  }
} while (ansr == true);
if (r == true || ansr == false) {
  figlet("Process Exits", function (error, data) {
    if (error) {
      console.log(chalk.bgRedBright("something went wrong"));
    } else console.log(gradient.pastel(data));
  });
}

#!/usr/bin/env node

import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import banner from "node-banner";
import inquirer from "inquirer";
import { createSpinner } from "nanospinner";
import figlet from "figlet";
import gradient from "gradient-string";

let words: string, characters: string, result: string[], spinner, res;
const sleep = (ms = 2000) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

const welcome = async () => {
  await banner(
    ` W E L C O M E`,
    `        W O R D S   C O U N T E R   P R O J E C T   \n`,
    `green`,
    "yellow"
  );
  await sleep();
  console.log(`${gradient.pastel(`HOW TO PLAY:`)}`);
  await sleep();
  console.log(`
  ${gradient.vice(`I AM A PROCESS ON YOUR COMPUTER.`)}`);
  await sleep();
  console.log(
    ` ${gradient.morning(`YOU HAVE TO TYPE ANY PARAGRAPH AND I WILL TELL YOU`)}`
  );
  await sleep();
  console.log(
    ` ${gradient.cristal(`WORDS`)} AND ${gradient.cristal(
      `CHARACTERS`
    )} ${gradient.teen(`INCLUDED IN THE PARAGRAPH\n`)} `
  );

  await sleep();

  const welcomeTxt = chalkAnimation.rainbow(
    `- - -     L E T S   S T A R T  T H E  P R O J E C T   -  - - \n`
  );
  await sleep(3000);
  welcomeTxt.stop();
};
const f1 = async () => {
  const paragraph: { para: string } = await inquirer.prompt({
    name: "para",
    type: "input",
    message: chalk.rgb(
      255,
      193,
      203
    )("Please type the paragrapgh to check words and characters!"),
    default() {
      return "paragraph";
    },
  });
  spinner = createSpinner("checking  words...").start();
  await sleep();
  words = paragraph.para;
  result = words.split(" ");
  spinner.success({
    text: chalk.rgb(168, 101, 201)(` WORDS: ${result.length} `),
  });
  spinner = createSpinner("checking characters...").start();
  await sleep();
  characters = paragraph.para.replace(/ /g, "");
  spinner.success({
    text: chalk.rgb(168, 101, 201)(` CHARACTERS: ${characters.length} `),
  });
  await sleep();
};

do {
  await welcome();
  await f1();
 await figlet("Process Exits", function(error,data){console.log(`${gradient.summer(data)}`)})
 await sleep() 
 const ans: { cont: boolean } = await inquirer.prompt({
    name: "cont",
    type: "confirm",
    message: "you want to check again!",
  });
  res = ans.cont;
  await sleep();
} while (res == true);

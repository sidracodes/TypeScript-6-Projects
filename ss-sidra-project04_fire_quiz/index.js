#!/usr/bin/env node 
import chalk from 'chalk';
import chalkAnimation from 'chalk-animation';
import inquirer from 'inquirer';
import { createSpinner } from 'nanospinner';
import figlet from 'figlet';
import gradient from 'gradient-string';
let playerName;
const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));
async function welcome() {
    const rainbowTitle = chalkAnimation.rainbow('**welcome to my first command line game**');
    await sleep();
    /* Stopping the animation. */
    rainbowTitle.stop();
    console.log(`${chalk.bgYellow(`HOW TO PLAY`)}
I AM A PROCESS ON YOUR COMPUTER.
IF YOU GET ANY QUESTION WRONG I'LL BE ${chalk.bgRed(`killed`)}
SO GET ALL THE QUESTIONS RIGHT`);
}
await welcome();
async function askName() {
    const answers = await inquirer.prompt({
        name: 'player_name',
        type: 'input',
        message: 'what is your name?',
        default() {
            return 'Player';
        }
    });
    playerName = answers.player_name;
}
await askName();
async function question1() {
    const answers = await inquirer.prompt({
        name: 'question_1',
        type: 'list',
        message: 'which is most popular programming language?\n',
        choices: [
            'python',
            'typescript',
            'solidity',
            'javascript'
        ],
    });
    return handleAnswer(answers.question_1 == 'javascript');
}
async function handleAnswer(isCorrect) {
    const spinner = createSpinner("checking answer.....").start();
    await sleep();
    if (isCorrect) {
        spinner.success({ text: `nice work! ${playerName}.` });
    }
    else {
        spinner.error({ text: `😀😀😀 GAME OVER , you loose ${playerName}!.` });
        process.exit(1);
    }
}
await question1();
function winner() {
    console.clear();
    const msg = `congratulations , ${playerName} !\n $ 1 , 0 0 0 , 0 0 0 `;
    figlet(msg, (err, data) => {
        console.log(gradient.pastel.multiline(data));
    });
}
await winner();

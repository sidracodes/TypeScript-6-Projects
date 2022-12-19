#!/usr/bin/env node

import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import gradient from "gradient-string";
import inquirer from "inquirer";
import banner from "node-banner";
import { createSpinner } from "nanospinner";

let op: string , cont ;
let userData: {
  userId: string;
  userPin: number;
  userBalance: number;
};

const sleep = (ms=2000) => new Promise( (resolve) => setTimeout(resolve,ms));
const f0=async () => {
  await banner('Automated Teller Machine' ,'              Command Line Interface Based Automated Teller Machine Project Developed By Sidra Khalid\n','green','yellow')
  await sleep();
  const rainbow=chalkAnimation.rainbow(`\n                       W E L C O M E  T O  T H E  A T M  B A N K  S E R V I C E \n`);
    await sleep(3000);
    rainbow.stop();
}

const f1 = async () => {
  await sleep();
  const userInput: { user_id: string; user_pin: number } =
    await inquirer.prompt([
      {
        name: "user_id",
        type: "input",
        message: "USER ID: ",
        default(){
          return 'username'
        }
      },
      {
        name: "user_pin",
        type: "input",
        message: "USER PIN: ",
        default() {
          return "0000";
        },
        validate: (input) =>{
if(isNaN(input)){
  return chalk.bgRedBright('incorrect pin');
}
else{
  return true;
}
        }
      },
    ]);
  userData = {
    userId: userInput.user_id,
    userPin: userInput.user_pin,
    userBalance: Math.floor(Math.random() * 1000000),
  };

  
};

const f2 = async () => {
  const answer: { options: string } = await inquirer.prompt({
    name: "options",
    type: "list",
    message: "What type of transaction you want?\n",
    choices: ["Balance Inquiry","Cash Withdraw","Fast Cash","Deposit Funds"],
  });

  op = answer.options;

  if (op == "Balance Inquiry") {
   const spinner= createSpinner('checking balance...').start();
await sleep();
   spinner.success({ text: `Your current balance is  `+ chalk.italic.green(`RS. ${userData.userBalance}`)})
   
  } else if (op == "Cash Withdraw") {
    console.log(`\nYour current balance is `+ chalk.green.italic(`RS. ${userData.userBalance}\n`));
    const amount : { user_amount :number }= await inquirer.prompt({
      name: "user_amount",
      type: "number",
      message: "Enter your amount to withdraw cash",
      validate: (amount:number) => {
        if (amount > userData.userBalance) {
          return chalk.bgRedBright("insufficient balance");
        } else {
          return true;
        }
      },
    });
  if(isNaN(amount.user_amount)){
    console.log(chalk.bgRedBright.italic.whiteBright(`Enter the amount in numbers`));
    
  }
  else{
    userData.userBalance -= amount.user_amount;
  
     const spinner=createSpinner('transaction is in process').start();
    await sleep();
    spinner.success({ text: `transaction successfull`});
    console.log(`\nYour remaining balance is `+chalk.green(`RS. ${userData.userBalance}`));
   const res: { recipt : string}= await inquirer.prompt({
      name: 'recipt',
      type: 'input',
      message: 'You want to print reciept',
      default(){
        return 'yes/no'
      }
    })
    console.log(chalk.greenBright(`\nAccount No: `),chalk.yellowBright(`PK20112001`));
    console.log(chalk.greenBright(`Account Opening Date: `),chalk.yellowBright(`11-January-2022\n`));
  
    if(res.recipt == 'yes'){
    
       const spinner= createSpinner('generating recipt...').start();
      await sleep();
      spinner.success({text: chalk.greenBright(`\n                 Receipt
      *******************************
          A/C Holder Name:  ${userData.userId}
      -------------------------------
          Money Deduct:   RS.${amount.user_amount}
      -------------------------------
         Remaining Balance: RS.${userData.userBalance}
    
      *******************************\n\n`)})
    }
  }

  } else if (op == "Deposit Funds") {
    console.log(`\nYour current balance is `+chalk.green(`RS. ${userData.userBalance}`));
    
    const amount : { recipent_id:number,user_amount :number }= await inquirer.prompt([{
      name: "recipent_id",
      type: "input",
      message: "Enter your recipent id",
      default(){
        return 'recipients name'
      }
    },
    {
      name: "user_amount",
      type: "number",
      message: "Enter your amount to transfer funds",
      validate: (amount:number) => {
        if (amount > userData.userBalance) {
          return chalk.bgRedBright("insufficient balance");
        } else {
          return true;
        }
      },
    }]);
    if(isNaN(amount.user_amount)){
      console.log(chalk.bgRedBright.italic.whiteBright(`Enter the amount in numbers`));
      
    }
    else{
    const spinner=createSpinner('transaction is in process').start();
    await sleep(3000);
    spinner.success({text: 'transaction successfull'})
    userData.userBalance -= amount.user_amount;
    console.log(`Your remaining balance is `+chalk.green(`RS. ${userData.userBalance}`));

    const res: { recipt : string}= await inquirer.prompt({
      name: 'recipt',
      type: 'input',
      message: 'You want reciept',
      default(){
        return 'yes/no'
      }
    })
    console.log(chalk.greenBright(`\nAccount No: `),chalk.yellowBright(`PK20112001`));
      console.log(chalk.greenBright(`Account Opening Date: `),chalk.yellowBright(`11-January-2022\n`));
     
    if(res.recipt == 'yes'){
       const spinner= createSpinner('generating recipt...').start();
      await sleep();
     
      spinner.success({text: chalk.greenBright(`                 Receipt
      *******************************
          A/C Holder Name:  ${userData.userId}
      -------------------------------
          Recipent Name:  ${amount.recipent_id}
      -------------------------------
          Money Transfer:   RS.${amount.user_amount}
      -------------------------------
         Remaining Balance: RS.${userData.userBalance}
    
      *******************************\n\n`)})
    }
  }
  } else if (op == "Fast Cash") {
    await sleep();
    const answer : { money: string}=await inquirer.prompt({
      name: 'money',
      type: 'list',
      message: 'How much money you want?',
      choices: ['1000','3000','5000','8000']
    });
    
   let rs = answer.money;
   switch(rs){
    case '1000':
      userData.userBalance -=1000 ;
      break;
    case '3000':
      userData.userBalance -=3000 ;
      break;
    case '5000':
      userData.userBalance -=5000 ;
      break;
    case '8000':
      userData.userBalance -=8000 ;
      break;
   }
    

    const spinner=createSpinner('transaction is in progress').start();
    await sleep();
    spinner.success({text: 'transaction successfull'})
console.log('Your remaining accout balance is '+ chalk.green(`RS. ${userData.userBalance}`));


  }
};

const func=async()=>{
await f0();
await f1();
do{
  await f2();

  cont =await inquirer.prompt({
    name: 'continu',
    type: 'input',
    message: 'You want to perform another transaction?',
    default(){
      return 'yes/no'
    }
  })
  cont.continu == 'no' && console.log(gradient.pastel("Thanks for using our service...."));
}
while( cont.continu == 'yes')
await sleep();
}

await func();
figlet('GOOD BYE',function(error,data){
  if(error){
    console.log(chalk.bgRedBright('something went wrong'));
    
  }
  else{
    console.log(gradient.vice(data));
    
  }
})
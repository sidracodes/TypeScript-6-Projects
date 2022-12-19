0.    mkdir foldername(command that makes folder/directory)

1.    npm init -y(makes package.json file)

2.    installing dependencies (it makes package-lock.json file & node_modules folder)

###    npm i packagename
npm i chalk chalk-animation figlet gradient-string inquirer nanospinner node-banner 
 
 3.     also install dev dependencies of packages 

 ##    npm i -D @types/packagename   
 npm i -D @types/node
 npm i -D @types/chalk
 npm i -D @types/chalk-animation
 npm i -D @types/figlet
 npm i -D @types/inquirer
 npm i -D @types/gradient-string

4. in package.json file, under main,define 
###    "type" : "module"  
which means we wants to use ESM modules(it allows us to use import export syntax,instead of common JS require function).

5. add shebang#! at top in index.js file ( it tells operating system to run and execute the code with the nodejs version installed on a system )
### shebang:
 #!/usr/bin/env node  

6. import all packages 

## import chalk from 'chalk'           
 // ( it colors the output )
## import banner from 'node-banner'         
  // ( it prints colored title and tagline)
## import chalkAnimation from 'chalk-animation'         
   // ( animated colored text ) 
## import figlet from 'figlet           
// (makes large letters of ordinary texts )
## import gradient from 'gradient-string';     
 //( colorful gradient text )
## import inquirer from 'inquirer'           
 // ( it is use to collect user input )
## import createSpinner from 'nanospinner'    
   // ( creates spinner for checking purpose )

7. top level await ( we can use await outside asyncronous function/ without async function )(await is like defer)

8. add an entery for bin in package.json file that points to index.js file
 ###     "bin": "./index.js",

9. npm login

10. npm publish


###### commands to run project:

1.  ### npx ss-sidra-project00_calculator

2. ###  npx ss-sidra-project01_number_guessing_game

3. ### npx ss-sidra-project02_atm_project
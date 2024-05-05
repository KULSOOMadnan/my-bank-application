#! /usr/bin/env/node

import inquirer from "inquirer";
import chalk from "chalk";

console.log(chalk.rgb(224, 176, 255)('\n\t\t~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~'));
console.log(chalk.rgb(244, 194, 194).italic.bold('\t\t\t----------------------WELCOME TO KULSOOM BANK 🏦----------------------'));
console.log(chalk.rgb(224, 176, 255)('\t\t~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n'));



class Customer{
    firstName : string;
    lastName : string;
    age : number;
    gender: string;
    MobileNumber : number;
    pinCode : number
    
    
    constructor(){
        this.firstName = "",
        this.lastName = "",
        this.age = 0,
        this.gender = ""
        this.MobileNumber = 0 
        this.pinCode = this.pingenerator()
       
       
    }
    pingenerator():any{
        return Math.floor(Math.random() * 10000) 
        
        
    }
    getcustomerInfo(){
        return `
                First Name : ${chalk.rgb(244, 194, 194)(this.firstName)} -
                Last Name : ${chalk.rgb(244, 194, 194)(this.lastName)} -
                Age : ${chalk.rgb(244, 194, 194)(this.age)} -
                Gender : ${chalk.rgb(244, 194, 194)(this.gender)} -
                Mobile Number : ${chalk.rgb(244, 194, 194)(this.MobileNumber)} -
                 `
    }

}


class bankAccount {
    credit : string;
    debit : string;
    protected accountBalance : number;

    constructor(){
        
        this.credit = 
        this.debit = ""
        this.accountBalance = 0
        
    }
    bankaccount(code : number){
       let check = user.pinCode == code
        if(!check){
            console.log(chalk.red.italic.bold("\n\tInvalid pin code\n"));
        }else{
            return this.accountBalance 
        }
        
    }
    
    Debit(code : number,amount : number){
       let check = user.pinCode == code
       if(!check){
         console.log(chalk.red.italic.bold("\n\tInvalid pin code\n"));
        
       }else{
            let statment = ""
            if(amount > 0 ){
            if(this.accountBalance >= amount){
                this.accountBalance -= amount 
                console.log(chalk.rgb(255, 105, 180).italic.bold(`\n\tYour remaining balance is ${chalk.yellow.bold(this.accountBalance)} $`));
                statment = `  Transaction succesfull!`
            }else{
                statment =  chalk.red.italic.bold("You dont have enough amount do do this transaction!")
                console.log(chalk.rgb(255, 105, 180).italic(`\n\t\tYour Account balance is ${chalk.yellow.bold(this.accountBalance)} $`));

            }
             console.log(chalk.rgb(224, 176, 255).italic.bold(`\n\t ${statment}\n`));
            }
        }
    }
       
    
    Credit(code : number ,amount : number){
        let check = user.pinCode == code
       if(!check){
        console.log(chalk.red.italic.bold("\n\tInvalid pin code\n"));
        
       }else{
         let message :string = "Transaction failed!"
        if(amount > 0 ){
            this.accountBalance += amount
            if(amount > 100){
                this.accountBalance -= 1
            }
            message =  "Your account has been credited succesfull! "
        }
         console.log(chalk.rgb(224, 176, 255).italic.bold(`\n\t${message}`));
         console.log(chalk.rgb(255, 105, 180).italic(`\n\t   Your New Account balance is ${chalk.yellow.bold(this.accountBalance)}$\n `));
        }
          
    }
    
}

let user = new Customer()

async function getuserInfo() {
    let details = await inquirer.prompt(
        [
            {
                name : "name",
                type: "input",
                message : chalk.rgb(244, 194, 194).italic("please enter your First Name : "),
                validate : (input)=> /^[A-Za-z]+$/.test(input) ? true : "Please Enter only alphabatical character"
            },{
                name : "lname",
                type: "input",
                message : chalk.rgb(244, 194, 194).italic("please enter your Last Name : "),
                validate : (input)=> /^[A-Za-z]+$/.test(input) ? true : "Please Enter only alphabatical character"
            },{
                name : "age",
                type: "input",
                message : chalk.rgb(244, 194, 194).italic("please enter your Age : "),
                validate : (input: string) => {
                    if (input.trim() === '') {
                        return "Age cannot be empty";
                    }
                    const number = parseInt(input);
                    if (isNaN(number)) {
                        return "Please enter a numerical value";
                    } else if (!/^\d+$/.test(input)) {
                        return "Please enter a valid number";
                    } else if (input.length !== 2 ) {
                        return "You are not be able to create an account";
                    }
                    return true; // Input is valid
                }
    
            },{
                name : "gender",
                type: "input",
                message : chalk.rgb(244, 194, 194).italic("please enter your Gender : "),
                validate : (input)=> /^[A-Za-z]+$/.test(input) ? true : "Please Enter only alphabatical character"
            },
            {
                name : "mobileNo",
                type: "input",
                message : chalk.rgb(244, 194, 194).italic("please enter Mobile Number: "),
                validate : async (input: string) => {
                    if (input.trim() === '') {
                        return "Mobile number cannot be empty";
                    }
                    const number = parseInt(input);
                    if (isNaN(number)) {
                        return "Please enter a numerical value";
                    } else if (!/^\d+$/.test(input)) {
                        return "Please enter a valid number";
                    } else if (input.length !== 11) {
                        return "Please enter exactly 11 digits";
                    }
                    return true; // Input is valid
                }
                    
            }
            
        ]
    )
    user.firstName = details.name
    user.lastName = details.lname
    user.age = details.age
    user.gender = details.gender
    user.MobileNumber = details.mobileNo
    console.log(chalk.rgb(224, 176, 255).italic.bold(user.getcustomerInfo()));
    console.log(chalk.rgb(224, 176, 255).italic.bold(`
             "Your account has been successfully created"
                 ${chalk.rgb(224, 176, 255)(user.firstName)}  your pin code is: ${chalk.yellow(user.pinCode)}\n`));
    
    
}


let Account = new bankAccount()

async function transaction() {
    
    let condition = true
    while (condition) {
        let trans = await inquirer.prompt(
            [
                {
                    name: "ans",
                    type: "list",
                    message: chalk.rgb(244, 194, 194).italic("what kind of Action you want to  perform  :"),
                    choices: ["Create Account","Credit","Debit","Check Balance","Exit"]

                }
            ]
        )
        if(trans.ans == "Create Account"){
             await  getuserInfo()
        }else if(trans.ans == "Debit"){
            let Check = await inquirer.prompt(
                {
                    name: "code",
                    type: "input",
                    message:chalk.rgb(244, 194, 194).italic("please enter your PIN code"),
                    validate: (input: string) => {
                        if (input.trim() === '') {
                            return "pin code cannot be empty";
                        }
                        const number = parseInt(input);
                        if (isNaN(number)) {
                            return "Please enter a numerical value";
                        } else if (!/^\d+$/.test(input)) {
                            return "Please enter a valid number";
                        } 
                        return true; // Input is valid
                    }

                }
            )
            let debits = await inquirer.prompt([
                {
                    name:"deb",
                    type :"number",
                    message:chalk.rgb(244, 194, 194).italic("Enter the amount you want to debit "),
                    validate : (number)=> /^\d+$/.test(number)? true : "Please enter only numerical value"

                }
            ])
            Account.Debit( Check.code ,debits.deb)

        }else if(trans.ans == "Credit"){
            let Check = await inquirer.prompt(
                {
                    name: "code",
                    type: "input",
                    message:chalk.rgb(244, 194, 194).italic("please enter your PIN code"),
                    validate: (input: string) => {
                        if (input.trim() === '') {
                            return "pin code cannot be empty";
                        }
                        const number = parseInt(input);
                        if (isNaN(number)) {
                            return "Please enter a numerical value";
                        } else if (!/^\d+$/.test(input)) {
                            return "Please enter a valid number";
                        } 
                        return true; // Input is valid
                    }
                }
            )
            let credits = await inquirer.prompt([
                {
                    name:"cred",
                    type :"number",
                    message:chalk.rgb(244, 194, 194).italic("Enter the amount you want to credit "),
                    validate : (number)=> /^\d+$/.test(number)? true : "Please enter a numerical value"

                }
            ])
               Account.Credit(Check.code,credits.cred)


        }else if(trans.ans == "Check Balance"){
            let Check = await inquirer.prompt(
                {
                    name: "code",
                    type: "input",
                    message:chalk.rgb(244, 194, 194).italic("please enter your PIN code"),
                    validate: (input: string) => {
                        if (input.trim() === '') {
                            return "pin code cannot be empty";
                        }
                        const number = parseInt(input);
                        if (isNaN(number)) {
                            return "Please enter a numerical value";
                        } else if (!/^\d+$/.test(input)) {
                            return "Please enter a valid number";
                        } 
                        return true; // Input is valid
                    }
                }
            )
            let balance = Account.bankaccount(Check.code)
            console.log(chalk.magenta.italic.bold(`\n\tYour current balance is: ${chalk.yellow(balance)} $\n`));

            
        }else if(trans.ans == "Exit"){
            console.log(chalk.rgb(224, 176, 255)('\n\t\t~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~'));
            console.log(chalk.rgb(244, 194, 194).italic.bold("\t\t\t ------------- Thank you for using Kulsoom bank✨ -------------"));
            console.log(chalk.rgb(224, 176, 255)('\t\t~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n'));

            break
            
        }else{
            console.log('Invalid action');
            
        }
    }
}

transaction()
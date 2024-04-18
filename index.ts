#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

console.log(chalk.whiteBright("\nWelcome to the word counter from ") + chalk.greenBright("Muhammad Samad!"));
console.log();

async function main() {
    const answers: {
        sentence: string
    } = await inquirer.prompt(
        [
            {   
                name: "sentence",
                type: "input",
                message: chalk.whiteBright("Enter a sentence: "),
                validate: (input) => {
                    if (input.trim().length === 0) {
                        return chalk.redBright("Please enter a valid sentence.");
                    }
                    return true;
                }
            }
        ]
    );

    const sentence = answers.sentence.trim();
    const words = sentence.toLowerCase().split(/\s+/);

    const optionPrompt = await inquirer.prompt(
        [
            {
                name: "option",
                type: "list",
                message: chalk.whiteBright("Choose an option:"),
                choices: ["Count Words", "Exit"]
            }
        ]
    );

   if(optionPrompt.option === "Count Words" ){
    console.log(`Your number of words is: ${words.length}`);
   }

   if(optionPrompt.option === "Exit"){    
    console.log(chalk.yellowBright("Exiting program..."));
    console.log(chalk.greenBright.italic("\n\tThanks for using this app"));
            return; 
    }

    const continuePrompt = await inquirer.prompt({
        name: "continue",
        type: "confirm",
        message: chalk.whiteBright("Do you want to continue?")
    });
    if (continuePrompt.continue) {
        console.log();
        main();
    } else {
        console.log(chalk.yellowBright("Exiting program..."));
        console.log(chalk.greenBright.italic("\n\tThanks for using this app"));
    }
}
main();
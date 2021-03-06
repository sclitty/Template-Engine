const Manager = require("./lib/Manager.js");
const Engineer = require("./lib/Engineer.js");
const Intern = require("./lib/Intern.js");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer.js");

// An array to store employee data
const allEmployees = [];
// An array to verify no identical IDs are created 
const idArray = [];

// Write code to use inquirer to gather information about the development team members,
// and to create objects  for each team member (using the correct classes as blueprints!)

generateEmployee();

function generateEmployee() {
    inquirer.prompt(
        {
            type: "list",
            name: "role",
            message: "What is your company title?",
            choices: ["Manager", "Engineer", "Intern", "Quit"]
        }).then(function({ role }){
            switch (role) {
                case "Manager":
                    createManager();
                    break;
                
                case "Engineer":
                    createEngineer();
                    break;

                case "Intern":
                    createIntern();
                    break;

                default:
                    buildTeam();
            }
        });   
};

    // Make a Manager ===> function generateEmployee 
    function createManager() { 
        inquirer.prompt([
            {
                type: "input", 
                name: "managerName",
                message: "What is your First and Last name?",
                validate: answer => {
                    if (answer !== " ") {
                        return true 
                    } 
                    return "Please enter Manager's name"
                }
            },
            {
                type: "input", 
                name: "managerId",
                message: "What is your company ID?",
                validate: answer => {
                    const pass = answer.match(
                        /^[1-9]\d*$/
                    )
                    if (pass) {
                        if(idArray.includes(answer)) {
                            return "This ID number is not valid"
                        } else {
                            return true
                        }
                    }
                }
            },
            {
                type: "input", 
                name: "managerEmail",
                message: "What is your company Email?",
                validate: answer => {
                    const pass = answer.match(
                        /\S+@\S+\.\S+/
                    )
                    if (pass) {
                        return true
                    } 
                    return "Please enter a valid email address."
                }
            },
            {
                type: "input", 
                name: "managerOfficeNumber",
                message: "What is your company Office Number?",
                validate: answer => {
                    const pass = answer.match(
                        /^[1-9]\d*$/
                    )
                    if (pass) {
                        return true
                    } 
                    return "Please enter a valid office number."
                }
            }
        ]).then(answers => {
            const manager = new Manager (answers.managerName,answers.managerId, answers.managerEmail, answers.managerOfficeNumber)
            allEmployees.push(manager)
            idArray.push(answers.managerId)

            generateEmployee();
        })
    };

    // Make an Engineer ===> function generateEmployee
    function createEngineer() {
        inquirer.prompt([
            {
                type: "input", 
                name: "engineerName",
                message: "What is your First and Last name?",
                validate: answer => {
                    if (answer !== " ") {
                        return true 
                    } 
                    return "Please enter Engineer's name"
                }
            },
            {
                type: "input", 
                name: "engineerId",
                message: "What is your company ID?",
                validate: answer => {
                    const pass = answer.match(
                        /^[1-9]\d*$/
                    )
                    if (pass) {
                        if(idArray.includes(answer)) {
                            return "This ID number is not valid"
                        } else {
                            return true
                        }
                    }
                }
            },
            {
                type: "input", 
                name: "engineerEmail",
                message: "What is your company Email?",
                validate: answer => {
                    const pass = answer.match(
                        /\S+@\S+\.\S+/
                    )
                    if (pass) {
                        return true
                    } 
                    return "Please enter a valid email address."
                }
            },
            {
                type: "input", 
                name: "engineerGithub",
                message: "What is your github username?"
            }
        ]).then(answers => {
            const engineer = new Engineer (answers.engineerName,answers.engineerId, answers.engineerEmail, answers.engineerGithub)
            allEmployees.push(engineer)
            idArray.push(answers.engineerId)

            generateEmployee();
        })
    };

    // Make an Intern ===> function generateEmployee
    function createIntern() {
        inquirer.prompt([
            {
                type: "input", 
                name: "internName",
                message: "What is your First and Last name?",
                validate: answer => {
                    if (answer !== " ") {
                        return true 
                    } 
                    return "Please enter Intern's name"
                }
            },
            {
                type: "input", 
                name: "internId",
                message: "What is your company ID?",
                validate: answer => {
                    const pass = answer.match(
                        /^[1-9]\d*$/
                    )
                    if (pass) {
                        if(idArray.includes(answer)) {
                            return "This ID number is not valid"
                        } else {
                            return true
                        }
                    }
                }
            },
            {
                type: "input", 
                name: "internEmail",
                message: "What is your company Email?",
                validate: answer => {
                    const pass = answer.match(
                        /\S+@\S+\.\S+/
                    )
                    if (pass) {
                        return true
                    } 
                    return "Please enter a valid email address."
                }
            },
            {
                type: "input", 
                name: "internSchool",
                message: "What school do you attend?"
            }
        ]).then(answers => {
            const intern = new Intern (answers.internName,answers.internId, answers.internEmail, answers.internSchool)
            allEmployees.push(intern)
            idArray.push(answers.internId)

            generateEmployee();
        })
    };

    // Build the team and render the HTML 
    function buildTeam() {
        if (!fs.existsSync(OUTPUT_DIR)) {
            fs.mkdirSync(OUTPUT_DIR)
        }
        fs.writeFileSync(outputPath, render(allEmployees), "utf-8");  
    };

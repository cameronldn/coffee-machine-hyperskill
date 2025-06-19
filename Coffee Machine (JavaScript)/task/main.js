const input = require('sync-input');

class Coffee {
    constructor(water, milk, beans, price) {
        this.water = water;
        this.milk = milk;
        this.beans = beans;
        this.price = price;
    }
}

class CoffeeMachine {
    constructor(water, milk, beans, cups, money) {
        this.water = water;
        this.milk = milk;
        this.beans = beans;
        this.cups = cups;
        this.money = money;
    }
}

const coffeeMachine = new CoffeeMachine(400, 540, 120, 9, 550);
const espresso = new Coffee(250, 0, 16, 4);
const latte = new Coffee(350, 75, 20, 7);
const cappuccino = new Coffee(200, 100, 12, 6);
const coffees = [espresso, latte, cappuccino];

takeInput();

function takeInput() {
    const action = input("Write action (buy, fill, take, remaining, exit):");
    resolveInput(action);
}

function resolveInput(input) {
    switch (input.toLowerCase()) {
        case "buy":
            buyCoffee();
            break;
        case "fill":
            fillMachine();
            break;
        case "take":
            takeMoney();
            break;
        case "remaining":
            machineInventory();
            takeInput();
            break;
        case "exit":
            process.exit(0);
            break;
        default:
            console.log("\nInvalid Input: please only input 'buy', 'fill', 'take', 'remaining' or 'exit'\n");
            takeInput();
    }
}

function buyCoffee() {
    const coffeeType = input("Write the type of coffee you want (1 - espresso, 2 - latte, 3 - cappuccino, back - to main menu):");
    switch(coffeeType) {
        case "1":
            if(checkInventory(coffees[0])) updateMachineInventory(coffees[0]);
            break;
        case "2":
            if(checkInventory(coffees[1])) updateMachineInventory(coffees[1]);
            break;
        case "3":
            if(checkInventory(coffees[2])) updateMachineInventory(coffees[2]);
            break;
        case "back":
            break;
        default:
            console.log("\nInvalid Input: please only input '1', '2' or '3'\n");
    }
    takeInput();
}

function fillMachine() {
    console.log("FILLING MACHINE 2");
    console.log("");

    let fillWater = input("Write how many ml of water do you want to add:");
    if (isNaN(Number(fillWater))) {
        console.log("\nInvalid Input: please only input numbers\n");
    } else coffeeMachine.water += Number(fillWater);

    let fillMilk = Number(input("Write how many ml of milk do you want to add:"));
    if (isNaN(Number(fillMilk))) {
        console.log("\nInvalid Input: please only input numbers\n");
    } else coffeeMachine.milk += Number(fillMilk);

    let fillBeans = Number(input("Write how many grams of coffee beans do you want to add:"));
    if (isNaN(Number(fillBeans))) {
        console.log("\nInvalid Input: please only input numbers\n");
    } else coffeeMachine.beans += Number(fillBeans);

    let fillCups = Number(input("Write how many disposable cups do you want to add:"));
    if (isNaN(Number(fillCups))) {
        console.log("\nInvalid Input: please only input numbers\n");
    } else coffeeMachine.cups += Number(fillCups);

    takeInput();
}

function takeMoney() {
    console.log(`\nI gave you $${coffeeMachine.money}`);
    coffeeMachine.money = 0;
    takeInput();
}

function machineInventory() {
    console.log("\nThe coffee machine has:");
    console.log(`${coffeeMachine.water} ml of water`);
    console.log(`${coffeeMachine.milk} ml of milk`);
    console.log(`${coffeeMachine.beans} g of coffee beans`);
    console.log(`${coffeeMachine.cups} disposable cups`);
    console.log(`$${coffeeMachine.money} of money\n`);
}

function checkInventory(coffee) {
    if (coffeeMachine.water >= coffee.water && coffeeMachine.milk >= coffee.milk && coffeeMachine.beans >= coffee.beans && coffeeMachine.cups >= 1) {
        console.log("\nI have enough resources, making you a coffee!\n");
        return true;
    } else {
        const missingWater = coffeeMachine.water < coffee.water;
        const missingMilk = coffeeMachine.milk < coffee.milk;
        const missingCoffee = coffeeMachine.beans < coffee.beans;
        const missingCups = coffeeMachine.cups < 1;
        console.log("");
        if (missingWater) console.log("Sorry, not enough water!");
        if (missingMilk) console.log("Sorry, not enough milk!");
        if (missingCoffee) console.log("Sorry, not enough coffee beans!");
        if (missingCups) console.log("Sorry, not enough disposable cups!");
        console.log("");
        return false;
    }
}

function updateMachineInventory(coffee) {
    coffeeMachine.water -= coffee.water;
    coffeeMachine.milk -= coffee.milk;
    coffeeMachine.beans -= coffee.beans;
    coffeeMachine.cups -= 1;
    coffeeMachine.money += coffee.price;
}
var mysql = require("mysql");
var inquirer = require("inquirer");
var tempAmt = 0;
var totalAmt = 0;

var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "root",
    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    printItems();
    checkout();
});

function printItems() {
    connection.query("SELECT * FROM products", function (err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log("Item ID: " + res[i].item_id + " | " + "Product Name: " + res[i].product_name + " | " + "Department Name: " + res[i].department_name + " | " + "Item Price: $" + res[i].price + " | " + "Left In Stock: " + res[i].stock_quantity + " units\n");
        }
    });
}

function checkout() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        var choiceArray = [];
        for (var i = 0; i < res.length; i++) {
            choiceArray.push(res[i].product_name);
            
        }
        // console.log(choiceArray);
        // return choiceArray;
        inquirer
            .prompt([{
                    name: "choice",
                    type: "list",
                    choices: choiceArray,
                    // function () {
                    //     // var choiceArray = [];
                    //     // for (var i = 0; i < res.length; i++) {
                    //     //     choiceArray.push(res[i].product_name);
                    //     //     console.log(choiceArray);
                    //     // }
                    //     // return choiceArray;
                    // },
                    message: "Please select an item."
                },
                {
                    name: "quantity",
                    type: "input",
                    message: "How many units of this item would you like to buy?"
                },

                {
                    type: "confirm",
                    message: "Add this to your cart:",
                    name: "confirm",
                    default: false
                }
            ])
            .then(function (answer) {
                var chosenItem;
                for (var i = 0; i < res.length; i++) {
                    if (res[i].product_name === answer.choice) {
                        chosenItem = res[i];
                    }
                }

                if (chosenItem.stock_quantity >= parseInt(answer.quantity)) {

                    tempAmt = chosenItem.price * answer.quantity;
                    totalAmt = totalAmt + tempAmt;
                    connection.query(
                        // "SELECT (stock_quantity - " + answer.quantity + ") FROM products WHERE ?"
                        "UPDATE products SET stock_quantity = " +  (chosenItem.stock_quantity - answer.quantity) + " WHERE ?", [{
                            item_id: chosenItem.item_id
                        }],
                        function (error) {
                            if (error) throw error;
                            console.log("Item Purchase Successful!");
                        }
                    );
                    connection.query(
                        "SELECT (price * ?) FROM products WHERE ?", [{
                                stock_quantity: answer.quantity
                            },

                            {
                                item_id: chosenItem.item_id
                            }
                        ],
                        function (error) {
                            if (error) throw error;
                            console.log("All set!");
                            console.log("Your Total is: $" + totalAmt);
                            totalAmt = 0;
                            tempAmt = 0;
                            checkout();
                        }
                    );
                } else {
                    console.log("The product you requested has been sold out");
                    checkout();
                }
            });
    });

}
// Adding try catch to throw validation error and not supported environment
try {
    if (typeof prompt !== "function") {
        throw new Error("Please run on browser. Prompt function is not available in this enivironmnet");
    }

    let customerName;
    let amount;

    // Get value of username and purchase amount until valid
    while (true) {
        customerName = prompt("Enter your name:");
        amount = parseFloat(prompt("Enter your purchase amount:"));

        // Check if the entered name is valid (non-empty and not a number)
        if (!customerName.trim() || !isNaN(customerName)) {
            alert("Invalid name. Please enter a valid name.");
            continue;
        }

        // Check if the entered amount is valid (greater than 0)
        if (isNaN(amount) || amount <= 0) {
            alert("Invalid amount. Please enter a valid amount greater than 0.");
            continue;
        }
        
        // Exit loop if both name and amount are valid
        break; 
    }


    // Calculate bonus points
    let bonusPoints = Math.floor(calculateBonus(amount));

    if (bonusPoints > 0) {

        // Show bonus points to user through alert
        alert(`${customerName}, you have ${bonusPoints} bonus points.`);

        // Select a voucher and calculate the final amount
        let pointsToRedeem = selectVoucher(bonusPoints);
        //Reduce points from deducted points
        bonusPoints -= pointsToRedeem;
        
        //calculate the final amount reduced from actual amount using voucher points
        let finalAmount = redeemPoints(amount, pointsToRedeem);

        alert(`You selected GIFT${pointsToRedeem}. The final amount to be paid is: ${finalAmount.toFixed(2)}\nRemaining bonus points: ${bonusPoints}`);
    }

} catch (error) {
    // show message to user to run in browser
    console.error(error.message); 
}


// Function to calculate bonus points
function calculateBonus(amount) {
    let bonusPercentage;
    if (amount < 100) {
        alert("Thanks for visiting store . Please purchase amount more than 100rs to earn bonus points");
        return 0;
    }
    if (amount >= 2500) {
        bonusPercentage = 0.20;
    } else if (amount >= 1500) {
        bonusPercentage = 0.15;
    } else if (amount >= 500) {
        bonusPercentage = 0.10;
    } else {
        bonusPercentage = 0.05;
    }
    return amount * bonusPercentage;

}

// Function to select a voucher by entering its name
function selectVoucher(bonusPoints) {
    // Generate voucher options 50%, 75%, and 100% of bonus points
    let percentageLevels = [0.50, 0.75, 1.0];
    let voucherNames = [];
    if(bonusPoints>=75){
        voucherNames = percentageLevels.map(function (percent) {
        return 'GIFT' + Math.floor(bonusPoints * percent);
    });
    }else{
        voucherNames.push('GIFT' + bonusPoints)
    }

    let selectedVoucher;
    // Repeat until a valid voucher name is entered
    do {
        let voucherMessage;
        //set voucher message based on points
        voucherMessage = `Available vouchers: ${voucherNames.length > 1 ? voucherNames.join(', ') : voucherNames[0]}`;

        let userInput = prompt(voucherMessage + '\nEnter the voucher name you want to redeem (e.g., GIFT50):');

        if (voucherNames.includes(userInput)) {
            //Get points from voucher
            selectedVoucher = parseInt(userInput.replace('GIFT', ''));
        } else {
            alert('Invalid voucher name. Please enter a valid voucher name from the list.');
        }
    } while (!selectedVoucher);  
    
    // Return the points of the selected voucher
    return selectedVoucher; 
}

// Function to redeem points and calculate the final amount
function redeemPoints(amount, pointsToRedeem) {
    return amount - pointsToRedeem;
}


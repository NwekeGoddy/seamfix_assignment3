interface BankAccountType {
  customerId: string;
  customerName: string;
  accountNumber: string;
  balance: number;
  deposit(amount: number): void;
  withdraw(amount: number): boolean;
  getBalance(): number;
  displayAccount(): void;
}

class BankAccount implements BankAccountType {
  constructor(
    public customerId: string,
    public customerName: string,
    public accountNumber: string,
    public balance: number
  ) {}

  deposit(amount: number): void {
    if (amount <= 0) {
      console.log("Deposit amount must be positive.");
      return;
    }
    this.balance += amount;
    console.log(`Deposited ₦${amount.toLocaleString()}. New Balance: ₦${this.balance.toLocaleString()}`);
  }

  withdraw(amount: number): boolean {
    if (amount <= 0) {
      console.log("Withdrawal amount must be positive.");
      return false;
    }
    if (amount > this.balance) {
      console.log(`[Error] Insufficient funds! Current Balance: ₦${this.balance.toLocaleString()}`);
      return false;
    }
    this.balance -= amount;
    console.log(`Withdrew ₦${amount.toLocaleString()}. Remaining Balance: ₦${this.balance.toLocaleString()}`);
    return true;
  }

  getBalance(): number {
    return this.balance;
  }

  displayAccount(): void {
    console.log(`Bank Balance: ₦${this.balance.toLocaleString()}`);
  }
}

class SavingsAccount extends BankAccount {
  constructor(
    customerId: string,
    customerName: string,
    accountNumber: string,
    balance: number,
    public interestRatePercent: number = 5
  ) {
    super(customerId, customerName, accountNumber, balance);
  }

  calculateInterest(depositAmount: number): number {
    return (depositAmount * this.interestRatePercent) / 100;
  }

  override deposit(amount: number): void {
    if (amount <= 0) return;
    const interest = this.calculateInterest(amount);
    const totalAdded = amount + interest;
    this.balance += totalAdded;
    console.log(`Deposited ₦${amount.toLocaleString()} + ₦${interest.toLocaleString()} interest (${this.interestRatePercent}%). New Balance: ₦${this.balance.toLocaleString()}`);
  }
}

// Business Account
class BusinessAccount extends BankAccount {
  private static readonly FEE = 500;

  override withdraw(amount: number): boolean {
    const totalDeduction = amount + BusinessAccount.FEE;
    if (totalDeduction > this.balance) {
      console.log(`[Error] Insufficient funds including ₦500 fee! Required: ₦${totalDeduction.toLocaleString()}, Available: ₦${this.balance.toLocaleString()}`);
      return false;
    }
    this.balance -= totalDeduction;
    console.log(`Withdrew: ₦${amount.toLocaleString()} (Fee: ₦500). Remaining Balance: ₦${this.balance.toLocaleString()}`);
    return true;
  }
}


class PremiumAccount extends BankAccount {
  override withdraw(amount: number): boolean {
    let fee = 0;
    if (amount > 500000) {
      fee = amount * 0.02;
    }
    const totalDeduction = amount + fee;

    if (totalDeduction > this.balance) {
      console.log(`[Error] Insufficient funds! Required: ₦${totalDeduction.toLocaleString()} (incl. ₦${fee.toLocaleString()} fee).`);
      return false;
    }

    this.balance -= totalDeduction;
    console.log(`Withdrew: ₦${amount.toLocaleString()} (Processing Fee: ₦${fee.toLocaleString()}). Remaining Balance: ₦${this.balance.toLocaleString()}`);
    return true;
  }
}

// Demonstration
console.log("--------DEMONSTRATION--------------");

//-------------------Savings Account Test
const savings = new SavingsAccount("C101", "Chidi Nweke", "SA-001", 100000);
savings.displayAccount();
savings.deposit(20000); 

console.log("\n");

//--------------Business Account Test
const business = new BusinessAccount("C102", "Hivenify Inc", "BA-002", 100000);
business.displayAccount();
business.withdraw(20000); 

console.log("\n");

//-------------------Premium Account Test
const premium = new PremiumAccount("C103", "Empire Textiles", "PA-003", 1000000);
premium.displayAccount();
premium.withdraw(600000);
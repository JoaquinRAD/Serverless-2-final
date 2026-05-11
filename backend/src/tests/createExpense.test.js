describe("Create Expense", () => {
  test("should create expense object", () => {
    const expense = {
      amount: 20
    };

    expect(expense.amount).toBe(20);
  });
});

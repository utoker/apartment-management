export async function getExpenses() {
  // display selected month
  (function () {
    document.querySelector(".ex-box").style.display = "flex";
    const expenseMonth = document.querySelector(".expense-month");
    document.querySelector(
      ".items-title"
    ).textContent = `${expenseMonth.value}`;
  })();
  //remove existing elements
  (function () {
    document.querySelector(".expense-total").textContent = ``;
    const itemsSpan = document.querySelectorAll(".items span");
    itemsSpan.forEach((item) => {
      item.remove();
    });
  })();

  function createSpan(doc) {
    const items = document.querySelector(".items");
    const spanEle = document.createElement("span");
    items.append(spanEle);
    spanEle.textContent = `${doc.id}: ${doc.data().key}`;
  }

  try {
    const expenseMonth = document.querySelector(".expense-month");
    const expSum = document.querySelector(".expense-total");
    const db = firebase.firestore();
    if (expenseMonth.value === ``) {
      return;
    }
    let expenses = await db
      .collection("expenses")
      .doc(`2021`)
      .collection(`${expenseMonth.value}`)
      .get();
    let sum = 0;
    expenses.forEach((doc) => {
      sum += Number(doc.data().key);
      expSum.textContent = `Toplam: ${sum}`;
      createSpan(doc);
    });
  } catch (err) {
    console.log("Error getting document:", err);
  }
}

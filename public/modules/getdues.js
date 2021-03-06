export async function getDues() {
  const db = firebase.firestore();
  const id = document
    .querySelector(`.resident-id`)
    .textContent.toLocaleLowerCase();
  try {
    const dues = await db
      .collection("residents")
      .doc(`${id}`)
      .collection("2021")
      .get();
    dues.forEach((doc) => {
      document.querySelector(`.${doc.id}`).textContent = `${doc.id}: 
            ${doc.data().due}`;
    });
  } catch (err) {
    console.log("Error gettingDocuments:", err);
  }
}

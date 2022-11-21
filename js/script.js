const user1 = document.querySelector(".sectionindex1");
const nameUser1 = document.querySelector(".user1").innerText;

const user2 = document.querySelector(".sectionindex2");
const nameUser2 = document.querySelector(".user2").innerText;

user1.addEventListener("click", () => {
  localStorage.setItem("user", JSON.stringify(nameUser1));
});

user2.addEventListener("click", () => {
  localStorage.setItem("user", JSON.stringify(nameUser2));
});

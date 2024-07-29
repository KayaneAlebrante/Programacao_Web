/*Modal e Fade*/
const fade = document.querySelector("#fade");

const closeModalButtonCasa = document.querySelector("#fecharCs");
const openAdcionarCasa = document.querySelector("#adicionarCs");
const modalCasa = document.querySelector("#modal_1");
const toggleModalCs = () => {
    [modalCasa, fade].forEach((el) => el.classList.toggle("hide"));
}

[openAdcionarCasa, closeModalButtonCasa, fade].forEach((el) => {
    el.addEventListener("click", () => toggleModalCs());
});

const closeModalButtonAp = document.querySelector("#fecharAp");
const modalApartamento = document.querySelector("#modal_2");
const openAdcionarApartamento = document.querySelector("#adicionarAp");

const toggleModalAp = () => {
    [modalApartamento, fade].forEach((el) => el.classList.toggle("hide"));
}

[openAdcionarApartamento, closeModalButtonAp, fade].forEach((el) => {
    el.addEventListener("click", () => toggleModalAp());
});
// function openModal(imageSrc) {
//     var modal = document.getElementById("modal");
//     var modalImg = document.getElementById("modalImg");
//     modal.style.display = "block";
//     modalImg.src = imageSrc;
// }

// function closeModal() {
//     var modal = document.getElementById("modal");
//     modal.style.display = "none";
// }

document.addEventListener("DOMContentLoaded", () => {
    const images = document.querySelectorAll(".modal-trigger");
    images.forEach(img => {
        img.addEventListener("click", () => {
            openModal(img.src);
        });
    });
});

function openModal(imageSrc) {
    const modal = document.getElementById("modal");
    const modalImg = document.getElementById("modalImg");
    modal.style.display = "block";
    modalImg.src = imageSrc;
}

function closeModal() {
    const modal = document.getElementById("modal");
    modal.style.display = "none";
}
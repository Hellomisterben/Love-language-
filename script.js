let selectedProduct = "";

function openOrderModal(name, price) {
  const modal = document.getElementById("orderModal");
  modal.style.display = "block";
  document.getElementById("orderProductName").innerText = name;
  document.getElementById("orderProductPrice").innerText = "💖 Prix : " + price;
  selectedProduct = `${name} – ${price}`;
}

function closeOrderModal() {
  document.getElementById("orderModal").style.display = "none";
}

function openDescModal(name, description, image) {
  const modal = document.getElementById("descModal");
  modal.style.display = "block";
  document.getElementById("descName").innerText = name;
  document.getElementById("

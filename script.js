let selectedProduct = "";

function openModal(name, price, description) {
  document.getElementById("modal").style.display = "block";
  document.getElementById("productName").innerText = name;
  document.getElementById("productPrice").innerText = "Prix : " + price;
  document.getElementById("productDesc").innerText = description;

  selectedProduct = `${name} – ${price} | ${description}`;
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

function orderWhatsApp() {
  const name = document.getElementById("clientName").value;
  const email = document.getElementById("clientEmail").value;

  if (!name || !email) {
    alert("Veuillez remplir votre nom et votre email.");
    return;
  }

  const message = `
Bonjour Love Language 🌹
Je souhaite commander :

Produit : ${selectedProduct}
Nom : ${name}
Email : ${email}
  `;

  const phone = "243891122145"; // Numéro WhatsApp
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  window.open(url, "_blank");
}

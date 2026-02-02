let selectedProduct = "";
let selectedPrice = "";

/* --- Modal Commande --- */
function openOrderModal(name, price) {
  const modal = document.getElementById("orderModal");
  modal.style.display = "block";
  document.getElementById("orderProductName").innerText = name;
  document.getElementById("orderProductPrice").innerText = "💖 Prix : " + price;
  selectedProduct = name;
  selectedPrice = price;
}

function closeOrderModal() {
  document.getElementById("orderModal").style.display = "none";
}

/* --- Modal Description --- */
function openDescModal(name, description, image) {
  const modal = document.getElementById("descModal");
  modal.style.display = "block";
  document.getElementById("descName").innerText = name;
  document.getElementById("descText").innerText = description;
  document.getElementById("descImage").src = image;
}

function closeDescModal() {
  document.getElementById("descModal").style.display = "none";
}

/* --- Commander via WhatsApp --- */
function orderWhatsApp() {
  const name = document.getElementById("clientName").value;
  const phone = document.getElementById("clientPhone").value;
  const email = document.getElementById("clientEmail").value;

  if (!name || !phone) {
    alert("Veuillez entrer votre nom et votre téléphone.");
    return;
  }

  let message = `Bonjour, je voudrais commander : ${selectedProduct} (${selectedPrice}).\nNom : ${name}\nTéléphone : ${phone}`;
  if (email) {
    message += `\nEmail : ${email}`;
  }

  const whatsappUrl = `https://wa.me/243891122145?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, "_blank");
}

/* --- Commander via Email --- */
function orderEmail() {
  const name = document.getElementById("clientName").value;
  const phone = document.getElementById("clientPhone").value;
  const email = document.getElementById("clientEmail").value;

  if (!name || !phone) {
    alert("Veuillez entrer votre nom et votre téléphone.");
    return;
  }

  let subject = `Commande : ${selectedProduct}`;
  let body = `Bonjour,\n\nJe voudrais commander : ${selectedProduct} (${selectedPrice}).\nNom : ${name}\nTéléphone : ${phone}`;
  if (email) {
    body += `\nEmail : ${email}`;
  }

  const mailtoUrl = `mailto:tonemail@exemple.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = mailtoUrl;
}

/* --- Fermer modals en cliquant à l'extérieur --- */
window.onclick = function(event) {
  const orderModal = document.getElementById("orderModal");
  const descModal = document.getElementById("descModal");
  if (event.target === orderModal) {
    orderModal.style.display = "none";
  }
  if (event.target === descModal) {
    descModal.style.display = "none";
  }
};

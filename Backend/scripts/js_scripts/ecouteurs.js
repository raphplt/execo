const fs = require("fs");

const rawData = fs.readFileSync("../json/ecouteurs_details.json");
const originalData = JSON.parse(rawData);

function convertStringToFloat(value) {
  if (value === null) {
    return null;
  }
  const numericValue = parseFloat(value.split(" ")[0].replace(",", "."));
  return !isNaN(numericValue) ? numericValue : null;
}

function convertStringToInt(value) {
  if (typeof value === "string") {
    const numericValue = parseFloat(value.replace(/[^\d.]/g, ""));
    return !isNaN(numericValue) ? numericValue : null;
  } else if (typeof value === "number") {
    return value;
  }
  return null;
}

// Fonction pour formater les données
function formatData(data) {
  
  return data.map((item) => {
    
    // Supprimer les clés inutiles
    delete item.product_details["le_saviez-vous_?"];

    if (
      item.product_details[
        "disponibilité_des_pièces_détachées_(données_fournisseur)"]
    ) {
      const availabilityString =
        item.product_details[
          "disponibilité_des_pièces_détachées_(données_fournisseur)"
        ];
      
      const match = availabilityString.match(/Pendant (\d+) ans, /);
      if (match) {
        item.product_details.disponibilite_pieces_detachees = parseInt(
          match[1],
          10
        );
      } else {
        item.product_details.disponibilite_pieces_detachees = null;
      }
      delete item.product_details[
        "disponibilité_des_pièces_détachées_(données_fournisseur)"
      ];
    }

    item.product_details.batterie = convertStringToInt(
      item.product_details["Batterie"]
    );


    for (const key in item.product_details) {
      if (typeof item.product_details[key] === "string") {
        item.product_details[key] = item.product_details[key]
          .replace(/\([^)]*\)/g, "")
          .trim();
      }
    }

    if (item.product_details["Indice de réparabilité"]) {
      const repairabilityString =
        item.product_details["Indice de réparabilité"];
      const repairabilityValue = parseFloat(
        repairabilityString.replace(",", ".")
      );
      item.product_details.indice_de_reparabilite = !isNaN(repairabilityValue)
        ? repairabilityValue
        : null;
      delete item.product_details["Indice de réparabilité"];
    }

    // Ajouter les clés manquantes
    item.category = "Ecouteurs";
    item.trend_score = 0;
    item.working = true;

    return item;
  });
}

// Formater les données
const formattedData = formatData(originalData);

// Exporter les données formatées
const jsonData = JSON.stringify(formattedData, null, 2);

const filename = "formatted_ecouteurs_details.json"

// Exporter les données formatées dans un fichier JSON
fs.writeFileSync("../json/" + filename, jsonData);

// Afficher un message de confirmation
console.log("Données exportées avec succès dans " + filename);

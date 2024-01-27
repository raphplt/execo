const fs = require("fs");

const rawData = fs.readFileSync("../py_scripts/smartphone_details.json");
const originalData = JSON.parse(rawData);

// Convertir les valeurs DAS en nombre
function convertDASValue(dasString) {
  if (dasString === null) {
    return null;
  }
  const numericValue = parseFloat(dasString.split(" ")[0].replace(",", "."));
  return !isNaN(numericValue) ? numericValue : null;
}
 
// Convertir les valeurs de batterie en nombre
function formatBattery(batteryString) {
  if (typeof batteryString === "string") {
    const numericValue = parseFloat(batteryString.replace(/[^\d.]/g, ""));
    return !isNaN(numericValue) ? numericValue : null;
  } else if (typeof batteryString === "number") {
    return batteryString;
  }
  return null;
}

// Fonction pour formater les données
function formatData(data) {
  
  return data.map((item) => {
    
    // Supprimer les clés inutiles
    delete item.product_details[
      "Découvrez la couverture réseau pour bien choisir votre mobile"
    ];
    delete item.product_details["Qu'est-ce que le DAS"];
    delete item.product_details["Exposition aux ondes électromagnétiques"];
    delete item.product_details[
      "Choisissez le modèle d'Iphone qu'il vous faut"
    ];
    delete item.product_details["Découvrez toutes les innovations Apple"];
    delete item.product_details["En savoir plus sur l'indice de réparabilité"];

    // Renommer les clés
    if (item.product_details["Système d'exploitation"]) {
      item.product_details.systeme_d_exploitation =
        item.product_details["Système d'exploitation"];
      delete item.product_details["Système d'exploitation"];
    }

    item.trend_score = 0;

    if (
      item.product_details[
        "Disponibilité des pièces détachées (données fournisseur)"
      ]
    ) {
      const availabilityString =
        item.product_details[
          "Disponibilité des pièces détachées (données fournisseur)"
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
        "Disponibilité des pièces détachées (données fournisseur)"
      ];
    }

    // Supprimer les parenthèses de chaque valeur dans product_details
    for (const key in item.product_details) {
      if (typeof item.product_details[key] === "string") {
        item.product_details[key] = item.product_details[key]
          .replace(/\(.*\)/g, "")
          .trim();
      }
    }

    if (item.product_details["DAS Tête"]) {
      item.product_details.das_tête = convertDASValue(
        item.product_details["DAS Tête"]
      );
      delete item.product_details["DAS Tête"];
    }

    if (item.product_details["DAS Tronc"]) {
      item.product_details.das_tronc = convertDASValue(
        item.product_details["DAS Tronc"]
      );
      delete item.product_details["DAS Tronc"];
    }

    item.product_details.batterie = formatBattery(
      item.product_details["Batterie"]
    );

    if (item.product_details["DAS Membres"]) {
      item.product_details.das_membres = convertDASValue(
        item.product_details["DAS Membres"]
      );
      delete item.product_details["DAS Membres"];
    }

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

    item.product_details = Object.keys(item.product_details).reduce(
      (result, key) => {
        const formattedKey = key.replace(/ /g, "_").toLowerCase();
        result[formattedKey] = item.product_details[key];
        return result;
      },
      {}
    );

    // Ajouter les clés manquantes
    item.category = "Téléphonie";
    item.working = true;
    item.reconditionne = item.title.toLowerCase().includes("reconditionné");

    return item;
  });
}

// Formater les données
const formattedData = formatData(originalData);

// Exporter les données formatées
const jsonData = JSON.stringify(formattedData, null, 2);

// Exporter les données formatées dans un fichier JSON
fs.writeFileSync("./formatted_smartphone_details.json", jsonData);

// Afficher un message de confirmation
console.log(
  "Données exportées avec succès dans formatted_smartphone_details.json"
);

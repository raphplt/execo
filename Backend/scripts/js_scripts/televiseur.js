const fs = require("fs");

const rawData = fs.readFileSync("../json/televiseur_details.json");
const originalData = JSON.parse(rawData);

function convertStringToFloat(value) {
  if (value === null || value === undefined) {
    return null;
  }

  // Ajoutez une vérification pour vous assurer que value est une chaîne non vide
  if (typeof value !== "string" || value.trim() === "") {
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

function parseTechnicalDetails(details) {
  const parsedDetails = {};

  // Définir les noms de clés correspondant à ceux fournis
  const keyMappings = {
    taille_de_l_ecran: "taille_de_l'écran",
    technologie: "technologie",
    résolution: "résolution",
    hdr: "hdr",
    puissance: "puissance",
    traitement_du_son: "traitement_du_son",
    hdmi_2_1: "hdmi_2.1",
    wifi: "wifi",
    système_d_exploitation: "système_d'exploitation",
    consommation_en_veille: "consommation_en_veille_(watts)",
    lxhxp_avec_pied: "lxhxp_(avec_pied)",
    lxhxp_sans_pied: "lxhxp_(sans_pied)",
    poids_avec_pied: "poids_avec_pied",
    poids_sans_pied: "poids_sans_pied",
  };

  for (const key in keyMappings) {
    const originalKey = keyMappings[key];
    const value = details[originalKey];

    if (typeof value === "string") {
      let match;

      if ((match = value.match(/([\d.]+)\s*([^\d\s]+)/))) {
        // Si la valeur contient un nombre suivi d'unités (par exemple, "138 cm"),
        // utilisez le nombre comme valeur et les unités comme unité
        parsedDetails[key] = {
          value: parseFloat(match[1]),
          unit: match[2],
        };
      } else if ((match = value.match(/([\d.]+)/))) {
        // Si la valeur contient uniquement un nombre (par exemple, "40 Watts"),
        // utilisez le nombre comme valeur et ne spécifiez pas d'unité
        parsedDetails[key] = {
          value: parseFloat(match[1]),
        };
      } else {
        // Si la valeur ne correspond à aucun modèle connu, conservez la chaîne telle quelle
        parsedDetails[key] = value;
      }
    } else {
      // Si la valeur n'est pas une chaîne, conservez-la telle quelle
      parsedDetails[key] = value;
    }
  }

  return parsedDetails;
}

// Fonction pour formater les données
function formatData(data) {
  return data.map((item) => {
    // Créer une nouvelle catégorie technique et y regrouper les données
    item.technical_data = parseTechnicalDetails(item.product_details);

    item.ecological_data = {
      eco_part: convertStringToInt(
        item.ecological_data && item.ecological_data["eco_part"]
      ),
      reconditionné:
        item.ecological_data && item.ecological_data["reconditionné"],
      consommation_annuelle: convertStringToInt(
        item.ecological_data && item.ecological_data["consommation_annuelle"]
      ),
      indice_de_reparabilite: convertStringToFloat(
        item.ecological_data && item.ecological_data["indice_de_reparabilité"]
      ),
    };

    // Supprimer les clés inutiles
    delete item.product_details;
    delete item.ecological_data["consommation_annuelle"];

    // Supprimer les parenthèses de chaque valeur dans technical_data et ecological_data
    for (const key in item.technical_data) {
      if (typeof item.technical_data[key] === "string") {
        item.technical_data[key] = item.technical_data[key]
          .replace(/\(.*\)/g, "")
          .trim();
      }
    }

    for (const key in item.ecological_data) {
      if (typeof item.ecological_data[key] === "string") {
        item.ecological_data[key] = item.ecological_data[key]
          .replace(/\(.*\)/g, "")
          .trim();
      }
    }

    // Ajouter les clés manquantes
    item.category = "Televiseur";
    item.trend_score = 0;
    item.working = true;

    return item;
  });
}

// Formater les données
const formattedData = formatData(originalData);

// Exporter les données formatées
const jsonData = JSON.stringify(formattedData, null, 2);

const filename = "formatted_televiseur_details.json";

// Exporter les données formatées dans un fichier JSON
fs.writeFileSync("../json/" + filename, jsonData);

// Afficher un message de confirmation
console.log("Données exportées avec succès dans " + filename);

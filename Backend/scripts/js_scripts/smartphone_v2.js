const fs = require("fs");

const rawData = fs.readFileSync("../json/smartphone_details.json");
const originalData = JSON.parse(rawData);

function convertStringToFloat(value) {
  if (value === null || value === undefined) {
    return null;
  }

  const stringValue = value.split(" ")[0].replace(",", ".");
  const numericValue = parseFloat(stringValue);

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
    // Créer une nouvelle catégorie technique et y regrouper les données
    item.technical_data = {
      modèle: item.product_details.Modèle,
      marque: item.product_details.Marque,
      couleur: item.product_details.Couleur,
      systeme_d_exploitation: item.product_details["Système d'exploitation"],
      ram: convertStringToInt(item.product_details["Mémoire RAM"]),
      batterie: convertStringToInt(item.product_details["Batterie"]),
      processeur: item.product_details["Processeur"],
      das_tete: convertStringToFloat(item.product_details["DAS Tête"]),
      reseau: item.product_details["Réseau"],
      resolution_de_l_ecran: item.product_details["Résolution de l'écran"],
      technology_de_l_ecran: item.product_details["Technologie de l'écran"],
      resiste_a_l_eau: item.product_details["Résistance à l'eau"],
      charge_rapide: item.product_details["Charge rapide"],
      type_d_ecran: item.product_details["Type d'écran"],
      modes_de_deverrouillage: item.product_details["Modes de déverrouillage"],
      norme: item.product_details["Norme"],
      capteurs_arrieres: item.product_details["Résolution"],
      capteurs_frontaux:
        item.product_details["Résolution caméra avant (Selfie)"],
      jack: item.product_details["Jack 3.5 mm"],
      hauteur_produit: convertStringToInt(
        item.product_details["Hauteur produit"]
      ),
      largeur_produit: convertStringToInt(
        item.product_details["Largeur produit"]
      ),
      epaisseur_produit: convertStringToInt(
        item.product_details["Profondeur produit"]
      ),
    };

    item.ecological_data = {
      indice_de_reparabilite: convertStringToInt(
        item.product_details["Indice de réparabilité"]
      ),
      duree_de_garantie: convertStringToInt(item.product_details["Garantie"]),
      eco_participation: convertStringToInt(
        item.product_details["Eco-participation"]
      ),
      fabrique_en: item.product_details["Fabriqué en"],
    };

    if (item.product_details["Indice de réparabilité"]) {
      const repairabilityString =
        item.product_details["Indice de réparabilité"];
      const repairabilityValue = parseFloat(
        repairabilityString.replace(",", ".")
      );
      item.ecological_data.indice_de_reparabilite = !isNaN(repairabilityValue)
        ? repairabilityValue
        : null;
    }

    item.ecological_data.reconditionne = item.title.includes("Reconditionné");

    // Supprimer les clés inutiles et renommer les clés
    delete item.product_details;

    // Supprimer les parenthèses de chaque valeur dans product_details
    for (const key in item.product_details) {
      if (typeof item.product_details[key] === "string") {
        item.product_details[key] = item.product_details[key]
          .replace(/\(.*\)/g, "")
          .trim();
      }
    }
    // Ajouter les clés manquantes
    item.category = "Téléphonie";
    item.trend_score = [];
    item.working = true;

    return item;
  });
}

// Formater les données
const formattedData = formatData(originalData);

// Exporter les données formatées
const jsonData = JSON.stringify(formattedData, null, 2);

const filename = "formatted_smartphone_details.json";

// Exporter les données formatées dans un fichier JSON
fs.writeFileSync("../json/" + filename, jsonData);

// Afficher un message de confirmation
console.log("Données exportées avec succès dans " + filename);
  
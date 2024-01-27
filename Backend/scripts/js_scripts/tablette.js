const fs = require("fs");

const rawData = fs.readFileSync("../json/tablettes_details.json");
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
      taille: item.product_details["taille"],
      resolution_de_l_ecran: item.product_details["résolution_de_l'écran"],
      technologie_de_la_dalle: item.product_details["technologie_de_la_dalle"],
      modèle_du_processeur: item.product_details["modèle_du_processeur"],
      mémoire_vive_ram: item.product_details["mémoire_vive_(ram)"],
      système_d_exploitation: item.product_details["système_d'exploitation"],
      capacité_de_stockage: item.product_details["capacité_de_stockage"],
      stockage_supplémentaire_possible_sur:
        item.product_details["stockage_supplémentaire_possible_sur"],
      capacité_de_stockage_supplémentaire_jusqu_à:
        item.product_details["capacité_de_stockage_supplémentaire_jusqu'à"],
      capacité_de_la_batterie: item.product_details["capacité_de_la_batterie"],
      autonomie: item.product_details["autonomie"],
      nombre_de_haut_parleurs: item.product_details["nombre_de_haut_parleurs"],
      webcam_avant_selfie: item.product_details["webcam_avant_(selfie)"],
      webcam_arrière: item.product_details["webcam_arrière"],
      enregistrement_vidéo: item.product_details["enregistrement_vidéo"],
      nombre_de_capteurs_photo:
        item.product_details["nombre_de_capteurs_photo"],
      communication: item.product_details["communication"],
      norme_wifi: item.product_details["norme_wifi"],
      bluetooth: item.product_details["bluetooth"],
      port_micro_usb: item.product_details["port_micro_usb"],
      port_usb_type_c: item.product_details["port_usb_type_c"],
      prise_casque: item.product_details["prise_casque"],
      lecteur_d_empreinte_digitale:
        item.product_details["lecteur_d'empreinte_digitale"],
      reconnaissance_faciale: item.product_details["reconnaissance_faciale"],
      possibilité_d_associer_un_clavier:
        item.product_details["possibilité_d'associer_un_clavier"],
      possibilité_d_associer_un_stylet:
        item.product_details["possibilité_d'associer_un_stylet"],
      dimensions_l_x_h_x_p: item.product_details["dimensions_l_x_h_x_p"],
      poids: item.product_details["poids"],
      das_tronc: item.product_details["das_tronc"],
      das_membres: item.product_details["das_membres"],
      référence_constructeur: item.product_details["référence_constructeur"],
      marque: item.product_details["marque"],
    };

    item.ecological_data = {
      disponibilite_pieces_detachees:
        item.product_details["disponibilite_pieces_detachees"],
      garantie: item.product_details["garantie"],
      fabrique_en: item.product_details["fabriqué_en"],
      eco_part: convertStringToInt(item.product_details["eco_part"]),
      reconditionné: item.product_details["reconditionné"],
      indice_de_reparabilite: convertStringToInt(
        item.product_details["indice_de_reparabilite"]
      ),
      disponibilite_pieces_detachees:
        item.product_details["disponibilite_pieces_detachees"],
    };

    // Supprimer les clés inutiles
    delete item.product_details;

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
    item.category = "Tablettes";
    item.trend_score = 0;
    item.working = true;

    return item;
  });
}

// Formater les données
const formattedData = formatData(originalData);

// Exporter les données formatées
const jsonData = JSON.stringify(formattedData, null, 2);

const filename = "formatted_tablettes_details.json";

// Exporter les données formatées dans un fichier JSON
fs.writeFileSync("../json/" + filename, jsonData);

// Afficher un message de confirmation
console.log("Données exportées avec succès dans " + filename);

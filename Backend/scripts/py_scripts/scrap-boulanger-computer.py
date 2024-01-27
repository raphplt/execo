import sys
import requests
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait

import json

# URL du site
url = 'https://www.boulanger.com/c/tous-les-ordinateurs-portables'

# En-têtes (pour simuler un navigateur)
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.182 Safari/537.36'
}

def findItemsInPage(response, articles_data):
    soup = BeautifulSoup(response.content, 'html.parser')

    # Scraping de la liste de produits
    items = soup.findAll('li', class_='product-list__item')

    for item in items:
        title = item.find('h2', class_='product-list__product-label')
        price = item.find('p', class_='price__amount')
        
        # Recherche de l'image pour récupérer le lien 'href' d'un produit
        link_elem = item.find('a', class_='product-list__product-image-link analytic-track-origin')
        if link_elem:
            link = link_elem['href']
        else:
            # Afficher un message ou poursuivre le traitement
            print("Lien non trouvé pour l'article, passage à l'article suivant")
            continue

        if title and price:
            cleaned_title = ' '.join(title.stripped_strings)
            cleaned_price = price.text.strip()
            img = item.find('img')['srcset']

            # Convertir l'URL relative en URL absolue
            product_link = f'https://www.boulanger.com{link}'

            # Accéder à la page de détails du produit
            product_page = requests.get(product_link, headers=headers)
            product_soup = BeautifulSoup(product_page.content, 'html.parser')

            product_page.close()

            # Scraping des détails du produit
            product_details = {}

            product_feature_items = product_soup.find_all('li', class_='product-features__item')
            
            eco_part_field = product_soup.find('p', class_='price__tax')
            if eco_part_field:
                eco_part = eco_part_field.contents[0].split(' ')[0].strip()
                product_details['eco_part'] = eco_part
            else:
                product_details['eco_part'] = "0€"

            if "Reconditionné" in cleaned_title or "reconditionné" in cleaned_title:
                product_details['Reconditionné'] = "oui"
            else:
                product_details['Reconditionné'] = "non"
            
            for feature_item in product_feature_items:
                feature_cat = feature_item.text.split("\n")[1]
                if (feature_cat != "Consommer et profitez de vos produits autrement"
                    and feature_cat != "Nos services"
                    and feature_cat != "Découvrez les accessoires compatibles"
                    and feature_cat != "Applications (outils)"
                    and feature_cat != "Contenu du carton"):
                    features = feature_item.find_all('li', class_='product-features__item-content')
                    for feature in features:
                        tmp = feature.text.split(' : ')
                        feature_name = tmp[0].strip()
                        feature_value = tmp[1].strip()
                        product_details[feature_name] = feature_value

            # Ajoutez les détails du produit au dictionnaire article_info
            article_info = {
                'title': cleaned_title,
                'price': cleaned_price,
                'img': img,
                'product_details': product_details
            }

            # Ajoutez les informations finales à la liste articles_data
            articles_data.append(article_info)

            print('Article trouvé:', cleaned_title, cleaned_price)
        else:
            print('Article non trouvé')
    
def FindNumberOfPages():
    driver = webdriver.Chrome()
    driver.get(url)
    wait = WebDriverWait(driver, 5)

    shadow_root = driver.find_element(By.TAG_NAME, "bl-paginator").shadow_root
    shadow_content = shadow_root.find_elements(By.CLASS_NAME, "paginator__link ")
    pageAmount = shadow_content[len(shadow_content) - 2].get_attribute('href').split('=')[1]
    print(pageAmount)
    return int(pageAmount)

def main(argv):
    print('Scraping Boulanger - ordinateur portable...')

    # Liste pour stocker les données des articles
    articles_data = []

    # Requête GET
    response = requests.get(url, headers=headers)

    print('Requête envoyée...')
    print(response.status_code)

    # Si la requête est valide (code 200)
    if response.status_code == 200:
        if (len(argv) > 1):
            numberOfPage = int(argv[1])
        else:
            numberOfPage = FindNumberOfPages()
        print("Scraping page 1...")
        findItemsInPage(response, articles_data)
        response.close()
        for x in range(2, numberOfPage + 1):
            response = requests.get(url + "?numPage=" + str(x), headers=headers)
            print('Chargement de la page ' + str(x) + "...")
            print(response.status_code)
            print("Scraping page " + str(x) + "...")
            findItemsInPage(response, articles_data)
            response.close()

        # Écrire les données dans le fichier JSON
        with open('computer_details.json', 'w', encoding='utf-8') as json_file:
            json.dump(articles_data, json_file, ensure_ascii=False, indent=4)
        print('Données enregistrées dans computer_details.json')
            
    else:
        print('La requête a échoué avec le code:', response.status_code)


if __name__ == '__main__':
    sys.exit(main(sys.argv))
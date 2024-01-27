# Documentation des tests pour l'API Express.js

Cette documentation explique comment exécuter des tests existants et créer de nouveaux tests pour notre API Express.js en utilisant Jest.

## Attention

- Ne pas lancer le serveur avant d'exécuter les tests.

## Exécution des Tests Existants

1. Ouvrez un terminal dans le répertoire Backend

2. Exécuter la commande suivante pour lancer les tests existants :

   ```sh
   npm test
   ```
## Création de Nouveaux Tests

1. Si besoin, créer un nouveau fichier de test dans le répertoire de tests de votre projet. Les fichiers de test doivent avoir l'extension .test.ts .

2. Dans le fichier de test, importez les dépendances nécessaires
   ```
    import { expect } from "@jest/globals";
    import request from "supertest";
    import { app } from "../index";
    ```

3. Écrivez vos tests en utilisant la syntaxe Jest. Voici un exemple de test pour la route /nouvelle_route :

```
describe("Tests pour les routes de l'API", () => {
  beforeEach(() => {});

  afterEach(() => {});

  describe("Test de la route GET /products", () => {
    it("devrait retourner un statut 200 et une liste de produits", async () => {
      const response = await request(app).get("/products");

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });
});
```	

4. Exécutez la commande suivante pour lancer l'ensemble des tests :

```
npm test
```


5. Attendre que Jest exécute les nouveaux tests. Les résultats seront affichés dans le terminal.

6. C'est tout ! Have fun !
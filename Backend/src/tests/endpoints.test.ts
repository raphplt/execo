import { expect, jest } from "@jest/globals";
import { Request, Response } from "express";
import request from "supertest";
import { app } from "../index";
import {
  createController,
  deleteController,
} from "../controllers/users.controllers";

// Test de toutes les routes de l'API
describe("[USERS]   Tests pour les routes de l'API", () => {
  beforeEach(() => {});

  afterEach(() => {});

  //GET ALL
  describe("    GET ALL", () => {
    it("devrait retourner un statut 200 et une liste de users", async () => {
      const response = await request(app).get("/users");

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe("Test de createController", () => {
    it("devrait renvoyer un message de confirmation si la ressource est créée avec succès", async () => {
      // Créez un objet Request correctement typé avec des données JSON dans le corps
      const req: Request = {
        body: {
          "_id": "6526f2fc073bfe07093104bf",
          "name": "test",
          "firstname": "test",
          "username": "test Lucas",
          "email": "test@gmail.com",
          "telephone": "0606060606",
          "password": "test",
          "age": "21",
          "sexe": "test prime",
          "role": "user",
          "trendProducts": [],
        },
      } as unknown as Request;
      const send = jest.fn();
      const res: Response = {
        send,
        sendStatus: jest.fn(),
      } as unknown as Response;

      // Appelez la fonction createController avec les objets fictifs
      await createController(req, res);

      // Vérifiez que la méthode res.send a été appelée avec le message attendu
      expect(send).toHaveBeenCalledWith("Ressource created succesfully.");
    });
  });

  describe("Test de deleteController", () => {
    it("devrait renvoyer un message de confirmation si l'utilisateur est supprimé", async () => {
      // Créez un objet Request correctement typé
      const req: Request = {
        params: { _id: "6526f2fc073bfe07093104bf" },
      } as unknown as Request;
      const send = jest.fn();
      const res: Response = {
        send,
        sendStatus: jest.fn(),
      } as unknown as Response;

      // Appelez la fonction deleteController avec les objets fictifs
      await deleteController(req, res);

      // Vérifiez que la méthode res.send a été appelée avec le message attendu
      expect(send).toHaveBeenCalledWith("Ressource deleted successfully.");
    });
  });
});

describe("[PRODUCTS]    Tests pour les routes liées au produits de l'API", () => {
  beforeEach(() => {});

  afterEach(() => {});

  // GET ALL
  describe("    GET ALL", () => {
    it("Devrait retourner un statut 200 et une liste de produits", async () => {
      const response = await request(app).get("/products");

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  // GETBYID
  describe("    GET BY ID", () => {
    it("Devrait retourner un statut 200 et un produit spécifique", async () => {
      // Remplacez '123' par l'ID du produit que vous souhaitez tester
      const productId = "648f63a047f14280c25b368d";
      const response = await request(app).get(`/products/${productId}`);

      expect(response.status).toBe(200);
      expect(response.body._id).toEqual(productId);
    });
  });
});

describe("[Categories]    Tests pour les routes liées au produits de l'API", () => {
  beforeEach(() => {});

  afterEach(() => {});

  //GET ALL
  describe("    GET ALL", () => {
    it("Devrait retourner un statut 200 et une liste de categories", async () => {
      const response = await request(app).get("/categories");

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });
});

describe("[QUIZ]    Tests pour les routes liées au produits de l'API", () => {
  beforeEach(() => {});

  afterEach(() => {});

  //GET ALL
  describe("    GET ALL", () => {
    it("Devrait retourner un statut 200 et une liste de quiz", async () => {
      const response = await request(app).get("/quiz");

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });
});

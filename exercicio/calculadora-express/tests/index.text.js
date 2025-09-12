const request = require("supertest");
const express = require("express");
const calculadoraRouter = require("../routes/calculadora");

const app = express();
app.use("/calculadora", calculadoraRouter);

describe("Testes da API Calculadora", () => {
test("GET /calculadora/somar", async () => {
const res = await request(app).get("/calculadora/somar?numA=10&numB=5");
expect(res.statusCode).toBe(200);
expect(res.body.resultado).toBe(15);
});

test("GET /calculadora/subtrair", async () => {
const res = await request(app).get("/calculadora/subtrair?numA=20&numB=8");
expect(res.statusCode).toBe(200);
expect(res.body.resultado).toBe(12);
});

test("GET /calculadora/multiplicar", async () => {
const res = await request(app).get("/calculadora/multiplicar?numA=7&numB=6");
expect(res.statusCode).toBe(200);
expect(res.body.resultado).toBe(42);
});

test("GET /calculadora/dividir", async () => {
const res = await request(app).get("/calculadora/dividir?numA=50&numB=10");
expect(res.statusCode).toBe(200);
expect(res.body.resultado).toBe(5);
});

test("GET /calculadora/aoQuadrado", async () => {
const res = await request(app).get("/calculadora/aoQuadrado?num=9");
expect(res.statusCode).toBe(200);
expect(res.body.resultado).toBe(81);
});

test("GET /calculadora/raizQuadrada", async () => {
const res = await request(app).get("/calculadora/raizQuadrada?num=25");
expect(res.statusCode).toBe(200);
expect(res.body.resultado).toBe(5);
});
});
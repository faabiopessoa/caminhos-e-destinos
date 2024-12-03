import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "../pages/home"; // Ajuste o caminho conforme necessário

describe("Home Component", () => {
  test("renders Home component", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    // Verifica se o texto principal ou algum elemento esperado está presente
    expect(screen.getByText(/Seu destino é com a gente!/i)).toBeInTheDocument(); // Ajuste o texto conforme o que aparece na página Home
  });
});

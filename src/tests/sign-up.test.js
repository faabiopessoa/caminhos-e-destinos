import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SignUp from "../pages/sign-up"; // Ajuste o caminho conforme necessário

describe("SignUp Component", () => {
  test("renders SignUp component", () => {
    render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>
    );

    // Verifica se o texto "Cadastre-se" está presente no componente
    expect(screen.getByText(/cadastre-se/i)).toBeInTheDocument();
  });
});

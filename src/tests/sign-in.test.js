import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SignIn from "../pages/sign-in";

test("renders SignIn component with Login heading", () => {
    render(
        <MemoryRouter>
            <SignIn />
        </MemoryRouter>
    );
    // Verifica se o heading "Login" está presente
    expect(screen.getByRole("heading", { name: /login/i })).toBeInTheDocument();

    // Verifica um texto adicional específico, se necessário
    expect(screen.getByText(/insira seu email e senha para entrar/i)).toBeInTheDocument();
});

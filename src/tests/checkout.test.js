import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Checkout from "../pages/checkout";

// Mock do objeto window.paypal
beforeAll(() => {
  window.paypal = {
    Buttons: jest.fn().mockReturnValue({
      render: jest.fn(),
    }),
  };
});

test("renders Checkout component with Checkout heading", () => {
  render(
    <MemoryRouter>
      <Checkout />
    </MemoryRouter>
  );

  // Verifica se o heading "Finalize Sua Compra" está presente
  expect(screen.getByRole("heading", { name: /finalize sua compra/i })).toBeInTheDocument();

  // Verifica se um texto adicional relevante está presente
  expect(screen.getByText(/garanta sua experiência de forma rápida e segura/i)).toBeInTheDocument();
});

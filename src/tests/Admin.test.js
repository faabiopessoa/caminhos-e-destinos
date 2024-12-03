import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import RegistrationForm from "../pages/Admin"; // Ajuste o caminho para o componente correto

// Mock da API fetch
global.fetch = jest.fn();

describe("RegistrationForm Component", () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it("renders the RegistrationForm component correctly", () => {
    render(<RegistrationForm />);

    // Verifica se os elementos principais estão sendo renderizados
    expect(screen.getByText(/Travel Registration/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Digite o nome do Destino Turístico/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Digite o preço/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Coloque uma descrição sobre o destino/i)).toBeInTheDocument();
    expect(screen.getByText(/Register Travel/i)).toBeInTheDocument();
  });

  it("displays an error message when fields are empty", async () => {
    render(<RegistrationForm />);

    const submitButton = screen.getByText(/Register Travel/i);
    fireEvent.click(submitButton);

    expect(await screen.findByText(/Please fill in all fields/i)).toBeInTheDocument();
  });

  it("submits the form successfully with valid data", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ message: "Travel registered successfully!" }),
    });

    render(<RegistrationForm />);

    const destinationInput = screen.getByPlaceholderText(/Digite o nome do Destino Turístico/i);
    const priceInput = screen.getByPlaceholderText(/Digite o preço/i);
    const descriptionInput = screen.getByPlaceholderText(/Coloque uma descrição sobre o destino/i);
    const fileInput = screen.getByLabelText(/Foto:/i);
    const submitButton = screen.getByText(/Register Travel/i);

    // Preenche os campos do formulário
    fireEvent.change(destinationInput, { target: { value: "Rio de Janeiro" } });
    fireEvent.change(priceInput, { target: { value: "500" } });
    fireEvent.change(descriptionInput, { target: { value: "Uma viagem incrível!" } });
    const file = new File(["dummy content"], "photo.jpg", { type: "image/jpeg" });
    fireEvent.change(fileInput, { target: { files: [file] } });

    fireEvent.click(submitButton);

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
    expect(fetch).toHaveBeenCalledWith(
      "http://localhost:3000/tourist-spots",
      expect.objectContaining({
        method: "POST",
        body: expect.any(FormData),
      })
    );

    expect(fetch).toHaveBeenCalled();
  });

  it("handles API errors gracefully", async () => {
    fetch.mockRejectedValueOnce(new Error("Failed to register travel"));

    render(<RegistrationForm />);

    const destinationInput = screen.getByPlaceholderText(/Digite o nome do Destino Turístico/i);
    const priceInput = screen.getByPlaceholderText(/Digite o preço/i);
    const descriptionInput = screen.getByPlaceholderText(/Coloque uma descrição sobre o destino/i);
    const fileInput = screen.getByLabelText(/Foto:/i);
    const submitButton = screen.getByText(/Register Travel/i);

    // Preenche os campos do formulário
    fireEvent.change(destinationInput, { target: { value: "São Paulo" } });
    fireEvent.change(priceInput, { target: { value: "300" } });
    fireEvent.change(descriptionInput, { target: { value: "Uma viagem fantástica!" } });
    const file = new File(["dummy content"], "photo.jpg", { type: "image/jpeg" });
    fireEvent.change(fileInput, { target: { files: [file] } });

    fireEvent.click(submitButton);

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
    expect(await screen.findByText(/Failed to register travel/i)).toBeInTheDocument();
  });
});

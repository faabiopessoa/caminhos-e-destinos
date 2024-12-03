import React, { useEffect, useState } from "react";
import { Typography, Dialog, DialogHeader, DialogBody, DialogFooter, Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Verifica se o botão do PayPal já foi carregado
    if (document.getElementById("paypal-button-container").children.length === 0) {
      window.paypal.Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: "500.00", // O valor a ser cobrado
                },
              },
            ],
          });
        },
        onApprove: (data, actions) => {
          return actions.order.capture().then((details) => {
            alert("Pagamento aprovado, obrigado " + details.payer.name.given_name);
          });
        },
        onError: (err) => {
          console.error("Erro no pagamento: ", err);
          alert("Ocorreu um erro durante o pagamento.");
        },
      }).render("#paypal-button-container");
    }
  }, []);

  const handleBackClick = () => {
    setOpen(true); // Abre o modal de confirmação
  };

  const handleConfirmExit = () => {
    setOpen(false);
    navigate(-1); // Volta para a página anterior
  };

  const handleCancelExit = () => {
    setOpen(false); // Fecha o modal
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg relative">
        {/* Seta de Voltar */}
        <div className="absolute top-4 left-4 cursor-pointer" onClick={handleBackClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-600 hover:text-gray-800"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </div>

        <div className="text-center mb-6">
          <Typography variant="h4" className="font-semibold text-gray-800">
            Finalize Sua Compra
          </Typography>
          <Typography variant="paragraph" className="text-gray-600 mt-2">
            Garanta sua experiência de forma rápida e segura.
          </Typography>
        </div>
        <div id="paypal-button-container" className="mt-8"></div>

        {/* Modal de Confirmação */}
        <Dialog open={open} handler={setOpen}>
          <DialogHeader>Confirmar Saída</DialogHeader>
          <DialogBody>
            Tem certeza de que deseja sair da página de Checkout? Seu pagamento ainda não foi concluído.
          </DialogBody>
          <DialogFooter>
            <Button color="red" onClick={handleCancelExit}>
              Cancelar
            </Button>
            <Button color="green" onClick={handleConfirmExit} className="ml-2">
              Sim, Sair
            </Button>
          </DialogFooter>
        </Dialog>
      </div>
    </div>
  );
}

export default Checkout;

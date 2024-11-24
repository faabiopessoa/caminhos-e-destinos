import { StarIcon as FullStarIcon } from '@heroicons/react/24/solid';
import { StarIcon as EmptyStarIcon } from '@heroicons/react/24/outline';
import { Typography, Input, Button } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import { Footer } from '@/widgets/layout';
import { useNavigate } from 'react-router-dom';
import { createAssessment } from '@/services/apiService';
import { getAllAssessments } from '@/services/apiService';

function TourDetails() {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ name: "", message: "", stars: 0 });
  const [showNotification, setShowNotification] = useState(false);

  // Função para buscar avaliações do backend
  const fetchReviews = async () => {
    try {
      const fetchedReviews = await getAllAssessments();
      setReviews(fetchedReviews);
    } catch (error) {
      console.error("Erro ao buscar avaliações:", error);
    }
  };

  // Chama fetchReviews quando o componente é montado
  useEffect(() => {
    fetchReviews();
    window.scrollTo(0, 0);
  }, []);

  // Calcula a média de estrelas
  const calculateAverageStars = () => {
    if (reviews.length === 0) return 0;
    const totalStars = reviews.reduce((sum, review) => sum + review.stars, 0);
    return (totalStars / reviews.length).toFixed(1);
  };

  const averageStars = parseFloat(calculateAverageStars());

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview({ ...newReview, [name]: value });
  };

  const handleStarClick = (stars) => {
    setNewReview({ ...newReview, stars });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newReview.name && newReview.message && newReview.stars) {
      try {
        await createAssessment(newReview);
        setReviews([...reviews, newReview]);
        setNewReview({ name: "", message: "", stars: 0 });
      } catch (error) {
        console.error("Erro ao criar avaliação:", error);
      }
    } else {
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
      }, 3000);
    }
  };

  const navigate = useNavigate();
  const handleReserveClick = () => {
    navigate('/checkout');
  };

  const renderStars = (average) => {
    const fullStars = Math.floor(average);
    const partialStarPercentage = (average - fullStars) * 100;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FullStarIcon key={`full-${i}`} className="w-5 h-5 text-orange-400" />);
    }

    if (partialStarPercentage > 0) {
      stars.push(
        <div key="partial" className="w-5 h-5 relative">
          <FullStarIcon
            className="absolute text-orange-400"
            style={{ clipPath: `inset(0 ${100 - partialStarPercentage}% 0 0)` }}
          />
          <EmptyStarIcon className="text-gray-300" />
        </div>
      );
    }

    for (let i = fullStars + (partialStarPercentage > 0 ? 1 : 0); i < 5; i++) {
      stars.push(<EmptyStarIcon key={`empty-${i}`} className="w-5 h-5 text-gray-300" />);
    }

    return stars;
  };

  return (
    <>
      <div className="relative flex h-24 content-center items-center justify-center pt-16 pb-20">
        <div className="absolute top-0 h-24 w-full bg-[url('/img/background-3.png')] bg-cover bg-center" />
        <div className="absolute top-0 h-24 w-full bg-black/60 bg-cover bg-center" />
      </div>

      <div className="container mx-auto p-4">
        <div className="flex flex-col lg:flex-row justify-between items-start space-y-8 lg:space-y-0 lg:space-x-8">
          <div className="flex-1">
            <div className="flex items-center space-x-4 mb-4">
              <img src="/public/img/favicon.png" className="h-12" alt="Ícone de Jericoacoara" />
              <Typography variant="h3" color="black" className="font-black">
                Canoa Quebrada - Aracati
              </Typography>
            </div>

            <div className="flex justify-center mt-6">
              <div className="grid grid-cols-2 gap-4 max-w-4x1">
                <div className="col-span-1">
                  <img
                    src="/public/img/detalhescanoa.png"
                    alt="Imagem maior"
                    className="w-full h-[500px] object-cover rounded-lg shadow-lg"
                  />
                </div>

                <div className="grid grid-rows-2 gap-4">
                  <img
                    src="/public/img/canoa.jpg"
                    alt="Imagem menor 1"
                    className="w-full h-[250px] object-cover rounded-lg shadow-lg"
                  />
                  <img
                    src="/public/img/detalhescanoa1.png"
                    alt="Imagem menor 2"
                    className="w-full h-[234px] object-cover rounded-lg shadow-lg"
                  />
                </div>
              </div>
            </div>

            <Typography variant="h4" color="black" className="font-black mb-2">
              Passeio imperdível: Canoa Quebrada
            </Typography>
            <Typography variant="lead" color="black" className="font-black opacity-80 mb-4">
              2 dias e 1 noites
            </Typography>
            <Typography className="font-normal text-blue-gray-800 mb-8">
                Prepare-se para se encantar com as belezas únicas de Canoa Quebrada, um dos destinos mais icônicos do Ceará. Este pacote de 2 dias e 1 noite foi planejado para oferecer uma experiência inesquecível, combinando paisagens deslumbrantes, cultura local e momentos de pura diversão. De suas falésias coloridas ao famoso pôr do sol na duna principal, Canoa Quebrada promete surpreender e encantar a todos!              <br /><br />
              <strong>Itinerário</strong><br />
              <strong>Dia 1:</strong> Chegada em Canoa Quebrada e Pôr do Sol na Duna Principal<br />
              Partida de Fortaleza pela manhã em transporte confortável, com chegada em Canoa Quebrada para check-in na pousada. À tarde, você poderá explorar a famosa Broadway, a rua principal cheia de lojinhas e bares charmosos. O dia será finalizado com um inesquecível pôr do sol na duna principal.<br />
              <strong>Dia 2:</strong> Passeio de Buggy pelas Falésias e Lagoas<br />
              Após o café da manhã, prepare-se para um emocionante passeio de buggy pelas falésias e dunas de areia dourada. O roteiro inclui paradas para banho em lagoas naturais e pontos de vista panorâmicos para fotos espetaculares. Após o almoço, retorno para Fortaleza com memórias incríveis desse paraíso.<br />
              <br />
              <strong>O que está incluso</strong><br />
              Transporte, hospedagem, passeios guiados, e suporte completo.
              <br /><br />
              <strong>Dicas para o Passeio</strong><br />
              Traga protetor solar, roupas leves e dinheiro em espécie.
            </Typography>
          </div>

          {/* Caixa de reserva */}
          <div className="w-full lg:w-1/3 bg-white rounded-lg shadow-xl p-6 border border-gray-200">
            <div className="text-2xl font-bold text-gray-900 mb-2">
              R$130 <span className="text-lg font-normal">por pessoa</span>
            </div>

            {/* Estrelas dinâmicas com estrela parcial */}
            <div className="flex items-center text-orange-400 mb-4">
              {renderStars(averageStars)}
              <span className="text-gray-600 text-sm ml-2">({averageStars})</span>
            </div>

            <div className="border border-gray-300 rounded-lg p-2 mb-4">
              <label className="block text-gray-600 text-xs mb-1">DATA</label>
              <input type="date" className="w-full border-none text-gray-800 text-sm" />
            </div>
            <button
              onClick={handleReserveClick}
              className="w-full bg-orange-400 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg mb-4 text-center"
            >
              Reservar
            </button>
            <Typography variant="h6" className="mt-4">Avaliações de Clientes:</Typography>
            <div className="space-y-4 mt-6">
              {reviews.map((review, index) => (
                <div key={index} className="bg-gray-100 rounded-lg p-4 shadow-md">
                  <div className="flex items-center mb-2 text-orange-400">
                    {Array.from({ length: review.stars }, (_, i) => (
                      <FullStarIcon key={i} className="w-5 h-5" />
                    ))}
                    {Array.from({ length: 5 - review.stars }, (_, i) => (
                      <EmptyStarIcon key={i} className="w-5 h-5" />
                    ))}
                  </div>
                  <p className="text-gray-700 text-sm">"{review.message}"</p>
                  <p className="text-gray-500 text-xs mt-1">- {review.name}</p>
                </div>
              ))}
            </div>

            {/* Notificação de erro */}
            {showNotification && (
              <div className="fixed bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg">
                Por favor, preencha todos os campos e selecione a quantidade de estrelas.
              </div>
            )}

            {/* Formulário de nova avaliação */}
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <Input
                name="name"
                value={newReview.name}
                onChange={handleInputChange}
                label="Seu Nome"
                variant="outlined"
                className="w-full"
              />
              <Input
                name="message"
                value={newReview.message}
                onChange={handleInputChange}
                label="Sua Mensagem"
                variant="outlined"
                className="w-full"
              />
              <div className="flex items-center space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FullStarIcon
                    key={star}
                    className={`w-6 h-6 cursor-pointer ${newReview.stars >= star ? "text-orange-400" : "text-gray-300"}`}
                    onClick={() => handleStarClick(star)}
                  />
                ))}
              </div>
              <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                Enviar Avaliação
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-12 mb-8">
          <Typography variant="h5" className="font-black text-center mb-4">Você estará aqui</Typography>
          <div className="w-full h-400px rounded-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15909.520445029922!2d-37.71384107798415!3d-4.525357426880583!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7b84b3b26eac955%3A0xadd5f8faff3b42b7!2sCanoa%20Quebrada%20-%20Aracati%2C%20CE!5e0!3m2!1spt-BR!2sbr!4v1732481588429!5m2!1spt-BR!2sbr"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mapa de Jericoacoara"
            ></iframe>
          </div>
        </div>
      </div>

      <div className="bg-white">
        <Footer />
      </div>
    </>
  );
}

export default TourDetails;

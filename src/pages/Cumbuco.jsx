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
                Praia de Cumbuco - Caucaia
              </Typography>
            </div>

            <div className="flex justify-center mt-6">
              <div className="grid grid-cols-2 gap-4 max-w-4x1">
                <div className="col-span-1">
                  <img
                    src="/public/img/detalhescumbuco1.png"
                    alt="Imagem maior"
                    className="w-full h-[500px] object-cover rounded-lg shadow-lg"
                  />
                </div>

                <div className="grid grid-rows-2 gap-4">
                  <img
                    src="/public/img/cumbuco.png"
                    alt="Imagem menor 1"
                    className="w-full h-[250px] object-cover rounded-lg shadow-lg"
                  />
                  <img
                    src="/public/img/detalhescumbuco.png"
                    alt="Imagem menor 2"
                    className="w-full h-[234px] object-cover rounded-lg shadow-lg"
                  />
                </div>
              </div>
            </div>

            <Typography variant="h4" color="black" className="font-black mb-2">
              Passeio imperdível: Praia de Cumbuco
            </Typography>
            <Typography variant="lead" color="black" className="font-black opacity-80 mb-4">
              3 dias e 2 noites
            </Typography>
            <Typography className="font-normal text-blue-gray-800 mb-8">
                Prepare-se para dias inesquecíveis na Praia de Cumbuco, um destino que combina aventura e tranquilidade. Este pacote de 3 dias e 2 noites foi planejado para você aproveitar o melhor das dunas, lagoas e praias encantadoras dessa região. Além disso, a vila charmosa de Cumbuco oferece um ambiente acolhedor e uma rica gastronomia à base de frutos do mar.
              <br /><br />
              <strong>Itinerário</strong><br />
              <strong>Dia 1:</strong> Chegada e Passeio pela Vila<br />
              Saída de Fortaleza pela manhã em transporte confortável, com chegada a Cumbuco para o check-in na pousada à beira-mar. Durante a tarde, aproveite para explorar a vila, que é famosa por suas lojinhas de artesanato e restaurantes charmosos. O dia termina com um pôr do sol espetacular na praia, seguido de um jantar em um dos melhores restaurantes locais.<br />
              <strong>Dia 2:</strong> Passeio de Buggy e Lagoas<br />
              Depois de um delicioso café da manhã, embarque em um emocionante passeio de buggy pelas famosas dunas de Cumbuco. O passeio inclui paradas para banho em lagoas de águas cristalinas, como a Lagoa do Banana e a Lagoa do Cauípe, além de vistas panorâmicas incríveis. Para os mais aventureiros, haverá a opção de praticar esportes aquáticos como kitesurf ou o divertido "esquibunda". O restante da tarde será livre para relaxar à beira-mar. À noite, um jantar especial à beira-mar fecha o dia com perfeição.<br />
              <strong>Dia 3:</strong> Manhã Relaxante e Retorno<br />
              Aproveite a manhã para caminhar pela praia, visitar mais lojinhas de artesanato ou simplesmente relaxar à beira-mar. Após o almoço, check-out e retorno a Fortaleza no meio da tarde, levando lembranças inesquecíveis de Cumbuco.
              <br /><br />
              <strong>O que está incluso</strong><br />
              Transporte, hospedagem, passeios de buggy, e suporte completo.
              <br /><br />
              <strong>Dicas para o Passeio</strong><br />
              Traga protetor solar, roupas leves e dinheiro em espécie.
            </Typography>
          </div>

          {/* Caixa de reserva */}
          <div className="w-full lg:w-1/3 bg-white rounded-lg shadow-xl p-6 border border-gray-200">
            <div className="text-2xl font-bold text-gray-900 mb-2">
              R$320 <span className="text-lg font-normal">por pessoa</span>
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
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63708.682624403875!2d-38.763240418555505!3d-3.6347469088948485!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7c0cbf7995cbebf%3A0x580e527bd97f23a0!2sPraia%20de%20Cumbuco%2C%20Caucaia%20-%20CE!5e0!3m2!1spt-BR!2sbr!4v1732482427158!5m2!1spt-BR!2sbr"
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

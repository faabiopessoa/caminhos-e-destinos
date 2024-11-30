import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { StarIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarOutlineIcon } from '@heroicons/react/24/outline';
import { Typography } from '@material-tailwind/react';
import { Footer } from '@/widgets/layout';
import { createAssessment } from '@/services/apiService';

const TourDetails = () => {
  const { id } = useParams();
  const [attraction, setAttraction] = useState({
    nome: '',
    foto: '',
    dias: 0,
    noites: 0,
    descricao: '',
    itinerario: [],
    preco: 0,
    mediaAvaliacoes: 0,
    assessments: [] 
  });

  const [newReview, setNewReview] = useState({ name: "", message: "", stars: 0, touristSpotId: id });
  const [reviews, setReviews] = useState([]);
  const [showNotification, setShowNotification] = useState(false); 

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAttractionDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/tourist-spots/${id}`);
        setAttraction(response.data);
      } catch (err) {
        setError("Erro ao carregar os detalhes.");
      } finally {
        setLoading(false);
      }
    };

    fetchAttractionDetails();
  }, [id]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!attraction) {
    return <div>Atração não encontrada.</div>;
  }

  
  const handleAssessmentSubmit = async (e) => {
    e.preventDefault();
    if (newReview.name && newReview.message && newReview.stars && newReview.touristSpotId) {
      try {
        await createAssessment(newReview);  
        setReviews([...reviews, newReview]); // Atualiza as avaliações
        setNewReview({ name: "", message: "", stars: 0, touristSpotId: newReview.touristSpotId }); 
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
  

  return (
    <>
      <div className="relative flex h-24 content-center items-center justify-center pt-16 pb-20">
        <div className="absolute top-0 h-24 w-full bg-[url('/img/background-3.png')] bg-cover bg-center" />
        <div className="absolute top-0 h-24 w-full bg-black/60 bg-cover bg-center" />
      </div>

      <div className="container mx-auto p-4">
        <div className="flex flex-col lg:flex-row justify-between items-start space-y-8 lg:space-y-0 lg:space-x-8">
          {/* Seção principal com título, descrição e itinerário */}
          <div className="flex-1">
            <div className="flex items-center space-x-4 mb-4">
              <img src="/public/img/favicon.png" className="h-12" alt="Ícone de Jericoacoara" />
              <Typography variant="h3" color="black" className="font-black">
                {attraction.nome}
              </Typography>
            </div>

            <div className="flex justify-center mt-6">
              <div className="w-full">
                <img
                  alt={attraction.nome}
                  src={attraction.foto}
                  className="w-full h-[500px] object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>

            <Typography variant="h4" color="black" className="font-black mb-2 mt-4">
              Passeio imperdível: {attraction.nome}
            </Typography>
            <Typography variant="lead" color="black" className="font-black opacity-80 mb-4">
              3 dias e 2 noites
            </Typography>
            <Typography className="font-normal text-blue-gray-800 mb-8">
              {attraction.descricao}
                <br /><br />
                <strong>Itinerário</strong><br/>
                <strong>Dia 1:</strong> Chegada e Pôr do Sol<br/>
                Saída de Fortaleza em transporte adequado (carro, ônibus ou veículo 4x4, dependendo da praia). Check-in na pousada ou hotel. Explore a vila local e termine o dia assistindo ao pôr do sol em um ponto estratégico, como uma duna ou mirante.<br/>
                <strong>Dia 2:</strong> Passeio pelas Atrações Naturais<br/>
                Visite as principais atrações da região, como lagoas, falésias, formações rochosas ou trilhas ecológicas. Aproveite um almoço típico em um restaurante local. Finalize o dia com um passeio relaxante pela praia.<br/>
                <strong>Dia 3:</strong> Exploração Cultural e Despedida<br/>
                Descubra a cultura local com visitas a mercados de artesanato, feiras ou pequenas exposições culturais. Aproveite para relaxar na praia antes de um almoço de despedida. Retorno para Fortaleza ou próximo destino.<br/>
                <br/><br/>
                <strong>O que está incluso</strong><br/>
                Transporte, hospedagem, passeios guiados, e suporte completo.
                <br/><br/>
                <strong>Dicas para o Passeio</strong><br/>
                Traga protetor solar, roupas leves e dinheiro em espécie.
            </Typography>

            
          </div>

          {/* Card de Preço e Reserva */}
          <div className="w-full lg:w-1/3 bg-white rounded-lg shadow-xl p-6 border border-gray-200">
                    <div className="text-2xl font-bold text-gray-900 mb-2">
                      R${attraction.preco} <span className="text-lg font-normal">por pessoa</span>
                    </div>

                    <div className="flex items-center text-orange-400 mb-4">
                        <StarIcon className="w-5 h-5"/>
                        <StarIcon className="w-5 h-5"/>
                        <StarIcon className="w-5 h-5"/>
                        <StarIcon className="w-5 h-5"/>
                        <StarOutlineIcon className="w-5 h-5" />
                        <span className="text-gray-600 text-sm ml-2">(4.0)</span>
                    </div>

                    <div className="border border-gray-300 rounded-lg p-2 mb-4">
                        <label className="block text-gray-600 text-xs mb-1">DATA</label>
                        <input type="date" className="w-full border-none text-gray-800 text-sm" />
                    </div>

                    <button className="w-full bg-orange-400 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg mb-4 text-center flex items-center justify-center">
                        Reservar
                    </button>
                    <p className="text-center text-sm text-gray-500 mb-2">Você será redirecionado</p>
                    <Typography variant="h6" className="mt-4"> Confira as avaliações de clientes:</Typography>
                    {/* Avaliações */}
            <Typography variant="h6" color="blue-gray" className="font-bold mt-8">
              Avaliações:
            </Typography>
            {attraction.assessments && attraction.assessments.length > 0 ? (
              attraction.assessments.map((assessment) => (
                <div key={assessment.id} className="border-t border-gray-200 py-4">
                  <Typography variant="h6" className="font-semibold">{assessment.name}</Typography>
                  <Typography className="text-gray-600">{assessment.message}</Typography>
                  <div className="flex">
                    {Array.from({ length: 5 }, (_, i) => (
                      i < assessment.stars
                        ? <StarIcon key={i} className="h-5 w-5 text-yellow-500" />
                        : <StarOutlineIcon key={i} className="h-5 w-5 text-gray-300" />
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <Typography className="text-gray-500">Não há avaliações para esta atração.</Typography>
            )}

                </div>
        </div>

        
      {/*UM TESTE SINCERO*/}
      <div className="mt-12 max-w-4xl mx-auto px-4">
  <Typography variant="h6" className="font-bold text-center">Deixe sua avaliação</Typography>
  <form onSubmit={handleAssessmentSubmit} className="space-y-4 mt-4">
      {/* Nome */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Nome</label>
        <input
          type="text"
          value={newReview.name}
          onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          required
        />
      </div>

      {/* Mensagem */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Mensagem</label>
        <textarea
          value={newReview.message}
          onChange={(e) => setNewReview({ ...newReview, message: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          required
        />
      </div>

      {/* Estrelas */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Estrelas</label>
        <div className="flex">
          {Array.from({ length: 5 }, (_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setNewReview({ ...newReview, stars: i + 1 })}
              className={`h-6 w-6 ${i < newReview.stars ? 'text-yellow-500' : 'text-gray-300'}`}
            >
              {i < newReview.stars ? <StarIcon /> : <StarOutlineIcon />}
            </button>
          ))}
        </div>
      </div>

      {/* Botão de Envio */}
      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">
        Enviar
      </button>
    </form>
  </div>


        <div className="mt-12 mb-8">
                <Typography variant="h5" className="font-black text-center mb-4">Você estará aqui</Typography>
                <div className="w-full h-400px rounded-lg overflow-hidden">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15924.83673063378!2d-40.52208008070746!3d-2.7964836491431816!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x771850f49bb2ff5%3A0x4cda3458b7114e12!2sJericoacoara%2C%20Jijoca%20de%20Jericoacoara%20-%20CE%2C%2062558-000!5e0!3m2!1sen!2sbr!4v1634654602856!5m2!1sen!2sbr" width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Mapa de Jericoacoara"></iframe>
                </div>
            </div>
      </div>


      <Footer />
    </>
  );
};

export default TourDetails;

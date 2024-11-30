import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Button,
  IconButton,
  Input,
  Textarea,
  Checkbox,
} from "@material-tailwind/react";
import { FingerPrintIcon, SunIcon, UsersIcon } from "@heroicons/react/24/solid";
import { PageTitle, Footer } from "@/widgets/layout";
import { FeatureCard, TeamCard } from "@/widgets/cards";
import { featuresData, teamData, contactData } from "@/data";
import { Link } from "react-router-dom";

export function Home() {
  const [touristSpots, setTouristSpots] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchTouristSpots = async () => {
      try {
        const response = await axios.get("http://localhost:3000/tourist-spots"); 
        setTouristSpots(response.data); 
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); 
      }
    };

    fetchTouristSpots();
  }, []);

  const handleDetailsClick = (attractionId) => {
    navigate(`/attraction/${attractionId}`);
  };

  return (
    <>
      <div className="relative flex h-screen content-center items-center justify-center pt-16 pb-32">
        <div className="absolute top-0 h-full w-full bg-[url('/img/background-3.png')] bg-cover bg-center" />
        <div className="absolute top-0 h-full w-full bg-black/60 bg-cover bg-center" />
        <div className="max-w-8xl container relative mx-auto">
          <div className="flex flex-wrap items-center">
            <div className="ml-auto mr-auto w-full px-4 text-center lg:w-8/12">
              <Typography
                variant="h1"
                color="white"
                className="mb-6 font-black"
              >
                Seu destino é com a gente!
              </Typography>
              <Typography variant="lead" color="white" className="opacity-80">
              Descubra as praias paradisíacas e os destinos turísticos incríveis do Ceará! Prepare-se para se encantar com águas cristalinas, areias douradas e paisagens de tirar o fôlego. Embarque nessa aventura e viva experiências inesquecíveis nas belezas naturais do Nordeste brasileiro. Sua jornada dos sonhos começa aqui!
              </Typography>
            </div>
          </div>
        </div>
      </div>

      <section className="-mt-32 bg-white px-4 pb-20 pt-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuresData.map(({ color, title, icon, description }) => (
              <FeatureCard
                key={title}
                color={color}
                title={title}
                icon={React.createElement(icon, {
                  className: "w-5 h-5 text-white",
                })}
                description={description}
              />
            ))}
          </div>
          <div className="mt-32 flex flex-wrap items-center">
            <div className="mx-auto -mt-8 w-full px-4 md:w-5/12">
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-blue-gray-900 p-2 text-center shadow-lg">
                <SunIcon className="h-8 w-8 text-white " />
              </div>
              <Typography
                variant="h3"
                className="mb-3 font-bold"
                color="blue-gray"
              >
                Faça você seu próprio destino
              </Typography>
              <Typography className="mb-8 font-normal text-blue-gray-500">
                E nós mostraremos o caminho que você deve pegar!
                <br />
                <br />
                Cada detalhe do seu passeio será planejado com cuidado para tornar a experiência verdadeiramente inesquecível. Desde os destinos mais conhecidos até os cantinhos escondidos, nossa equipe se dedica a criar roteiros personalizados, ajustados ao seu estilo e preferências. Explore novos lugares com a tranquilidade de quem está em boas mãos, sabendo que cada etapa da sua jornada foi cuidadosamente preparada para proporcionar momentos únicos. Não importa o destino que você escolher, estamos aqui para garantir que sua viagem seja envolvente, autêntica e feita sob medida para você. Prepare-se para vivenciar uma experiência transformadora!
              </Typography>
            </div>
            <div className="mx-auto mt-24 flex w-full justify-center px-4 md:w-4/12 lg:mt-0">
              <Card className="shadow-lg border shadow-gray-500/10 rounded-lg">
                <CardHeader floated={false} className="relative h-56">
                  <img
                    alt="Card Image"
                    src="/img/beach.jpg"
                    className="h-full w-full"
                  />
                </CardHeader>
                <CardBody>
                  <Typography variant="small" color="blue-gray" className="font-normal">Praia de Lagoinha :</Typography>
                  <Typography
                    variant="h5"
                    color="blue-gray"
                    className="mb-3 mt-2 font-bold"
                  >
                    Refúgio Natural
                  </Typography>
                  <Typography className="font-normal text-blue-gray-500">
                    Com águas cristalinas e falésias deslumbrantes, a Praia de Lagoinha é o cenário perfeito para relaxar e se encantar. Esse paraíso escondido no Ceará combina natureza exuberante com o charme rústico de uma vila de pescadores.
                  </Typography>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      </section>



      <section className="-mt-32 bg-white px-4 pb-20 pt-4 mt-5">
          <PageTitle PageTitle section="" heading="Seu destino, nosso caminho!">
            Explore as melhores opções de passeios que preparamos para você! Cada destino foi cuidadosamente escolhido para oferecer experiências únicas, seja para relaxar, se aventurar ou descobrir novas paisagens. Prepare-se para vivenciar momentos inesquecíveis em lugares incríveis!
          </PageTitle>
        <div className="container mx-auto">
          <Typography variant="h3" color="blue-gray" className="mb-8 text-center font-bold mt-24">
            Atrações Turísticas
          </Typography>

          {loading && (
            <div className="text-center text-blue-gray-500">
              Carregando atrações turísticas...
            </div>
          )}

          {error && (
            <div className="text-center text-red-500">
              Ocorreu um erro: {error}
            </div>
          )}

          {!loading && !error && (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {touristSpots.map((spot) => (
                <Card key={spot.id} className="shadow-lg border shadow-gray-500/10 rounded-lg">
                  <CardHeader floated={false} className="relative h-56">
                    <img
                      alt={spot.nome}
                      src={spot.foto} // URL da imagem do backend
                      className="h-full w-full object-cover"
                    />
                  </CardHeader>
                  <CardBody>
                    <Typography variant="h5" color="blue-gray" className="mb-3 font-bold">
                      {spot.nome}
                    </Typography>
                    {/*<Typography className="font-normal text-blue-gray-500">
                      {spot.descricao}
                    </Typography>*/}
                    {/*<Typography className="mt-4 font-bold text-blue-gray-900">
                      Preço: R$ {spot.preco.toFixed(2)}
                    </Typography>*/}
                    <Link to={`/attraction/${spot.id}`}>
                  <Button
                    className="w-full bg-gray-900 hover:bg-gray-700 text-white font-semibold py-3 rounded-lg text-center mt-4"
                  >
                    Ver mais detalhes
                  </Button>
                </Link>
                  </CardBody>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="relative bg-white py-24 px-4">
        <div className="container mx-auto">
          <PageTitle section="Contate-nos" heading="Quer um passeio personalizado?">
            Preencha o formulário e responderemos em até 24 horas.
          </PageTitle>
          <form className="mx-auto w-full mt-12 lg:w-5/12">
            <div className="mb-8 flex gap-8">
              <Input variant="outlined" size="lg" label="Nome Completo" />
              <Input variant="outlined" size="lg" label="Email" />
            </div>
            <Textarea variant="outlined" size="lg" label="Mensagem" rows={8} />
            <Checkbox
              label={
                <Typography
                  variant="small"
                  color="gray"
                  className="flex items-center font-normal"
                >
                  Eu li e concordo com os
                  <a
                    href="#"
                    className="font-medium transition-colors hover:text-gray-900"
                  >
                    &nbsp;Termos e Condições
                  </a>
                </Typography>
              }
              containerProps={{ className: "-ml-2.5" }}
            />
            <Button variant="gradient" size="lg" className="mt-8" fullWidth>
              Enviar Mensagem
            </Button>
          </form>
        </div>
      </section>

      <div className="bg-white">
        <Footer />
      </div>
    </>
  );
}

export default Home;

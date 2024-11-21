import {
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react"; 
import { createUser } from '../services/apiService'; 


export function SignUp() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userData.password !== userData.confirmPassword) {
      alert("As senhas não correspondem");
      return;
    }

    try {
      await createUser({ email: userData.email, password: userData.password });
      //alert("Usuário cadastrado com sucesso");
      navigate("/home");
    } catch (error) {
      console.error("Erro ao cadastrar usuário: ", error);
      alert("Erro ao cadastrar usuário");
    }
  };

  return (
    <section className="m-8 flex">
      <div className="w-2/5 h-full hidden lg:block">
        <img
          src="/img/favicon.png"
          className="h-full w-full object-cover rounded-3xl"
        />
      </div>
      <div className="w-full lg:w-3/5 flex flex-col items-center justify-center">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">Cadastre-se</Typography>
          <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">Insira seu email e senha para se registrar.</Typography>
        </div>
        <form className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2" onSubmit={handleSubmit}>
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Email
            </Typography>
            <Input
              name="email" 
              size="lg"
              placeholder="nome@email.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={userData.email}
              onChange={handleChange} 
            />
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Senha
            </Typography>
            <Input
              name="password" 
              type="password"
              size="lg"
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={userData.password} 
              onChange={handleChange} 
            />
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Confirme a senha
            </Typography>
            <Input
              name="confirmPassword" 
              type="password"
              size="lg"
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={userData.confirmPassword} 
              onChange={handleChange} 
            />
          </div>
          <Checkbox
            label={
              <Typography
                variant="small"
                color="gray"
                className="flex items-center justify-start font-medium"
              >
                Eu aceito os&nbsp;
                <a
                  href="#"
                  className="font-normal text-black transition-colors hover:text-gray-900 underline"
                >
                  Termos e Condições
                </a>
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
          />
          <Button type="submit" className="mt-6" fullWidth>
            CADASTRAR
          </Button>

          <div className="space-y-4 mt-8">
          </div>
          <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
            Já tem uma conta?
            <Link to="/sign-in" className="text-gray-900 ml-1">fazer login</Link>
          </Typography>
        </form>
      </div>
    </section>
  );
}

export default SignUp;

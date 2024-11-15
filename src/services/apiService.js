const backendUrl = "http://localhost:3000"; 

export const createUser = async (userData) => {
    const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
    });

    if (!response.ok) {
        throw new Error("Erro ao cadastrar usuário");
    }

    return await response.json();
};


export const getUsers = async () => {
  const response = await fetch(`${backendUrl}/users`, {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error('Erro ao buscar usuários');
  }

  return await response.json();
};

export const login = async (loginData) => {
    const response = await fetch(`${backendUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    });
  
    if (!response.ok) {
      throw new Error('Erro ao fazer login'); 
    }
  
    return await response.json(); 
  };

export const getUserById = async (userId) => {
  const response = await fetch(`${backendUrl}/users/${userId}`, {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error('Erro ao buscar usuário');
  }

  return await response.json();
};

export const updateUser = async (userId, userData) => {
  const response = await fetch(`${backendUrl}/users/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error('Erro ao atualizar usuário');
  }

  return await response.json();
};

export const deleteUser = async (userId) => {
  const response = await fetch(`${backendUrl}/users/${userId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Erro ao deletar usuário');
  }

  return await response.json();
};
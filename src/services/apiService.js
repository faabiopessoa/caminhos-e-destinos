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


//ASSESSMENT
export const createAssessment = async (assessmentData) => {
  const response = await fetch(`${backendUrl}/assessments`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(assessmentData),
  });

  if (!response.ok) {
      throw new Error("Erro ao enviar avaliação");
  }

  return await response.json();
};

export const getAllAssessments = async () => {
  const response = await fetch(`${backendUrl}/assessments`, {
      method: "GET",  
      headers: {
          "Content-Type": "application/json",
      },
  });

  if (!response.ok) {
      throw new Error("Erro ao carregar avaliações");
  }

  return await response.json();
};

//OAUTH 2
export const loginWithGoogle = () => {
  window.location.href = `${backendUrl}/auth/google`;
};


// TOURISTSPOT
export const createTouristSpot = async (touristSpotData) => {
    const response = await fetch(`${backendUrl}/tourist-spots`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(touristSpotData),
    });

    if (!response.ok) {
        throw new Error("Erro ao cadastrar ponto turístico");
    }

    return await response.json();
};

export const getAllTouristSpots = async () => {
    const response = await fetch(`${backendUrl}/tourist-spots`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Erro ao buscar pontos turísticos");
    }

    return await response.json();
};

export const getTouristSpotById = async (touristSpotId) => {
    const response = await fetch(`${backendUrl}/tourist-spots/${touristSpotId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Erro ao buscar ponto turístico");
    }

    return await response.json();
};

export const updateTouristSpot = async (touristSpotId, touristSpotData) => {
    const response = await fetch(`${backendUrl}/tourist-spots/${touristSpotId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(touristSpotData),
    });

    if (!response.ok) {
        throw new Error("Erro ao atualizar ponto turístico");
    }

    return await response.json();
};

export const deleteTouristSpot = async (touristSpotId) => {
    const response = await fetch(`${backendUrl}/tourist-spots/${touristSpotId}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error("Erro ao deletar ponto turístico");
    }

    return await response.json();
};




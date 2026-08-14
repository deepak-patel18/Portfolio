const API_URL = "https://portfolio-9i2n.onrender.com/api";

// =====================================================
// HANDLE RESPONSE
// =====================================================

const handleResponse = async (res) => {
  let data = {};

  try {
    data = await res.json();
  } catch (error) {
    data = {};
  }

  if (!res.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};

// =====================================================
// LOGIN
// =====================================================

export const loginUser = async (data) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(data),
  });

  return handleResponse(res);
};

// =====================================================
// GET PROJECTS
// =====================================================

export const getProjects = async () => {
  const res = await fetch(`${API_URL}/projects`, {
    method: "GET",
  });

  return handleResponse(res);
};

// =====================================================
// CREATE PROJECT
// =====================================================

export const createProject = async (data, token) => {
  const res = await fetch(`${API_URL}/projects`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },

    body: JSON.stringify({
      title: data.title,
      description: data.description,
      image: data.image || "",
      githubLink: data.githubLink || "",
      liveLink: data.liveLink || "",
    }),
  });

  return handleResponse(res);
};

// =====================================================
// DELETE PROJECT
// =====================================================

export const deleteProject = async (id, token) => {
  const res = await fetch(`${API_URL}/projects/${id}`, {
    method: "DELETE",

    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return handleResponse(res);
};

// =====================================================
// CONTACT FORM
// =====================================================

export const sendContact = async (data) => {
  console.log("📨 Sending contact message:", data);

  const res = await fetch(`${API_URL}/contact`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(data),
  });

  const result = await handleResponse(res);

  console.log("✅ Contact response:", result);

  return result;
};
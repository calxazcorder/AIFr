const API_BASE_URL = env_variable || "http://localhost:5000";

const submit = async (formData) => {
  const response = await fetch(`${API_BASE_URL}/predict`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
  const data = await response.json();
  console.log(data)
  return data;
};

export default submit;

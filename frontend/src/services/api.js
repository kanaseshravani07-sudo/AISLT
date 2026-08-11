const API_URL = "http://127.0.0.1:8000";
export async function predictSign(imageBlob) {
  const formData=new FormData();
  formData.append("file",imageBlob,"frame.jpg");
  const response=await fetch(`${API_URL}/predict`,
    {
      method:"POST",
      body:formData
    }
  );
  if (!response.ok) {
    throw new Error("Prediction request failed");
  }
  return response.json();
}
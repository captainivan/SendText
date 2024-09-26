const data = async () => {
  try {
    const api = await fetch(`https://send-text.vercel.app/api/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        text: "hello"
      })
    });
    const res = await api.json();
    console.log(res);
  } catch (error) {
    console.error("Error sending message:", error);
  }
};
data();
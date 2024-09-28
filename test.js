const data = async () => {
  try {
    const api = await fetch(`https://1f560dc1-5170-4ad5-8d04-c596ee514db4-00-rl6hnlzggozt.pike.replit.dev/api/post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
          title: "Diwali Fesitivals",
           image: 'https://i.pinimg.com/736x/6d/23/1d/6d231d1bf0daf6fb921b06545e5f2d85.jpg',
           description: 'Celebrating Easter with joy and hope',
           body: `<header>
                     <h1>Easter: The Celebration of Renewal</h1>
                   </header>
                   <article>
                     <h2>Easter Traditions</h2>
                     <p>Discover the significance of Easter eggs and the traditions surrounding this special day.</p>
                   </article>
                   <footer>
                     <p>&copy; 2024 Easter Blog. All rights reserved.</p>
                   </footer>`
      })
    });
    const res = await api.json();
    console.log(res);
  } catch (error) {
    console.error("Error sending message:", error);
  }
};
data();
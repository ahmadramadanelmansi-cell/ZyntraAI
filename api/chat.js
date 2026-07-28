export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { message } = req.body;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.OPENAI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: message,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    // لو Gemini رجع خطأ، ابعته للموقع بدل ما يخفيه
    if (data.error) {
      return res.status(200).json({
        reply: JSON.stringify(data.error),
      });
    }

    return res.status(200).json({
      reply:
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        JSON.stringify(data),
    });
  } catch (error) {
    return res.status(500).json({
      reply: error.message,
    });
  }
}

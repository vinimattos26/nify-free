import satori from "satori";
import sharp from "sharp";

export const config = {
  runtime: "nodejs",
};

export default async function handler(req, res) {
  try {
    const { name = "Visitante" } = req.query;

    // Cria SVG com o nome
    const svg = await satori(
      {
        type: "div",
        props: {
          style: {
            width: "1200px",
            height: "630px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundImage: "url('https://i.imgur.com/3OZN2d8.png')",
            backgroundSize: "cover",
            fontSize: "80px",
            color: "#fff",
            fontWeight: "bold",
            textShadow: "2px 2px 10px rgba(0,0,0,0.5)",
          },
          children: name,
        },
      },
      {
        width: 1200,
        height: 630,
        fonts: [],
      }
    );

    // Converte SVG em PNG
    const png = await sharp(Buffer.from(svg)).png().toBuffer();

    res.setHeader("Content-Type", "image/png");
    res.send(png);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao gerar imagem" });
  }
}

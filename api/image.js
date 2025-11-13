export const config = {
  runtime: "nodejs18.x",
};
import satori from "satori";
import sharp from "sharp";

export const config = {
  runtime: "nodejs18.x",
};

export default async function handler(req, res) {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const name = url.searchParams.get("name") || "Amiga";

    const svg = await satori(
      {
        type: "div",
        props: {
          style: {
            width: "800px",
            height: "600px",
            backgroundImage: `url(https://i.imgur.com/3OZN2d8.png)`,
            backgroundSize: "cover",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "72px",
            fontWeight: "bold",
            color: "#000",
            textShadow: "2px 2px 10px rgba(255,255,255,0.9)",
          },
          children: name,
        },
      },
      {
        width: 800,
        height: 600,
      }
    );

    const pngBuffer = await sharp(Buffer.from(svg)).png().toBuffer();

    res.setHeader("Content-Type", "image/png");
    res.send(pngBuffer);
  } catch (error) {
    console.error("Erro ao gerar imagem:", error);
    res.status(500).send("Erro interno ao gerar imagem");
  }
}

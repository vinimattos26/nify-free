import satori from "satori";
import sharp from "sharp";
import fs from "fs";
import path from "path";

export const config = {
  runtime: "nodejs",
};

export default async function handler(req, res) {
  try {
    const { searchParams } = new URL(req.url, `http://${req.headers.host}`);
    const name = searchParams.get("name") || "Amiga";

    const backgroundUrl = "https://i.imgur.com/3OZN2d8.png";

    const svg = await satori(
      {
        type: "div",
        props: {
          style: {
            width: "800px",
            height: "600px",
            backgroundImage: `url(${backgroundUrl})`,
            backgroundSize: "cover",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "64px",
            fontWeight: "bold",
            color: "black",
            textShadow: "2px 2px 10px rgba(255,255,255,0.9)",
          },
          children: name,
        },
      },
      {
        width: 800,
        height: 600,

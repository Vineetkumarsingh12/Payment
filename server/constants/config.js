const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost:4173",
    "https://rocket-chi.vercel.app",
    process.env.CLIENT_URL,
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

const ROCKET_TOKEN = "rocket-token";

export { corsOptions, ROCKET_TOKEN};

const corsOptions = {
  origin: [
    "https://payment-iota-eight.vercel.app",
    process.env.CLIENT_URL,
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

const ROCKET_TOKEN = "rocket-token";

export { corsOptions, ROCKET_TOKEN};

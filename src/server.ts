import app from "./app";
import { env } from "./config";
app.listen(env.PORT, () =>
  console.log(`Portfolio API running at ${env.APP_URL}`),
);

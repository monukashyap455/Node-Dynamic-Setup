import dotenv from "dotenv";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

export const dotENVConfig = () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const staticPath = path.join(dirname(__dirname), "../.env");
  dotenv.config({ path: staticPath });
};

dotENVConfig();








import app from "./app.js";
import dataBaseConnection from "./database/connection.js";
import { dotENVConfig } from "./utils/utils.js";


dotENVConfig();
dataBaseConnection();


const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`server is running on port ${port}`));

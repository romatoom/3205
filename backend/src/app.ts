import express from "express";
import DataProcessor from "./services/DataProcessorService.ts";
import cors from "cors";

const PORT = 3001;
const DELAY_MS = 5000;

type REQ_RES = {
  req: any;
  res: any;
  timer: any;
};

type RequestsHash = {
  [index: string]: REQ_RES;
};

let currentRequests: RequestsHash = {};

let itemsProcessor = null;
try {
  itemsProcessor = await DataProcessor.init({
    pathToDataJSON: "src/data/items.json",
  });
} catch (err) {
  console.error("Error creating data processor");
  process.exit();
}

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/api/items/find/", function (req, res) {
  const requestKey = `${req.method}:${req.url}`;

  if (currentRequests[requestKey as keyof RequestsHash]) {
    clearTimeout(currentRequests[requestKey as keyof RequestsHash].timer);

    currentRequests[requestKey as keyof RequestsHash].res
      .status(499)
      .send("Request cancelled");

    currentRequests[requestKey as keyof RequestsHash].res.end();
  }

  const timer = setTimeout(() => {
    const item = req.body.item;
    const validationResult = itemsProcessor.valide(item);

    if (validationResult.error) {
      delete currentRequests[requestKey as keyof RequestsHash];
      return res.status(400).send(validationResult.error.details);
    }

    delete currentRequests[requestKey as keyof RequestsHash];
    const findedItems = itemsProcessor.findItems(item);
    return res.send(findedItems);
  }, DELAY_MS);

  currentRequests[requestKey as keyof RequestsHash] = { req, res, timer };
});

app.listen(PORT, () => {
  console.log(`Server listen on port ${PORT}`);
});

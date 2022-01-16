//import { data } from "../../../SpeakerData";
import path from "path";
import fs from "fs";
import { promisify } from "util";

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const delay = (ms) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

const handler = async (req, res) => {
  //res.status(200).send(JSON.stringify(data, null, 2));

  const method = req?.method;
  const id = parseInt(req?.query.id);
  const recordFromBody = req?.body;

  const jsonFile = path.resolve("./", "db.json");

  switch (method) {
    case "GET":
      await getMethod();
      break;
    case "POST":
      await postMethod();
      break;
    case "PUT":
      await putMethod();
      break;
    case "DELETE":
      await deleteMethod();
      break;
    default:
      res.status(501).send(`Method ${method} not implemented`);
      console.log(`Method ${method} not implemented`);
      break;
  }

  async function getMethod() {
    try {
      const readFileData = await readFile(jsonFile);
      await delay(1000);
      const speakers = JSON.parse(readFileData).speakers;
      if (!speakers) {
        res.status(404).send("File Not Found");
        return;
      }

      const rec = speakers.find((rec) => rec.id == id);
      if (!rec) {
        res.status(404).send("Record Not Found");
        return;
      }

      res.setHeader("Content-Type", "application/json");
      res.status(200).send(JSON.stringify(rec, null, 2));
      console.log(`GET /api/speakers/${id} status 200`);
    } catch (e) {
      res
        .status(500)
        .send(`GET /api/speakers/${id} status: 500 Unexpected Error`);
      console.log(`GET /api/speakers/${id} status 500`, e);
    }
  }

  async function putMethod() {
    try {
      const readFileData = await readFile(jsonFile);
      await delay(1000);
      const speakers = JSON.parse(readFileData).speakers;
      if (!speakers) {
        res.status(404).send("File Not Found");
      } else {
        const updatedSpeakers = speakers.map((rec) => {
          return rec.id == id ? recordFromBody : rec;
        });
        await writeFile(
          jsonFile,
          JSON.stringify({ speakers: updatedSpeakers }, null, 2)
        );

        res.setHeader("Content-Type", "application/json");
        res.status(200).send(JSON.stringify(recordFromBody, null, 2));
        console.log(`PUT /api/speakers/${id} status 200`);
      }
    } catch (e) {
      res
        .status(500)
        .send(`PUT /api/speakers/${id} status: 500 Unexpected Error`);
      console.log(`PUT /api/speakers/${id} status 500`, e);
    }
  }

  async function postMethod() {
    try {
      const readFileData = await readFile(jsonFile);
      await delay(1000);
      const speakers = JSON.parse(readFileData).speakers;
      if (!speakers) {
        res.status(404).send("File Not Found");
      } else {
        const idNew =
          speakers.reduce((accumulator, currentValue) => {
            const idCurrent = parseInt(currentValue.id);
            return Math.max(idCurrent, accumulator);
          }, 0) + 1;

        console.log(`POST /api/speakers/${id} status 200`);

        const newSpeakerRec = { ...recordFromBody, id: idNew.toString() };
        const updatedSpeakers = [newSpeakerRec, ...speakers];

        await writeFile(
          jsonFile,
          JSON.stringify({ speakers: updatedSpeakers }, null, 2)
        );

        res.setHeader("Content-Type", "application/json");
        res.status(200).send(JSON.stringify(newSpeakerRec, null, 2));
        console.log(`POST /api/speakers/${id} status 200`);
      }
    } catch (e) {
      res
        .status(500)
        .send(`POST /api/speakers/${id} status: 500 Unexpected Error`);
      console.log(`POST /api/speakers/${id} status 500`, e);
    }
  }

  async function deleteMethod() {
    try {
      const readFileData = await readFile(jsonFile);
      await delay(1000);
      const speakers = JSON.parse(readFileData).speakers;
      if (!speakers) {
        res.status(404).send("File Not Found");
      } else {
        const updatedSpeakers = speakers.filter((rec) => {
          return rec.id != id;
        });
        await writeFile(
          jsonFile,
          JSON.stringify({ speakers: updatedSpeakers }, null, 2)
        );

        res.setHeader("Content-Type", "application/json");
        res.status(200).send(
          JSON.stringify(
            speakers.find((rec) => rec.id == id),
            null,
            2
          )
        );
        console.log(`DELETE /api/speakers/${id} status 200`);
      }
    } catch (e) {
      res
        .status(500)
        .send(`DELETE /api/speakers/${id} status: 500 Unexpected Error`);
      console.log(`DELETE /api/speakers/${id} status 500`, e);
    }
  }
};

export default handler;

import { setupWorker, SetupWorkerApi } from "msw";
import handlers from "./handlers";

const worker: SetupWorkerApi = setupWorker(...handlers);
export default worker;

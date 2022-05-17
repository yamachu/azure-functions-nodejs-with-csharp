import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { resolve } from "path";
import type { CreateDotnetRuntimeType } from "../AppBundle/dotnet";
const createDotnetRuntime: CreateDotnetRuntimeType = require("../AppBundle/dotnet.js");

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  context.log("HTTP trigger function processed a request.");
  // FIXME: wasm-tools SDK 7.0.100-preview.4 is not worked...
  // MONO_WASM: Error in mono_download_assets: Error: MONO_WASM: Fetch 'supportFiles/0_runtimeconfig.bin' for supportFiles/0_runtimeconfig.bin failed
  const { BINDING } = await createDotnetRuntime({
    configSrc: resolve(__dirname, "../AppBundle/mono-config.json"),
  });
  const fun = BINDING.bind_static_method(
    "[console] Sample.HttpTrigger:ResponseMessageTemplate"
  );
  const name = req.query.name || (req.body && req.body.name);
  const responseMessage = name
    ? (fun(name) as string)
    : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

  context.res = {
    // status: 200, /* Defaults to 200 */
    body: responseMessage,
  };
};

export default httpTrigger;

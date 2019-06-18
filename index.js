// Get Development Env
require('./utilities/getEnv')();

const getFirestore = require('./db/getFirestore');
const getFilesFromDb = require('./db/getFilesFromDb');

let firestore;

const getFilesStep = async (req, res) => {
  try {
    const websiteId = req.query.websiteId;
    firestore = getFirestore(firestore);
    const files = await getFilesFromDb(firestore, websiteId);
    res.status(202);  // send ACCEPTED
    res.send(files);
  } catch (error) {
    console.error(error);
    res.status(401);
    res.end();  // send no content
  }
};

/**
 * HTTP Cloud Function.
 * This function is exported by index.js, and is executed when
 * you make an HTTP request to the deployed function's endpoint.
 *
 * @param {Object} req Cloud Function request context.
 *                     More info: https://expressjs.com/en/api.html#req
 * @param {Object} res Cloud Function response context.
 *                     More info: https://expressjs.com/en/api.html#res
 */
exports.getFiles = async (req, res) => {
  // const userId = req.query.userId;
  // const websiteId = req.query.websiteId;

  // Set CORS headers for preflight requests
  res.set('Access-Control-Allow-Origin', process.env.ACCESS_CONTROL_ALLOW_ORIGIN);

  if (req.method === 'OPTIONS') {
    // Send response to OPTIONS requests
    res.set('Access-Control-Allow-Methods', 'GET');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.set('Access-Control-Max-Age', '3600');
    res.status(204)
    res.end();
  } else {
    await getFilesStep(req, res);
  }
};
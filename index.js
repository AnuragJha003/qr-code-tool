// index.js

const qrcode = require('qrcode');
const jsQR = require('jsqr');

/**
 * Generate a QR code for the given data.
 * @param {string} data - The data to be encoded in the QR code.
 * @param {string} filePath - The file path where the generated QR code image will be saved.
 * @returns {Promise<void>} - A promise that resolves when the QR code is generated and saved.
 */
async function generateQRCode(data, filePath) {
  try {
    await qrcode.toFile(filePath, data);
    console.log(`QR code generated and saved to: ${filePath}`);
  } catch (error) {
    throw new Error(`Error generating QR code: ${error.message}`);
  }
}

/**
 * Read a QR code from an image file using the device's camera.
 * @param {string} imagePath - The path to the image containing the QR code.
 * @returns {Promise<string|null>} - A promise that resolves with the decoded information from the QR code,
 *                                  or null if no QR code is found.
 */
async function readQRCode(imagePath) {
  try {
    // Read the image file
    const fs = require('fs');
    const imageBuffer = fs.readFileSync(imagePath);

    // Decode the QR code
    const { data } = jsQR(imageBuffer, imageBuffer.length);

    if (data) {
      console.log(`QR code decoded: ${data}`);
      return data;
    } else {
      console.log('No QR code found in the image.');
      return null;
    }
  } catch (error) {
    throw new Error(`Error reading QR code: ${error.message}`);
  }
}

module.exports = { generateQRCode, readQRCode };
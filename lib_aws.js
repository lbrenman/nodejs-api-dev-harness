import dotenv from 'dotenv';
dotenv.config();

import { RekognitionClient, DetectFacesCommand, SearchFacesByImageCommand } from "@aws-sdk/client-rekognition";
import sharp from 'sharp';

const aws_param = {
  region: process.env.AWSREGION,
  credentials: {
    accessKeyId: process.env.AWSCLIENTID,
    secretAccessKey: process.env.AWSCLIENTSECRET,
  }
}

const rekognitionClient = new RekognitionClient(aws_param);

export async function searchFaces(image, collectionId) {

  const buffer = Buffer.from(image, 'base64');

  // Detect faces in the input image
  const detectFacesParams = {
    Image: {
      Bytes: buffer
    }
  };

  const detectFacesCommand = new DetectFacesCommand(detectFacesParams);
  const detectFacesResponse = await rekognitionClient.send(detectFacesCommand);
  const faceDetails = detectFacesResponse.FaceDetails;
  return { success: true, data: faceDetails }
}
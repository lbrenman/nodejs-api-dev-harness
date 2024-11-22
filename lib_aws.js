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

    // return { success: true, data: {"message":"Hello from searchFaces()"} }
    return { success: true, data: rekognitionClient }
}
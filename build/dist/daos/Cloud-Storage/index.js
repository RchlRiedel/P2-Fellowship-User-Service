"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageBucket = exports.bucketBaseUrl = exports.bucketName = void 0;
//this is where we set up the cloud storage bucket
const storage_1 = require("@google-cloud/storage");
//bucket Name
exports.bucketName = 'project-1-rchlriedel-bucket'; //CHANGE THIS TO MATCH
//full http path to that bucket (using variable for bucket name so easy to change)
exports.bucketBaseUrl = `https://storage.googleapis.com/${exports.bucketName}`;
//bucket itself
exports.imageBucket = new storage_1.Storage().bucket(exports.bucketName);
//# sourceMappingURL=index.js.map
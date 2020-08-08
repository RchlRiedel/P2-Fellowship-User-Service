"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveProfilePicture = void 0;
const _1 = require(".");
function saveProfilePicture(contentType, imageBase64Data, fileName) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let newImage = _1.imageBucket.file(fileName); // make a new file (add to bucket)
            //for more info, look up gcp cloud storage cloud library -> node.js -> api reference documentation 
            //vs createWriteStream (ew)
            //Buffer.from will give us a binary array from the arguements we supply
            //file.save function needs binary data ( this is because it streams binary data)
            yield newImage.save(Buffer.from(imageBase64Data, 'base64'), {
                metadata: {
                    contentType //set some metadata about the new file
                }
            });
            console.log('Image saved');
        }
        catch (e) {
            console.log(e);
            throw e;
        }
    });
}
exports.saveProfilePicture = saveProfilePicture;
//# sourceMappingURL=user-images.js.map
import { storage } from "./config";
import {questionAttachmentBucket} from "../name"
import { Permission } from "node-appwrite";


export default async function getOrCreateStorage(){
    try {
        await storage.getBucket(questionAttachmentBucket)
        console.log("bucket connected");
        
    } catch (error) {
        try {
            await storage.createBucket(questionAttachmentBucket, questionAttachmentBucket, [
                Permission.read("any"),
                Permission.read("users"),
                Permission.create("users"),
                Permission.update("users"),
                Permission.delete("users"),
            ],
        false, undefined, undefined, ["jpg", "png", "gif", "jpeg", "webp", "heic"], )

        console.log("storage created and connected");
        
        } catch (error) {
            console.log("errer in storage setup", error);
            
        }
    }
}
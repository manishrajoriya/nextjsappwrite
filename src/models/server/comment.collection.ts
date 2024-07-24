import { Permission } from "node-appwrite";
import {db, commentCollection } from "../name";
import { databases } from "./config";

export default async function cerateCommentCollection() {
    await databases.createCollection(db, commentCollection, commentCollection, [
        Permission.read("any"),
        Permission.read("users"),
        Permission.create("users"),
        Permission.update("users"),
        Permission.delete("users"),
    ] )

    console.log("comment collection created");
    

    await Promise.all([
        databases.createStringAttribute(db, commentCollection, "content", 1000, true),
        databases.createEnumAttribute(db, commentCollection, "type",["answer", "question"], true),
         databases.createStringAttribute(db, commentCollection, "tupeId", 50, true),
         databases.createStringAttribute(db, commentCollection, "autherId", 50, true),
    ])
     console.log("comment attribute created");
     
}
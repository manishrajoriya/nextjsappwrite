import { db } from "../name";
import createAnswerCollection from "./answer.collection";
import createQuestionCollection from "./question.collection";
import cerateCommentCollection from "./comment.collection";
import createVoteCollection from "./vote.collection";

import { databases } from "./config";

export default async function getOrCreateDb(){
    try {
        await databases.get(db)
        console.log("db connected");
        
    } catch (error) {
        try {
            await databases.create(db, db,)
            console.log("db created");


            await Promise.all([
                createQuestionCollection(),
                createAnswerCollection(),
                cerateCommentCollection(),
                createVoteCollection(),
            
            ])
            console.log("db collection created and connected");
            
        } catch (error) {
            console.log("errer in db setup", error);
            
        }
    }
}
import { answerCollection, db } from "@/models/name";
import { databases, users } from "@/models/server/config";
import { NextRequest, NextResponse } from "next/server";
import { ID } from "node-appwrite";
import { UserPrefs } from "@/store/Auth";


export async function POST(request: NextRequest){
    try {
        const { questionId, answer, autherId } = await request.json();
        const responce = await databases.createDocument(db, answerCollection, ID.unique(), {
            content: answer,
            questionId: questionId,
            autherId: autherId
        })


        // Incrise auther reputation
        const prefs = await users.getPrefs<UserPrefs>(autherId)
        await users.updatePrefs<UserPrefs>(autherId, {
            reputation: Number(prefs.reputation) + 1
        })

        return NextResponse.json(responce, { status: 200 })


    } catch (error: any) {
        return NextResponse.json({ error: error.message || "error creating answer" }, { status: 500 });
    }
}



export async function DELETE(request: NextRequest){
    try {
        const { answerId } = await request.json();
        const answer = await databases.getDocument(db, answerCollection, answerId)
        const responce = await databases.deleteDocument(db, answerCollection, answerId)

        // Decrise auther reputation
        const prefs = await users.getPrefs<UserPrefs>(answer.autherId)
        await users.updatePrefs<UserPrefs>(answer.autherId, {
            reputation: Number(prefs.reputation) - 1
        })

        return NextResponse.json({data: responce}, { status: 200 })
    } catch (error: any) {
        return NextResponse.json({ error: error?.message || "error creating answer" } , { status: 500 });
    }
}
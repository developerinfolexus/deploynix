import { google } from "googleapis";
import { Readable } from "stream";

function getAuth() {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;

    if (!clientId || !clientSecret || !refreshToken) {
        throw new Error(
            "Missing Google OAuth2 credentials. Set GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, and GOOGLE_REFRESH_TOKEN in .env"
        );
    }

    const oauth2Client = new google.auth.OAuth2(clientId, clientSecret);
    oauth2Client.setCredentials({ refresh_token: refreshToken });
    return oauth2Client;
}

export async function uploadResumeToDrive(
    fileBuffer: Buffer,
    fileName: string,
    mimeType: string
): Promise<{ fileId: string; webViewLink: string }> {
    const auth = getAuth();
    const drive = google.drive({ version: "v3", auth });
    const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;

    if (!folderId) {
        throw new Error("GOOGLE_DRIVE_FOLDER_ID is not set");
    }

    const stream = new Readable();
    stream.push(fileBuffer);
    stream.push(null);

    const response = await drive.files.create({
        requestBody: {
            name: fileName,
            parents: [folderId],
        },
        media: {
            mimeType,
            body: stream,
        },
        fields: "id, webViewLink",
    });

    // Make the file viewable by anyone with the link
    await drive.permissions.create({
        fileId: response.data.id!,
        requestBody: {
            role: "reader",
            type: "anyone",
        },
    });

    // Re-fetch to get the webViewLink
    const file = await drive.files.get({
        fileId: response.data.id!,
        fields: "webViewLink",
    });

    return {
        fileId: response.data.id!,
        webViewLink: file.data.webViewLink!,
    };
}

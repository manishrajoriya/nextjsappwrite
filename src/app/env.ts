const env = {
    appwrite: {
        endpoint: String(process.env.NEXT_PUBLIC_APPWRITE_HOST_URL),
        apikey: String(process.env.APPWRITE_API_KEY),
        projectId: String(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID),
    }
    
    
}

export default env
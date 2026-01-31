# NOSO-takehome

1. **Transcription:** I compared AssemblyAI, WhisperX, and Gemini 3. In the end, I chose **Gemini 3 Pro** for its accuracy and output quality, and then did some light manual cleanup to correct any remaining issues.

2. **Data processing:** I designed a JSON schema and used Codex to write a Python script that processes the transcript and converts it into that JSON format.

3. **Call analysis:** I used Gemini 3 Pro to do an initial pass—splitting the conversation into segments, tagging each segment by type, and generating a first-round analysis—then I manually reviewed, validated, and refined the results.

4. **Frontend:** I designed a static frontend page and used Gemini 3 Pro to plan the file structure and write the Next.js project design doc. For the actual implementation, I used Codex to write the code and iterated on the visuals and UI polish.

5. **Deployment:** I hosted the repo on GitHub and deployed the app on Vercel.


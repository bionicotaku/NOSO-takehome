# Take-Home Assignment: Service Call Recording Analysis

## Overview
In this assignment, you will analyze a service call voice recording involving a field technician and a customer. The goal is to produce a comprehensive call analysis to evaluate the technician’s performance and identify any sales opportunities. You will create a small web application that presents the call analysis in an easy-to-read format. The assignment is designed to be completed in about one day, focusing on insightful analysis rather than complex software architecture.

## Objectives

- **Transcribe the Call:** Convert the provided audio recording into text.  
  - *Hint:* You may use any tool or API for transcription. For example, AssemblyAI offers **$50 in free credits**, which covers up to **~185 hours of audio** [1].

- **Compliance Check:** Determine if the technician followed standard service call procedures. Specifically, check for the presence and quality of key call stages:
  - **Introduction:** Did the technician properly greet the customer and introduce themselves/company?
  - **Problem Diagnosis:** How did the technician inquire about and understand the customer’s issue?
  - **Solution Explanation:** Did the technician clearly explain the solution or service performed?
  - **Upsell Attempts:** Note if and how the technician attempted to upsell additional services or products.
  - **Maintenance Plan Offer:** Did the technician offer any maintenance plans or long-term service agreements?
  - **Closing & Thank You:** How did the technician conclude the call? Did they thank the customer and finish courteously?

- **Call Type Identification:** Identify what kind of service call this is (for example, a repair call, maintenance visit, installation, etc.) based on the conversation.

- **Sales Insights:** Highlight any sales signals or opportunities in the call. For instance, was the customer interested in additional services or did the technician miss cues for an upsell? Provide insights into what was done well or what was missed regarding sales opportunities.

## Requirements

- **Hosted Web Application:** Develop a simple web application to showcase your analysis. The app should be hosted live (e.g., on a free hosting service or your own server) so that we can easily access it via a URL.

- **Transcript & Analysis Display:** The application should display the call transcript alongside your analysis. Make it easy for a reviewer to read the transcript and see your annotations or comments about each part of the call.
  - You can segment the transcript according to the stages listed in the compliance check (Introduction, Diagnosis, etc.) and provide your commentary under each segment.
  - Emphasize clarity and readability in the UI/UX. The focus is on understanding your insights quickly, not on flashy design.

- **Depth of Analysis:** We are more interested in the quality of your analysis than in a complex codebase. You do not need to build a heavy backend or sophisticated algorithms from scratch (using existing AI tools for transcription or analysis is encouraged). However, your commentary and insights should be detailed and thoughtful.

- **Use of Tools:** You are free to use any tools or libraries (including AI services for transcription or even initial analysis). Just be sure the final write-up is your own understanding of the call. If you use AI to help analyze, cross-check and ensure the insights are accurate.

- **Self-Contained Solution:** The web application should be self-hosted on your end. Make sure we can access it without any special setup.  
  - For example, you could deploy on platforms like **GitHub Pages**, **Vercel**, **Heroku**, etc., or any hosting of your choice.

## Deliverables

1. **Deployed Web Application URL:** A link to the live app where we can review the transcript and your analysis.
2. **Source Code (optional):** While we won’t be doing a deep code review, please provide a link to the source code repository or a zip file. This is mainly to verify authenticity and see how you structured the solution (again, we are not evaluating architecture in depth).
3. **Instructions (if any):** If the application requires any specific credentials or steps to run (it shouldn’t for a hosted app), provide clear instructions.

## Evaluation Criteria

- **Insightfulness of Analysis:** How deeply did you understand the call? Did you catch important details in each stage of the conversation? We’ll check if you identified the critical compliance elements (introduction, diagnosis, etc.) and any sales opportunities or missed signals.

- **Clarity of Presentation:** The analysis should be well-organized and easy to follow. Use headings, bullet points, or timestamps to align your commentary with the transcript. We should be able to skim and grasp key points quickly.

- **Completeness:** Ensure you cover all requested aspects — transcription, compliance steps, call type, and sales insights. A thorough analysis that addresses each point will stand out.

- **Effort and Quality:** Even though this is a one-day assignment, we expect a polished delivery. That means a clean and functional web app, a proofread write-up, and adherence to the instructions.

- **Use of Resources:** Smart use of available tools (like transcription APIs or AI) is encouraged. We’re not testing how you build a transcription engine from scratch, but rather how you leverage resources to focus on analysis. Just make sure to attribute or mention any major third-party tools used.

## Additional Notes

- **Time Management:** This assignment is scoped to be doable in a day. Focus on the core tasks (transcribing and analyzing the call). It’s okay if your app is simple – a straightforward presentation that effectively communicates your findings is perfect.

- **Data Privacy:** If the call recording contains any sensitive information, treat it confidentially. (For the purpose of this assignment, assume you have clearance to use the data for analysis. Just don't share it beyond this project.)

- **Questions:** If anything is unclear about the assignment, feel free to reach out for clarification.

Good luck, and we look forward to seeing your insights on the service call!

---

## References

[1] AssemblyAI | Pricing | Production-ready AI Models  
https://www.assemblyai.com/pricing

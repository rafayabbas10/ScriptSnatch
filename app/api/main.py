from fastapi import FastAPI
import google.generativeai as genai
from youtube_transcript_api import YouTubeTranscriptApi
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

origins = ["https://script-snatch.vercel.app"]  # Replace with allowed origins

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,  # Adjust if credentials are needed
    allow_methods=["*"],  # Or specify allowed methods (e.g., ["GET", "POST"])
    allow_headers=["*"],  # Or specify allowed headers (e.g., ["Content-Type"])
)

@app.get('/api/v1/id/{url}')
async def root(url):

        transcript = YouTubeTranscriptApi.get_transcript(url, languages=('en', 'hi', 'de', 'fr', 'es', 'it', 'pt', 'ru', 'ja', 'ko', 'zh-cn', 'zh-tw', 'ar', 'tr', 'nl', 'pl', 'sv', 'da', 'fi', 'no', 'hu', 'el', 'pt-br', 'ro', 'cs', 'sk', 'sl', 'hr', 'bg', 'mk', 'uk', 'be', 'sr', 'bs', 'ka', 'uz', 'ky', 'lo', 'la', 'vi', 'th', 'id', 'ms', 'my', 'km', 'mn', 'jv', 'ta', 'te', 'ml', 'kn', 'gu', 'mr', 'or', 'pa', 'sa', 'hi', 'ur', 'ne', 'bn', 'as', 'si', 'Sinhala', 'fo', 'fa', 'af', 'he', 'am', 'et', 'lv', 'lt', 'gl', 'eu', 'ca', 'cy', 'ku', 'kw', 'ga', 'mt', 'tk', 'sw', 'su', 'yi', 'ha', 'yo', 'ig', 'ewo', 'wo', 'sn', 'so', 'rm', 'mg', 'ti', 'om', 'co', 'qu', 'gn', 'ay', 'gu', 'gd', 'gv', 'na', 'bh', 'fy', 've', 'mr', 'rn', 'sg', 'ba', 'pi', 'li', 'nso', 'sn', 'tn', 'ts', 'rh', 'rw', 'nd', 'st', 'lo', 'ln', 'ff', 'kr', 'eu', 'ee', 'om', 'os', 'ia', 'ie', 'iu', 'ik', 'oc', 'cu', 'ae', 'ac', 'ka', 'ks', 'ch', 'nv', 'nv', 'rn', 'kg', 'rw', 'rn', 'rn', 'ki', 'rw', 'li', 'li', 'li', 'ln', 'ln', 'lg', 'lg', 'sn', 'sn', 'st', 'tn'))

        output = ''
        for x in transcript:
            sentence = x['text']
            output += f' {sentence}'

        # print(output)

        genai.configure(api_key="AIzaSyAhIe_BoiuhF0J8mumSu1irrvNYwU-ArAw")

        # Set up the model
        generation_config = {
            "temperature": 0.9,
            "top_p": 1,
            "top_k": 1,
            "max_output_tokens": 5000,
        }

        safety_settings = [
            {
                "category": "HARM_CATEGORY_HARASSMENT",
                "threshold": "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
                "category": "HARM_CATEGORY_HATE_SPEECH",
                "threshold": "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
                "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                "threshold": "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
                "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
                "threshold": "BLOCK_MEDIUM_AND_ABOVE"
            },
        ]

        model = genai.GenerativeModel(model_name="gemini-1.0-pro",
                                    generation_config=generation_config,
                                    safety_settings=safety_settings)

        convo = model.start_chat(history=[])
        
        convo.send_message(
            f"{output}\n \n  Turn this into a seo optimized, well structured article of atleat 1000 words\n Make sure this is in english language written with english characters")
        # print(convo.last.text)
        article = convo.last.text
        
        return {'text': article}

    


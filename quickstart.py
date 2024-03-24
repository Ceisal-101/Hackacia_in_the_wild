from openai import AzureOpenAI
from dotenv import load_dotenv
from local_to_encode64_image import local_image_to_data_url

import json
import os

load_dotenv()

api_base = os.getenv("AZURE_OPENAI_ENDPOINT")
api_key= os.getenv("AZURE_OPENAI_API_KEY")
deployment_name = 'gpt4-003'
api_version = "2024-02-01" # this might change in the future

#image_url1 = local_image_to_data_url("/Users/ernestomendozagomez/Documents/Screenshots/Photo1.png")

client = AzureOpenAI(
    api_key=api_key,  
    api_version=api_version,
    base_url=f"{api_base}/openai/deployments/{deployment_name}"
)

def get_prompt(path_to_image):
	image = local_image_to_data_url(path_to_image)
	response = client.chat.completions.create(
		model=deployment_name,
		messages=[
			{ "role": "system", "content": "You are an expert in origami folding. You are helping a beginner in the field to \
			create an origami crane. You need to give concise answers. Be supportive and don't apologize." },
			{ "role": "user", "content": [  
				{ 
					"type": "text", 
					"text": "I am doing an origami crane. This is my current state. What do I have to do next ?" 
				},
				{ 
					"type": "image_url",
					"image_url": {
						"url": image
					}
				}
			] }
		],
		max_tokens=2000 
	)
	return response.choices[0].message.content

from langchain_openai import AzureOpenAIEmbeddings

embeddings = AzureOpenAIEmbeddings(
    azure_deployment="embedding-main",
	model="embedding-ada-002",
    openai_api_version="2023-05-15",
)#embedding-ada-002

from langchain_community.vectorstores import FAISS
db = FAISS.load_local("faiss_index", embeddings, allow_dangerous_deserialization=True)

query = get_prompt("/Users/ernestomendozagomez/Documents/Screenshots/Test1.png")
docs = db.similarity_search(query)
print(docs[0].page_content)

	#print(response.choices[0].message.content)

# from gtts import gTTS
# import pygame
# from io import BytesIO

# text = response.choices[0].message.content
# language = 'en'

# tts = gTTS(text=text, lang=language, tld="us",slow=False)

# #Save the audio data to a BytesIO object
# audio_data = BytesIO()
# tts.write_to_fp(audio_data)
# audio_data.seek(0)

# #Initialize pygame mixer
# pygame.mixer.init()
# pygame.mixer.music.load(audio_data)
# pygame.mixer.music.play()

# #Wait until sound finishes playing
# while pygame.mixer.music.get_busy():
#     pygame.time.Clock().tick(10)


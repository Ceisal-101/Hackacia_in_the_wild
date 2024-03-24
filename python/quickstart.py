from openai import AzureOpenAI
from dotenv import load_dotenv
from python.local_to_encode64_image import local_image_to_data_url

import json
import os

load_dotenv()

api_base = os.getenv("AZURE_OPENAI_ENDPOINT")
api_key= os.getenv("AZURE_OPENAI_API_KEY")
deployment_name = 'gpt4-003'
api_version = "2024-02-01" # this might change in the future

image_url = local_image_to_data_url("path_to_your_image")

client = AzureOpenAI(
	api_key=api_key,  
	api_version=api_version,
	base_url=f"{api_base}/openai/deployments/{deployment_name}"
)

response = client.chat.completions.create(
	model=deployment_name,
	messages=[
		{ "role": "system", "content": "You are a helpful assistant." },
		{ "role": "user", "content": [  
			{ 
				"type": "text", 
				"text": "Describe this picture:" 
			},
			{ 
				"type": "image_url",
				"image_url": {
					"url": image_url
				}
			}
		] } 
	],
	max_tokens=2000 
)

with open("response.txt", "w") as f:
	f.write(response.model_dump_json(indent=2))

print(response.choices[0].message.content)

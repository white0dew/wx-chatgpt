from flask import Flask,request
import requests
import json
import random
import openai
import os

app = Flask(__name__)

@app.route('/')
def hello_world():  # put application's code here
    return '你已经成功进入AI的世界啦！'

@app.route('/input/message',methods = ['POST'])
def mess():  # put application's code here
    message = request.json.get('msg')
    print(message)
    openai.api_key = "***" # 写你的apikey
    messages = [
        {"role": "system", "content": "You are AI-Bot DingMe, a large language model trained by OpenAI. Knowledge cutoff: 2021-09 Current date: 2023-03-06"},
    ]
    messages.append({"role": "user", "content": message})

    completion = openai.ChatCompletion.create(
    model="gpt-3.5-turbo", 
    messages=messages,
    )
    print(completion)
    res = {
            "resmsg":completion,
            "code":200
            }
    return res
if __name__ == '__main__':
    app.run(threaded = False,processes=10, host='0.0.0.0',port=9000)
# Example of an OpenAI Completion request, using the stream=True option
# https://beta.openai.com/docs/api-reference/completions/create
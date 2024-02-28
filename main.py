from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

# request body로 받기 위해 메모라는 클래스 지정
class Chat(BaseModel):
    hour : int
    min : int
    content:str

chats =[]

app=FastAPI()

@app.post("/chat")
def creat_chat(chat:Chat):
    chats.append(chat) 

#get 요청 받음
@app.get("/chat")
def read_memo():
    return chats

app.mount("/", StaticFiles(directory='static', html=True), name='static') # root 경로에 우리의 static 파일에 있는 html을 호스팅 해줘라라는 의미
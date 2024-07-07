from fastapi import APIRouter, HTTPException, File, UploadFile
from fastapi.responses import JSONResponse
from PyPDF2 import PdfReader
from io import BytesIO

router = APIRouter()


@router.post('/get_pdf_text')
async def get_pdf_text(file: UploadFile = File(None)):
    print("The desired file is: ", file)
    raw_text = ""
    if file:
        try:
            pdf_bytes = await file.read()
            reader = PdfReader(BytesIO(pdf_bytes))
            text = ""
            for page in reader.pages:
                text += page.extract_text()
            raw_text += text
        except Exception as e:
            raw_text = f"Error reading file: {e}"
        print("The raw text is: ", raw_text)
        if raw_text:
            return JSONResponse({'output': raw_text})
        else:
            return JSONResponse({'output': "No file given"})
    else:
        return JSONResponse({'output': "No file given"})

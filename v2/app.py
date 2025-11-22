# app.py
from fastapi import FastAPI, File, UploadFile, Form
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import List, Optional
from paddleocr import PaddleOCR, draw_ocr
from PIL import Image
import io
import os

app = FastAPI(title="PaddleOCR FastAPI")

# Load the OCR model once at startup
# lang='en' works by default; for Kannada try lang='kn' or use "ocr = PaddleOCR(use_angle_cls=True, lang='en')" 
# PaddleOCR will download model files automatically when first used.
OCR = PaddleOCR(use_angle_cls=True, lang='kn')  # change 'kn' if needed

class BoxText(BaseModel):
    text: str
    confidence: float
    box: List[List[float]]

@app.post("/ocr", response_class=JSONResponse)
async def ocr_upload(file: UploadFile = File(None), local_path: Optional[str] = Form(None)):
    """
    POST multipart/form-data:
      - file: image file upload
      - local_path: alternatively, a server-local filesystem path to an image
    Returns JSON: [{text, confidence, box}, ...]
    """
    try:
        if file is not None:
            contents = await file.read()
            image = Image.open(io.BytesIO(contents)).convert("RGB")
        elif local_path:
            if not os.path.isfile(local_path):
                return JSONResponse(status_code=400, content={"error": "local_path not found"})
            image = Image.open(local_path).convert("RGB")
        else:
            return JSONResponse(status_code=400, content={"error": "Provide file upload or local_path"})

        # Convert image to numpy array for PaddleOCR
        img_byte_arr = io.BytesIO()
        image.save(img_byte_arr, format="PNG")
        img_bytes = img_byte_arr.getvalue()

        # Run OCR
        result = OCR.ocr(img_bytes, cls=True)

        # result format: list of [box, (text, confidence)]
        output = []
        for item in result:
            # item sometimes nested; normalize
            if len(item) == 2 and isinstance(item[1], tuple):
                box = item[0]
                text, score = item[1]
            else:
                # fallback
                box = item[0]
                text = item[1][0] if len(item) > 1 and item[1] else ""
                score = item[1][1] if len(item) > 1 and item[1] else 0.0

            output.append({
                "text": text,
                "confidence": float(score),
                "box": [[float(x), float(y)] for x, y in box]
            })

        return JSONResponse(content={"result": output})
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})

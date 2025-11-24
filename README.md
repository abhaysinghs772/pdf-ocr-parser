
# pdf-ocr-parser

I came across a problem, where I have to read some info written in kannada language (one of the widely spoken language of southern state of India) from a scanned pdf or a picture based pdf.

So this project solves this problem using 3 approaches.
- using js + tesseract.js + ollama (Qwen2.5) ( interacts with Tesseract ) **inside v1/**
- using shell + Tesseract ( c++ package which has to be installed in your system first ) **inside v2**
- using python + googletrans lib ( **not-recommended** ) **inside v3/**

## Licenses

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

## Installation

there are 2 ways/approaches to run this application, v1 and v2. Both of this application has their own set up procedure.

```bash
  git clone https://github.com/abhaysinghs772/pdf-ocr-parser.git
```

move to the cloned folder

```bash
  cd pdf-ocr-parser/
```

v1 [ using js and ollama (Qwen2.5) model ]

```bash
  cd v1/
```

v2 [ using raw shell scripts and Tesseract (c++ package) ]

```bash
  cd v3/
```

v3 [ using google-trans python lib ( **NOT-RECOMMENDED** )]

```bash
  cd v2/
```

## Acknowledgements

- [tesseract](https://github.com/tesseract-ocr/tesseract)
- [ollama](https://github.com/ollama/ollama)
- [QwenLm](https://github.com/QwenLM/Qwen3)
- [Kannada-OCR-test project by really cool IISc guys](https://github.com/MILE-IISc/Kannada-OCR-test-images-with-ground-truth)

## Feedback

If you have any feedback or any issue, then please feel free to open the issues, or reach out to me directly at abhaysinghs772@gmail.com
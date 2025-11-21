import easyocr

reader = easyocr.Reader(['kn'])  # Kannada
result = reader.readtext('page1.png')
text = "\n".join([r[1] for r in result])
print(text)

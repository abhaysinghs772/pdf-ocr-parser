import unicodedata
import re

# The Kannada text copied from your request
kannada_text = """
ಕರ್ನಾಟಕ ಸರ್ಕಾರ
ಗ್ರಾಮೀಣ ಅಭಿವೃದ್ದಿ ಮತ್ತು ಪಂಚಾಯತ್‌ ರಾಜ್‌ ಇಲಾಖೆ
ನಮೂನೆ -9
ಜಾಲ್ಲೆ :ದಾವಣಗ್‌ರೆ ಬ್ಲಾಶ್‌ :ಹೊನ್ನಾಳಿ ಗ್ರಾಮ ಪಂಚಾಯತಿ :ಹನುಮಸಾಗರ ಗ್ರಾಮ :ಹೊಲೆಹರಳಹಳ್ಳಿ
ಪ್ರಮಾಣಪತ್ರದ ಸಂಖ್ಯೆ :19646272
(ಗಾ, ಪಂ ದಾಖಲೆಗಳ ಪ್ರಕಾರ)
151200503900200294 ಸರ್ಕಾರದ ವಸತಿ ನಿಗಮದ/ಗೃಕ ಮಂಡಳಿಂಯ ವಸತಿ ಯೋಜನೆಂಕುಡಿ
ಮಂಜೂರಾದ ಆಸ್ತಿ
ಗ್ರಾಮ ಪಂಶಿಕಾಯತಿ ಸಿರ್ಣಂರುದ ಸಂಖ್ಯೆ ೦5 - 30/05/2೦25
ಮಾಲೀಕರ ಹೆಸರು: ಪರಮೇಶ್ವರಪ್ಪ
ತಂದೆ / ತಾಯಿ / ಗಂಡ / ಹೆ೦ಡತಿ ಹೆಸರು: s/o ಹನುಮಂತಪ್ಪ
ವಿಳಾಸ: ಹೊಳೆಹರಳಹಳ್ಳಿ ಗ್ರಾಮ ಹೊನ್ನಾಳಿ ತಾಲ್ಲೂಕಾ ದಾವಣಗೆರೆ ಜಿಲ್ಲೆ
ಗುರುತಿನ ದಾಖಲೆ: ಮತದಾರರ ಗುರುತಿನ ಚೀಟಿ
"""

def normalize_text(text):
    return unicodedata.normalize("NFC", text)

def clean_garbage(text):
    text = re.sub(r"[|()/\[\]{}%!•¬~”“«»<>]", " ", text)
    text = re.sub(r"[^\S\r\n]+", " ", text)  # multiple spaces
    return text

def fix_line_breaks(text):
    lines = [l.strip() for l in text.split("\n")]
    return " ".join([l for l in lines if l])  # join all non-empty lines


def fix_kannada_spacing(text):
    # examples
    text = text.replace("ಗ್ರಾ ಮ", "ಗ್ರಾಮ")
    text = text.replace("ಠೂ ಈ", "ಠೂ ಈ")  # adjust according to patterns you see
    return text


def make_readable(text):
    text = normalize_text(text)
    text = clean_garbage(text)
    text = fix_line_breaks(text)
    text = fix_kannada_spacing(text)
    return text

res = make_readable(kannada_text)
print(res)

import asyncio
from googletrans import Translator

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

async def translate_kannada_to_english(text):
    """Translates a block of Kannada text to English using Google Translate."""
    translator = Translator()
    try:
        # Translate the text. We specify source language 'kn' (Kannada) 
        # for better accuracy, although it often auto-detects correctly.
        translation = await translator.translate(text, src='kn', dest='en')
        
        return translation
    
    except Exception as e:
        return f"An error occurred during translation: {e}"

# --- Execution ---
print("--- Original Kannada Text ---")
print(kannada_text)
print("\n" + "="*40 + "\n")

english_translation = asyncio.run(translate_kannada_to_english(kannada_text))

print("--- English Translation ---")
print(english_translation)
#!/usr/bin/env bash
# ocr_docker.sh
# usage: ./ocr_docker.sh input_image output_txt lang
# example: ./ocr_docker.sh ./images/page-1.png ./output/page-1.txt kn

IMG="$1"
OUT_TXT="${2:-./output/ocr.txt}"
LANG="${3:-kn}"   # 'kn' for Kannada. Set as needed.

mkdir -p "$(dirname "$OUT_TXT")"

# Pull/personalize the docker image if first time:
docker pull paddlepaddle/paddle:3.2.2

# Run OCR using PaddleOCR docker, printing results to stdout, then save
docker run --rm -v "$(pwd)":/workspace -w /workspace paddlepaddle/paddle:3.2.2 \
  python3 tools/infer/predict_system.py \
    --image_dir "$(dirname "$IMG")" \
    --use_gpu False \
    --det_algorithm DB \
    --rec_algorithm CRNN \
    --rec_model_dir /ppocr_release_v2.0/rec_crnn_vd_none_bilstm_ctc \
    --rec_char_dict_path /ppocr/ppocr/utils/ppocr_keys_v1.txt \
    --rec_char_type "ch" \
    --use_space_char False \
    --ir_optim False \
    --output ./ocr_tmp.json \
    --image_file "$(basename "$IMG")" \
    --rec_batch_num 1 \
    --draw_img False

# The above creates ocr_tmp.json with predictions. Extract the text and save.
python3 - <<PY
import json,sys
data=json.load(open('ocr_tmp.json','r',encoding='utf-8'))
texts=[]
for d in data:
    texts.append(' '.join([t[1] for t in d]))
open("$OUT_TXT","w",encoding="utf-8").write("\n".join(texts))
print("Saved OCR to $OUT_TXT")
PY

# clean up
# rm -f ocr_tmp.json || true
# --------------------------------------------------
# Base Image: Latest PaddlePaddle CPU
# --------------------------------------------------
FROM ccr-2vdh3abv-pub.cnc.bj.baidubce.com/paddlepaddle/paddle:3.0.0

# --------------------------------------------------
# Install Dependencies
# --------------------------------------------------
RUN apt update && apt install -y \
    git wget tar \
    libglib2.0-0 libsm6 libxext6 libxrender-dev \
    && rm -rf /var/lib/apt/lists/*

# --------------------------------------------------
# Install PaddleOCR (Full)
# --------------------------------------------------
RUN pip install "paddleocr[all]"

# --------------------------------------------------
# Install paddlehub
# --------------------------------------------------
RUN pip3 install paddlehub==2.1.0 --upgrade

# --------------------------------------------------
# Clone PaddleOCR Repo
# --------------------------------------------------
WORKDIR /PaddleOCR
RUN git clone https://github.com/PaddlePaddle/PaddleOCR.git .

# --------------------------------------------------
# Download Inference Models (DET + REC + CLS)
# --------------------------------------------------
RUN mkdir -p inference && \
    for model in \
      ch_ppocr_mobile_v2.0_det_infer \
      ch_ppocr_mobile_v2.0_rec_infer \
      ch_ppocr_mobile_v2.0_cls_infer; \
    do \
      wget -q https://paddleocr.bj.bcebos.com/dygraph_v2.0/ch/${model}.tar -O ${model}.tar && \
      tar -xf ${model}.tar -C inference && \
      rm -f ${model}.tar; \
    done

# --------------------------------------------------
# Install HubServing OCR System
# --------------------------------------------------
RUN hub install deploy/hubserving/ocr_system/

# --------------------------------------------------
# Expose Port & Start Server
# --------------------------------------------------
EXPOSE 8868

CMD ["sh", "-c", "hub serving start -m ocr_system && tail -f /dev/null"]
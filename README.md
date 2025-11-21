# 1) poppler utils for PDF->PNG
sudo apt update
sudo apt install -y poppler-utils

# 2) docker (if not installed)
# follow Docker docs; quick method:
sudo apt install -y docker.io
sudo systemctl enable --now docker

# Add your user to docker group (may need re-login)
sudo usermod -aG docker $USER

# 3) Node.js (if not installed). Use Node 18+ (you have Node v22 so OK)
# 4) Optional: Ollama (if later you want to call a local LLM)
# Install ollama per their installer if you want -> https://ollama.com/docs/install

# NOSO-takehome

Run the backend: (ensure it’s on http://localhost:5000) .
lsof -ti :4321 | xargs -r kill

./.venv/bin/flask --app ./apps/api/index.py run --host 0.0.0.0 --port 4321

Run the frontend: npm run dev in apps/web.

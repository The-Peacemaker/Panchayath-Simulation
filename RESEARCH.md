# USELESS PROJECTS 3.0 — Battle Plan

## THE HACKATHON

| Detail | Info |
|---|---|
| **Event** | Useless Projects 3.0 |
| **Organizer** | TinkerHub Foundation (Kerala, 18K+ makers) |
| **Date** | Sep 03, 2026 — 18 hours starting 4:30 AM |
| **Format** | Remote/Anywhere, Invite Only |
| **Team Size** | Solo or max 2 |
| **Attendees** | 1157+ makers |
| **Prize Pool** | Rs 5.5 Lakhs — Top 25 win Young Maker Scholarship (6 months) |
| **Theme** | Community Building |
| **Edition** | 3rd (started 2024) |
| **Website** | https://useless.tinkerhub.org/ |
| **Register** | https://app.tinkerhub.org/ |

---

## WHAT JUDGES ACTUALLY CARE ABOUT

Based on 2 prior editions (2089 makers in v1, 3796 in v2):

1. **Creativity & Originality** — How bold/absurd is the idea? Does it make people go "WHY?"
2. **Clear Documentation** — GitHub repo with good README, process docs
3. **Maker's Learning Journey** — What you learned, not how perfect it is
4. **Courage to Build** — Did you actually build it during the event? (visible GitHub commits)
5. **Interactivity** — Can people play with it? Does it spark joy?

**NOT evaluated on:** Code quality, production-readiness, or solving real problems.

---

## WHAT WINS (Past Winners Analysis)

### Useless Projects v1 (2024)
- **Appam Thinna Mathi, Kuzhiyennanda** — Object detection for appam (Kerala food)
  - Built by: Ashin & Aibel, SJCET Palai
  - Why it won: Absurd premise + working computer vision + cultural humor

- **Malambambu (മലമ്പാമ്പ്)** — Malayalam programming language interpreter
  - Built by: Noel S & Shamil, CUSAT Kuttanad
  - "ഓ. എസ്" makes variables, "പറയൂ" prints, "പാടിക്കൂ" gives tea breaks
  - Why it won: Technical depth + cultural identity + pure comedy

### Useless Projects v2 (2025)
- **CAPTCHA Boss Fight** — Typing game where you fight a robot by solving CAPTCHAs
  - Built by: GGEZ team (Immanuel & Cecil), AIST
  - Pure HTML/CSS/JS, no frameworks — "vanilla power"
  - Why it won: Simple concept, perfect execution, interactive

- **Winner: Young Maker Scholarship** — Top 25 out of 3796 makers

### Pattern: The winning formula is **simple idea + excellent execution + cultural flavor + interactivity**

---

## 5 PROJECT IDEAS

---

### IDEA 1: "ചായ-സ്റ്റോപ്പ്" (ChayaStop)
**Type:** Hardware + Software
**Vibe:** Funny + Interactive + Malayalam + Technically Impressive

#### Concept
A hardware device + web dashboard that tracks your chai intake and physically STOPS you from making more chai.

#### How It Works
1. IR sensor detects when you pick up/fill a cup
2. Raspberry Pi / Arduino counts each cup
3. After crossing your set limit:
   - Servo motor LOCKS the kettle lid
   - Speaker plays dramatic Malayalam voice: "മതി ഇന്ന്, നാളെ കുടിക്ക്!"
   - LED strip flashes red
4. Web dashboard shows real-time stats

#### Tech Stack
- **Hardware:** Arduino/Raspberry Pi + IR sensor + Servo motor + Speaker + LED strip
- **Frontend:** Next.js + Tailwind CSS + Framer Motion
- **Backend:** Python (Flask/FastAPI) for sensor data processing
- **Database:** SQLite or Supabase for stats
- **Communication:** WebSocket for real-time updates

#### Features
- Real-time "Chaya Addiction Level" meter (Malayalam UI)
- Daily/weekly/monthly chai intake graphs
- Leaderboard among friends (who drinks the most?)
- "Emergency Chaya Mode" — override with dramatic countdown
- Voice warnings in Malayalam
- Share stats on social media

#### Team Roles
- **Person A:** Hardware setup (sensors, servo, wiring) + backend
- **Person B:** Frontend dashboard + UI/UX + documentation

#### Why It Wins
- Hardware + software = stands out from purely digital projects
- Physical comedy = instant crowd favorite
- Deeply relatable to Kerala college culture
- Interactive = people can play with it at the showcase

#### Risk Level: MEDIUM (hardware can be tricky to demo remotely)

---

### IDEA 2: "അമ്മ AI" (Amma GPT)
**Type:** AI Chatbot + Voice
**Vibe:** Funny + Interactive + Malayalam + Viral Potential

#### Concept
An AI chatbot that responds to EVERY message exactly like a dramatic Malayalam amma (mother). Type anything, get the most over-the-top maternal response.

#### Examples
- You: "I failed my exam"
  - Amma: "എന്റെ മോനേ... ഞാൻ പറഞ്ഞില്ലേ... നീ പഠിക്കണം എന്ന്... ഇപ്പൊ കാണ്... എന്റെ കഷ്ടം..."
  - (My son... didn't I tell you... you need to study... now look... my poor fate...)

- You: "I'm going out with friends"
  - Amma: "ആരുടെ കൂടെ? എവിടെ? എപ്പോൾ വരും? ഫോൺ എടുക്കണം ഞാൻ വിളിക്കുമ്പോൾ!"
  - (With whom? Where? When will you come back? Answer when I call!)

- You: "I want to buy an iPhone"
  - Amma: "ആഹാ... പണം വീണ്ടും വെള്ളം പോലെ ചെലവാക്കണം... നമ്മുടെ നാട്ടിലെ ഫോൺ മതിയാവില്ലേ?"
  - (Ah... spending money like water again... isn't the phone from our town enough?)

#### Tech Stack
- **Frontend:** Next.js + Tailwind CSS + Framer Motion (chat UI)
- **Backend:** Python (FastAPI)
- **AI:** OpenAI API / local LLM with custom Malayalam amma prompt engineering
- **Voice:** Malayalam TTS (Google TTS / Coqui TTS / ElevenLabs with Malayalam)
- **Database:** Supabase for conversation history
- **Deployment:** Vercel (frontend) + Railway/Render (backend)

#### Features
- Chat interface with dramatic "typing..." indicator
- Voice playback of responses in Malayalam
- "Amma Mood Selector" — Happy Amma, Angry Amma, Disappointed Amma, Proud Amma
- Screenshot-friendly response cards (Instagram story format)
- Share button for WhatsApp/social media
- "Amma vs Papa" mode — compare how Amma responds to same message from different people
- Daily "Amma wisdom" notification

#### Team Roles
- **Person A:** AI/ML — prompt engineering, TTS integration, backend API
- **Person B:** Frontend — chat UI, animations, share cards, documentation

#### Why It Wins
- Mass relatability — EVERYONE has an Amma like this
- Screenshot/viral potential — responses are instant social media content
- Voice feature = next-level interaction
- Technically impressive (LLM + TTS + real-time chat)
- Malayalam cultural depth

#### Risk Level: LOW (purely software, well-understood tech)

---

### IDEA 3: "ക്യാന്റീൻ 3000" (Canteen 3000)
**Type:** Full-stack Web App
**Vibe:** Over-engineered + Interactive + Funny + Malayalam

#### Concept
An absurdly over-engineered college canteen chai ordering system. Every feature that could be simple is made hilariously complex.

#### Features
- **Real-time Order Tracking** with dramatic progress stages:
  - "ചായ ഓർഡർ ചെയ്തു" (Chai ordered)
  - "വെള്ളം തിളയ്ക്കുന്നു" (Water is boiling)
  - "തേയില ചേർക്കുന്നു" (Adding tea leaves)
  - "പാൽ ഒഴിക്കുന്നു" (Pouring milk)
  - "ഏലക്കായ ഇടുന്നു" (Adding cardamom)
  - "ചായ റെഡി! 🎉" (Chai ready!)

- **ML-Based "Mood Chai Recommendation"**
  - Input: your current mood (dropdown with Malayalam options like "വിഷമം", "സന്തോഷം", "ക്ഷീണം")
  - Output: chai type recommendation with dramatic reasoning

- **Live Kitchen Camera** (simulated with animated GIF/video)
  - Shows a 2D animated chai-making process

- **Queue Position with ETA**
  - "നിങ്ങൾക്ക് മുമ്പ് 7 പേർ ഉണ്ട്. ഏകദേശം 12 മിനിറ്റ്." (7 people before you. Approx 12 min.)

- **Dramatic "YOUR CHAI IS READY" Notification**
  - Full-screen celebration animation
  - Thalam/melam music plays
  - Screen shakes
  - Confetti

- **"Chai Personality Quiz"**
  - "ഏത് തരം ചായക്കാരൻ ആണ് നിങ്ങൾ?" (What type of chai person are you?)
  - Results: "ഇഞ്ചി ചായ പ്രേമി" (Ginger chai lover), "പാൽ ചായ രാജാവ്" (Milk chai king), etc.

#### Tech Stack
- **Frontend:** Next.js + Tailwind CSS + Framer Motion + Howler.js (sound)
- **Backend:** Node.js / Python FastAPI
- **Real-time:** Socket.io / WebSockets
- **Database:** Supabase / PostgreSQL
- **Animations:** Lottie / Rive / CSS animations
- **Deployment:** Vercel + Railway

#### Team Roles
- **Person A:** Backend — API, WebSocket server, quiz logic, order simulation
- **Person B:** Frontend — UI, animations, sound design, progress stages, documentation

#### Why It Wins
- Over-engineering a simple thing = peak "useless" energy
- Every interaction is delightful and funny
- Sound + animation = memorable experience
- Interactive quiz = people engage and share
- Malayalam UI throughout

#### Risk Level: LOW (purely software, many parts can be built in parallel)

---

### IDEA 4: "ദൃശ്യം" (Drishyam — The Invisible App)
**Type:** Web App / ARG
**Vibe:** Meta + Mysterious + Interactive + Technically Complex

#### Concept
A beautifully designed app that looks like it should do something incredible (AI, camera, AR) but every feature either does nothing or does the EXACT opposite of what you expect. Hidden beneath the surface is an ARG (Alternate Reality Game) with puzzles, ciphers, and a secret narrative buried in the codebase.

#### Surface Level (What People See)
- Gorgeous, mysterious dark UI with Malayalam text
- Features that seem broken:
  - "AI Photo Scanner" — scans your photo and returns a stock photo of a different person
  - "Mood Detector" — always says "ഉദാസിൻ" (melancholy) regardless of input
  - "Future Predictor" — generates a random Malayalam proverb
  - "Translation Mode" — translates Malayalam to Malayalam (same text back)

#### Hidden Layer (The ARG)
- View source reveals encoded messages in base64/hex
- Console logs contain clues
- Hidden page accessible by typing a specific Malayalam word in the URL
- QR codes in the UI lead to external puzzles
- A hidden "story mode" that unfolds across multiple visits
- The final reveal: the app WAS doing something all along — tracking your interactions to tell you about yourself

#### Tech Stack
- **Frontend:** Next.js + Tailwind CSS + Framer Motion + Three.js (for visual effects)
- **Backend:** Python / Node.js
- **Crypto/Encoding:** Custom cipher system for ARG clues
- **Database:** Supabase for ARG progress tracking
- **Analytics:** Custom tracking for ARG state

#### Features
- Beautiful, mysterious UI with animations
- "Broken" features that are intentionally hilarious
- Hidden puzzle system
- Console-based clues (for technical users)
- Secret pages and routes
- A narrative that unfolds over time
- Final reveal mechanic

#### Team Roles
- **Person A:** Frontend — UI design, animations, hidden routes, visual effects
- **Person B:** Backend — ARG logic, puzzles, cipher system, narrative design, documentation

#### Why It Wins
- Meta-commentary on "useless" apps — the app itself is the joke
- Technical complexity in the hidden layer
- Mystery factor — people will talk about it
- Multiple layers of engagement (casual users + technical explorers)
- Instagram-worthy aesthetics

#### Risk Level: MEDIUM-HIGH (ARG design is complex, needs careful planning)

---

### IDEA 5: "ഓട്ടോ-ജഡ്ജ്" (AutoJudge)
**Type:** AI + Camera + Real-time
**Vibe:** Funny + Interactive + Malayalam + Chaotic

#### Concept
A camera-based app that scans your college environment and dramatically over-explains EVERYTHING it sees as potential hazards, life advice, and Malayalam commentary — like an overly cautious, dramatic commentator narrating your daily life.

#### How It Works
1. Point camera at anything
2. AI detects objects (YOLO/CLIP)
3. Generates dramatic Malayalam commentary for each object:
   - Sees a banana peel: "⚠️ അപകടം! തോല്പിച്ചിട്ടുണ്ട്! അടുത്ത 10 മിനിറ്റ് നടക്കരുത്!" (DANGER! Someone has peeled it! Don't walk for 10 minutes!)
   - Sees a dog: "🐕 നായ! പതുക്കെ നടക്കുക! ഇത് കടിക്കും!" (Dog! Walk slowly! It will bite!)
   - Sees a bicycle: "🚲 സൈക്കിൾ! ഹെൽമെറ്റ് ഇട്ടോ? ഇല്ലെങ്കിൽ അമ്മ തല്ലും!" (Bicycle! Wearing a helmet? If not, Amma will hit!)
   - Sees a person sleeping: "😴 ഉറങ്ങുന്നു! എഴുന്നേൽക്കൂ! ക്ലാസ് തുടങ്ങാറായി!" (Sleeping! Wake up! Class is about to start!)

4. Real-time audio commentary via Malayalam TTS
5. Results screen with "safety score" for your environment

#### Tech Stack
- **Frontend:** Next.js + Tailwind CSS + WebRTC (camera)
- **AI:** YOLOv8 / CLIP for object detection
- **Backend:** Python (FastAPI) for ML inference
- **Voice:** Malayalam TTS for real-time commentary
- **Database:** Supabase for saved scans + commentary history

#### Features
- Real-time camera feed with object detection overlays
- Dramatic Malayalam commentary for each detected object
- "Safety Score" for your environment (always low, always dramatic)
- Historical scan gallery with funny commentary
- "AutoJudge Roast Mode" — goes even more dramatic
- Share scanned images with commentary overlay
- Leaderboard for "most dangerous environment"

#### Team Roles
- **Person A:** AI/ML — object detection, TTS integration, backend
- **Person B:** Frontend — camera UI, overlays, commentary display, animations, documentation

#### Why It Wins
- Real-time AI + camera = technically impressive
- Dramatic commentary = instant comedy
- Interactive = point at anything, get results
- Malayalam voice = next level
- Every scan is unique and shareable

#### Risk Level: MEDIUM (ML inference needs optimization for real-time, camera can be tricky)

---

## COMPARISON MATRIX

| Criteria | ChayaStop | Amma GPT | Canteen 3000 | Drishyam | AutoJudge |
|---|---|---|---|---|---|
| **Funny** | ★★★★★ | ★★★★★ | ★★★★☆ | ★★★☆☆ | ★★★★★ |
| **Tech Impressive** | ★★★★☆ | ★★★★☆ | ★★★☆☆ | ★★★★★ | ★★★★★ |
| **Interactive** | ★★★★☆ | ★★★★★ | ★★★★★ | ★★★★☆ | ★★★★★ |
| **Malayalam** | ★★★★★ | ★★★★★ | ★★★★☆ | ★★★☆☆ | ★★★★★ |
| **Buildable in 18h** | ★★★☆☆ | ★★★★★ | ★★★★★ | ★★★☆☆ | ★★★☆☆ |
| **Demo Wow Factor** | ★★★★★ | ★★★★☆ | ★★★★☆ | ★★★★★ | ★★★★★ |
| **Risk Level** | Medium | Low | Low | Med-High | Medium |

---

## PRE-EVENT CHECKLIST

### Tonight (Before the Event)
- [ ] Register on TinkerHub app: https://app.tinkerhub.org/
- [ ] Create GitHub repo (private) — start committing NOW for activity trail
- [ ] Finalize idea (top 2 preferences)
- [ ] Set up dev environment on both machines
- [ ] Install all dependencies
- [ ] Create project scaffold / boilerplate
- [ ] Set up documentation template (README, process log)
- [ ] Test all APIs / services work
- [ ] Download any offline dependencies
- [ ] Prepare charging cables, snacks, chai supplies
- [ ] Set up communication channel (Discord/WhatsApp call)

### During the Event (18 hours)
- [ ] Opening ceremony (4:30 AM)
- [ ] First commit within 30 minutes (show activity)
- [ ] Build MVP in first 6 hours
- [ ] Polish + add features in next 6 hours
- [ ] Documentation throughout (don't leave for last)
- [ ] Test everything works
- [ ] Record demo video / screenshots
- [ ] Submit before deadline

### Documentation Must-Haves
- [ ] README.md with project description, setup instructions, screenshots
- [ ] GitHub commit history showing work during event
- [ ] Process log (what you built, what you learned)
- [ ] Demo video or screenshots
- [ ] List of technologies used
- [ ] Team contributions breakdown

---

## TEAM ROLE SPLIT (Generic)

### Person A (Tech Lead / Backend)
- Core logic / AI / ML
- API development
- Database setup
- Hardware setup (if applicable)
- Integration

### Person B (Frontend / Design)
- UI/UX design
- Frontend development
- Animations & interactions
- Documentation
- README & presentation
- Screenshots & demo

### Both
- GitHub commits (visible activity trail)
- Testing
- Deployment
- Final polish

---

## USEFUL LINKS

- Event Page: https://tinkerhub.org/events/1M8ORET9A1/useless-projects-3.0
- Official Site: https://useless.tinkerhub.org/
- TinkerHub App: https://app.tinkerhub.org/
- Wiki Guide: https://wiki.tinkerhub.org/activity-book/learning-activity/useless-project
- Sample Projects: https://github.com/tinkerhub/useless-project
- Past Winner Example: https://github.com/ShervinM112/TinkerProject
- Branding Guidelines: (linked in wiki)
- Campus Pitch Deck: https://www.figma.com/slides/xiHKQYd9IWhJ93z5or63Mz/

---

*Compiled: Sep 04, 2026*
*Event: Sep 03, 2026 (tomorrow)*

# Demo Prototype V2 - SaaS Psy
## Design Validation with Partner Psychologists

---

## 🎯 Prototype Objective

Create an **interactive demonstration** of SaaS Psy's essential features to validate design and user flows with our 5 beta tester psychologists **before** full development.

### Guiding Principles
- ✅ **Showable**: Complete and fluid visual interface
- ✅ **Interactive**: Navigable but with hardcoded data
- ✅ **Quick to develop**: Focus on UX, not business logic
- ✅ **Feedback-oriented**: Identifies friction points

### What the prototype IS NOT
- ❌ Functional with real DB
- ❌ Secure (not yet HDS/GDPR compliant)
- ❌ Usable in production with real patients

---

## ✅ MVP Features to Validate

This prototype demonstrates the 6 essential features of SaaS Psy:

1. **Create a patient** with name and email
2. **Select and send scales** (one or multiple at once) via email
3. **Self-administered assessment** by the patient without account creation
4. **Automated results and interpretations** with instant scoring
5. **Results visualization** on the practitioner app
6. **Dashboard** with overview of all patients

---

## 📋 Essential User Flows to Demonstrate

### 1. 🔐 Practitioner Login (30 seconds)
**Objective**: Show simple and professional authentication

**Screen**: Login page
- Email + password fields
- "Sign in" button
- Clean, professional design

**Hardcoded data**:
```
Email: demo@psychologue.fr
Password: demo2025
```

**Design validation**:
- [ ] Does the practitioner find the interface reassuring/professional?
- [ ] Is the login sufficiently simple?

---

### 2. 📊 Practitioner Dashboard (1-2 minutes)
**Objective**: Activity overview

**Screen**: Main dashboard
- Quick statistics (number of active patients, questionnaires in progress)
- Quick access: "Send new questionnaire"
- List of recent assessments

**Hardcoded data**:
- 3 fictional patients (initials only for GDPR)
- 5 recent assessments with varied statuses (completed, in progress, expired)

**Key elements**:
```
- Patient A.M. - BDI-II - Completed on 12/05
- Patient L.D. - STAI - In progress (sent on 12/03)
- Patient J.R. - Liebowitz - Expired
```

**Design validation**:
- [ ] Is essential information visible at a glance?
- [ ] Is navigation to main actions intuitive?
- [ ] Does the dashboard inspire confidence (serious, medical)?

---

### 3. 👤 Create a New Patient (1-2 minutes)
**Objective**: Show the simplicity of adding a patient to the system

**Note**: There are **2 ways** to create a patient:
- **Method 1**: Standalone creation (described here) - useful for preparing patient list
- **Method 2**: Inline creation during sending (see section 4) - to avoid breaking workflow

**Standalone flow**:
1. Click on "+ Add patient" (from dashboard or patient list)
2. Creation form
3. Validation → Patient created and added to list

**Screens**:
- **Screen 1**: Patient creation form
  - **Name/First name**: Text field (or initials if GDPR preference)
  - **Email**: Email field (required for questionnaire sending)
  - **Date of birth**: Optional (for age calculation)
  - **Notes**: Free text field (optional)
  - Buttons: "Cancel" / "Create patient"

- **Screen 2**: Creation confirmation
  - "Patient [Name] successfully created"
  - Options: "Send questionnaire now" or "Back to list"

**Hardcoded data for demo**:
```
Name: Martin Dubois (or M.D.)
Email: patient.demo@example.com
Birth date: 03/15/1990
```

**Design validation**:
- [ ] Is the form sufficiently simple?
- [ ] Are the requested fields relevant/necessary?
- [ ] Are important pieces of information missing?
- [ ] Is the practitioner comfortable with the level of data requested (GDPR)?

---

### 4. ✉️ Send Questionnaire(s) (2-3 minutes)
**Objective**: Demonstrate the simplicity of sending in "2-3 clicks" with the ability to send multiple scales at once

**Main flow**:
1. Click on "Send questionnaire"
2. Select patient (existing OR inline creation of new patient)
3. Choose one OR multiple questionnaires from the 5 available
4. Add personalized message (optional)
5. Validation → Sending confirmation

**Alternative flow - Inline patient creation**:
1. Click on "Send questionnaire"
2. Click on "+ New patient" in selection
3. **Quick creation modal/drawer** opens (without leaving the tunnel)
   - Fields: Name, Email (minimum required)
   - "Create and continue" button
4. Patient is created and **automatically selected**
5. Return to sending flow (questionnaire selection screen)
6. Normal process continues

**Screens**:
- **Screen 1**: Patient selection
  - Dropdown list with existing patients
  - Prominent "+ New patient" option (button or link)
  - Quick search field
  
- **Screen 1bis**: Inline creation modal/drawer (optional)
  - **Title**: "Create a new patient"
  - **Fields**: 
    - Name/First name (or Initials)
    - Email (required)
  - **Buttons**: 
    - "Cancel" (back to selection)
    - "Create and continue" (creates patient and continues flow)
  - **Important note**: This form is **simplified** compared to standalone creation form
    - Only essential fields for immediate sending
    - Details can be completed later
  
- **Screen 2**: Questionnaire(s) selection
  - Visual cards of 5 questionnaires (BDI, STAI, Liebowitz, PCL-5, YBOCS)
  - **Multiple selection possible**: Checkboxes on each card
  - Short description of each scale
  - Assessment duration indication (~5-15 min per scale)
  - Counter: "X questionnaire(s) selected"
  - Information message: "Patient will receive questionnaires in a single email and can complete them in their preferred order"
  - "Continue" button (enabled only if at least 1 questionnaire selected)

- **Screen 3**: Personalization
  - Summary of selected questionnaires
  - Text field for patient message
  - Preview of email to be sent (with X listed questionnaires)
  
- **Screen 4**: Confirmation
  - "X questionnaire(s) successfully sent to A.M."
  - List of sent questionnaires
  - Link to track assessment status

**Use cases to demonstrate**:
- **Scenario A**: Simple sending with existing patient (BDI alone)
- **Scenario B**: Inline creation + multiple sending (new patient → BDI + STAI + PCL-5)
- **Scenario C**: Multiple sending to existing patient (complete assessment)

**Hardcoded data for demo**:
- Existing patient: A.M. (for scenario A)
- New patient created inline: M.D. / martin.dubois@example.com (for scenario B)

**Design validation**:
- [ ] Is the flow really "2-3 clicks"?
- [ ] Is questionnaire(s) selection clear for the practitioner?
- [ ] Is multiple selection intuitive?
- [ ] **Is inline patient creation during sending useful or disruptive?**
- [ ] Are there friction/confusion points?
- [ ] Is the personalized message useful?
- [ ] Does the practitioner see the value of sending multiple scales at once?

---

### 5. 📱 Patient Assessment (3-4 minutes)
**Objective**: Show patient experience (mobile-first)

**Flow**:
1. Patient receives email with unique link
2. Click on link → Assessment page (mobile responsive)
3. Interactive questionnaire (example: BDI with 21 items)
4. Validation → Submission confirmation

**Screens**:
- **Screen 1**: Patient welcome
  - Welcome message from practitioner
  - Questionnaire presentation
  - Time estimate (~10 min)
  - "Start" button

- **Screen 2**: Interactive questionnaire
  - Questions displayed one by one OR in groups of 5
  - Clear answer choices (radio buttons or visual scale)
  - Progress bar
  - Navigation: "Previous" / "Next"

- **Screen 3**: Final validation
  - Summary "You answered 21 questions"
  - "Send my answers" button
  - Confidentiality message

- **Screen 4**: Confirmation
  - "Your answers have been sent"
  - "Your psychologist will receive the results"
  - Reassuring, empathetic design

**Hardcoded data**:
- Complete BDI questionnaire (21 items)
- Pre-filled answers for quick demo

**Design validation**:
- [ ] Is the mobile interface pleasant and readable?
- [ ] Is navigation between questions smooth?
- [ ] Does the patient understand their progress?
- [ ] Is the tone/design reassuring for a patient in vulnerable state?

---

### 6. 📈 Results and Interpretation (2-3 minutes)
**Objective**: Demonstrate main added value (auto scoring + interpretation)

**Flow**:
1. Practitioner accesses results from dashboard
2. Score visualization + automatic interpretation
3. Access to longitudinal history

**Screens**:
- **Screen 1**: Score view
  - Raw score (e.g.: BDI = 24/63)
  - Category (e.g.: "Moderate depression")
  - Visual graph (gauge or bar)
  
- **Screen 2**: Detailed interpretation
  - Score explanatory text
  - Points of attention (high-scoring items)
  - Clinical suggestions (optional, based on feedback)

- **Screen 3**: Longitudinal history
  - Graph showing score evolution over time
  - Comparison between multiple assessments
  - PDF export (visible but non-functional button)

**Hardcoded data**:
- 3 BDI assessments for same patient over 3 months
  - T0: 28/63 (moderate depression)
  - T1: 22/63 (mild depression)
  - T2: 16/63 (minimal depression)

**Design validation**:
- [ ] Is automatic interpretation relevant/useful?
- [ ] Is results presentation format clear?
- [ ] Is longitudinal history valuable?
- [ ] Are there critical missing pieces of information?

---

### 7. 👥 Patient Management (1-2 minutes)
**Objective**: Show how practitioners manage their patient list

**Screen**: Patient list
- Table with columns: Initials, Age, Last assessment, Number of assessments
- Quick search
- "+ Add patient" button
- Click on patient → Patient detail

**Patient detail screen**:
- Basic information (initials, pseudo-ID)
- History of all assessments
- Evolution graphs by questionnaire
- Quick actions: "Send questionnaire", "View details"

**Hardcoded data**:
- 5 fictional patients with varied histories

**Design validation**:
- [ ] Is the list sufficiently clear?
- [ ] Is displayed information relevant?
- [ ] Is navigation to a patient intuitive?

---

## 🛠️ Prototype Technical Stack

### Recommended Approach: "Demo-First"

#### Option A: Next.js with static data (RECOMMENDED)
- **Next.js 15** (App Router)
- **TailwindCSS + shadcn/ui** (quick and pro components)
- **Hardcoded data** in local JSON files
- **No real DB** (no Prisma for proto)
- **No real auth** (auto-login with useEffect)

**Advantages**:
- Rapid development (2-3 days)
- Easy to deploy (Vercel)
- Quickly modifiable based on feedback
- Reusable for final version

**Key UI components** (shadcn/ui):
- Dialog/Modal for inline patient creation
- Select/Combobox for patient selection
- Checkbox for multiple questionnaire selection
- Form with basic validation

#### Option B: Figma + Interactive prototype
- Complete design in Figma
- Clickable prototype with transitions
- **Advantages**: Even faster if design already done
- **Disadvantages**: Less "real", interactivity limits

---

## 📦 Next.js Prototype Structure

```
prototype-v2/
├── app/
│   ├── (auth)/
│   │   └── login/              # Login page
│   ├── (dashboard)/
│   │   ├── dashboard/          # Main dashboard
│   │   ├── questionnaires/     # Questionnaire management
│   │   │   └── send/          # Sending flow
│   │   ├── patients/          # Patient management
│   │   └── results/           # Results & history
│   └── (patient)/
│       └── questionnaire/
│           └── [token]/       # Patient assessment
├── components/
│   ├── dashboard/             # Dashboard components
│   ├── questionnaires/        # Questionnaire components
│   └── ui/                    # shadcn/ui components
├── data/
│   ├── patients.json          # Hardcoded patient data
│   ├── sessions.json          # Assessment data
│   └── questionnaires.json    # Questionnaire data
└── lib/
    └── utils.ts               # Utilities
```

---

## 📊 Hardcoded Data to Prepare

### File `data/patients.json`
```json
[
  {
    "id": "p1",
    "initials": "A.M.",
    "age": 34,
    "created_at": "2024-11-15",
    "sessions_count": 3
  },
  {
    "id": "p2",
    "initials": "L.D.",
    "age": 28,
    "created_at": "2024-12-01",
    "sessions_count": 1
  }
]
```

### File `data/questionnaires.json`
```json
[
  {
    "id": "bdi",
    "name": "BDI-II",
    "full_name": "Beck Depression Inventory",
    "description": "Assesses severity of depressive symptoms",
    "duration": "10 min",
    "items_count": 21,
    "category": "Depression"
  },
  {
    "id": "stai",
    "name": "STAI",
    "full_name": "State-Trait Anxiety Inventory",
    "description": "Measures state and trait anxiety",
    "duration": "10-15 min",
    "items_count": 40,
    "category": "Anxiety"
  }
]
```

### File `data/sessions.json`
```json
[
  {
    "id": "s1",
    "patient_id": "p1",
    "questionnaire_id": "bdi",
    "status": "completed",
    "score": 24,
    "interpretation": "Moderate depression",
    "sent_at": "2024-12-05T10:00:00Z",
    "completed_at": "2024-12-05T14:30:00Z",
    "batch_id": null
  },
  {
    "id": "s2",
    "patient_id": "p2",
    "questionnaire_id": "bdi",
    "status": "completed",
    "score": 18,
    "interpretation": "Mild depression",
    "sent_at": "2024-12-03T09:00:00Z",
    "completed_at": "2024-12-03T16:45:00Z",
    "batch_id": "batch_001"
  },
  {
    "id": "s3",
    "patient_id": "p2",
    "questionnaire_id": "stai",
    "status": "completed",
    "score": 52,
    "interpretation": "Moderate anxiety",
    "sent_at": "2024-12-03T09:00:00Z",
    "completed_at": "2024-12-03T17:15:00Z",
    "batch_id": "batch_001"
  },
  {
    "id": "s4",
    "patient_id": "p2",
    "questionnaire_id": "pcl5",
    "status": "in_progress",
    "score": null,
    "interpretation": null,
    "sent_at": "2024-12-03T09:00:00Z",
    "completed_at": null,
    "batch_id": "batch_001"
  }
]
```
**Note**: `batch_id` identifies questionnaires sent together in the same email

### File `data/bdi-items.json`
```json
[
  {
    "id": 1,
    "question": "Sadness",
    "options": [
      { "value": 0, "label": "I do not feel sad" },
      { "value": 1, "label": "I feel sad much of the time" },
      { "value": 2, "label": "I am sad all the time" },
      { "value": 3, "label": "I am so sad or unhappy that I can't stand it" }
    ]
  }
  // ... 20 other items
]
```

---

## 🎨 Design Guidelines

### Color Palette
- **Primary**: Calming blue (#3B82F6 or similar)
- **Secondary**: Trust green (#10B981)
- **Danger**: Soft red (#EF4444)
- **Neutral**: Grays (#F3F4F6, #9CA3AF)

### Tone & Voice
- **For practitioner**: Professional, efficient, precise
- **For patient**: Empathetic, reassuring, caring

### Responsive
- **Desktop**: 1440×900px (practitioner priority)
- **Mobile**: 375×812px (patient priority)

---

## ✅ Development Checklist

### Week 1: Setup & Main Pages
- [ ] Initialize Next.js 15 project
- [ ] Install TailwindCSS + shadcn/ui
- [ ] Create folder structure
- [ ] Prepare hardcoded JSON data
- [ ] Login page (simple, auto-login)
- [ ] Main dashboard (with hardcoded stats)

### Week 2: Essential User Flows
- [ ] Standalone patient creation flow (form + confirmation)
- [ ] Inline patient creation modal/drawer (simplified version)
- [ ] Questionnaire sending flow with single selection (1 scale)
- [ ] Questionnaire sending flow with multiple selection (several scales)
- [ ] Complete flow: Inline creation → Multiple sending (scenario B)
- [ ] Patient list page
- [ ] Patient detail page
- [ ] Patient assessment interface (mobile-first)
- [ ] Results page with interpretation

### Week 3: Polish & Demo Preparation
- [ ] Smooth navigation between all pages
- [ ] Add transition animations
- [ ] Test on real mobile device
- [ ] Prepare demo script
- [ ] Vercel hosting

---

## 🧪 Demonstration Script (15 min max)

### Introduction (1 min)
"Hello, I'm going to show you how SaaS Psy works in real conditions. Feel free to interrupt me at any time to ask questions or give your impressions."

### 1. Login + Dashboard (2 min)
- Show quick login
- Present dashboard: "Here's your daily overview"
- Point out key elements

### 2. Create a new patient (2 min)
- "Let's imagine a new patient arrives at your practice"
- Click on "+ Add patient"
- Fill form: name, email
- **Feedback pause**: "Is this information sufficient? Is anything missing?"

### 3. Send questionnaires (4 min)
- **Case 1**: "Let's imagine you have a new patient who just arrived"
- Start sending flow
- Click on "+ New patient" in selection
- Quickly fill name + email in modal
- Continue directly with questionnaire selection
- **Feedback pause**: "What do you think of this ability to create a patient on the fly without leaving the sending process?"
- **Case 2**: "Now for an existing patient with complete assessment"
- Show selection of 3 questionnaires at once (BDI + STAI + PCL-5)
- **Feedback pause**: "Do you see the value of sending multiple scales at once?"

### 4. Patient experience (3 min)
- Switch to mobile view
- "Here's what your patient receives and sees"
- Show 3-4 BDI questions
- Show that patient can switch between questionnaires
- **Feedback pause**: "Does the patient interface seem appropriate to you?"

### 5. Results consultation (3 min)
- Return to practitioner view
- Show score + interpretation
- Display longitudinal history
- **Feedback pause**: "Is this information useful in your practice?"

### 6. Patient management (1 min)
- Show patient list
- Access patient detail
- **Feedback pause**: "What additional information would you like to see?"

### Conclusion & Questions (1 min)
"Do you have any general questions or comments?"

---

## 📝 Validation Grid with Beta Testers

### Questions to Ask After Each Flow

#### Dashboard
1. Is displayed information relevant?
2. What would you like to see more/less of?
3. Is navigation intuitive?

#### Patient creation
1. Is the form sufficiently simple?
2. Are the requested fields (name, email) sufficient?
3. Are important pieces of information missing to collect?
4. Are you comfortable with the level of data requested (GDPR)?

#### Questionnaire sending
1. Is the process really "simple in 2-3 clicks"?
2. Are there confusing steps?
3. Is multiple questionnaire selection intuitive?
4. Do you see the value of sending multiple scales at once?
5. **Is inline patient creation during sending useful or disruptive?**
6. Is the personalized message useful?
7. Are options missing?

#### Patient assessment
1. Is the mobile interface clear and pleasant?
2. Is the tone appropriate for your patients?
3. Is navigation between questions smooth?
4. Would your patients understand easily?

#### Results
1. Is automatic interpretation relevant?
2. Is the presentation format clear?
3. Are clinical pieces of information missing?
4. Is longitudinal history useful?

#### General
1. What do you like most?
2. What holds you back/worries you?
3. Would you use this tool as is?
4. What missing features are critical?

---

## 🚀 Action Plan

### Phase 1: Prototype Development (1-2 weeks)
- [ ] Develop Next.js prototype with hardcoded data
- [ ] Test internally (co-founders)
- [ ] Deploy on Vercel

### Phase 2: Validation Sessions (1 week)
- [ ] Schedule 5 30-minute sessions with each psy beta tester
- [ ] Record sessions (with consent)
- [ ] Take detailed notes

### Phase 3: Synthesis & Adjustments (3-5 days)
- [ ] Compile all feedback
- [ ] Identify patterns/recurring requests
- [ ] Prioritize critical adjustments
- [ ] Iterate on design if necessary

### Phase 4: Go/No-Go for Full Development
- [ ] Decide if design validated → move to full dev
- [ ] Or → iterate prototype and re-validate

---

## 🎯 Success Criteria

### Design Validation = GO if:
- ✅ At least 4/5 psy betas find interface intuitive
- ✅ No major friction point identified
- ✅ Psys confirm it solves their problem
- ✅ Psys are enthusiastic about testing in real conditions

### Red Flags = NO-GO if:
- ❌ Major confusion on main flow
- ❌ Patient interface deemed inappropriate/anxiety-inducing
- ❌ Critical missing feature identified
- ❌ General lack of enthusiasm

---

## 📞 Contacts & Follow-up

### Beta Testers to Contact
1. **Partner psychologist** (tested V1 with 5 scales)
2. **CBT psychologist** (confirmed time problem)
3. **ACT/neuro psychologist** (uses homemade Excel)
4. **Psy #4** (to identify)
5. **Psy #5** (to identify)

### Demo Invitation Email Template
```
Subject: SaaS Psy - V2 Prototype Demo (30 min)

Hello [Name],

We've finalized the SaaS Psy V2 prototype and I'd really like your feedback before moving to full development.

It's a 30-minute interactive demo where I show you the main features:
- Sending questionnaires
- Patient experience (mobile)
- Automatic results + interpretation
- Longitudinal tracking

Your opinion is valuable to refine the design and ensure the tool truly meets your daily needs.

Would you be available for a Zoom call this week or next week?

Thanks in advance,
[First name]
```

---

## 🔄 After Validation

Once design validated with the 5 beta testers:

### Next Steps
1. **Compile feedback document** (insights, quotes, requests)
2. **Prioritize features** (Must-have vs Nice-to-have)
3. **Adjust Roadmap** if necessary
4. **Launch secure V2 development** with real DB, auth, GDPR
5. **Plan real conditions testing phase** (with real patients)

---

**Build in public** 🚀 This prototype is a key step in our product validation process.

# Freemium Strategy - Melya

Business model and gating strategy for the Melya platform.

---

## Business Model Overview

### Free Tier
- **Limit**: 5 patients maximum
- **Features**: Full access to all features within the patient limit
- **Duration**: Unlimited (no trial period)

### Premium Tier
- Unlimited patients
- (Future: additional premium-only features TBD)

---

## Progressive Gating Strategy

### Philosophy
Let users experience the product value before requiring commitment. The signup/upgrade wall appears only when technically necessary, not as an artificial barrier.

### Two-Gate System

| Gate Type | Trigger | User Action | Modal Message |
|-----------|---------|-------------|---------------|
| **Auth Gate** | Any data creation | Create patient, Send scale | "Create an account to save your data" |
| **Premium Gate** | Free tier limit reached | 6th patient creation | "Upgrade to Premium for unlimited patients" |

---

## User Journey

### 1. Anonymous Exploration (No Account)
Users can freely:
- Browse the app interface
- View the complete scales library
- See scale details and descriptions
- Explore all UI features
- Understand the product value

Users **cannot**:
- Create a patient
- Send a scale
- Store any data

### 2. Auth Gate (Account Required)
Signup modal triggered when user attempts to:
- Create a patient
- Send a scale to a patient
- Any action that would store data

**Key principle**: No patient data is ever stored without an account. This ensures:
- GDPR/HDS compliance from the start
- Clear data ownership
- Audit trail integrity

### 3. Free Tier Usage (Authenticated)
After signup, users can:
- Create up to 5 patients
- Send unlimited scales to those patients
- Access full scoring and interpretation
- View longitudinal history

### 4. Premium Gate (Upgrade Required)
Upgrade modal triggered when:
- User tries to create 6th patient
- User accesses premium-only features (future)

**UX approach**: Soft warning at 4/5 patients, hard gate at 6th attempt.

---

## Implementation Notes

### Auth Gate Modal
- Appears over current page (don't lose user context)
- Clear value proposition
- Quick signup form (email + password minimum)
- Option to sign in if already has account

### Premium Gate Modal
- Shows current usage (5/5 patients)
- Clear upgrade CTA
- Pricing information
- Option to manage existing patients (delete to make room)

### Technical Boundaries

```
Anonymous User
    │
    ├── CAN: Browse, View scales, Navigate UI
    │
    └── CANNOT: Create patient, Send scale
                    │
                    ▼
              [Auth Gate Modal]
                    │
                    ▼
Authenticated Free User
    │
    ├── CAN: Full features, up to 5 patients
    │
    └── CANNOT: 6th patient
                    │
                    ▼
              [Premium Gate Modal]
                    │
                    ▼
Premium User
    │
    └── CAN: Unlimited patients, all features
```

---

## Marketing Rationale

### Why this approach?

1. **Reduces friction**: Users evaluate the product before committing
2. **Builds trust**: Psychologists see the UI quality and professionalism first
3. **Zero compliance risk**: No sensitive data without proper account
4. **Natural conversion**: Users who hit the limit are already invested
5. **Word of mouth**: Happy free users recommend to colleagues

### Target conversion points
- Anonymous → Signed up: When they have a real patient to add
- Free → Premium: When practice grows beyond 5 patients

---

## Future Considerations

- Premium-only scales (licensed/specialized)
- Team features (multi-practitioner practices)
- Advanced analytics as premium feature
- White-label options for institutions

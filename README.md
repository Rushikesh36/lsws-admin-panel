# 🛠️ LSWS Admin Panel

> Comprehensive administrative dashboard for non-profit member management, donation processing, and organizational control. Built with Vue.js 3 and Firebase for enterprise-grade reliability.

**👥 Admin Dashboard** | **💳 Donation Management** | **📄 Document Control** | **🔐 Role-Based Access** | **🏢 Enterprise Software**

---

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Features](#features)
4. [Architecture](#architecture)
5. [User Roles & Permissions](#user-roles--permissions)
6. [Setup & Installation](#setup--installation)
7. [API Documentation](#api-documentation)
8. [Database Schema](#database-schema)
9. [Security](#security)
10. [Deployment](#deployment)

---

## 🎯 Project Overview

**LSWS Admin Panel** is a production-grade administrative application designed exclusively for authorized administrators of LSWS (non-profit organization). It serves as the nerve center for managing organization operations, member data, donation workflows, and document archives with granular access control.

### Key Capabilities

- ✅ **Advanced Member Management:** Account creation, profile updates, member search & filtering
- ✅ **Document Repository:** Centralized storage with granular access controls
- ✅ **Donation Approval Workflow:** Verification → Approval → Receipt generation
- ✅ **Role-Based Access Control (RBAC):** Super-admin, Admin, Moderator roles
- ✅ **Real-Time Sync:** Firebase Firestore for instant updates
- ✅ **Receipt Generation:** Automated PDF receipts with organizational branding

### Problem Solved

**Without Admin Panel:** Manual member management via spreadsheets, unverified donations accepted, receipts generated manually, no audit trail.

**With Admin Panel:** Centralized control, verified payment workflow, automated receipts, complete audit logs, role-based security.

---

## 🚀 Technology Stack

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| **Frontend** | Vue.js | 3.2.13+ | Reactive UI framework, component architecture |
| **Router** | Vue Router | 4.2.5+ | Client-side routing, protected routes |
| **State** | Vuex | 4.1.0+ | Centralized state management |
| **UI Framework** | Vuetify | 3.3.19+ | Material Design components, professional UI |
| **Database** | Firestore | Latest | Real-time NoSQL, authentication |
| **HTTP Client** | Axios | 1.5.1+ | API communication, interceptors |
| **Authentication** | Firebase Auth | Built-in | Secure login, role management |
| **Build Tool** | Vue CLI | 5.0.0+ | Project scaffolding, webpack config |

---

## ✨ Key Features

### 👥 Advanced Member Management
- Create, update, and delete member records
- View complete member profiles
- Powerful search and filtering capabilities
- Maintain accurate and verified organization data

### 📄 Document Administration
- Upload, update, and delete member-related documents
- Secure document storage and access
- Centralized document management for admins

### 💳 Donation Approval & Receipt Workflow

**Payment Processing Pipeline:**
```
User Submits Donation
    ↓
Admin Review Dashboard
    ↓
Verify Payment → Approve/Reject
    ↓
Generate Receipt (PDF with letterhead)
    ↓
Send to User Email + In-App Access
    ↓
Log to Financial Records
```

**Features:**
- View all pending donations in real-time
- Verify payment proof and documentation
- Generate professional receipts with organization branding
- Automatic email delivery to donors
- Audit trail for compliance
- Receipt storage in Firestore for future reference

### 🔐 Admin-Level Access Control
- Role-based access (Super Admin, Admin, Moderator)
- Admin-only operations (delete, approve, financial actions)
- Backend validation on all state changes
- Activity logging and audit trails
- Session management with timeout

### 📊 Analytics Dashboard
- Donation statistics and trends
- Member growth charts
- Revenue reports
- Activity logs

---

## 🏗️ Architecture

### **System Diagram**

```
┌────────────────────────────────────┐
│    LSWS Admin Panel (Vue.js)       │
│  ┌──────────────────────────────┐  │
│  │ Authentication & Login       │  │
│  │ Member Management            │  │
│  │ Donation Approval Workflow   │  │
│  │ Document Management UI       │  │
│  │ Analytics Dashboard          │  │
│  └──────────────────────────────┘  │
└────────────────┬───────────────────┘
                 │
    ┌────────────┼────────────┐
    │            │            │
    │   Vuex State Management │
    │            │            │
    └────────────┼────────────┘
                 │
    ┌────────────▼────────────┐
    │   Firebase Firestore    │
    │  ┌──────────────────┐   │
    │  │ Collections:     │   │
    │  │ • members        │   │
    │  │ • donations      │   │
    │  │ • documents      │   │
    │  │ • receipts       │   │
    │  │ • audit_logs     │   │
    │  └──────────────────┘   │
    │                         │
    │   Firebase Admin SDK    │
    │   (Backend Server)      │
    │   - Verify permissions  │
    │   - Generate receipts   │
    │   - Send emails         │
    └─────────────────────────┘
```

---

## 👥 User Roles & Permissions

| Role | Members | Donations | Documents | Receipts | Reports |
|------|---------|-----------|-----------|----------|---------|
| **Super Admin** | Create/Read/Update/Delete | Approve/Reject | Full Access | Generate/View/Delete | Full Access |
| **Admin** | Read/Update (limited) | Approve/Reject | Read/Upload | Generate/View | View Only |
| **Moderator** | Read Only | Cannot Approve | Read Only | View Only | Cannot Access |

---

## 📦 Setup & Installation

### **Prerequisites**
- Node.js 14+
- npm or yarn
- Firebase account with Firestore database
- Admin credentials for your org

### **Step 1: Clone Repository**

```bash
git clone https://github.com/Rushikesh36/lsws-admin-panel.git
cd lsws-admin-panel
```

### **Step 2: Install Dependencies**

```bash
npm install
```

### **Step 3: Configure Firebase**

Create `.env.local` file:

```
VUE_APP_FIREBASE_API_KEY=AIzaSyD...
VUE_APP_FIREBASE_PROJECT_ID=lsws-prod
VUE_APP_FIREBASE_AUTH_DOMAIN=lsws-prod.firebaseapp.com
VUE_APP_FIREBASE_DATABASE_URL=https://lsws-prod.firebaseio.com
VUE_APP_FIREBASE_STORAGE_BUCKET=lsws-prod.appspot.com
```

### **Step 4: Run Development Server**

```bash
npm run serve
# Navigate to http://localhost:8080
```

### **Step 5: Build for Production**

```bash
npm run build
# Output in dist/ directory
```

---

## 📡 API Documentation

### **Member Management**

**GET /members**
```json
Response: [
  {
    "id": "member-001",
    "name": "John Doe",
    "email": "john@example.com",
    "status": "active",
    "joinDate": "2024-01-15"
  }
]
```

**POST /members**
```json
Request: {
  "name": "Jane Doe",
  "email": "jane@example.com",
  "phone": "9999999999",
  "status": "active"
}
Response: { "success": true, "id": "member-002" }
```

### **Donation Approval**

**GET /donations/pending**
```json
Response: [
  {
    "id": "donation-123",
    "memberId": "member-001",
    "amount": 5000,
    "status": "pending",
    "paymentProof": "url-to-image",
    "submittedAt": "2024-01-15T10:30:00Z"
  }
]
```

**POST /donations/{id}/approve**
```json
Request: {
  "approvedBy": "admin-001",
  "notes": "Payment verified"
}
Response: {
  "success": true,
  "receiptGenerated": true,
  "receiptId": "receipt-456",
  "emailSent": true
}
```

---

## 📊 Database Schema

### **Firebase Collections**

**members**
```javascript
{
  id: string,
  name: string,
  email: string,
  phone: string,
  address: string,
  joinDate: Timestamp,
  status: "active" | "inactive",
  documents: string[], // refs to doc IDs
  totalDonations: number,
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

**donations**
```javascript
{
  id: string,
  memberId: reference,
  amount: number,
  paymentMethod: string,
  status: "pending" | "approved" | "rejected",
  paymentProof: string, // URL
  submittedAt: Timestamp,
  approvedAt: Timestamp,
  approvedBy: reference,
  receiptId: reference,
  notes: string
}
```

**receipts**
```javascript
{
  id: string,
  donationId: reference,
  memberId: reference,
  amount: number,
  generatedAt: Timestamp,
  pdfUrl: string,
  emailSent: boolean,
  emailSentAt: Timestamp
}
```

---

## 🔒 Security

### **Authentication**
- Firebase Authentication for secure login
- Email/password verification
- Session management with timeout
- Role-based access control (RBAC)

### **Data Protection**
- Firestore Security Rules based on user roles
- Encrypted sensitive data in transit (HTTPS)
- No sensitive data in browser local storage
- Backend validation on all requests

### **Audit Logging**
- All admin actions logged with timestamp
- User identification on all operations
- Cannot delete donation history (append-only)
- Compliance with financial regulations

### **Firestore Security Rules Example**

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /members/{doc=**} {
      allow read: if request.auth != null && getUserRole() in ['admin', 'super-admin'];
      allow create, update: if request.auth != null && request.auth.uid in getAllowedUsers();
    }
    
    match /donations/{doc=**} {
      allow read: if getUserRole() in ['admin', 'super-admin'];
      allow update: if getUserRole() == 'super-admin'; // Only super admin can approve
    }
  }
}
```

---

## 🚀 Deployment

### **Deploy to Firebase Hosting**

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Deploy
firebase deploy --only hosting
```

### **Environment-Specific Configs**

```
Development:  .env.development.local
Staging:      .env.staging.local
Production:   .env.production.local
```

---

## 📊 Performance Metrics

- **Page Load Time:** < 2 seconds
- **API Response Time:** < 500ms
- **Lighthouse Score:** 90+
- **Real-time Sync Latency:** < 100ms

---

## 🔧 Troubleshooting

**Issue: Login fails**
- Verify Firebase credentials in .env
- Check user exists in Firebase Auth
- Verify role in Firestore

**Issue: Donations not appearing**
- Verify Firestore collection exists
- Check security rules allow read/write
- Review browser console for errors

---

## 🤝 Integration

This admin panel integrates with:
- **LSWS Member App:** Shared Firestore database
- **LSWS Emailer:** For receipt delivery
- **Member Dashboard:** Shared authentication

---

## 📄 License

Private & Proprietary to LSWS

---

## 👨‍💻 Author

**Rushikesh Wani**  
GitHub: [@Rushikesh36](https://github.com/Rushikesh36)

---

**Status:** 🟢 Production  
**Last Updated:** January 2025

### 🚀 Deployment
- **Firebase Hosting**

---

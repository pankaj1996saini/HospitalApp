# Hospital Management App

A React Native mobile application built with Expo Router for managing patient and doctor records at City Hospital.

## Project Description

This app helps hospital staff manage patient admissions, view doctor assignments, search patient records, and monitor hospital statistics through a clean dashboard interface.

## Features

- 📊 **Dashboard** — total patients, doctor-wise patient count with bar chart, recently admitted list
- 🏥 **Patient List** — searchable FlatList with card layout, pull-to-refresh, delete support
- 👨‍⚕️ **Doctors Screen** — all doctors with specialization and assigned patients
- ➕ **Add Patient** — form with full validation (name, age, disease, doctor, date)
- 🔍 **Search** — real-time search by name, disease or patient ID
- 🗑️ **Remove Patient** — from list or detail screen with confirmation alert
- 📋 **Patient Detail** — full record view
- 🔄 **Pull-to-Refresh** — on Home and Patients screens
- 🧭 **Bottom Tab Navigation** — Home, Patients, Doctors, Add tabs with icons

## Screens

| Screen | Description |
|---|---|
| Home | Dashboard with stats, doctor-wise chart, recent admissions |
| Patients | Full list with search and delete |
| Doctors | Doctor cards with assigned patient chips |
| Add Patient | Form with validation |
| Detail | Full patient profile with remove option |

## Tech Stack

- React Native + Expo SDK
- Expo Router (file-based navigation)
- TypeScript
- React Context API (state management)
- @expo/vector-icons (Ionicons)

## Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/pankaj1996saini/HospitalApp.git
   cd HospitalApp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the app**
   ```bash
   npx expo start
   ```

4. **Run on Android**
   - Press `a` for Android emulator
   - Or scan QR with Expo Go on your phone

## Project Structure

```
HospitalApp/
├── app/
│   ├── _layout.tsx
│   ├── detail.tsx
│   └── (tabs)/
│       ├── _layout.tsx
│       ├── index.tsx
│       ├── patients.tsx
│       ├── doctors.tsx
│       └── add.tsx
├── store/
│   └── hospitalStore.tsx
└── README.md
```


## Developer

**Pankaj Saini**

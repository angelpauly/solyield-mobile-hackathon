SolYield is a high-performance mobile platform designed for solar technicians to manage field operations with precision. The app bridges the gap between field maintenance and data analytics by providing a seamless workflow—from schedule management and GPS-verified check-ins to the generation of professional, data-driven performance reports.


Core Features

1.📅 Intelligent Agenda Management
Technicians can view their entire day at a glance through the "My Agenda" screen. This feature provides a unified view of assigned tasks, such as Routine Inspections and Preventive Maintenance, categorized by site location and real-time status.


![WhatsApp Image 2026-02-26 at 12 31 57 AM](https://github.com/user-attachments/assets/56839bee-3295-4c82-9f8f-11d1b3ae2bba)

2. 📍 GPS-Verified Check-ins
To ensure data integrity and technician safety, SolYield utilizes Geofencing Technology. Technicians are required to verify their location via a 500m GPS radius check before they can unlock field inspection forms, ensuring all reports are generated physically on-site.

![WhatsApp Image 2026-02-26 at 12 31 57 AM (1)](https://github.com/user-attachments/assets/a94df4d1-6dda-440a-b986-cb463a3761b4)



![WhatsApp Image 2026-02-26 at 12 31 57 AM (2)](https://github.com/user-attachments/assets/b4f89609-cab3-4a46-abf8-66ef3923712a)

3. 🗺️ Precision Site Navigation
Navigating to remote solar farms is simplified through Native Map Integration. Technicians can interact with native site markers to view coordinates and site-specific metadata. With a single tap, the app deep-links into native navigation tools for turn-by-turn directions.

![WhatsApp Image 2026-02-26 at 12 31 58 AM](https://github.com/user-attachments/assets/1fc07d15-425e-4c06-8ee8-b95913416834)

4. 📊 Analytics & PDF Reporting
The cornerstone of SolYield is its advanced reporting engine. Upon completing an inspection, the app processes raw performance data into a high-fidelity PDF "Report Card".

Daily Generation Analytics: A dynamic bar chart comparing real-time output against benchmarks.

Performance Health Index: Comprehensive analytics derived from live voltage and efficiency readings.

Digital Evidence: High-resolution site photos can be captured and embedded directly into the report for tamper-proof documentation.


![WhatsApp Image 2026-02-26 at 12 31 05 AM](https://github.com/user-attachments/assets/cf58f92e-dbbf-448d-8365-120a47c6db9d)



![WhatsApp Image 2026-02-26 at 12 31 58 AM (1)](https://github.com/user-attachments/assets/aaa75e8a-3fe1-427e-a8af-e73303d79f95)



![WhatsApp Image 2026-02-26 at 12 31 58 AM (2)](https://github.com/user-attachments/assets/ecd42c41-1e10-4501-9ea8-c208340403bb)


solyield-app/
├── assets/             
├── src/                
│   ├── data/           
│   │   ├── schedule.ts   
│   │   └── sites.ts       
│   ├── navigation/     
│   │   └── AppNavigator.tsx
│   ├── screens/       
│   │   ├── AgendaScreen.tsx   
│   │   ├── CheckInScreen.tsx   
│   │   ├── DashboardScreen.tsx
│   │   ├── MapScreen.tsx       
│   │   └── ReportScreen.tsx   
│   ├── theme/         
│   │   └── colors.ts     
│   ├── types/         
│   │   ├── report.ts  
│   │   ├── site.ts   
│   │   └── visit.ts 
│   └──  utils/         
│       ├── geoUtils.ts    
│       ├── reportStorage.ts 
│       └── storage.ts     
├── .gitignore             
├── app.json               
├── App.tsx                
├── index.ts              
├── package-lock.json      
├── README.md              
└── tsconfig.json         


Core Technology Stack

Mobile Framework: React Native with Expo

Programming Language: TypeScript for type-safe development

Navigation: React Navigation (Stack)

Maps & Location: react-native-maps and expo-location

Data Visualization: react-native-chart-kit for dynamic analytics

Reporting Engine: expo-print (PDF) and expo-sharing

Storage: AsyncStorage for offline-first report persistence

Image Handling: expo-image-picker and expo-file-system (Base64)




⚙️ Development Setup

Follow these steps to set up the local development environment and run the application.

1. Clone the Repository

git clone https://github.com/angel/solyield-app.git
cd solyield-app


2. Install Dependencies

npm install


3. Launch the Application


npx expo start


4. View on Mobile

Download the Expo Go app on your Android or iOS device.



npx expo start


Scan QR Code: Use the Expo Go app on your mobile device to view the live application.

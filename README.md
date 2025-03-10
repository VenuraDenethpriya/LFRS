# **Lost & Found Reporting System**  
🚀 **MERN Stack Web System for Sri Lankan Police**  

## **📌 Overview**  
This project is a **MERN stack-based web system** designed to enhance the Sri Lankan police's efficiency in handling lost item reports. The system offers a **user-friendly interface, APIs, business logic, and a structured database**, aiming to **streamline report management, enhance communication, and boost operational transparency**.  

## **🔹 Features**  
✅ **User-friendly UI** – Simplified reporting and tracking of lost items  
✅ **Role-based access** – Secure authentication for police officers and users  
✅ **Report tracking** – Status updates and notifications for reported items  
✅ **API integration** – RESTful APIs for seamless data flow  
✅ **Database efficiency** – Well-structured **MongoDB** for optimized queries  
✅ **Security** – Implementation of Clerk Auth for authentication and authorization  

## **🛠️ Tech Stack**  
- **Frontend:** React.js, Redux, JavaScript, Tailwind CSS  
- **Backend:** Node.js, Express.js, TypeScript  
- **Database:** MongoDB  
- **Authentication:** Clerk Auth  
- **State Management:** Redux  
- **Other Tools:** Postman (API testing), Vercel, Render (Deployment), GitHub  

## **🔧 Installation & Setup**  

### **1️⃣ Clone the Repository**  
```bash
git clone https://github.com/VenuraDenethpriya/lost-found-reporting-system.git
cd lost-found-reporting-system
```

### **2️⃣ Install Dependencies**  

#### **Backend Setup**  
```bash
cd Backend
npm install
```

#### **Frontend Setup**  
```bash
cd ../Frontend
npm install
```

### **3️⃣ Configure Environment Variables**  
Create a `.env` file in the **backend** folder and add the following:  
```
MONGO_URI=your_mongodb_connection_string
CLERK_SECRET_KEY=your_clerk_auth_secret
```

### **4️⃣ Run the Application**  

#### **Start Backend**  
```bash
cd Backend
npm run dev
```

#### **Start Frontend**  
```bash
cd Frontend
npm run dev
```

## **🚀 Deployment**  
- **Frontend Deployment:** Vercel  
- **Backend Deployment:** Render 

## **🛡️ Security Measures**  
🔹 **Clerk Auth** – Role-based access for police officers and public users  
🔹 **Data Encryption** – Protection of sensitive user data  
🔹 **Validation with Zod** – Prevent invalid inputs and ensure system integrity  

## **📜 API Endpoints**  

| Method | Endpoint | Description |
|--------|----------|------------|
| **POST** | `/api/reports` | Create a new lost item report |
| **GET** | `/api/reports` | Fetch all lost item reports |
| **GET** | `/api/reports/:id` | Fetch a specific lost item report |
| **PUT** | `/api/reports/:id` | Update report status |
| **DELETE** | `/api/reports/:id` | Remove a lost item report |
| **POST** | `/api/auth/signup` | User registration |
| **POST** | `/api/auth/login` | User login |

## **🛠️ Future Enhancements**  
🔹 **AI-based image recognition** for identifying lost items  
🔹 **SMS/Email notifications** for status updates  

## **📬 Contact**  
📩 **Venura Denethpriya**  
📧 [venurameedum@gmail.com](mailto:venurameedum@gmail.com)  
🌍 **Portfolio:** [venuraportfolio.vercel.app](https://venuraportfolio.vercel.app/)  
🔗 **LinkedIn:** [linkedin.com/in/venuradenethpriya](https://www.linkedin.com/in/venuradenethpriya/)  

---
